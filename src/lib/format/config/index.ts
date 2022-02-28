import { type PromiseType } from 'utility-types';

import { type Configuration } from '../../config';
import {
  type ComposeConfig,
  configForCompose,
} from './compose';
import {
  enhanceWithEslint,
  type ESLintConfigProcessed,
} from './eslint';
import { loadTsConfig } from './tsconfig';

export interface FormatOptions {
  skipTsConfig?: boolean;
  tsConfigPath?: string;
  skipEslintConfig?: boolean;
  eslintConfigPath?: string;
}

export { type ComposeConfig, type ESLintConfigProcessed };

export type EnhancedConfig = PromiseType<ReturnType<typeof enhanceConfig>>;

export async function enhanceConfig(
  config: Configuration,
  fileName: string,
  options?: FormatOptions,
) {
  const tsCompilerOptions = options?.skipTsConfig
    ? undefined
    : loadTsConfig(fileName, options?.tsConfigPath);
  const { config: newConfig, processed } = options?.skipEslintConfig
    ? { config, processed: undefined }
    : await enhanceWithEslint(config, fileName, options?.eslintConfigPath);
  const composeConfig = configForCompose(newConfig, processed);
  return { config: newConfig, tsCompilerOptions, processed, composeConfig };
}

// Will NOT read ESLint config.
enhanceConfig.sync = (config: Configuration, fileName: string, options?: FormatOptions) => {
  const tsCompilerOptions = options?.skipTsConfig
    ? undefined
    : loadTsConfig(fileName, options?.tsConfigPath);
  const composeConfig = configForCompose(config);
  return { config, tsCompilerOptions, processed: undefined, composeConfig };
};
