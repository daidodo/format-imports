import { Map } from 'immutable';
import isBuiltinModule from 'is-builtin-module';
import {
  type ImportAttributes,
  type ImportClause,
  type ImportDeclaration,
  type ImportEqualsDeclaration,
  type NamedImportBindings,
  type StringLiteral,
  SyntaxKind,
} from 'typescript';

import { assertNonNull } from '@dozerg/condition';

import { logger } from '../../common';
import { type FlagSymbol } from '../../config';
import {
  AttributesPart,
  composeParts,
  NamedPart,
  SemiPart,
  StringPart,
} from '../compose';
import { type ComposeConfig } from '../config';
import type {
  Binding,
  NameBinding,
} from '../types';
import { getNameBinding } from './helper';
import type KeepUnused from './KeepUnused';
import {
  normalizePath,
  removeNodeProtocol,
} from './path';
import Statement, { type StatementArgs } from './Statement';
import { type NameUsage } from './unused';

// Import attributes
interface Attributes {
  token: 'with' | 'assert';
  entries: Map<string, string>;
}

export default class ImportNode extends Statement {
  private readonly node_: ImportDeclaration | ImportEqualsDeclaration;

  readonly moduleIdentifier: string;
  private readonly isScript: boolean;
  readonly isTypeOnly: boolean;
  private defaultName_?: string;
  private binding_?: Binding;
  private readonly attributes?: Attributes;

  static fromDecl(node: ImportDeclaration, args: StatementArgs) {
    const { importClause, moduleSpecifier, attributes: attrs } = node;
    if (!moduleSpecifier || moduleSpecifier.kind !== SyntaxKind.StringLiteral) return undefined;
    const moduleIdentifier = (moduleSpecifier as StringLiteral).text;
    if (!moduleIdentifier.trim()) return undefined;
    const { defaultName, binding, isScript, isTypeOnly } = getDefaultAndBinding(importClause);
    const attributes = getImportAttributes(attrs);
    return new ImportNode(
      node,
      moduleIdentifier,
      args,
      defaultName,
      binding,
      isScript,
      isTypeOnly,
      attributes,
    );
  }

  static fromEqDecl(node: ImportEqualsDeclaration, args: StatementArgs) {
    const { moduleReference } = node;
    if (!moduleReference || moduleReference.kind !== SyntaxKind.ExternalModuleReference)
      return undefined;
    const { expression } = moduleReference;
    if (!expression || expression.kind !== SyntaxKind.StringLiteral) return undefined;
    const moduleIdentifier = (expression as StringLiteral).text;
    const defaultName = node.name.text;
    return new ImportNode(node, moduleIdentifier, args, defaultName);
  }

  private constructor(
    node: ImportDeclaration | ImportEqualsDeclaration,
    moduleIdentifier: string,
    args: StatementArgs,
    defaultName?: string,
    binding?: Binding,
    isScript = false,
    isTypeOnly = false,
    attributes?: Attributes,
  ) {
    super(args);
    this.node_ = node;
    this.moduleIdentifier = normalizePath(moduleIdentifier, args.config);
    this.defaultName_ = defaultName;
    this.binding_ = binding;
    this.isScript = isScript;
    this.isTypeOnly = isTypeOnly;
    this.attributes = attributes;
  }

  get defaultName() {
    return this.defaultName_;
  }

  get binding() {
    return this.binding_;
  }

  get flagType(): FlagSymbol {
    if (this.isScript) return 'scripts';
    if (this.defaultName_) return this.binding_ ? 'multiple' : 'single';
    if (!this.binding_) return 'multiple';
    if (this.binding_.type === 'namespace') return 'namespace';
    return this.binding_.names.length === 1 ? 'single' : 'multiple';
  }

  get isBuiltIn() {
    return isBuiltinModule(this.moduleIdentifier);
  }

  matchPath(regex: RegExp) {
    if (regex.test(this.moduleIdentifier)) return true;
    if (this.isBuiltIn) {
      const realId = removeNodeProtocol(this.moduleIdentifier);
      return regex.test(realId);
    }
    return false;
  }

  allNames() {
    const r: string[] = [];
    if (this.defaultName_) r.push(this.defaultName_);
    if (this.binding_?.type === 'namespace') r.push(this.binding_.alias);
    else if (this.binding_?.type === 'named') {
      const names = this.binding_.names.map(n => n.aliasName ?? n.propertyName);
      r.push(...names);
    }
    return r;
  }

  empty() {
    return !this.isScript && !this.defaultName_ && !this.binding_;
  }

  removeUnusedNames(usage: NameUsage, keepUnused?: KeepUnused) {
    const { unusedNodes } = usage;
    if (this.isScript) return;
    const keepUnusedName = keepUnused?.forPath(this.moduleIdentifier);
    if (unusedNodes && unusedNodes.includes(this) && !keepUnusedName) {
      this.defaultName_ = undefined;
      this.binding_ = undefined;
      return;
    }
    if (!isNameUsed(this.defaultName_, usage, keepUnusedName)) this.defaultName_ = undefined;
    if (this.binding_) {
      if (this.binding_.type === 'named') {
        this.binding_.names = this.binding_.names.filter(n => isNameUsed(n, usage, keepUnusedName));
        if (!this.binding_.names.length) this.binding_ = undefined;
      } else if (!isNameUsed(this.binding_.alias, usage, keepUnusedName)) {
        this.binding_ = undefined;
      }
    }
  }

  /**
   * @returns true if `node` is fully merged to `this`;
   *          false if `node` still has names or comments thus can't be ignored.
   */
  merge(node: ImportNode) {
    const { isTypeOnly } = this;
    if (
      this.moduleIdentifier !== node.moduleIdentifier ||
      this.node_.kind !== node.node_.kind ||
      this.isScript !== node.isScript ||
      isTypeOnly !== node.isTypeOnly ||
      !this.canMergeComments(node) ||
      0 !== compareAttributes(this.attributes, node.attributes)
    )
      return false;
    this.removeBindingDefault(node.defaultName_);
    node.removeBindingDefault(this.defaultName_);
    const r1 = this.mergeBinding(node, !isTypeOnly);
    const r2 = this.mergeDefaultName(node, !isTypeOnly);
    return r1 && r2 && this.mergeComments(node);
  }

  checkBindingDefault() {
    // `import A, {default as A} from 'x'` => `import A from 'x'`
    if (this.defaultName_) this.removeBindingDefault(this.defaultName_);
    // `import {default as A, B} from 'x'` => `import A, {B} from 'x'`
    // `import type {default as A} from 'x'` => `import type A from 'x'`
    else this.defaultName_ = this.pickBindingDefault(this.isTypeOnly);
  }

  compose(config: ComposeConfig) {
    const { leadingText, trailingText, tailingLength } = this.composeComments(config);
    const importText = this.composeImport(tailingLength, config);
    return leadingText + importText + trailingText;
  }

  private removeBindingDefault(defaultName?: string) {
    if (!defaultName || this.binding_?.type !== 'named') return;
    this.binding_.names = this.binding_.names.filter(
      a => a.aliasName !== defaultName || a.propertyName !== 'default',
    );
    if (this.binding_.names.length < 1) this.binding_ = undefined;
  }

  /**
   * Find and remove 'default as X' from binding names and returns 'X'.
   *
   * If whenSingle is true and names array length is not 1, do nothing.
   */
  private pickBindingDefault(whenSingle = false) {
    if (this.binding_?.type !== 'named') return undefined;
    if (whenSingle && this.binding_.names.length > 1) return undefined;
    const name = this.binding_.names.find(a => a.propertyName === 'default')?.aliasName;
    this.removeBindingDefault(name);
    return name;
  }

  private mergeBinding(node: ImportNode, takeOver: boolean) {
    const { binding_: b1 } = this;
    const { binding_: b2 } = node;
    if (!b2) return true;
    else if (!b1) {
      if (!takeOver) return false;
      this.binding_ = b2;
      node.binding_ = undefined;
      return true;
    } else if (b1.type === 'namespace') {
      if (b2.type === 'namespace' && b1.alias === b2.alias) {
        node.binding_ = undefined;
        return true;
      }
      return false;
    } else if (b2.type === 'namespace') return false;
    b1.names.push(...b2.names);
    node.binding_ = undefined;
    return true;
  }

  private mergeDefaultName(node: ImportNode, takeOver: boolean) {
    if (this.defaultName_ && node.defaultName_ && this.defaultName_ !== node.defaultName_)
      return false;
    if (!this.defaultName_) {
      if (!takeOver) return !node.defaultName_;
      this.defaultName_ = node.defaultName_;
    }
    node.defaultName_ = undefined;
    return true;
  }

  private composeImport(commentLength: number, config: ComposeConfig) {
    switch (this.node_.kind) {
      case SyntaxKind.ImportDeclaration:
        return this.composeDecl(commentLength, config);
      case SyntaxKind.ImportEqualsDeclaration:
        return this.composeEqDecl(commentLength, config);
    }
  }

  // import A = require('B');
  private composeEqDecl(extraLength: number, config: ComposeConfig) {
    const { quote, wrap } = config;
    const path = this.moduleIdentifier;
    const name = this.defaultName_;
    assertNonNull(name);
    return composeParts(
      [
        StringPart(`import ${name} =`, true),
        StringPart(`require(${quote(path)})`, !wrap.parts),
        SemiPart(extraLength),
      ],
      config,
    );
  }

  /**
   * Script import:
   * ```
   *    import 'A';
   * ```
   *
   * Default import:
   * ```
   *    import A from 'B';
   * ```
   *
   * Binding names import:
   * ```
   *    import { A, B as C } from 'D';
   *    import {
   *      A, B,
   *      C as D,
   *    } from 'E';
   * ```
   *
   * Namespace import:
   * ```
   *    import * as A from 'B';
   * ```
   *
   * Mixed examples:
   * ```
   *    import A, { B, C } from 'D';
   *    import A, {
   *      B,
   *      C as D,
   *      E,
   *    } from 'F';
   *    import A, * as B from 'C';
   *    import A, { default as B, C, D } from 'E';
   * ```
   *
   * Import attributes
   * ```
   *    import A from 'a' assert { type: 'json' };
   *    import A from 'a' with { type: 'json' };
   * ```
   */
  private composeDecl(extraLength: number, config: ComposeConfig) {
    const { quote, semi, wrap } = config;
    const path = this.moduleIdentifier;
    const ending = quote(path);
    if (this.isScript) return `import ${ending}${semi}`;
    const verb = 'import' + (this.isTypeOnly ? ' type' : '');
    const from = `from ${ending}`;
    const noWrap = !wrap.parts;
    if (!this.binding_) {
      // import A from 'a' assert { x: 'y' }
      return composeParts(
        [
          StringPart(`${verb} ${this.defaultName_}`, true),
          StringPart(from, noWrap),
          AttributesPart(this.attributes?.token, this.attributes?.entries, noWrap),
          SemiPart(extraLength),
        ],
        config,
      );
    } else if (this.binding_.type === 'namespace') {
      // import * as A from 'a' assert { x: 'y' }, or
      // import A, * as B from 'a' assert { x: 'y' }
      // Same for 'with'.
      const alias = `* as ${this.binding_.alias}`;
      return composeParts(
        [
          ...(this.defaultName_
            ? [StringPart(`${verb} ${this.defaultName_},`, true), StringPart(alias, noWrap)]
            : [StringPart(`${verb} ${alias}`, true)]),
          StringPart(from, noWrap),
          AttributesPart(this.attributes?.token, this.attributes?.entries, noWrap),
          SemiPart(extraLength),
        ],
        config,
      );
    }
    // import { A, B } from 'a' assert { x: 'y' }, or
    // import A, { B, C } from 'a' assert { x: 'y' }
    // Same for 'with'.
    const { withDefault, withoutDefault } = wrap;
    const maxWords = this.defaultName_ ? withDefault - 1 : withoutDefault;
    return composeParts(
      [
        StringPart(this.defaultName_ ? `${verb} ${this.defaultName_},` : verb, true),
        NamedPart(this.binding_.names, from, maxWords, !this.defaultName_ && noWrap),
        AttributesPart(this.attributes?.token, this.attributes?.entries, noWrap),
        SemiPart(extraLength),
      ],
      config,
    );
  }
}

function isNameUsed(
  name: NameBinding | string | undefined,
  usage: NameUsage,
  keepUnused?: (name: string) => boolean,
) {
  if (!name) return false;
  const { unusedNames, usedNames } = usage;
  const n = typeof name === 'string' ? name : name.aliasName ?? name.propertyName;
  if (!n) return false;
  if (keepUnused?.(n)) return true;
  // `unusedNames` (from TS compiler) gives more accurate results
  // than `usedNames` (from manual parsing).
  if (unusedNames) return !unusedNames.has(n);
  if (usedNames) return usedNames.has(n);
  return true; // Keep it for safety
}

function getDefaultAndBinding(importClause: ImportClause | undefined) {
  if (!importClause) return { isScript: true };
  const { name, namedBindings, isTypeOnly } = importClause;
  const defaultName = name?.text;
  const binding = getBinding(namedBindings);
  return { defaultName, binding, isScript: false, isTypeOnly };
}

function getImportAttributes(assertClause: ImportAttributes | undefined) {
  if (!assertClause) return undefined;
  const { kind, elements, token: tk } = assertClause;
  if (kind !== SyntaxKind.ImportAttributes) return undefined;
  const token = getAttributeToken(tk);
  if (!token) return undefined;
  const entries = Map(
    elements.map(({ name, value }) => [name.text, (value as StringLiteral).text]),
  );
  if (entries.isEmpty()) return undefined;
  return { token, entries };
}

function getAttributeToken(token: SyntaxKind) {
  const log = logger('format-imports.ImportNode.getAttributeToken');
  switch (token) {
    case SyntaxKind.WithKeyword:
      return 'with' as const;
    case SyntaxKind.AssertKeyword:
      return 'assert' as const;
    default:
      log.error('Unsupported token:', token);
  }
  return undefined;
}

function compareAttributes(attr1: Attributes | undefined, attr2: Attributes | undefined) {
  if (attr1 === attr2) return 0;
  else if (attr1 === undefined) return -1;
  else if (attr2 === undefined) return 1;
  const { token: tk1, entries: entries1 } = attr1;
  const { token: tk2, entries: entries2 } = attr2;
  if (tk1 != tk2) return tk1.localeCompare(tk2);
  return compareAttrEntries(entries1, entries2);
}

function compareAttrEntries(
  entries1: Map<string, string> | undefined,
  entries2: Map<string, string> | undefined,
) {
  if (entries1 === entries2) return 0;
  else if (entries1 === undefined) return -1;
  else if (entries2 === undefined) return 1;
  const it1 = entries1.sort().entries();
  const it2 = entries2.sort().entries();
  let v1 = it1.next();
  let v2 = it2.next();
  for (; !v1.done && !v2.done; v1 = it1.next(), v2 = it2.next()) {
    const r = compareKeyValue(v1.value, v2.value);
    if (r !== 0) return r;
  }
  return v1.done === v2.done ? 0 : v1.done ? -1 : 1;
}

function compareKeyValue([k1, v1]: [string, string], [k2, v2]: [string, string]) {
  const r = k1.localeCompare(k2);
  if (r !== 0) return r;
  return v1.localeCompare(v2);
}

function getBinding(nb: NamedImportBindings | undefined): Binding | undefined {
  if (!nb) return undefined;
  if (nb.kind === SyntaxKind.NamespaceImport) return { type: 'namespace', alias: nb.name.text };
  const names = nb.elements.map(getNameBinding);
  return names.length < 1 ? undefined : { type: 'named', names };
}
