import { logger } from '../../../../common';
import {
  Configuration,
  mergeConfig,
} from '../../../../config';
import {
  extractOptions,
  Rules,
} from '../helper';

type Options = string | { imports?: string };

const DEFAULT_OPTIONS: Options = 'never';

export function translateCommaDangleRule(config: Configuration, rules: Rules, fn: string) {
  const log = logger(`format-imports.${fn}`);
  const ruleName = 'comma-dangle';
  const { options } = extractOptions(config, rules, ruleName, DEFAULT_OPTIONS);
  if (!options) return { config };
  log.info(`Found ESLint rule ${ruleName}:`, options);
  return process(config, options);
}

function process(config: Configuration, options: Options) {
  const o = typeof options === 'string' ? options : options.imports;
  const c = mergeConfig(config, {
    trailingComma: o === 'never' ? 'none' : o === 'always' ? 'always' : 'multiLine',
  });
  return { config: c };
}
