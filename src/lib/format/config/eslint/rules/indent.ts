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

export function translateIndentRule(config: Configuration, rules: Rules, fn: string) {
  const log = logger(`format-imports.${fn}`);
  const ruleName1 = 'indent';
  const ruleName2 = '@typescript-eslint/indent';
  const { options: opt1, ignored: ign1 } = extractOptions(
    config,
    rules,
    ruleName1,
    DEFAULT_OPTIONS,
  );
  const { options: opt2, ignored: ign2 } = extractOptions(
    config,
    rules,
    ruleName2,
    DEFAULT_OPTIONS,
  );
  const options = opt2 ?? opt1;
  if (options === undefined) return { config };
  log.info(ign1 ? 'Ignore' : 'Found', `ESLint rule ${ruleName1}:`, opt1);
  log.info(ign2 ? 'Ignore' : 'Found', `ESLint rule ${ruleName2}:`, opt2);
  return process(config, options);
}

function process(config: Configuration, options: Options) {
  const c = mergeConfig(
    config,
    options === 'tab' ? { tabType: 'tab' } : { tabType: 'space', tabSize: options },
  );
  return { config: c };
}
