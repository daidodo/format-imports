#!/usr/bin/env node

import { readFileSync } from 'fs';

import {
  formatSource,
  isFileExcludedByConfig,
  resolveConfigForFile,
} from '../lib';

function usage(exe: string) {
  process.stderr.write(`Usage: ${exe} filename\n`);
  process.exit(1);
}

function main(argv: string[]) {
  const exe = argv[0];
  if (argv.length !== 2) usage(exe);
  const fileName = argv[1];
  const allConfig = resolveConfigForFile(fileName);
  if (isFileExcludedByConfig(fileName, { ...allConfig.config, force: true }))
    process.stdout.write('File is excluded by config.\n');
  else {
    const source = readFileSync(fileName).toString();
    const result = formatSource(fileName, source, allConfig);
    process.stdout.write(result + '\n');
  }
}

main(process.argv.slice(1));
