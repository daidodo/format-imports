/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/ban-types */

import { Linter } from 'eslint';
import { UnionToIntersection } from 'utility-types';

import { logger } from '../../../common';
import { Configuration } from '../../../config';

export type Rules = Required<Linter.Config>['rules'];

/**
 * Extract options for ESLint rule(s).
 * All rules should have the same option structure, e.g. indent and \@typescript-eslint/indent
 * @returns The resolved options of the rules specified by _keys_.
 */
export function extractOptions<Options>(
  config: Configuration,
  rules: Rules,
  defaultOptions: Options,
  ...keys: string[]
) {
  const log = logger(`format-imports.extractOptions`);
  const results = keys.map(key => ({
    key,
    ...extractRuleOptions(config, rules, key, defaultOptions),
  }));
  // If multiple opitons are found, the last one takes precedence.
  const options = results.reduce<Options | undefined>((r, a) => a.options ?? r, undefined);
  if (options !== undefined)
    results.forEach(r =>
      log.info(r.ignored ? 'Ignore' : 'Found', `ESLint rule ${r.key}:`, r.options),
    );
  return options;
}

function extractRuleOptions<Options>(
  config: Configuration,
  rules: Rules,
  key: string,
  defaultOptions: Options,
): { options?: Options; ignored?: boolean } {
  if (isRuleIgnored(config, key)) return { ignored: true };
  const rule = rules[key];
  if (rule === undefined || rule === 0 || rule === 'off') return {};
  if (Array.isArray(rule)) {
    const level = rule[0];
    if (level === 0 || level === 'off') return {};
    const opt: Options | undefined = rule[1];
    return {
      options:
        opt === undefined
          ? defaultOptions
          : typeof opt === 'object' && typeof defaultOptions === 'object'
          ? { ...defaultOptions, ...opt }
          : opt,
    };
  }
  return { options: defaultOptions };
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
