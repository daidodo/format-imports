import { logger } from '../../../../common';
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

const DEFAULT_OPTIONS = {
  ignoreCase: false,
  ignoreDeclarationSort: false,
  ignoreMemberSort: false,
  memberSyntaxSortOrder: ['none' as const, 'all' as const, 'multiple' as const, 'single' as const],
  allowSeparatedGroups: false,
};

type Options = typeof DEFAULT_OPTIONS;

export function translateSortImportsRule(config: Configuration, rules: Rules) {
  const log = logger('format-imports.translateSortImportsRule');
  const ruleName = 'sort-imports';
  const { options } = extractOptions(config, rules, ruleName, DEFAULT_OPTIONS);
  if (!options) return { config };
  log.info(`Found ESLint rule ${ruleName}:`, options);
  return process(config, options);
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
