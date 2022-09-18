import path from 'node:path';

import NodeCache from 'node-cache';
import ts, { sys } from 'typescript';

import { isObject } from '@dozerg/condition';

import { logger } from '../../common';

const CACHE = new NodeCache({ stdTTL: 5 });

export function loadTsConfig(fileName: string, configPath?: string) {
  const log = logger('format-imports.loadTsConfig');
  try {
    log.debug('Finding TS config for fileName:', fileName);
    const configFile = configPath || ts.findConfigFile(fileName, sys.fileExists.bind(sys));
    if (!configFile) return undefined;
    const opt = CACHE.get(configFile);
    if (isObject(opt)) return opt as ts.CompilerOptions;
    log.debug('Loading TS config from:', configFile);
    const { config } = ts.readConfigFile(configFile, sys.readFile.bind(sys));
    const { options } = ts.parseJsonConfigFileContent(config, sys, path.dirname(configFile));
    CACHE.set(configFile, options);
    return options;
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : `${e}`;
    log.warn('Failed to load TS config for fileName:', fileName, 'with error:', msg);
    return undefined;
  }
}
