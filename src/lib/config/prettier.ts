import prettier from 'prettier';

import findUp from '@dozerg/find-up';

import { logger } from '../common';
import { type Configuration } from './types';

// https://prettier.io/docs/en/options.html
export function loadPretConfig(fileName: string): Configuration {
  const log = logger('format-imports.loadPretConfig');
  log.debug('Loading Prettier/EditorConfig config for fileName:', fileName);
  const pt = findPrettier(fileName);
  log.debug('Prettier API version:', pt.version);
  try {
    const config = pt.resolveConfig.sync(fileName, { useCache: false, editorconfig: true });
    log.debug('Prettier config:', config);
    if (!config) return {};
    const {
      printWidth,
      useTabs,
      tabWidth,
      semi,
      singleQuote,
      trailingComma,
      bracketSpacing,
      // endOfLine,
    } = config;
    return {
      maxLineLength: printWidth ?? 80,
      tabType: useTabs ? 'tab' : 'space',
      tabSize: tabWidth ?? 2,
      hasSemicolon: semi ?? true,
      quoteMark: singleQuote ? 'single' : 'double',
      trailingComma: trailingComma === 'none' ? 'none' : 'multiLine',
      bracketSpacing: bracketSpacing ?? true,
      // eol: endOfLine === 'lf' ? 'LF' : endOfLine === 'crlf' ? 'CRLF' : undefined,
      insertFinalNewline: true, // Prettier always enables it.
    };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : `${e}`;
    log.warn(
      'Failed to load Prettier/EditorConfig config for filename:',
      fileName,
      'with error:',
      msg,
    );
    return {};
  }
}

function findPrettier(fromPath: string) {
  const log = logger('format-imports.findPrettier');
  const userPrettier = findUserPrettier(fromPath);
  if (userPrettier) return userPrettier;
  log.warn('Cannot find prettier module from path:', fromPath, 'so use pre-packed');
  return prettier;
}

declare const __webpack_require__: typeof require;
declare const __non_webpack_require__: typeof require;
const req = typeof __webpack_require__ === 'function' ? __non_webpack_require__ : require;

function findUserPrettier(fromPath: string) {
  const log = logger('format-imports.findUserPrettier');
  const [prettierPath] = findUp.sync('node_modules/prettier', {
    cwd: fromPath,
    stopAtLimit: 1,
    type: 'directory',
  });
  if (!prettierPath) return undefined;
  log.debug('Found prettier in', prettierPath);
  return req(prettierPath);
}
