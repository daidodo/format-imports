import { logger } from '../../../../common';
import {
  Configuration,
  mergeConfig,
} from '../../../../config';
import {
  extractOptions,
  Rules,
} from '../helper';

type Options = 'always' | 'never';

const DEFAULT_OPTIONS: Options = 'always';

export function translateSemiRule(config: Configuration, rules: Rules, fn: string) {
  const log = logger(`format-imports.${fn}`);
  const ruleName = 'semi';
  const { options } = extractOptions(config, rules, ruleName, DEFAULT_OPTIONS);
  if (!options) return { config };
  log.info(`Found ESLint rule ${ruleName}:`, options);
  return process(config, options);
}

function process(config: Configuration, option: Options) {
  const c = mergeConfig(config, { hasSemicolon: option === 'always' });
  return { config: c };
}
