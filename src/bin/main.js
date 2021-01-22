#!/usr/bin/env node

'use strict';

const fs = require('fs');
const lib = require('../lib');

function usage(exe) {
  process.stderr.write(`Usage: ${exe} filename\n`);
  process.exit(1);
}

function main(argv) {
  const exe = argv[0];
  if (argv.length !== 2) usage(exe);
  const fileName = argv[1];
  const allConfig = lib.resolveConfigForFile(fileName);
  if (lib.isFileExcludedByConfig(allConfig.config))
    process.stdout.write('File is excluded in config.\n');
  else {
    const source = fs.readFileSync(fileName).toString();
    const result = lib.formatSource(fileName, source, allConfig);
    process.stdout.write(result + '\n');
  }
}

main(process.argv.slice(1));
