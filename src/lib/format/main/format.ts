import ts, { ScriptTarget } from 'typescript';

import { logger } from '../../common';
import { type Configuration } from '../../config';
import type {
  ComposeConfig,
  EnhancedConfig,
  ESLintConfigProcessed,
} from '../config';
import {
  apply,
  EditManager,
} from '../edit';
import {
  type ExportNode,
  getUnusedIds,
  type ImportNode,
  type NameUsage,
  parseSource,
} from '../parser';
import {
  type Sorter,
  sorterFromRules,
  sortExports,
  sortImports,
} from '../sort';
import type { RangeAndEmptyLines } from '../types';
import { decideKeep } from './keep';

export function formatSource(
  text: string,
  fileName: string,
  { config, tsCompilerOptions, processed, composeConfig }: EnhancedConfig,
) {
  const log = logger('format-imports.formatSource');
  log.info('Formatting', fileName, 'with enhanced config:', config);
  log.debug('tsCompilerOptions:', tsCompilerOptions);
  log.debug('ESLint config processed:', processed);
  log.debug('composeConfig:', composeConfig);
  const sourceFile = ts.createSourceFile(fileName, text, ScriptTarget.Latest);
  // 34%
  const {
    importNodes,
    importsInsertPoint: point,
    exportNodes,
    allIds,
    unhandled,
  } = parseSource(sourceFile, text, config, tsCompilerOptions);
  // 39%
  const editManager = new EditManager([...importNodes, ...exportNodes]);
  if (editManager.empty()) return undefined;
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
  // 88%
  if (result && point)
    editManager.insert({ range: point, text: result, minTrailingNewLines: composeConfig.groupEnd });
  const isModule = unhandled > 0 || !!result; // If there are import/export declarations, it is a module.
  const edits = formatExports(exportNodes, composeConfig, sorter, isModule);
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
  isModule: boolean,
) {
  if (!exportNodes.length) return [];
  const sorted = sortExports(exportNodes, sorter.compareNames);
  const filtered = sorted.filter(n => !n.empty());
  const nodes = filtered.length > 0 || isModule ? filtered : decideKeep(sorted);
  return nodes.map(n => ({ range: n.range, text: n.compose(composeConfig) }));
}
