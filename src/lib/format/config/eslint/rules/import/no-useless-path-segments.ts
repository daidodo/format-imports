import { logger } from '../../../../../common';
import {
  Configuration,
  mergeConfig,
} from '../../../../../config';
import {
  extractOptions,
  Rules,
} from '../../helper';

const DEFAULT_OPTIONS = { noUselessIndex: false };

type Options = typeof DEFAULT_OPTIONS;

export function translateNoUselessPathSegmentsRule(config: Configuration, rules: Rules) {
  const log = logger('format-imports.translateNoUselessPathSegmentsRule');
  const ruleName = 'import/no-useless-path-segments';
  const { options } = extractOptions(config, rules, ruleName, DEFAULT_OPTIONS);
  if (!options) return { config };
  log.info(`Found ESLint rule ${ruleName}:`, options);
  return process(config, options);
}

function process(config: Configuration, { noUselessIndex }: Options) {
  const c = mergeConfig(config, {
    removeLastSlashInPath: true,
    removeLastIndexInPath: noUselessIndex,
  });
  return { config: c };
}
