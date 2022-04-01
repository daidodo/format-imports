import {
  type Configuration,
  mergeConfig,
} from '../../../../config';
import {
  extractOptions,
  type Rules,
} from '../helper';

const DEFAULT_OPTIONS = 'never';

type Options = 'never' | 'always';

export function translateObjectCurlySpacingRule(config: Configuration, rules: Rules) {
  const options = extractOptions(
    config,
    rules,
    DEFAULT_OPTIONS,
    'object-curly-spacing',
    '@typescript-eslint/object-curly-spacing',
  );
  return options === undefined ? { config } : process(config, options);
}

function process(config: Configuration, options: Options) {
  const c = mergeConfig(config, { bracketSpacing: options === 'always' });
  return { config: c };
}
