import log4js from 'log4js';

export function logger(category?: string) {
  return log4js.getLogger(category);
}
