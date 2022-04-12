/* eslint-disable @typescript-eslint/no-var-requires */

export * from './config';

export * from './format/main';

const pkg = require('../../package.json');
/**
 * API version.
 */
export const VERSION: string = pkg.version;

/**
 * Executable name.
 */
export const CLI_NAME: string = pkg.name;
