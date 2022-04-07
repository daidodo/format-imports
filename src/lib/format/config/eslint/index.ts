import eslint, { type Linter } from 'eslint';
import { type PromiseType } from 'utility-types';

import {
  logger,
  requireModule,
} from '../../../common';
import { type Configuration } from '../../../config';
import { apply } from './helper';
import { translateCommaDangleRule } from './rules/comma-dangle';
import { translateEolLastRule } from './rules/eol-last';
import { translateNewlineAfterImportRule } from './rules/import/newline-after-import';
import { translateNoUselessPathSegmentsRule } from './rules/import/no-useless-path-segments';
import { translateIndentRule } from './rules/indent';
import { translateMaxLenRule } from './rules/max-len';
import { translateObjectCurlySpacingRule } from './rules/object-curly-spacing';
import { translateSemiRule } from './rules/semi';
import { translateSortImportsRule } from './rules/sort-imports';

export type ESLintConfigProcessed = NonNullable<
  PromiseType<ReturnType<typeof enhanceWithEslint>>['processed']
>;

export async function enhanceWithEslint(
  config: Configuration,
  fileName: string,
  configPath?: string,
) {
  const rules = (await loadESLintConfig(fileName, configPath))?.rules;
  if (!rules) return { config };
  return apply(
    config,
    rules,
    translateSortImportsRule,
    translateNewlineAfterImportRule,
    translateNoUselessPathSegmentsRule,
    translateMaxLenRule,
    translateIndentRule,
    translateEolLastRule,
    translateSemiRule,
    translateCommaDangleRule,
    translateObjectCurlySpacingRule,
  );
}

async function loadESLintConfig(fileName: string, configFile?: string) {
  const log = logger('format-imports.loadESLintConfig');
  log.debug('Loading ESLint config for fileName:', fileName, 'from', configFile ?? 'default');
  const { ESLint } = requireModule('eslint', fileName, eslint);
  log.debug('ESLint API version:', ESLint.version);
  try {
    const eslint = new ESLint({ overrideConfigFile: configFile });
    if (await eslint.isPathIgnored(fileName)) {
      log.debug('Ignored by ESLint for fileName:', fileName);
      return undefined;
    }
    return (await eslint.calculateConfigForFile(fileName)) as Linter.Config;
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : `${e}`;
    log.warn('Failed to load ESLint config for fileName:', fileName, 'with error:', msg);
    return undefined;
  }
}
