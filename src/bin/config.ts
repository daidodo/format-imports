import path from 'path';

import {
  loadConfigFromJsonFile,
  SUPPORTED_EXTENSIONS,
} from '../lib';
import { type Options } from './options';

export function loadBaseConfig({ config, force }: Options) {
  const cfg = config ? loadConfigFromJsonFile(config) : {};
  return { ...cfg, force };
}

export function decideExtension({ extension, output }: Options) {
  // `path.extname` returns '.xxx' so need to skip '.'.
  const ext = extension || (output && path.extname(output).substring(1));
  return (ext ? SUPPORTED_EXTENSIONS.find(e => e === ext) : 'ts') || 'ts';
}

export function isSupported(fileName: string) {
  // `path.extname` returns '.xxx' so need to skip '.'.
  const ext = path.extname(fileName).substring(1);
  return SUPPORTED_EXTENSIONS.some(e => e === ext);
}
