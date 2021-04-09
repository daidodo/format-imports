import { logger } from '../../../../common';
import {
  Configuration,
  mergeConfig,
} from '../../../../config';
import {
  extractOptions,
  Rules,
} from '../helper';

const DEFAULT_OPTIONS = 4;

type Options = number | 'tab';

export function translateIndentRule(config: Configuration, rules: Rules) {
  const log = logger('format-imports.translateMaxLenRule');
  const opt1 = extractOptions(rules, 'indent', DEFAULT_OPTIONS);
  const opt2 = extractOptions(rules, '@typescript-eslint/indent', DEFAULT_OPTIONS);
  const options = opt2 ?? opt1;
  if (options === undefined) return { config };
  log.info('Found ESLint rule indent:', opt1);
  log.info('Found ESLint rule @typescript-eslint/indent:', opt2);
  return process(config, options);
}

function process(config: Configuration, options: Options) {
  const c = mergeConfig(
    config,
    options === 'tab' ? { tabType: 'tab' } : { tabType: 'space', tabSize: options },
  );
  return { config: c };
}
