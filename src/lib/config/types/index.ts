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
   * Whether to format exports as well. Default to _false_.
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
   * Grouping rules for path patterns for imports. Default to:
   * ```json
   * [
   *   "^react(-dom)?$",
   *   "^@angular/",
   *   "^vue$",
   *   {},
   *   "^[@]",
   *   "^[.]"
   * ]
   * ```
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
  readonly maxBindingNamesPerLine?: number;
  readonly maxDefaultAndBindingNamesPerLine?: number;
  readonly maxExportNamesPerLine?: number;
  readonly maxNamesPerWrappedLine?: number;
  readonly keepUnused?: KeepUnusedRule[];
  readonly emptyLinesBetweenGroups?: number;
  readonly emptyLinesAfterAllImports?: number;
  readonly removeLastSlashInPath?: boolean;
  readonly removeLastIndexInPath?: boolean;
  readonly maxLineLength?: number;
  readonly tabType?: 'space' | 'tab';
  readonly tabSize?: number;
  readonly quoteMark?: 'single' | 'double';
  readonly trailingComma?: 'none' | 'multiLine';
  readonly hasSemicolon?: boolean;
  readonly insertFinalNewline?: boolean;
  readonly bracketSpacing?: boolean;
  readonly force?: boolean;
  readonly eol?: 'LF' | 'CR' | 'CRLF' | 'LFCR'; // Not configurable. Internal use only.

  readonly autoFormat?: 'off' | 'onSave';
  readonly development?: {
    readonly enableDebug?: boolean;
  };
}

export const GROUP_RULES_DEFAULT: Configuration['groupRules'] = [
  '^react(-dom)?$',
  '^@angular/',
  '^vue$',
  {},
  '^[@]',
  '^[.]',
];

export const COMPARE_RULE_DEFAULT: CompareRule = ['_', 'aA'];
