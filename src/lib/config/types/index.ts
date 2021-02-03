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

export type Configuration = Readonly<
  Partial<{
    // From VS Code "tsImportSorter" settings
    configurationFileName: string;
    autoFormat: 'off' | 'onSave';
    formatExports: boolean;
    exclude: string[];
    excludeGlob: string[];
    sortImportsBy: 'paths' | 'names';
    groupRules: (string | string[] | GroupRule)[];
    sortRules: SortRules;
    maxBindingNamesPerLine: number;
    maxDefaultAndBindingNamesPerLine: number;
    maxExportNamesPerLine: number;
    maxNamesPerWrappedLine: number;
    keepUnused: KeepUnusedRule[];
    emptyLinesBetweenGroups: number;
    emptyLinesAfterAllImports: number;
    removeLastSlashInPath: boolean;
    removeLastIndexInPath: boolean;
    maxLineLength: number;
    tabType: 'space' | 'tab';
    tabSize: number;
    quoteMark: 'single' | 'double';
    trailingComma: 'none' | 'multiLine';
    hasSemicolon: boolean;
    insertFinalNewline: boolean;
    bracketSpacing: boolean;
    // Internal or not configurable
    eol: 'LF' | 'CR' | 'CRLF' | 'LFCR'; // Internal. Not configurable for VSCode.
    force: boolean; // Internal. Ignore exclude paths and file disable-comment.
    development: {
      enableDebug: boolean;
    };
  }>
>;

export const GROUP_RULES_DEFAULT: Configuration['groupRules'] = [
  '^react(-dom)?$',
  '^@angular/',
  '^vue$',
  {},
  '^[@]',
  '^[.]',
];

export const COMPARE_RULE_DEFAULT: CompareRule = ['_', 'aA'];
