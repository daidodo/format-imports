/* eslint-disable @typescript-eslint/ban-types */

import { Configuration } from './types';

/**
 * @internal
 */
export type Merger<T extends object> = {
  [P in keyof T]?: (a: T[P], b: T[P]) => T[P];
};

/**
 * Default merge policy for [mergeConfig](#mergeConfig), which is:
 *
 * - [exclude](interfaces/configuration.md#exclude),
 * [excludeGlob](interfaces/configuration.md#excludeGlob) and
 * [keepUnused](interfaces/configuration.md#keepUnused) arrays will be concatenated instead of
 * replaced;
 * - [sortRules](interfaces/configuration.md#sortRules) object will be merged instead of replaced;
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
 * This function is preferred to `{...config1, ...config2}` in a sense that some keys need to be
 * merged instead of overwritten, e.g. `exclude`. Please refer to
 * [mergeConfigWithMerger](#mergeConfigWithMerger) and [DEFAULT_MERGER](#DEFAULT_MERGER)
 * for more details.
 *
 * Example:
 * ```ts
 * const config1 = { maxLineLength: 80, tabSize: 2 };
 * const config2 = { maxLineLength: 100 };
 *
 * const config = mergeConfig(config1, config2);  // { maxLineLength: 100, tabSize: 2 }
 * ```
 * @typeparam T - A type extended from Configuration
 *
 * @param configs - An array of config objects
 */
export function mergeConfig<T extends Configuration = Configuration>(...configs: T[]) {
  return mergeConfigWithMerger(DEFAULT_MERGER as Merger<T>, ...configs);
}

/**
 * Merge multiple configs with custom merger.
 *
 * A merger is an object with the same keys as _T_ but the values are functions, e.g.:
 *
 * ```ts
 * interface Merger {
 *   formatExports?: (a: boolean, b: boolean) => boolean;
 *   exclude?: (a: string[], b: string[]) => string[];
 *   // ...
 * };
 * ```
 *
 * Each field in a merger defines how that field is merged between configs. If _undefined_, the
 * field will use the default policy which is replacement by the latter.
 *
 * @typeparam T - A type extended from Configuration
 *
 * @param merger - A custom object with merge functions for all fields in a config
 * @param configs - An array of config objects
 */
export function mergeConfigWithMerger<T extends Configuration = Configuration>(
  merger: Merger<T>,
  ...configs: T[]
) {
  if (configs.length < 2) return configs?.[0] ?? {};
  return configs.reduce((a, b) => {
    const c = (Object.keys(merger) as (keyof T)[])
      .map(k => {
        const m = merger[k];
        return { [k]: m ? m(a[k], b[k]) : b[k] ?? a[k] };
      })
      .reduce((a, b) => ({ ...a, ...b }));
    return { ...purify(a), ...purify(b), ...purify(c) };
  });
}

function purify<T extends object>(a: T): T {
  let r = {} as T;
  let k: keyof T;
  for (k in a) if (a[k] !== undefined) r = { ...r, [k]: a[k] };
  return r;
}

export function customize<T>(m: (a: T, b: T) => T) {
  return (a: T | undefined, b: T | undefined) => (a ? (b ? m(a, b) : a) : b);
}

function concatArray<T>() {
  return customize<T[]>((a, b) => [...a, ...b]);
}

function concatArrayEx<T>() {
  return customize<T | T[]>((a, b) => [
    ...(Array.isArray(a) ? a : [a]),
    ...(Array.isArray(b) ? b : [b]),
  ]);
}
