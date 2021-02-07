import {
  FlagSymbol,
  GroupRule,
} from './grouping';
import {
  CompareRule,
  SegSymbol,
  SortRules,
} from './sorting';
import { KeepUnusedRule } from './unused';

export { CompareRule, FlagSymbol, GroupRule, KeepUnusedRule, SegSymbol, SortRules };

export interface Configuration {
  /**
   * JSON configuration file name. Default to _import-sorter.json_.
   */
  readonly configurationFileName?: string;
  /**
   * Whether to format exports as well as imports. Default to _true_.
   */
  readonly formatExports?: boolean;
  /**
   * Disable formatting for files matching regular expressions. Default to _["node_modules"]_
   */
  readonly exclude?: string[];
  /**
   * Disable formatting for files matching glob patterns.
   */
  readonly excludeGlob?: string[];
  /**
   * Sort import declarations by paths or first names. Default to _paths_.
   */
  readonly sortImportsBy?: 'paths' | 'names';
  /**
   * Grouping rules for path patterns for imports. Default to
   * [GROUP_RULES_DEFAULT](../README.md#GROUP_RULES_DEFAULT)
   * @see [Grouping Rules](../../../../wiki/Grouping-Rules)
   */
  readonly groupRules?: (string | string[] | GroupRule)[];
  /**
   * Sorting rules for paths and names. Default to:
   * ```json
   * {
   *   "paths": ["_", "aA"],
   *   "names": ["_", "aA"]
   * }
   * ```
   * @see [Sorting rules](../../../../wiki/Sorting-Rules)
   */
  readonly sortRules?: SortRules;
  /**
   * Max binding names per line before wrapping for imports. 0 for no limit. Default to _1_.
   */
  readonly maxBindingNamesPerLine?: number;
  /**
   * Max default and binding names per line before wrapping for imports. 0 for no limit. Default
   * to _2_.
   */
  readonly maxDefaultAndBindingNamesPerLine?: number;
  /**
   * Max binding names per line before wrapping for exports. 0 for no limit. Default to _0_.
   */
  readonly maxExportNamesPerLine?: number;
  /**
   * Max names on wrapped lines for imports/exports. 0 for no limit. Default to _1_.
   */
  readonly maxNamesPerWrappedLine?: number;
  /**
   * By default all unused imports are removed. Keep some or all of them around with this setting
   * if you need.
   */
  readonly keepUnused?: KeepUnusedRule[];
  /**
   * Number of empty lines between groups (NOT sub-groups). Default to _1_.
   */
  readonly emptyLinesBetweenGroups?: number;
  /**
   * Number of empty lines after the last import declaration. Default to _1_.
   */
  readonly emptyLinesAfterAllImports?: number;
  /**
   * Whether to remove the last slash when normalizing paths. Default to _false_.
   */
  readonly removeLastSlashInPath?: boolean;
  /**
   * Whether to remove the last 'index' when normalizing paths. Default to _false_.
   */
  readonly removeLastIndexInPath?: boolean;
  /**
   * Max line length before wrapping. 0 for no limit. Default to _80_.
   */
  readonly maxLineLength?: number;
  /**
   * Indent lines with tabs or spaces. Default to _space_.
   */
  readonly tabType?: 'space' | 'tab';
  /**
   * Number of spaces to replace a TAB. Default to _2_.
   */
  readonly tabSize?: number;
  /**
   * Use single or double quotes. Default to _single_.
   */
  readonly quoteMark?: 'single' | 'double';
  /**
   * When to add a trailing comma for the last name. Default to _multiLine_.
   */
  readonly trailingComma?: 'none' | 'multiLine';
  /**
   * Whether to add semicolons at the end of declarations. Default to _true_.
   */
  readonly hasSemicolon?: boolean;
  /**
   * Whether to end files with a new line. Default to _true_.
   */
  readonly insertFinalNewline?: boolean;
  /**
   * Whether to add spaces between brackets. _true_ for '{ id }' and _false_ for '{id}'. Default to
   * _true_.
   */
  readonly bracketSpacing?: boolean;
  /**
   * Whether to disregard [exclude](#exclude)/[excludeGlob](#excludeGlob) patterns and file-disable
   * comments. Default to _false_.
   */
  readonly force?: boolean;
  /**
   * EOL of the source text. Internal use only.
   * @private
   */
  readonly eol?: 'LF' | 'CR' | 'CRLF' | 'LFCR'; // Not configurable. Internal use only.
  /**
   * @private
   */
  readonly autoFormat?: 'off' | 'onSave';
  /**
   * @private
   */
  readonly development?: {
    readonly enableDebug?: boolean;
  };
}

/**
 * Default grouping rules.
 */
export const GROUP_RULES_DEFAULT: Configuration['groupRules'] = [
  '^react(-dom)?$',
  '^@angular/',
  '^vue$',
  {},
  '^[@]',
  '^[.]',
];

/**
 * Default comparison rule for paths and names, which is:
 * * Comparing letters case-insensitively, and
 * * `'_'` is in front of `[a-zA-Z]`.
 */
export const COMPARE_RULE_DEFAULT: CompareRule = ['_', 'aA'];
