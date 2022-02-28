import {
  type Configuration,
  mergeConfig,
} from '../../../../config';
import {
  extractOptions,
  type Rules,
} from '../helper';

const DEFAULT_OPTIONS = 4;

type Options = number | 'tab';

export function translateIndentRule(config: Configuration, rules: Rules) {
  const options = extractOptions(
    config,
    rules,
    DEFAULT_OPTIONS,
    'indent',
    '@typescript-eslint/indent',
  );
  if (options === undefined) return { config };
  return process(config, options);
}

function process(config: Configuration, options: Options) {
  const c = mergeConfig(
    config,
    options === 'tab' ? { tabType: 'tab' } : { tabType: 'space', tabSize: options },
  );
  return { config: c };
}
