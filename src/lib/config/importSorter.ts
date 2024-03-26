import fs from 'node:fs';

import { assertIsObject } from '@dozerg/condition';
import { endOfLineForFile } from '@dozerg/end-of-line';
import findUp from '@dozerg/find-up';

import { logger } from '../common';
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
export async function loadImportSorterConfig<T extends Configuration = Configuration>(
  fileName: string,
  config?: T,
) {
  const cfg = config ?? ({} as T);
  const pretConfig = await loadPretConfig(fileName) as T;
  const pkgConfig = packageConfig(fileName) as T;
  const c = enhanceEol(cfg, () => endOfLineForFile(fileName));
  return loadConfigRecursive(fileName, c, pretConfig, pkgConfig);
}

function loadConfigRecursive<T extends Configuration = Configuration>(fileName: string, config: T, pretConfig: T, pkgConfig: T) {
  const normalized = fileName.replace(/\\/g, '/');
  const cfgFileName = config.configurationFileName || 'import-sorter.json';
  const fConfig = fileConfig(cfgFileName, fileName) as T;
  let c = mergeConfig(config, pretConfig, fConfig, pkgConfig);
  const seenNames: string[] = [cfgFileName];
  let found = true;
  while(c.overrides && c.overrides.length && found) {
    found = false;
    for(const {pattern: p, config: newCfgName} of c.overrides.reverse()) {
      if(!p || !newCfgName) continue;
      const r = new RegExp(p);
      if (r.test(fileName) || r.test(normalized)) {
        if(seenNames.includes(newCfgName)) break;
        const fConfig = fileConfig(newCfgName, fileName);
        Object.assign(c, { overrides: undefined });
        c = mergeConfig(c, fConfig, pkgConfig) as T;
        seenNames.push(newCfgName)
        found = true;
        break;
      }
    }
  }
  return c;
}

function fileConfig(fileName: string, path?: string) {
  const log = logger('format-imports.fileConfig');
  log.debug('Loading JSON config from', fileName);
  const files = findUp.sync(fileName, { type: 'file', cwd: path });
  return readConfigTilRoot(files, file => {
    const config = loadConfigFromJsonFile(file);
    log.debug('Found JSON file', file, 'and config:', config);
    return config;
  });
}

function packageConfig(fileName: string) {
  const log = logger('format-imports.packageConfig');
  log.debug('Loading package.json config for fileName:', fileName);
  const files = findUp.sync('package.json', { cwd: fileName });
  return readConfigTilRoot(files, file => {
    log.debug('Found package.json in', file);
    const { importSorter: config } = jsonParseNoThrow(fs.readFileSync(file, 'utf8'));
    log.debug('Found package.json', file, 'and config:', config);
    if (!config) return {};
    assertIsObject(config, `Bad "importSorter" config in "${file}"`);
    return config as Configuration;
  });
}

function jsonParseNoThrow(content: string) {
  try {
    return JSON.parse(content);
  } catch (e) {
    const log = logger('format-imports.jsonParseNoThrow');
    const msg = e instanceof Error ? e.message : `${e}`;
    log.warn('Failed to parse JSON content and found error:', msg);
    return {};
  }
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
  assertIsObject(config, `Bad config in "${fileName}"`);
  return config;
}
