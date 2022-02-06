import { logger } from '../../../../../common';
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

export function translateNewlineAfterImportRule(config: Configuration, rules: Rules, fn: string) {
  const log = logger(`format-imports.${fn}`);
  const ruleName = 'import/newline-after-import';
  const { options } = extractOptions(config, rules, ruleName, DEFAULT_OPTIONS);
  if (!options) return { config };
  log.info(`Found ESLint rule ${ruleName}:`, options);
  return process(config, options);
}

function process(config: Configuration, { count }: Options) {
  const c = mergeConfig(config, { emptyLinesAfterAllImports: count });
  return { config: c };
}
