import { type CompareRule as SegmentCompareRule } from 'segment-sort';

/**
 * String comparison rule.
 *
 * If it's _none_, then there is no sorting at all.
 */
export type CompareRule = SegmentCompareRule | 'none';

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
