import path from 'node:path';

import fs from 'fs-extra';

import {
  type Configuration,
  formatSourceFromFile,
  isFileExcludedByConfig,
  resolveConfigForFile,
} from '../lib';
import { isSupported, loadBaseConfig } from './config';
import { type Options } from './options';
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
  const checkFile = async (filePath: string) => {
    if (!(await fs.pathExists(filePath))) {
      STATS.otherIssues++;
      process.stderr.write(`'${filePath}' doesn't exist.\n`);
      return;
    }
    const stat = await fs.stat(filePath);
    if (stat.isFile()) await processFile(config, filePath);
    else if (stat.isDirectory()) await processDirectory(options, config, filePath);
    else {
      STATS.otherIssues++;
      process.stderr.write(`'${filePath}' is neither file nor directory.\n`);
    }
  };
  await Promise.all(options._.map(checkFile));
  summary();
}

async function processFile(baseConfig: Configuration, filePath: string, realPath?: string) {
  if (!isSupported(filePath)) return;
  STATS.processed++;
  const resolvedPath = realPath ?? path.resolve(filePath);
  const config = resolveConfigForFile(resolvedPath, baseConfig);
  if (isFileExcludedByConfig(resolvedPath, config)) {
    STATS.excluded++;
    return;
  }
  const source = await fs.readFile(resolvedPath, { encoding: 'utf8' });
  const result = await formatSourceFromFile(source, resolvedPath, config);
  if (result !== undefined) {
    STATS.styleIssues++;
    process.stderr.write(`'${filePath}' is different after formatting.\n`);
  }
}

async function processDirectory(options: Options, config: Configuration, dirPath: string) {
  const { recursive } = options;
  for await (const { relativePath, resolvedPath } of getFiles(dirPath, !recursive)) {
    const filePath = path.join(dirPath, relativePath);
    await processFile(config, filePath, resolvedPath);
  }
}

function summary() {
  const { processed, excluded, otherIssues, styleIssues } = STATS;
  if (processed) {
    process.stdout.write(`Checked ${processed} ${processed === 1 ? 'file' : 'files'}, of which:\n`);
    const passed = processed - excluded - styleIssues;
    if (passed > 0)
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
