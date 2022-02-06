import {
  CompareRule,
  Configuration,
  FlagSymbol,
  mergeConfig,
} from '../../../../config';
import {
  extractOptions,
  Rules,
} from '../helper';

type Syntax = 'none' | 'all' | 'multiple' | 'single';

const DEFAULT_OPTIONS = {
  ignoreCase: false,
  ignoreDeclarationSort: false,
  ignoreMemberSort: false,
  memberSyntaxSortOrder: Array<Syntax>('none', 'all', 'multiple', 'single'),
  allowSeparatedGroups: false,
};

type Options = typeof DEFAULT_OPTIONS;

export function translateSortImportsRule(config: Configuration, rules: Rules) {
  const options = extractOptions(config, rules, DEFAULT_OPTIONS, 'sort-imports');
  return options === undefined ? { config } : process(config, options);
}

function process(config: Configuration, options: Options) {
  const sortImportsBy = calcSortImportsBy(options);
  const sortRules = calcSortRules(options);
  const aliasFirst = !!sortRules;
  const ignoreSorting = !!sortImportsBy || !!sortRules;
  const { groupRules, groupOrder } = calcGroupRules(options);
  const c = mergeConfig(config, { sortImportsBy, sortRules, groupRules });
  return { config: c, processed: { groupOrder, ignoreSorting, aliasFirst } };
}

function calcSortImportsBy({ ignoreDeclarationSort }: Options) {
  return ignoreDeclarationSort ? undefined : ('names' as const);
}

function calcSortRules({ ignoreCase, ignoreDeclarationSort, ignoreMemberSort }: Options) {
  if (ignoreDeclarationSort && ignoreMemberSort) return undefined;
  const names: CompareRule = ignoreCase ? ['_', 'aA'] : ['AZ', '_'];
  return { names };
}

function calcGroupRules({
  memberSyntaxSortOrder,
  allowSeparatedGroups,
  ignoreDeclarationSort,
}: Options) {
  if (ignoreDeclarationSort) return {};
  const groupOrder: FlagSymbol[] = memberSyntaxSortOrder.map(v => {
    switch (v) {
      case 'none':
        return 'scripts';
      case 'all':
        return 'namespace';
      case 'multiple':
        return 'multiple';
      case 'single':
        return 'single';
    }
  });
  return allowSeparatedGroups
    ? { groupOrder }
    : { groupRules: groupOrder.map(g => ({ flags: g })) };
}
