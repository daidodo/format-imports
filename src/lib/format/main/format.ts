import ts, { ScriptTarget } from 'typescript';

import { logger } from '../../common';
import { Configuration } from '../../config';
import {
  ComposeConfig,
  enhanceConfig,
  ESLintConfigProcessed,
} from '../config';
import {
  apply,
  EditManager,
} from '../edit';
import {
  ExportNode,
  getUnusedIds,
  ImportNode,
  NameUsage,
  parseSource,
} from '../parser';
import {
  Sorter,
  sorterFromRules,
  sortExports,
  sortImports,
} from '../sort';
import { RangeAndEmptyLines } from '../types';
import { decideKeep } from './keep';

type AllConfig = ReturnType<typeof enhanceConfig>;

export function formatSource(
  text: string,
  fileName: string,
  { config, tsCompilerOptions, processed, composeConfig }: AllConfig,
) {
  const log = logger('parser.formatSource');
  const sourceFile = ts.createSourceFile(fileName, text, ScriptTarget.Latest);
  const { importNodes, importsInsertPoint: point, exportNodes, allIds, unhandled } = parseSource(
    sourceFile,
    text,
    config,
    tsCompilerOptions,
  );
  const editManager = new EditManager([...importNodes, ...exportNodes]);
  if (editManager.empty()) return undefined;
  log.debug('composeConfig:', composeConfig);
  const unusedIds = () =>
    getUnusedIds(allIds, importNodes, fileName, sourceFile, tsCompilerOptions);
  const sorter = sorterFromRules(config.sortRules);
  const result = formatImports(
    importNodes,
    point,
    unusedIds,
    config,
    composeConfig,
    sorter,
    processed,
  );
  if (result && point)
    editManager.insert({ range: point, text: result, minTrailingNewLines: composeConfig.groupEnd });
  const mustBeModule = unhandled > 0 || !!result; // If there are import/export declarations, it's must be a module.
  const edits = formatExports(exportNodes, composeConfig, sorter, mustBeModule);
  edits.forEach(e => editManager.insert(e));
  return apply(text, sourceFile, editManager.generateEdits(composeConfig));
}

function formatImports(
  importNodes: ImportNode[],
  insertPoint: RangeAndEmptyLines | undefined,
  unusedIds: () => NameUsage,
  config: Configuration,
  composeConfig: ComposeConfig,
  sorter: Sorter,
  eslintProcessed?: ESLintConfigProcessed,
) {
  if (!insertPoint || !importNodes.length) return undefined;
  const groups = sortImports(importNodes, unusedIds(), config, sorter, eslintProcessed);
  const { groupSep } = composeConfig;
  return groups.compose(composeConfig, groupSep);
}

function formatExports(
  exportNodes: ExportNode[],
  composeConfig: ComposeConfig,
  sorter: Sorter,
  mustBeModule: boolean,
) {
  if (!exportNodes.length) return [];
  const sorted = sortExports(exportNodes, sorter.compareNames);
  const filtered = sorted.filter(n => !n.empty());
  const nodes = filtered.length > 0 || mustBeModule ? filtered : decideKeep(sorted);
  return nodes.map(n => ({ range: n.range, text: n.compose(composeConfig) }));
}
