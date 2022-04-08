/* eslint-disable @typescript-eslint/no-var-requires */

export * from './config';

export * from './format/main';

/**
 * API version.
 */
export const version: string = require('../../package.json').version;
