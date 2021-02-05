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

export function loadImportSorterConfig(config: Configuration, sourceFileName: string) {
  const log = logger('config.loadImportSorterConfig');
  log.debug('Load Prettier/EditorConfig config.');
  const pretConfig = loadPretConfig(sourceFileName);
  const cfgFileName = config.configurationFileName || 'import-sorter.json';
  log.debug('Load import-sorter config from', cfgFileName);
  const fConfig = fileConfig(cfgFileName, sourceFileName);
  log.debug('Load package.json config.');
  const pkgConfig = packageConfig(sourceFileName);
  log.debug('Enhance EOL.');
  const c = enhanceEol(config, () => endOfLineForFile(sourceFileName));
  return mergeConfig(c, pretConfig, fConfig, pkgConfig);
}

export function enhanceEol(config: Configuration, detectEol: () => string) {
  if (config.eol) return config;
  const nl = detectEol();
  const eol: Configuration['eol'] =
    nl === '\r' ? 'CR' : nl === '\r\n' ? 'CRLF' : nl === '\n\r' ? 'LFCR' : 'LF';
  return mergeConfig({ eol }, config);
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

// TODO: Tests
export function loadConfigFromJsonFile(filename: string) {
  if (!filename) return {};
  const config = JSON.parse(fs.readFileSync(filename, 'utf8'));
  assert(isObject(config), `Bad config in "${filename}"`);
  return config as Configuration;
}

function isObject(v: any) {
  return typeof v === 'object' && !Array.isArray(v) && v !== null;
}
