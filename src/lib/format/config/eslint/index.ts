import {
  ESLint,
  type Linter,
} from 'eslint';
import { type PromiseType } from 'utility-types';

import findUp from '@dozerg/find-up';

import { logger } from '../../../common';
import { type Configuration } from '../../../config';
import { apply } from './helper';
import { translateCommaDangleRule } from './rules/comma-dangle';
import { translateEolLastRule } from './rules/eol-last';
import {
  translateNewlineAfterImportRule,
} from './rules/import/newline-after-import';
import {
  translateNoUselessPathSegmentsRule,
} from './rules/import/no-useless-path-segments';
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
  const ESLint = findESLint(fileName);
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

declare const __webpack_require__: typeof require;
declare const __non_webpack_require__: typeof require;
const req = typeof __webpack_require__ === 'function' ? __non_webpack_require__ : require;

function findESLint(fromPath: string) {
  const log = logger('format-imports.findESLint');
  const userESLint = findUserESLint(fromPath);
  if (userESLint) return userESLint;
  log.warn('Cannot find eslint module from path:', fromPath, ', use pre-packed');
  return ESLint;
}

function findUserESLint(fromPath: string) {
  const log = logger('format-imports.findUserESLint');
  const [eslintPath] = findUp.sync('node_modules/eslint', {
    cwd: fromPath,
    stopAtLimit: 1,
    type: 'directory',
  });
  if (!eslintPath) return undefined;
  log.debug('Found eslint in', eslintPath);
  return req(eslintPath).ESLint;
}
