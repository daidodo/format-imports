import fs from 'fs';

import { endOfLineForFile } from '@dozerg/end-of-line';

import {
  assert,
  logger,
} from '../common';
import {
  findFileFromPathAndParents,
  mergeConfig,
} from './helper';
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
 * @typeparam T A type extended from Configuration
 *
 * @param fileName Source file name
 * @param config Base config
 */
export function loadImportSorterConfig<T extends Configuration = Configuration>(
  fileName: string,
  config?: T,
) {
  const log = logger('config.loadImportSorterConfig');
  const cfg = config ?? ({} as T);
  log.debug('Load Prettier/EditorConfig config.');
  const pretConfig = loadPretConfig(fileName) as T;
  const cfgFileName = cfg.configurationFileName || 'import-sorter.json';
  log.debug('Load import-sorter config from', cfgFileName);
  const fConfig = fileConfig(cfgFileName, fileName) as T;
  log.debug('Load package.json config.');
  const pkgConfig = packageConfig(fileName) as T;
  log.debug('Enhance EOL.');
  const c = enhanceEol(cfg, () => endOfLineForFile(fileName));
  return mergeConfig(c, pretConfig, fConfig, pkgConfig);
}

export function enhanceEol<T extends Configuration>(config: T, detectEol: () => string) {
  if (config.eol) return config;
  const nl = detectEol();
  const eol: Configuration['eol'] =
    nl === '\r' ? 'CR' : nl === '\r\n' ? 'CRLF' : nl === '\n\r' ? 'LFCR' : 'LF';
  return mergeConfig({ eol } as T, config);
}

function packageConfig(fileName: string) {
  const [packageFile] = findFileFromPathAndParents('package.json', fileName);
  if (!packageFile) return {};
  const { importSorter: config } = JSON.parse(fs.readFileSync(packageFile, 'utf8'));
  if (!config) return {};
  assert(isObject(config), `Bad "importSorter" config in "${packageFile}"`);
  return config as Configuration;
}

// Exported for testing purpose.
export function fileConfig(filename: string, path?: string) {
  const [configFile] = findFileFromPathAndParents(filename, path);
  return loadConfigFromJsonFile(configFile);
}

/**
 * Load config from given file, e.g. _path/to/import-sorter.json_.
 *
 * Will throw an error if file is unreadable or content is not a valid JSON object.
 */
export function loadConfigFromJsonFile(fileName: string): Configuration {
  if (!fileName) return {};
  const config = JSON.parse(fs.readFileSync(fileName, 'utf8'));
  assert(isObject(config), `Bad config in "${fileName}"`);
  return config;
}

function isObject(v: any) {
  return typeof v === 'object' && !Array.isArray(v) && v !== null;
}
