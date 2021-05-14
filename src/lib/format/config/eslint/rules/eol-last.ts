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

export function translateEolLastRule(config: Configuration, rules: Rules) {
  const log = logger('format-imports.translateEolLastRule');
  const { options } = extractOptions(config, rules, 'eol-last', DEFAULT_OPTIONS);
  if (!options) return { config };
  log.info('Found ESLint rule eol-last:', options);
  return process(config, options);
}

function process(config: Configuration, option: Options) {
  const c = mergeConfig(config, { insertFinalNewline: option !== 'never' });
  return { config: c };
}
