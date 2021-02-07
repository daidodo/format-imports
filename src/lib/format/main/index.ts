import fs from 'fs';
import tmp from 'tmp';

import { Configuration } from '../../config';
import {
  enhanceConfig,
  FormatOptions,
} from '../config';
import { formatSource } from './format';

type Extension = 'js' | 'ts' | 'jsx' | 'tsx';

/**
 * File extensions supported.
 */
export const SUPPORTED_EXTENSIONS: Extension[] = ['js', 'ts', 'jsx', 'tsx'];

/**
 * Format given source text from a file.
 *
 * @param text Source text
 * @param fileName Source file name
 * @param config Base config
 * @param options Format options
 * @returns Formatted text or `undefined` if nothing changes
 */
export function formatSourceFromFile(
  text: string,
  fileName: string,
  config: Configuration,
  options?: FormatOptions,
) {
  const allConfig = enhanceConfig(config, fileName, options);
  return formatSource(text, fileName, allConfig);
}

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
