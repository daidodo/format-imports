/* eslint-disable tsdoc/syntax */

/**
 * Symbols for char segments:
 * - _az_ - Lower case letters, i.e. [a-z].
 * - _AZ_ - Upper case letters, i.e. [A-Z].
 * - _aA_ - Both case letters and lower case first, i.e. [a-zA-Z] and `'a' < 'A' < 'b' < 'B' < ...`
 * - _Aa_ - Both case letters and upper case first, i.e. [a-zA-Z] and `'A' < 'a' < 'B' < 'b' < ...`
 * - _\__ - Chars with ASCII from 91 to 96, i.e. `[`, `\`, `]`, `^`, `_`, `` ` ``(backtick).
 */
export type SegSymbol = 'az' | 'AZ' | 'aA' | 'Aa' | '_';

/**
 * String comparison rule.
 *
 * If it's _none_, then there is no sorting at all.
 */
export type CompareRule = SegSymbol[] | 'none';

export interface SortRules {
  /**
   * Sorting rule for import paths. Default to
   * [COMPARE_RULE_DEFAULT](../README.md#COMPARE_RULE_DEFAULT).
   */
  paths?: CompareRule;

  /**
   * Sorting rule for imported/exported names. Default to
   * [COMPARE_RULE_DEFAULT](../README.md#COMPARE_RULE_DEFAULT).
   */
  names?: CompareRule;
}

/*
The following are internal analysis about all sorting rules:

paths: ['_', 'aA']
names: ['_', 'aA']

imports:
  paths
  default < namespace < binding names
    default/namespace: names
    binding names

binding names:
  [propertyName, aliasName]
    propertyName: default < others, names
    aliasName: names
*/
