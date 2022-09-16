import segmentSorter, { type Comparator } from 'segment-sort';

import {
  COMPARE_RULE_DEFAULT,
  type CompareRule,
  type SortRules,
} from '../../config';
import { type ImportNode } from '../parser';
import type {
  Binding,
  NameBinding,
} from '../types';

export interface Sorter extends SortRules {
  comparePaths?: Comparator;
  compareNames?: Comparator;
}

export function sorterFromRules(rules: 'none' | SortRules | undefined): Sorter {
  const r = rules === 'none' ? { paths: 'none' as const, names: 'none' as const } : rules;
  return {
    ...r,
    comparePaths: comparatorFromRule(r?.paths),
    compareNames: comparatorFromRule(r?.names),
  };
}

export function updateSorterWithRules(sorter: Sorter, rules: 'none' | SortRules | undefined) {
  if (!rules) return sorter;
  const r = { ...sorter };
  const { paths, names } =
    rules === 'none' ? { paths: 'none' as const, names: 'none' as const } : rules;
  if (paths && paths !== r.paths) {
    r.paths = paths;
    r.comparePaths = comparatorFromRule(paths);
  }
  if (names && names !== r.names) {
    r.names = names;
    r.compareNames = comparatorFromRule(names);
  }
  return r;
}

export function compareImportNodesByPaths(
  a: ImportNode,
  b: ImportNode,
  comparePaths: Comparator,
  compareNames: Comparator | undefined,
) {
  return (
    comparePaths(a.moduleIdentifier, b.moduleIdentifier) ||
    compareTypeOnly(a.isTypeOnly, b.isTypeOnly) ||
    (compareNames
      ? compareDefaultName(a.defaultName, b.defaultName, compareNames) ||
        compareBinding(a.binding, b.binding, compareNames, false)
      : 0)
  );
}

export function compareImportNodesByNames(
  a: ImportNode,
  b: ImportNode,
  comparePaths: Comparator | undefined,
  compareNames: Comparator,
  aliasFirst: boolean,
) {
  return (
    compareNameArrays(a.allNames(), b.allNames(), compareNames) ||
    compareTypeOnly(a.isTypeOnly, b.isTypeOnly) ||
    compareDefaultName(a.defaultName, b.defaultName, compareNames) ||
    compareBinding(a.binding, b.binding, compareNames, aliasFirst) ||
    (comparePaths ? comparePaths(a.moduleIdentifier, b.moduleIdentifier) : 0)
  );
}

function compareNameArrays(n1: string[], n2: string[], compareNames: Comparator) {
  let i = 0;
  for (; i < n1.length && i < n2.length; ++i) {
    const r = compareNames(n1[i], n2[i]);
    if (r !== 0) return r;
  }
  return i < n1.length ? 1 : i < n2.length ? -1 : 0;
}

/**
 * Sort typed imports in front of other imports.
 */
function compareTypeOnly(a: boolean, b: boolean) {
  return (a ? 0 : 1) - (b ? 0 : 1);
}

/**
 * Put default import in front of binding imports to highlight, e.g.:
 *
 * ```ts
 * import D from './a';         // comment to disable merge
 * import * as A from './a';    // namespace binding import
 * import { B, C } from './a';  // named binding import
 * ```
 */
function compareDefaultName(a: string | undefined, b: string | undefined, compare: Comparator) {
  if (!a) return b ? 1 : 0;
  if (!b) return -1;
  return compare(a, b);
}

/**
 * Compare bindings.
 *
 * Note that namespace binding is sorted in front of named bindings, e.g.:
 *
 * ```ts
 * import * as C from './a';    // namespace binding import
 * import { A, B } from './a';  // named binding import
 * ```
 */
function compareBinding(
  a: Binding | undefined,
  b: Binding | undefined,
  compare: Comparator,
  aliasFirst: boolean,
) {
  if (!a) return b ? -1 : 0;
  if (!b) return 1;
  if (a.type === 'named' && b.type === 'named')
    return compareBindingName(a.names[0], b.names[0], compare, aliasFirst);
  // Put namespace binding in front of named bindings.
  if (a.type === 'named') return 1;
  if (b.type === 'named') return -1;
  return compare(a.alias, b.alias);
}

export function compareBindingName(
  a: NameBinding,
  b: NameBinding,
  compare: Comparator,
  aliasFirst: boolean,
) {
  if (!a) return b ? -1 : 0;
  else if (!b) return 1;
  // 'default' < 'x as default' < 'default as x' < others
  if (isDefault(a)) return isDefault(b) ? 0 : -1;
  else if (isDefault(b)) return 1;
  const { propertyName: pa, aliasName: aa } = a;
  const { propertyName: pb, aliasName: ab } = b;
  if (isAsDefault(a)) return isAsDefault(b) ? comparePropertyName(pa, pb, compare) : -1;
  else if (isAsDefault(b)) return 1;
  return aliasFirst
    ? compare(aa ?? pa, ab ?? pb) || comparePropertyName(pa, pb, compare)
    : comparePropertyName(pa, pb, compare) || compare(aa, ab);
}

function isDefault(a: NameBinding) {
  return a.propertyName === 'default' && !a.aliasName;
}

function isAsDefault(a: NameBinding) {
  return !!a.propertyName && a.aliasName === 'default';
}

/**
 * Compare propertyName of named bindings.
 *
 * Note that `default as X` is sorted in front of other names to highlight, e.g.:
 *
 * ```ts
 * import { default as C, A, B } from './a';
 * ```
 */
function comparePropertyName(a: string, b: string, compare: Comparator) {
  if (!a) return b ? -1 : 0;
  if (!b) return 1;
  // Put 'default as X' in front of any other binding names to highlight.
  if (a === 'default') return b === 'default' ? 0 : -1;
  if (b === 'default') return 1;
  return compare(a, b);
}

// Default comparator
const COMPARE_DEF: Comparator = (a, b) => {
  if (!a) return !b ? 0 : -1;
  if (!b) return 1;
  return a < b ? -1 : a > b ? 1 : 0;
};

function comparatorFromRule(rule: CompareRule | undefined | null) {
  if (rule === null) return COMPARE_DEF;
  const r = rule === undefined ? COMPARE_RULE_DEFAULT : rule;
  if (r === 'none') return undefined;
  return segmentSorter(r) ?? COMPARE_DEF;
}
