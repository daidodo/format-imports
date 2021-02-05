import minimatch from 'minimatch';

import { endOfLine } from '@dozerg/end-of-line';

import { loadESLintConfig } from './eslint';
import {
  enhanceEol,
  loadImportSorterConfig,
} from './importSorter';
import { loadTsConfig } from './tsconfig';
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
export { loadConfigFromJsonFile } from './importSorter';

// TODO: Tests.
export function resolveConfigForFile(fileName: string, config: Configuration = {}) {
  const extConfig = loadImportSorterConfig(config, fileName);
  const eslintConfig = loadESLintConfig(fileName);
  const tsCompilerOptions = loadTsConfig(fileName);
  return { config: extConfig, tsCompilerOptions, eslintConfig };
}

export function resolveConfigForSource(source: string, config: Configuration = {}) {
  const extConfig = enhanceEol(config, () => endOfLine(source));
  return { config: extConfig, tsCompilerOptions: undefined, eslintConfig: undefined };
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
