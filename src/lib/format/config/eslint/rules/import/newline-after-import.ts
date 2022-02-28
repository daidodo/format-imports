import {
  type Configuration,
  mergeConfig,
} from '../../../../../config';
import {
  extractOptions,
  type Rules,
} from '../../helper';

const DEFAULT_OPTIONS = { count: 1 };

type Options = typeof DEFAULT_OPTIONS;

export function translateNewlineAfterImportRule(config: Configuration, rules: Rules) {
  const options = extractOptions(config, rules, DEFAULT_OPTIONS, 'import/newline-after-import');
  return options === undefined ? { config } : process(config, options);
}

function process(config: Configuration, { count }: Options) {
  const c = mergeConfig(config, { emptyLinesAfterAllImports: count });
  return { config: c };
}
