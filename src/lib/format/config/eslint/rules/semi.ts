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

export function translateSemiRule(config: Configuration, rules: Rules) {
  const options = extractOptions(config, rules, DEFAULT_OPTIONS, 'semi', '@typescript-eslint/semi');
  return options === undefined ? { config } : process(config, options);
}

function process(config: Configuration, option: Options) {
  const c = mergeConfig(config, { hasSemicolon: option === 'always' });
  return { config: c };
}
