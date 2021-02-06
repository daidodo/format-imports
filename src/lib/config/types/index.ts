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
  // From VS Code "tsImportSorter" settings
  readonly configurationFileName?: string;
  readonly autoFormat?: 'off' | 'onSave';
  readonly formatExports?: boolean;
  readonly exclude?: string[];
  readonly excludeGlob?: string[];
  readonly sortImportsBy?: 'paths' | 'names';
  readonly groupRules?: (string | string[] | GroupRule)[];
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
  // Internal or not configurable
  readonly eol?: 'LF' | 'CR' | 'CRLF' | 'LFCR'; // Internal. Not configurable for VSCode.
  readonly force?: boolean; // Internal. Ignore exclude paths and file disable-comment.
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
