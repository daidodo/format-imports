import minimatch from 'minimatch';

import { endOfLine } from '@dozerg/end-of-line';

import { enhanceEol } from './importSorter';
import { Configuration } from './types';

export * from './types';

export * from './merge';

export {
  loadConfigFromJsonFile,
  loadImportSorterConfig as resolveConfigForFile,
} from './importSorter';

/**
 * Resolve config for given source text.
 *
 * This function will detect EOL for the text and update the base config provided.
 *
 * @typeparam T - A type extended from Configuration
 *
 * @param text - Source text
 * @param config - Base config
 */
export function resolveConfigForSource<T extends Configuration = Configuration>(
  text: string,
  config?: T,
) {
  return enhanceEol(config ?? ({} as T), () => endOfLine(text));
}

/**
 * Test if a file is excluded by the given config, taking `config.force` flag into account.
 *
 * The file name will be normalized to use `/` as path separator before matching.
 */
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
