import prettier from 'prettier';

import requireModule from '@dozerg/require-module';

import { logger } from '../common';
import { type Configuration } from './types';

// https://prettier.io/docs/en/options.html
export function loadPretConfig(fileName: string): Configuration {
  const log = logger('format-imports.loadPretConfig');
  log.debug('Loading Prettier/EditorConfig config for fileName:', fileName);
  const pt = requireModule('prettier', fileName, prettier);
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
