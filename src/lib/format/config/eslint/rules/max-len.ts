import { logger } from '../../../../common';
import {
  Configuration,
  customize,
  DEFAULT_MERGER,
  mergeConfigWithMerger,
  Merger,
} from '../../../../config';
import {
  extractOptions,
  Rules,
} from '../helper';

const DEFAULT_OPTIONS = {
  code: 80,
  tabWidth: 4,
  ignoreTrailingComments: false,
  ignoreComments: false,
};

type Options = typeof DEFAULT_OPTIONS;

/**
 * @see https://github.com/daidodo/format-imports-vscode/issues/44#issuecomment-812725174
 */
export function translateMaxLenRule(config: Configuration, rules: Rules) {
  const log = logger('format-imports.translateMaxLenRule');
  const ruleName = 'max-len';
  const { options } = extractOptions(config, rules, ruleName, DEFAULT_OPTIONS);
  if (!options) return { config };
  log.info(`Found ESLint rule ${ruleName}:`, options);
  return process(config, options);
}

function process(
  config: Configuration,
  { code: maxLineLength, tabWidth, ignoreComments, ignoreTrailingComments }: Options,
) {
  const wrappingStyle = {
    ignoreComments: ignoreComments || ignoreTrailingComments,
  };
  const merger: Merger<Configuration> = {
    ...DEFAULT_MERGER,
    wrappingStyle: customize((a, b) =>
      a === 'prettier' || b === 'prettier' ? 'prettier' : { ...a, ...b },
    ),
  };
  const c = mergeConfigWithMerger(merger, config, { maxLineLength, wrappingStyle });
  return { config: c, processed: { tabWidth } };
}
