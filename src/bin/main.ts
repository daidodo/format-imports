#!/usr/bin/env node

import log4js from 'log4js';

import { check } from './check';
import { format } from './format';
import {
  processArgv,
  usage,
  version,
} from './options';

async function main(argv: string[]) {
  const options = processArgv(argv);
  if (options.help) usage(0);
  if (options.version) version(0);
  if (options.log) log4js.getLogger().level = 'debug';
  try {
    if (options.check) await check(options);
    else await format(options);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : `${e}`;
    process.stderr.write(message + '\n');
    process.exit(1);
  }
}

main(process.argv);
