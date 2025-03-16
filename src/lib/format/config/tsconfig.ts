import path from 'node:path';

import NodeCache from 'node-cache';
import ts, { type CompilerOptions } from 'typescript';

import { isObject } from '@dozerg/condition';
import requireModule from '@dozerg/require-module';

import { logger } from '../../common';

const CACHE = new NodeCache({ stdTTL: 5 });

export function loadTsConfig(fileName: string, configPath?: string) {
  const log = logger('format-imports.loadTsConfig');
  log.debug('Loading TS config for:', fileName, 'from', configPath ?? 'default');
  try {
    const { findConfigFile, readConfigFile, parseJsonConfigFileContent, sys, version } =
      requireModule('typescript', fileName, ts);
    log.debug('TypeScript API version:', version);
    const configFile = configPath || findConfigFile(fileName, sys.fileExists.bind(sys));
    if (!configFile) return undefined;
    const opt = CACHE.get(configFile);
    if (isObject(opt)) return opt as CompilerOptions;
    const { config } = readConfigFile(configFile, sys.readFile.bind(sys));
    const { options } = parseJsonConfigFileContent(config, sys, path.dirname(configFile));
    CACHE.set(configFile, options);
    log.debug('Loading TS config from', configFile, 'and options:', options);
    return options;
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : `${e}`;
    log.warn('Failed to load TS config for', fileName, 'with error:', msg);
    return undefined;
  }
}
