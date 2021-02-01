import { loadConfigFromJsonFile } from '../lib';
import { Options } from './options';

export function loadBaseConfig({ config, force }: Options) {
  const cfg = config ? loadConfigFromJsonFile(config) : {};
  return { ...cfg, force };
}

// TODO: Move to lib?
export function isSupported(filePath: string | undefined) {
  return !!filePath && /[^.\\\/]+\.(tsx?|jsx?)$/.test(filePath);
}
