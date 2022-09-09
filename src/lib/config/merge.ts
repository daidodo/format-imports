import {
  concatArray,
  concatArrayEx,
  customize,
  mergeOptions,
  type Merger,
} from '@dozerg/merge-options';

import { type Configuration } from './types';

/**
 * Default merge rules for [mergeConfig](#mergeConfig), which are:
 *
 * - {@link exclude}, {@link excludeGlob} and {@link keepUnused} arrays will be concatenated instead of replaced;
 * - {@link sortRules} object will be merged instead of replaced;
 * - All other fields will be replaced and the latter config takes precedence.
 *
 * When creating your own merge policy, make sure to inherit the default merger and just override
 * the ones different.
 */
export const DEFAULT_MERGER: Merger<Configuration> = {
  exclude: concatArray(),
  excludeGlob: concatArray(),
  keepUnused: concatArray(),
  sortRules: customize((a, b) => {
    const aa = a === 'none' ? { paths: 'none' as const, names: 'none' as const } : a;
    const bb = b === 'none' ? { paths: 'none' as const, names: 'none' as const } : b;
    return { ...aa, ...bb };
  }),
  ignoreESLintRules: concatArrayEx(),
};

/**
 * Merge multiple configs together. The latter takes precedence if values have conflicts.
 *
 * This function is preferred to `{...config1, ...config2}` because some keys need to be
 * merged instead of overwritten, e.g. `exclude`. Please refer to  [DEFAULT_MERGER](#DEFAULT_MERGER)
 * for more details.
 *
 * Example:
 * ```ts
 * const config1 = { maxLineLength: 80, tabSize: 2 };
 * const config2 = { maxLineLength: 100 };
 *
 * const config = mergeConfig(config1, config2);  // { maxLineLength: 100, tabSize: 2 }
 * ```
 *
 * @param configs - An array of config objects
 */
export function mergeConfig<T extends Configuration = Configuration>(...configs: T[]) {
  return mergeOptions(DEFAULT_MERGER as Merger<T>, ...configs);
}
