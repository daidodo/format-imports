import fs from 'fs-extra';
import path from 'path';

import {
  Configuration,
  formatSource,
  isFileExcludedByConfig,
  resolveConfigForFile,
} from '../lib';
import {
  isSupported,
  loadBaseConfig,
} from './config';
import { Options } from './options';
import { getFiles } from './utils';

const STATS = {
  processed: 0,
  excluded: 0,
  otherIssues: 0,
  styleIssues: 0,
};

export async function check(options: Options) {
  if (options._.length < 1) {
    process.stderr.write('Expect at least 1 file or directory.\n');
    process.exit(1);
  }
  const config = loadBaseConfig(options);
  for (const filePath of options._) {
    if (!fs.existsSync(filePath)) {
      STATS.otherIssues++;
      outputIssue(`'${filePath}' doesn't exist.`);
      continue;
    }
    const stat = fs.statSync(filePath);
    if (stat.isFile()) processFile(options, config, filePath);
    else if (stat.isDirectory()) await processDirectory(options, config, filePath);
    else {
      STATS.otherIssues++;
      outputIssue(`'${filePath}' is neither file nor directory.`);
    }
  }
  summary();
}

function outputIssue(msg: string) {
  process.stderr.write(msg + '\n');
}

function processFile(options: Options, config: Configuration, filePath: string, realPath?: string) {
  if (!isSupported(filePath)) return;
  STATS.processed++;
  const resolvedPath = realPath ?? path.resolve(filePath);
  const allConfig = resolveConfigForFile(resolvedPath, config);
  if (isFileExcludedByConfig(resolvedPath, allConfig.config)) {
    STATS.excluded++;
    return;
  }
  const source = fs.readFileSync(resolvedPath).toString();
  const result = formatSource(resolvedPath, source, allConfig);
  if (result !== undefined) {
    STATS.styleIssues++;
    outputIssue(`'${filePath}' is different after formatting.`);
  }
}

async function processDirectory(options: Options, config: Configuration, dirPath: string) {
  const { recursive } = options;
  for await (const { relativePath, resolvedPath } of getFiles(dirPath, !recursive)) {
    const filePath = path.join(dirPath, relativePath);
    processFile(options, config, filePath, resolvedPath);
  }
}

function summary() {
  const { processed, excluded, otherIssues, styleIssues } = STATS;
  if (processed) {
    process.stdout.write(`Checked ${processed} files, of which:\n`);
    const passed = processed - excluded - styleIssues;
    process.stdout.write(`  ${passed} ${passed === 1 ? 'file' : 'files'} passed.\n`);
    if (excluded > 0)
      process.stdout.write(
        `  ${excluded} ${excluded === 1 ? 'file was' : 'files were'} excluded.\n`,
      );
    if (styleIssues > 0)
      process.stdout.write(
        `  ${styleIssues} ${styleIssues === 1 ? 'file has' : 'files have'} formatting issues.\n`,
      );
  } else process.stdout.write('Checked 0 files.\n');
  if (styleIssues + otherIssues > 0) process.exit(1);
}
