import fs from 'fs';

import { endOfLineForFile } from '@dozerg/end-of-line';

import {
  assert,
  logger,
} from '../common';
import { findFileFromPathAndParents } from './helper';
import { mergeConfig } from './merge';
import { loadPretConfig } from './prettier';
import { Configuration } from './types';

/**
 * Resolve config for a source file.
 *
 * The following sources will be considered if found (in precedence from high to low):
 * - [ESLint configuration](https://eslint.org/docs/user-guide/configuring)
 * - `"importSorter"` section in `package.json`
 * - `import-sorter.json` (File name is configurable from the base config)
 * - [Prettier configuration](https://github.com/prettier/prettier-vscode#configuration)
 * - `.editorconfig`
 * - The base config provided as parameter
 *
 * @typeparam T - A type extended from Configuration
 *
 * @param fileName - Source file name
 * @param config - Base config
 */
export function loadImportSorterConfig<T extends Configuration = Configuration>(
  fileName: string,
  config?: T,
) {
  const cfg = config ?? ({} as T);
  const pretConfig = loadPretConfig(fileName) as T;
  const cfgFileName = cfg.configurationFileName || 'import-sorter.json';
  const fConfig = fileConfig(cfgFileName, fileName) as T;
  const pkgConfig = packageConfig(fileName) as T;
  const c = enhanceEol(cfg, () => endOfLineForFile(fileName));
  return mergeConfig(c, pretConfig, fConfig, pkgConfig);
}

function fileConfig(fileName: string, path?: string) {
  const log = logger('format-imports.fileConfig');
  log.debug('Loading JSON config from', fileName);
  const files = findFileFromPathAndParents(fileName, path);
  return readConfigTilRoot(files, file => {
    const config = loadConfigFromJsonFile(file);
    log.debug('Found JSON file', file, 'and config:', config);
    return config;
  });
}

function packageConfig(fileName: string) {
  const log = logger('format-imports.packageConfig');
  log.debug('Loading package.json config for fileName:', fileName);
  const files = findFileFromPathAndParents('package.json', fileName);
  return readConfigTilRoot(files, file => {
    log.debug('Found package.json in', file);
    const { importSorter: config } = JSON.parse(fs.readFileSync(file, 'utf8'));
    log.debug('Found package.json', file, 'and config:', config);
    if (!config) return {};
    assert(isObject(config), `Bad "importSorter" config in "${file}"`);
    return config as Configuration;
  });
}

function readConfigTilRoot(fileNames: string[], readConfig: (fileName: string) => Configuration) {
  let config: Configuration = {};
  for (const file of fileNames) {
    const c = readConfig(file);
    config = mergeConfig(c, config);
    if (config.root) break;
  }
  return config;
}

export function enhanceEol<T extends Configuration>(config: T, detectEol: () => string) {
  const log = logger('format-imports.enhanceEol');
  log.debug('Determining EOL');
  if (config.eol) return config;
  const nl = detectEol();
  const eol: Configuration['eol'] =
    nl === '\r' ? 'CR' : nl === '\r\n' ? 'CRLF' : nl === '\n\r' ? 'LFCR' : 'LF';
  return mergeConfig({ eol } as T, config);
}

/**
 * Load config from given file, e.g. _path/to/import-sorter.json_.
 *
 * Will throw an error if file is unreadable or content is not a valid JSON object.
 */
export function loadConfigFromJsonFile(fileName: string): Configuration {
  if (!fileName) return {};
  const config: Configuration = JSON.parse(fs.readFileSync(fileName, 'utf8'));
  assert(isObject(config), `Bad config in "${fileName}"`);
  return config;
}

function isObject(v: any) {
  return typeof v === 'object' && !Array.isArray(v) && v !== null;
}
