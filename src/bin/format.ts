import path from 'node:path';
import fs from 'fs-extra';

import {
  formatSourceFromFile,
  formatSourceWithoutFile,
  isFileExcludedByConfig,
  resolveConfigForFile,
  resolveConfigForSource,
} from '../lib';
import {
  decideExtension,
  isSupported,
  loadBaseConfig,
} from './config';
import { type Options } from './options';
import {
  getFiles,
  isDirectory,
} from './utils';

enum OutputMode {
  NORMAL,
  DRY_RUN_FILE,
  DRY_RUN_FILES,
  DRY_RUN_DIR,
}

function dryRunOutput(
  mode: OutputMode,
  result: string | undefined,
  source: string,
  inputFile?: string | undefined,
) {
  if (mode === OutputMode.DRY_RUN_FILES) {
    if (result !== undefined && inputFile)
      process.stdout.write(`'${inputFile}' will be modified.\n`);
  } else if (mode === OutputMode.DRY_RUN_FILE) process.stdout.write(result ?? source);
}

async function checkFileContent(
  filePath: string,
  text: string,
): Promise<{ exist: boolean; isFile?: boolean; equal?: boolean }> {
  const exist = await fs.pathExists(filePath);
  if (!exist) return { exist };
  const stat = await fs.stat(filePath);
  const isFile = stat.isFile();
  if (!isFile) return { exist, isFile };
  if (stat.size !== text.length) return { exist, isFile, equal: false };
  const content = await fs.readFile(filePath, { encoding: 'utf8' });
  return { exist, isFile, equal: text === content };
}

async function outputResult(
  mode: OutputMode,
  result: string | undefined,
  outputFile: string | undefined,
  source: string,
  inputFile?: string,
): Promise<{ error?: boolean; modified?: number; created?: number }> {
  if (outputFile) {
    const text = result ?? source;
    const { exist, isFile, equal } = await checkFileContent(outputFile, text);
    if (exist && !isFile) {
      process.stderr.write(`Option output: '${outputFile}' is not a file.\n`);
      return { error: true };
    }
    if (mode === OutputMode.NORMAL) {
      if (!equal) await fs.outputFile(outputFile, text);
    } else dryRunOutput(mode, result, source);
    return exist ? { modified: equal ? 0 : 1 } : { created: 1 };
  } else if (inputFile) {
    if (mode === OutputMode.NORMAL) {
      if (result !== undefined) await fs.writeFile(inputFile, result);
    } else dryRunOutput(mode, result, source, inputFile);
    return { modified: result !== undefined ? 1 : 0 };
  } else dryRunOutput(OutputMode.DRY_RUN_FILE, result, source);
  return {};
}

async function ensureOutputDir(output: string | undefined, dryRun: boolean | undefined) {
  if (!output) return;
  if (!(await fs.pathExists(output))) {
    if (!dryRun) await fs.mkdir(output, { recursive: true });
  } else if (!(await isDirectory(output))) {
    process.stderr.write(`Option output: '${output}' is not a directory.\n`);
    process.exit(1);
  }
}

async function processStdin(options: Options) {
  const { output, dryRun } = options;
  const baseConfig = loadBaseConfig(options);
  const chunks: string[] = [];
  process.stdin.on('data', data => chunks.push(data.toString()));
  process.stdin.on('end', async () => {
    const source = chunks.join();
    if (!source) return;
    const config = resolveConfigForSource(source, baseConfig);
    const ext = decideExtension(options);
    const result = await formatSourceWithoutFile(source, ext, config, {
      skipEslintConfig: true,
      skipTsConfig: true,
    });
    const mode = dryRun ? OutputMode.DRY_RUN_FILE : OutputMode.NORMAL;
    const { error, modified, created } = await outputResult(mode, result, output, source);
    if (error) process.exit(1);
    if (mode === OutputMode.NORMAL && output) summary(mode, modified ?? 0, created ?? 0);
  });
}

async function processDirectory(dirPath: string, options: Options) {
  if (!fs.statSync(dirPath).isDirectory()) return processFiles([dirPath], options);
  const { output, recursive, dryRun } = options;
  const baseConfig = loadBaseConfig(options);
  await ensureOutputDir(output, dryRun);
  const mode = dryRun ? OutputMode.DRY_RUN_DIR : OutputMode.NORMAL;
  let modified = 0;
  let created = 0;
  for await (const { relativePath, resolvedPath: inputFile } of getFiles(dirPath, !recursive)) {
    if (!isSupported(relativePath)) continue;
    const filePath = path.join(dirPath, relativePath);
    const config = resolveConfigForFile(inputFile, baseConfig);
    if (isFileExcludedByConfig(inputFile, config)) continue;
    const source = await fs.readFile(inputFile, { encoding: 'utf8' });
    const result = await formatSourceFromFile(source, inputFile, config);
    const outputFile = output ? path.join(output, relativePath) : output;
    const {
      error,
      modified: m,
      created: c,
    } = await outputResult(mode, result, outputFile, source, filePath);
    if (error) process.exit(1);
    if (m) modified += m;
    if (c) created += c;
  }
  summary(mode, modified, created);
}

async function processFiles(filePaths: string[], options: Options) {
  const { output, dryRun } = options;
  const single = filePaths.length === 1;
  if (!single && output) {
    process.stderr.write(`Option output: should be empty if multiple files are provided.`);
    process.exit(1);
  }

  for (const f of filePaths) {
    if (fs.statSync(f).isFile()) continue;
    process.stderr.write(`Option: '${f}' is not a file.`);
    process.exit(1);
  }

  const baseConfig = loadBaseConfig(options);
  const mode = dryRun
    ? single
      ? OutputMode.DRY_RUN_FILE
      : OutputMode.DRY_RUN_FILES
    : OutputMode.NORMAL;
  let modified = 0;
  let created = 0;

  const processFile = async (filePath: string) => {
    if (!isSupported(filePath)) {
      process.stdout.write(`'${filePath}' is not a supported file type.\n`);
      return;
    }
    const inputFile = path.resolve(filePath);
    const config = resolveConfigForFile(inputFile, baseConfig);
    if (isFileExcludedByConfig(inputFile, config)) {
      process.stdout.write(`'${filePath}' is excluded by config.\n`);
    } else {
      const source = await fs.readFile(inputFile, { encoding: 'utf8' });
      const result = await formatSourceFromFile(source, inputFile, config);
      const outputFile =
        output && (await fs.pathExists(output)) && (await isDirectory(output))
          ? path.resolve(output, path.basename(inputFile))
          : output;
      const {
        error,
        modified: m,
        created: c,
      } = await outputResult(mode, result, outputFile, source, filePath);
      if (error) process.exit(1);
      if (m) modified += m;
      if (c) created += c;
    }
  };
  await Promise.all(filePaths.map(processFile));
  summary(mode, modified, created);
}

function summary(mode: OutputMode, modified: number, created: number) {
  if (mode === OutputMode.DRY_RUN_FILE || mode === OutputMode.DRY_RUN_FILES) return;
  const tense = mode === OutputMode.NORMAL ? '' : 'will be ';
  if (modified || !created) process.stdout.write(sumResult(modified, tense + 'modified'));
  if (created) process.stdout.write(sumResult(created, tense + 'created'));
}

function sumResult(num: number, action: string) {
  return `${num === 0 ? 'No' : num} ${num === 1 ? 'file' : 'files'} ${action}.\n`;
}

export async function format(options: Options) {
  switch (options._.length) {
    case 0:
      await processStdin(options);
      break;
    case 1:
      await processDirectory(options._[0], options);
      break;
    default:
      await processFiles(options._, options);
  }
}
