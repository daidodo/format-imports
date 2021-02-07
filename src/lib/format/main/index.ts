import fs from 'fs';
import tmp from 'tmp';

import { Configuration } from '../../config';
import {
  ConfigOptions,
  enhanceConfig,
} from '../config';
import { formatSource } from './format';

type Extension = 'js' | 'ts' | 'jsx' | 'tsx';

export const SUPPORTED_EXTENSIONS: Extension[] = ['js', 'ts', 'jsx', 'tsx'];

export function formatSourceFromFile(
  text: string,
  fileName: string,
  config: Configuration,
  options?: ConfigOptions,
) {
  const allConfig = enhanceConfig(config, fileName, options);
  return formatSource(text, fileName, allConfig);
}

export function formatSourceWithoutFile(
  text: string,
  extension: Extension,
  config: Configuration,
  options?: ConfigOptions,
) {
  tmp.setGracefulCleanup();
  const { fd, name } = tmp.fileSync({ prefix: 'format-imports-lib', postfix: `.${extension}` });
  fs.writeSync(fd, text);
  const skipTsConfig = options?.skipTsConfig || !options?.tsConfigPath;
  const skipEslintConfig = options?.skipEslintConfig || !options?.eslintConfigPath;
  const newOpt = options && { ...options, skipTsConfig, skipEslintConfig };
  return formatSourceFromFile(text, name, config, newOpt);
}
