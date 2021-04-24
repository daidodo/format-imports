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
  const { options: opt1, ignored: ign1 } = extractOptions(config, rules, 'indent', DEFAULT_OPTIONS);
  const { options: opt2, ignored: ign2 } = extractOptions(
    config,
    rules,
    '@typescript-eslint/indent',
    DEFAULT_OPTIONS,
  );
  const options = opt2 ?? opt1;
  if (options === undefined) return { config };
  log.info(ign1 ? 'Ignore' : 'Found', 'ESLint rule indent:', opt1);
  log.info(ign2 ? 'Ignore' : 'Found', 'ESLint rule @typescript-eslint/indent:', opt2);
  return process(config, options);
}

function process(config: Configuration, options: Options) {
  const c = mergeConfig(
    config,
    options === 'tab' ? { tabType: 'tab' } : { tabType: 'space', tabSize: options },
  );
  return { config: c };
}
