import { Configuration } from './types';

type Merger<T extends object> = {
  [P in keyof T]?: (a: T[P], b: T[P]) => T[P];
};

export const DEFAULT_MERGER: Merger<Configuration> = {
  exclude: concatArray(),
  excludeGlob: concatArray(),
  keepUnused: concatArray(),
  sortRules: mergeHelper((a, b) => ({ ...a, ...b })),
};

/**
 * Merge multiple configs together. The latter takes precedence if values have conflicts.
 *
 * This function is preferred to `{...config1, ...config2}` in a sense that some keys need to be
 * merged instead of overwritten, e.g. `exclude`.
 *
 * Example:
 * ```ts
 * const config1 = { maxLineLength: 80, tabSize: 2 };
 * const config2 = { maxLineLength: 100 };
 *
 * const config = mergeConfig(config1, config2);  // { maxLineLength: 100, tabSize: 2 }
 * ```
 * @typeparam T A type extended from Configuration
 *
 * @param configs An array of config objects
 */
export function mergeConfig<T extends Configuration = Configuration>(...configs: T[]) {
  return mergeConfigWithMerger(DEFAULT_MERGER, ...configs);
}

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

function mergeHelper<T>(m: (a: T, b: T) => T) {
  return (a: T | undefined, b: T | undefined) => (a ? (b ? m(a, b) : a) : b);
}

function concatArray<T>() {
  return mergeHelper((a: T[], b: T[]) => [...a, ...b]);
}
