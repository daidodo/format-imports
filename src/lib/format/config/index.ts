import { Configuration } from '../../config';
import {
  ComposeConfig,
  configForCompose,
} from './compose';
import {
  enhanceWithEslint,
  ESLintConfigProcessed,
} from './eslint';
import { loadTsConfig } from './tsconfig';

export interface FormatOptions {
  skipTsConfig?: boolean;
  tsConfigPath?: string;
  skipEslintConfig?: boolean;
  eslintConfigPath?: string;
}

export { ComposeConfig, ESLintConfigProcessed };

export function enhanceConfig(config: Configuration, fileName: string, options?: FormatOptions) {
  const tsCompilerOptions = options?.skipTsConfig
    ? undefined
    : loadTsConfig(fileName, options?.tsConfigPath);
  const { config: newConfig, processed } = options?.skipEslintConfig
    ? { config, processed: undefined }
    : enhanceWithEslint(config, fileName, options?.eslintConfigPath);
  const composeConfig = configForCompose(newConfig);
  return { config: newConfig, tsCompilerOptions, processed, composeConfig };
}
