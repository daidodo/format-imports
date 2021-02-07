import minimatch from 'minimatch';

import { endOfLine } from '@dozerg/end-of-line';

import { enhanceEol } from './importSorter';
import { Configuration } from './types';

export {
  COMPARE_RULE_DEFAULT,
  CompareRule,
  Configuration,
  FlagSymbol,
  GROUP_RULES_DEFAULT,
  GroupRule,
  KeepUnusedRule,
  SegSymbol,
  SortRules,
} from './types';

export { mergeConfig } from './helper';
export { ESLintConfig } from './eslint';
export {
  loadConfigFromJsonFile,
  loadImportSorterConfig as resolveConfigForFile,
} from './importSorter';

// TODO: Tests.
export function resolveConfigForSource(text: string, config: Configuration = {}) {
  return enhanceEol(config, () => endOfLine(text));
}

// TODO: Tests.
export function isFileExcludedByConfig(fileName: string, config: Configuration) {
  const { exclude, excludeGlob, force } = config;
  if (force) return false;
  // glob
  for (const p of excludeGlob ?? []) if (minimatch(fileName, p, { matchBase: true })) return true;
  // regex
  const normalized = fileName.replace(/\\/g, '/');
  for (const p of exclude ?? []) {
    const r = new RegExp(p);
    if (r.test(fileName) || r.test(normalized)) return true;
  }
  return false;
}
