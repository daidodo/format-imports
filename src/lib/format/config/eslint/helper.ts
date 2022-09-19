/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/ban-types */

import { type Linter } from 'eslint';
import { type UnionToIntersection } from 'utility-types';

import {
  isNonNull,
  isObject,
} from '@dozerg/condition';

import { logger } from '../../../common';
import { type Configuration } from '../../../config';

export type Rules = Required<Linter.Config>['rules'];

/**
 * Extract options for ESLint rules.
 * All rules should have the same options structure, e.g. indent and \@typescript-eslint/indent
 * @returns The resolved options of the rules specified by _keys_.
 */
export function extractOptions<Options>(
  config: Configuration,
  rules: Rules,
  defaultOptions: Options,
  ...keys: string[]
) {
  const log = logger(`format-imports.extractOptions`);
  const results = keys
    .map(key => {
      const o = extractRuleOptions(rules, key, defaultOptions);
      if (o === undefined) return undefined;
      const ignored = isRuleIgnored(config, key);
      log.info(ignored ? 'Ignored' : 'Found', `ESLint rule ${key}:`, o);
      return ignored ? undefined : o;
    })
    .filter(isNonNull);
  // If multiple opitons are found, the last one takes precedence.
  return results.length < 1 ? undefined : results[results.length - 1];
}

function extractRuleOptions<Options>(rules: Rules, key: string, defaultOptions: Options) {
  const rule = rules[key];
  if (rule === undefined || rule === 0 || rule === 'off') return undefined;
  if (Array.isArray(rule)) {
    const level = rule[0];
    if (level === 0 || level === 'off') return undefined;
    const opt: Options | undefined = rule[1];
    return opt === undefined
      ? defaultOptions
      : isObject(opt) && isObject(defaultOptions)
      ? { ...defaultOptions, ...opt }
      : opt;
  }
  return defaultOptions;
}

function isRuleIgnored({ ignoreESLintRules: patterns }: Configuration, key: string) {
  if (!patterns) return false;
  for (const p of typeof patterns === 'string' ? [patterns] : patterns) {
    const r = new RegExp(p);
    if (r.test(key)) return true;
  }
  return false;
}

/**
 * A translator is a function receives a `Configuration` and ESLint `Rules`,
 * and returns the new `config` and `processed` data if there are any.
 */
type Translator<P extends object> = (
  config: Configuration,
  rules: Rules,
  funcName: string,
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
  const { config: c, processed: p } = translator(config, rules, translator.name);
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
