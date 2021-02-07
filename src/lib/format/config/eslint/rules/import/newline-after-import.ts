import {
  Configuration,
  mergeConfig,
} from '../../../../../config';
import {
  extractOptions,
  Rules,
} from '../../helper';

const DEFAULT_OPTIONS = { count: 1 };

type Options = typeof DEFAULT_OPTIONS;

export function translateNewlineAfterImportRule(config: Configuration, rules: Rules) {
  const options = extractOptions(rules, 'import/newline-after-import', DEFAULT_OPTIONS);
  if (!options) return { config };
  return process(config, options);
}

function process(config: Configuration, { count }: Options) {
  const c = mergeConfig(config, { emptyLinesAfterAllImports: count });
  return { config: c };
}
