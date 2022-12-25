import fs from 'node:fs';
import { parse as parseVue } from '@vue/compiler-sfc';
import tmp from 'tmp';

import { logger } from '../../common';
import { type Configuration } from '../../config';
import {
  enhanceConfig,
  type FormatOptions,
} from '../config';
import { formatSource } from './format';

/**
 * A type representing file extensions supported.
 */
export type Extension = 'js' | 'ts' | 'jsx' | 'tsx' | 'vue';

/**
 * File extensions supported.
 */
export const SUPPORTED_EXTENSIONS: Extension[] = ['js', 'ts', 'jsx', 'tsx', 'vue'];

/**
 * Format given source text from a file, asynchronously.
 *
 * This function will try to find _tsconfig.json_ and ESLint config relating to the source file,
 * and merge them to the base config provided.
 *
 * `options` can be used to change _tsconfig.json_ and ESLint config loading behavior for testing
 * purpose.
 *
 * @see {@link formatSourceFromFile.sync}
 *
 * @param text - Source text
 * @param fileName - Source file name
 * @param config - Base config
 * @param options - Internal/testing options
 *
 * @returns Promise of the result text or `undefined` if nothing changes.
 */
export async function formatSourceFromFile(
  text: string,
  fileName: string,
  config: Configuration,
  options?: FormatOptions,
) {
  const log = logger('format-imports.formatSourceFromFile');
  log.debug('Config:', config);
  log.debug('Options:', options);
  const allConfig = await enhanceConfig(config, fileName, options);

  if (fileName.endsWith('.vue')) {
    const { descriptor } = parseVue(text);
    const vueScript = descriptor.scriptSetup ?? descriptor.script;
    if (vueScript == null) {
      return text;
    }
    const sortedScript = await formatSource(vueScript.content, fileName, allConfig);
    if (sortedScript) {
      return (
        text.slice(0, vueScript.loc.start.offset) +
        sortedScript +
        text.slice(vueScript.loc.end.offset)
      );
    } else {
      return text;
    }
  }

  return formatSource(text, fileName, allConfig);
}

/**
 * Format given source text from a file, synchronoussly.
 *
 * This function will try to find _tsconfig.json_ relating to the source file,
 * and merge them to the base config provided.
 *
 * ESLint config will NOT be read because it's supported only by {@link formatSourceFromFile}.
 *
 * `options` can be used to change _tsconfig.json_ loading behavior for testing
 * purpose.
 *
 * @see {@link formatSourceFromFile}
 *
 * @param text - Source text
 * @param fileName - Source file name
 * @param config - Base config
 * @param options - Internal/testing options
 *
 * @returns The result text or `undefined` if nothing changes.
 */
formatSourceFromFile.sync = (
  text: string,
  fileName: string,
  config: Configuration,
  options?: FormatOptions,
) => {
  const log = logger('format-imports.formatSourceFromFile.sync');
  log.debug('Config:', config);
  log.debug('Options:', options);
  const allConfig = enhanceConfig.sync(config, fileName, options);
  return formatSource(text, fileName, allConfig);
};

/**
 * Format given source text without knowing the source file, asynchronously.
 *
 * This function will try to find _tsconfig.json_ and ESLint config relating to the source file,
 * and merge them to the base config provided.
 *
 * `options` can be used to change _tsconfig.json_ and ESLint config loading behavior for testing
 * purpose.
 *
 * @see {@link formatSourceWithoutFile.sync}
 *
 * @param text - Source text
 * @param extension - File extension to reveal the source language
 * @param config - Base config
 * @param options - Internal/testing options
 *
 * @returns Promise of the result text or `undefined` if nothing changes.
 */
export async function formatSourceWithoutFile(
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

/**
 * Format given source text without knowing the source file, synchronously.
 *
 * This function will try to find _tsconfig.json_ relating to the source file,
 * and merge them to the base config provided.
 *
 * ESLint config will NOT be read because it's supported only by {@link formatSourceWithoutFile}.
 *
 * `options` can be used to change _tsconfig.json_ loading behavior for testing
 * purpose.
 *
 * @see {@link formatSourceWithoutFile}
 *
 * @param text - Source text
 * @param extension - File extension to reveal the source language
 * @param config - Base config
 * @param options - Internal/testing options
 *
 * @returns The result text or `undefined` if nothing changes.
 */
formatSourceWithoutFile.sync = (
  text: string,
  extension: Extension,
  config: Configuration,
  options?: FormatOptions,
) => {
  tmp.setGracefulCleanup();
  const { fd, name } = tmp.fileSync({ prefix: 'format-imports-lib', postfix: `.${extension}` });
  fs.writeSync(fd, text);
  const skipTsConfig = options?.skipTsConfig || !options?.tsConfigPath;
  const newOpt = options && { ...options, skipTsConfig };
  return formatSourceFromFile.sync(text, name, config, newOpt);
};
