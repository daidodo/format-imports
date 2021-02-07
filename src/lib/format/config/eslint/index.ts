import {
  CLIEngine,
  ESLint,
} from 'eslint';

import { logger } from '../../../common';
import { Configuration } from '../../../config';
import { apply } from './helper';
import { translateNewlineAfterImportRule } from './rules/import/newline-after-import';
import { translateNoUselessPathSegmentsRule } from './rules/import/no-useless-path-segments';
import { translateSortImportsRule } from './rules/sort-imports';

export type ESLintConfigProcessed = NonNullable<ReturnType<typeof enhanceWithEslint>['processed']>;

export function enhanceWithEslint(config: Configuration, fileName: string, configPath?: string) {
  const rules = loadESLintConfig(fileName, configPath)?.rules;
  if (!rules) return { config };
  return apply(
    config,
    rules,
    translateSortImportsRule,
    translateNewlineAfterImportRule,
    translateNoUselessPathSegmentsRule,
  );
}

function loadESLintConfig(fileName: string, configFile?: string) {
  const log = logger('format.loadESLintConfig');
  log.debug('Start loading ESLint config for fileName:', fileName);
  log.info('ESLint API version:', ESLint.version);
  try {
    const eslint = new CLIEngine({ configFile });
    if (eslint.isPathIgnored(fileName)) {
      log.debug('Ignored by ESLint for fileName:', fileName);
      return undefined;
    }
    return eslint.getConfigForFile(fileName);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : `${e}`;
    log.warn('Failed loading ESLint config:', msg);
    return undefined;
  }
}
