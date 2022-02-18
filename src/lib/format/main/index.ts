import fs from 'fs';
import tmp from 'tmp';

import { logger } from '../../common';
import { Configuration } from '../../config';
import {
  enhanceConfig,
  FormatOptions,
} from '../config';
import { formatSource } from './format';

/**
 * A type representing file extensions supported.
 */
export type Extension = 'js' | 'ts' | 'jsx' | 'tsx';

/**
 * File extensions supported.
 */
export const SUPPORTED_EXTENSIONS: Extension[] = ['js', 'ts', 'jsx', 'tsx'];

/**
 * Format given source text from a file.
 *
 * This function will try to find _tsconfig.json_ and ESLint config relating to the source file,
 * and merge them to the base config provided.
 *
 * `options` can be used to change _tsconfig.json_ and ESLint config loading behavior for testing
 * purpose.
 *
 * @param text - Source text
 * @param fileName - Source file name
 * @param config - Base config
 * @param options - Internal/testing options
 *
 * @returns Result text or `undefined` if nothing changes.
 */
export function formatSourceFromFile(
  text: string,
  fileName: string,
  config: Configuration,
  options?: FormatOptions,
) {
  const log = logger('format-imports.formatSourceFromFile');
  log.debug('Config:', config);
  log.debug('Options:', options);
  const allConfig = enhanceConfig(config, fileName, options);
  // 25%
  return formatSource(text, fileName, allConfig);
}

/**
 * Format given source text without knowing the source file.
 *
 * This function will try to find _tsconfig.json_ and ESLint config relating to the source file,
 * and merge them to the base config provided.
 *
 * `options` can be used to change _tsconfig.json_ and ESLint config loading behavior for testing
 * purpose.
 *
 * @param text - Source text
 * @param extension - File extension to reveal the source language
 * @param config - Base config
 * @param options - Internal/testing options
 *
 * @returns Result text or `undefined` if nothing changes.
 */
export function formatSourceWithoutFile(
  text: string,
  extension: Extension,
  config: Configuration,
  options?: FormatOptions,
) {
  tmp.setGracefulCleanup();
  const { fd, name } = tmp.fileSync({ prefix: 'format-imports-lib', postfix: `.${extension}` });
  fs.writeSync(fd, text);
  const skipTsConfig = options?.skipTsConfig || !options?.tsConfigPath;
  const skipEslintConfig = options?.skipEslintConfig || !options?.eslintConfigPath;
  const newOpt = options && { ...options, skipTsConfig, skipEslintConfig };
  return formatSourceFromFile(text, name, config, newOpt);
}
