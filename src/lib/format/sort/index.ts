import {
  type Configuration,
  GROUP_RULES_DEFAULT,
} from '../../config';
import { type ESLintConfigProcessed } from '../config';
import {
  type ImportNode,
  KeepUnused,
  type NameUsage,
} from '../parser';
import {
  type Sorter,
  sorterFromRules,
} from './compare';
import { mergeImportNodes } from './merge';
import SortGroup from './SortGroup';
import { removeUnusedNames } from './unused';

export { Sorter, sorterFromRules, SortGroup };

export function sortImports(
  nodes: ImportNode[],
  usage: NameUsage,
  config: Configuration,
  sorter: Sorter,
  eslint?: ESLintConfigProcessed,
) {
  const { groupRules, keepUnused, sortImportsBy } = config;
  const subGroups = groupRules === undefined ? GROUP_RULES_DEFAULT : groupRules;
  // The top group must be a match-all group.
  const group = new SortGroup(
    { flags: 'all', regex: '', subGroups },
    { sorter, sortImportsBy },
    eslint,
  );
  const keepUnusedBouncer = keepUnused && new KeepUnused(keepUnused);
  const left = removeUnusedNames(nodes, usage, keepUnusedBouncer);
  const merged = mergeImportNodes(left);
  merged.forEach(n => group.add(n));
  return group.sort();
}

export { sortAndMergeExportNodes as sortExports } from './merge';
