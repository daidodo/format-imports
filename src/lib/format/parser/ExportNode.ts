import {
  type ExportDeclaration,
  type StringLiteral,
  SyntaxKind,
} from 'typescript';

import {
  composeParts,
  NamedPart,
  SemiPart,
  StringPart,
} from '../compose';
import { type ComposeConfig } from '../config';
import type { NameBinding } from '../types';
import { getNameBinding } from './helper';
import { normalizePath } from './path';
import Statement, { type StatementArgs } from './Statement';

export default class ExportNode extends Statement {
  private readonly moduleIdentifier_?: string;
  private readonly isTypeOnly_: boolean;
  names: NameBinding[];

  static fromDecl(node: ExportDeclaration, args: StatementArgs) {
    const { exportClause, moduleSpecifier, isTypeOnly } = node;
    if (!exportClause || exportClause.kind !== SyntaxKind.NamedExports) return undefined;
    const names = exportClause.elements
      .filter(e => e.kind === SyntaxKind.ExportSpecifier)
      .map(getNameBinding);
    if (moduleSpecifier && moduleSpecifier.kind !== SyntaxKind.StringLiteral) return undefined;
    const moduleIdentifier = moduleSpecifier && (moduleSpecifier as StringLiteral).text;
    return new ExportNode(moduleIdentifier, names, args, isTypeOnly);
  }

  private constructor(
    moduleIdentifier: string | undefined,
    names: NameBinding[],
    args: StatementArgs,
    isTypeOnly: boolean,
  ) {
    super(args);
    this.moduleIdentifier_ = moduleIdentifier && normalizePath(moduleIdentifier, args.config);
    this.isTypeOnly_ = isTypeOnly;
    this.names = names;
  }

  hasModuleIdentifier() {
    return !!this.moduleIdentifier_;
  }

  empty() {
    return this.names.length < 1;
  }

  merge(node: ExportNode) {
    if (
      // this.empty() ||
      this.moduleIdentifier_ !== node.moduleIdentifier_ ||
      this.isTypeOnly_ !== node.isTypeOnly_ ||
      !this.canMergeComments(node)
    )
      return false;
    this.names.push(...node.names);
    node.names = [];
    return this.mergeComments(node);
  }

  compose(config: ComposeConfig) {
    const { leadingText, followingNewLines, trailingText, tailingLength } =
      this.composeComments(config);
    const nl = (followingNewLines ?? 0) > 1 ? config.nl : '';
    const importText = this.composeExport(tailingLength, config);
    return leadingText + nl + importText + trailingText;
  }

  private composeExport(commentLength: number, config: ComposeConfig) {
    const { quote, wrap } = config;
    const verb = 'export' + (this.isTypeOnly_ ? ' type' : '');
    const path = this.moduleIdentifier_;
    const from = path ? 'from ' + quote(path) : undefined;
    const maxWords = wrap.exported;
    return composeParts(
      [
        StringPart(verb),
        NamedPart(this.names, from, maxWords, !wrap.parts),
        SemiPart(commentLength),
      ],
      config,
    );
  }
}
