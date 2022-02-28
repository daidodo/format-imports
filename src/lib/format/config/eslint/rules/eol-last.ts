import {
  type Configuration,
  mergeConfig,
} from '../../../../config';
import {
  extractOptions,
  type Rules,
} from '../helper';

type Options = 'always' | 'never';

const DEFAULT_OPTIONS: Options = 'always';

export function translateEolLastRule(config: Configuration, rules: Rules) {
  const options = extractOptions(config, rules, DEFAULT_OPTIONS, 'eol-last');
  return options === undefined ? { config } : process(config, options);
}

function process(config: Configuration, option: Options) {
  const c = mergeConfig(config, { insertFinalNewline: option !== 'never' });
  return { config: c };
}
