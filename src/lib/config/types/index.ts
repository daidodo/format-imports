import {
  breakFlag,
  FlagSymbol,
  GroupRule,
} from './grouping';
import {
  CompareRule,
  SortRules,
} from './sorting';
import { KeepUnusedRule } from './unused';
import { WrappingRule } from './wrapping';

export { breakFlag, CompareRule, FlagSymbol, GroupRule, KeepUnusedRule, SortRules, WrappingRule };

export interface Configuration {
  /**
   * Whether to stop looking in parent folders for configuration files. Default to _false_.
   */
  readonly root?: boolean;
  /**
   * JSON configuration file name. Default to _import-sorter.json_.
   */
  readonly configurationFileName?: string;
  /**
   * Whether to format exports as well as imports. Default to _true_.
   */
  readonly formatExports?: boolean;
  /**
   * Disable formatting for files matching regular expressions. Default to _["node_modules"]_.
   */
  readonly exclude?: string[];
  /**
   * Disable formatting for files matching glob patterns. Default to _[]_.
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
   *
   * ```json
   * {
   *   "paths": ["_", "aA"],
   *   "names": ["_", "aA"]
   * }
   * ```
   *
   * If it's _none_, then there is no sorting in all groups, unless they have their own
   * [sort](grouprule.md#sort) defined.
   *
   * @see [Sorting rules](../../../../wiki/Sorting-Rules)
   */
  readonly sortRules?: 'none' | SortRules;
  /**
   * When and how to wrap a line. Default to:
   *
   * ```json
   * {
   *   "maxBindingNamesPerLine": 1,
   *   "maxDefaultAndBindingNamesPerLine": 2,
   *   "maxExportNamesPerLine": 0,
   *   "maxNamesPerWrappedLine": 1,
   *   "ignoreComments": false
   * }
   * ```
   *
   * If it's set to _prettier_, then wrap lines in compatible with [Prettier](https://prettier.io/).
   * @see [Line Wrapping Style](../../../../wiki/Line-Wrapping-Style)
   */
  readonly wrappingStyle?: WrappingRule | 'prettier';
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
   * - `none`: Disallow trailing commas.
   *
   * ```
   *   import { A, B } from 'a';
   *   import {
   *     C,
   *     D
   *   } from 'b';
   * ```
   *
   * - `always`: Require trailing commas.
   *
   * ```
   *   import { A, B, } from 'a';
   *   import {
   *     C,
   *     D,
   *   } from 'b';
   * ```
   *
   * - `multiLine`: Require trailing commas for multiline and disallow trailing commas when in the same line.
   *
   * ```
   *   import { A, B } from 'a';
   *   import {
   *     C,
   *     D,
   *   } from 'b';
   * ```
   */
  readonly trailingComma?: 'none' | 'always' | 'multiLine';
  /**
   * Whether to add semicolons at the end of declarations. Default to _true_.
   */
  readonly hasSemicolon?: boolean;
  /**
   * Whether to end files with a new line, or keep it as is if _preserve_ is set. Default to _true_.
   */
  readonly insertFinalNewline?: boolean | 'preserve';
  /**
   * Whether to add spaces between brackets. _true_ for `{ id }` and _false_ for `{id}`. Default to
   * _true_.
   */
  readonly bracketSpacing?: boolean;
  /**
   * Whether to add or remove node protocol ("node:") to/from builtin module paths. Default to _preserve_.
   * - `always`: Always add `"node:"` to NodeJS builtin modules.
   * - `none`: Always remove `"node:"` for NodeJS builtin modules.
   * - `preserve`: Keep it as is.
   */
  readonly nodeProtocol?: 'always' | 'none' | 'preserve';
  /**
   * Ignore ESLint rules matching regular expressions. Default to _[]_.
   */
  readonly ignoreESLintRules?: string | string[];
  /**
   * Whether to disregard [exclude](#exclude)/[excludeGlob](#excludeGlob) patterns and file-disable
   * comments. Default to _false_.
   */
  readonly force?: boolean;
  /**
   * EOL of the source text. Internal use only.
   *
   * @internal
   */
  readonly eol?: 'LF' | 'CR' | 'CRLF' | 'LFCR'; // Not configurable. Internal use only.
}

/**
 * Default grouping rules.
 */
export const GROUP_RULES_DEFAULT: Configuration['groupRules'] = [
  '^react(-dom)?$',
  '^@angular/',
  '^vue$',
  '^node:',
  {},
  '^[@]',
  '^[.]',
];

/**
 * Default comparison rule for paths and names, which is:
 * - Comparing letters case-insensitively, and
 * - `'_'` is in front of `[a-zA-Z]`.
 */
export const COMPARE_RULE_DEFAULT: CompareRule = ['_', 'aA'];
