import {
  customize,
  mergeOptions,
  Merger,
} from '@dozerg/merge-options';

import {
  type Configuration,
  DEFAULT_MERGER,
} from '../../../../config';
import {
  extractOptions,
  type Rules,
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
  const options = extractOptions(config, rules, DEFAULT_OPTIONS, 'max-len');
  return options === undefined ? { config } : process(config, options);
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
  const c = mergeOptions(merger, config, { maxLineLength, wrappingStyle });
  return { config: c, processed: { tabWidth } };
}
