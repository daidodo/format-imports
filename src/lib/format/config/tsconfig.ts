import ts, { sys } from 'typescript';

import { logger } from '../../common';
import { parentFolder } from '../../config/helper';

export function loadTsConfig(fileName: string, configPath?: string) {
  const log = logger('format-imports.loadTsConfig');
  try {
    log.debug('Finding TS config for fileName:', fileName);
    const configFile = configPath || ts.findConfigFile(fileName, sys.fileExists.bind(sys));
    if (!configFile) return undefined;
    log.debug('Loading TS config from:', configFile);
    const { config } = ts.readConfigFile(configFile, sys.readFile.bind(sys));
    const path = parentFolder(configFile);
    log.debug('Parsing TS config for path:', path);
    const { options } = ts.parseJsonConfigFileContent(config, sys, path);
    return options;
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : `${e}`;
    log.warn('Failed to load TS config for fileName:', fileName, 'with error:', msg);
    return undefined;
  }
}
