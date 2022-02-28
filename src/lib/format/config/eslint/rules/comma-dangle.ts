import {
  type Configuration,
  mergeConfig,
} from '../../../../config';
import {
  extractOptions,
  type Rules,
} from '../helper';

type Options = string | { imports?: string };

const DEFAULT_OPTIONS: Options = 'never';

export function translateCommaDangleRule(config: Configuration, rules: Rules) {
  const options = extractOptions(
    config,
    rules,
    DEFAULT_OPTIONS,
    'comma-dangle',
    '@typescript-eslint/comma-dangle',
  );
  return options === undefined ? { config } : process(config, options);
}

function process(config: Configuration, options: Options) {
  const o = typeof options === 'string' ? options : options.imports;
  const c = mergeConfig(config, {
    trailingComma: o === 'never' ? 'none' : o === 'always' ? 'always' : 'multiLine',
  });
  return { config: c };
}
