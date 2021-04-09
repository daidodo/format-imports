/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/ban-types */

import { Linter } from 'eslint';
import { UnionToIntersection } from 'utility-types';

import { Configuration } from '../../../config';

export type Rules = Required<Linter.Config>['rules'];

export function extractOptions<Key extends keyof Rules, Options>(
  rules: Rules,
  key: Key,
  defaultOptions: Options,
): Options | undefined {
  const rule = rules[key];
  if (rule === undefined || rule === 0 || rule === 'off') return undefined;
  if (Array.isArray(rule)) {
    const [level, options] = rule;
    if (level === 0 || level === 'off') return undefined;
    return options === undefined
      ? defaultOptions
      : typeof options === 'object' && typeof defaultOptions === 'object'
      ? { ...defaultOptions, ...options }
      : options;
  }
  return defaultOptions;
}

/**
 * A translator is a function receives a `Configuration` and ESLint `Rules`,
 * and returns the new `config` and `processed` data if there are any.
 */
type Translator<P extends object> = (
  config: Configuration,
  rules: Rules,
) => { config: Configuration; processed?: P };
/**
 * Infer processed data type from translators.
 */
type ProcessedAsUnion<T> = T extends Translator<infer P>[] ? P : never;
/**
 * Given a number of translators, infer the processed data type.
 */
type Processed<T extends Translator<any>[]> = Partial<UnionToIntersection<ProcessedAsUnion<T>>>;

/**
 * Apply a number of `translators` to `config`.
 *
 * @param config - The original configuration
 * @param rules - ESLint rules
 * @param translators - An array of translations.
 * @returns The updated config and processed data if there are any
 */
export function apply<T extends Translator<any>[]>(
  config: Configuration,
  rules: Rules,
  ...translators: T
): { config: Configuration; processed?: Processed<T> } {
  const [translator, ...rest] = translators;
  if (!translator) return { config };
  const { config: c, processed } = applyOne(config, rules, translator);
  return applyNext(c, rules, processed, ...rest);
}

function applyOne<P extends object, PP extends object>(
  config: Configuration,
  rules: Rules,
  translator: Translator<P>,
  processed?: PP,
) {
  const { config: c, processed: p } = translator(config, rules);
  return { config: c, processed: merge(processed, p) };
}

function applyNext<T extends Translator<any>[], P extends object>(
  config: Configuration,
  rules: Rules,
  processed: P | undefined,
  ...translations: T
): { config: Configuration; processed: any } {
  const [translator, ...rest] = translations;
  if (!translator) return { config, processed };
  const { config: c, processed: p } = applyOne(config, rules, translator, processed);
  return applyNext(c, rules, merge(processed, p), ...rest);
}

function merge<T extends object, U extends object>(t: T | undefined, u: U | undefined) {
  return t ? (u ? { ...t, ...u } : t) : u;
}
