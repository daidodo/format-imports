/* eslint jest/no-focused-tests: "off" */
/* eslint jest/no-disabled-tests: "off" */
/* eslint jest/expect-expect: "off" */

import {
  spawnSync,
  type SpawnSyncOptions,
} from 'node:child_process';
import os from 'node:os';
import path from 'node:path';

import { compareSync } from 'dir-compare';
import fs from 'fs-extra';
import tmp from 'tmp';

const OS = os.platform();

const CMD = 'cmd.txt';
const SKIP = 'skip.txt';
const SPECIAL = 'special.txt';
const STDIN = 'stdin.dat';
const IN_DIR = '__in';
const OUT_DIR = '__out';
const TMP_PREFIX = 'format-imports';
const RESULT_JSON = 'result.json';

describe('CLI', () => {
  const examples = path.resolve(__dirname, 'examples');
  // Run all tests
  runTestSuite(examples);
  // Or, run specific test case(s)
  // runTestSuite(examples, 'log');
});

function runTestSuite(resolved: string, relative?: string | string[]): void {
  const [name, ...rest] = relative
    ? typeof relative === 'string'
      ? relative.split('/').filter(p => !!p)
      : relative
    : [];
  // if (name) return describe(name, () => runTestSuite(path.resolve(resolved, name), rest));
  const entries = fs.readdirSync(resolved, { withFileTypes: true });
  if (entries.some(e => e.name === CMD)) runTestCase(resolved);
  entries
    .filter(e => e.isDirectory() && e.name !== IN_DIR && e.name != OUT_DIR)
    .forEach(e => {
      const rp = path.resolve(resolved, e.name);
      if (e.name === name) {
        if (rest && rest.length > 0)
          describe(e.name, () => {
            runTestSuite(rp, rest);
          });
        else
          describe.only(e.name, () => {
            runTestSuite(rp);
          });
      } else
        describe(e.name, () => {
          runTestSuite(rp);
        });
    });
}

function runTestCase(resolved: string) {
  const { cmds, skip } = getCmd(resolved);
  if (!cmds) return;
  const special = getSpecial(resolved);
  for (const cmd of cmds) {
    let found = false;
    if (special)
      for (const s of special) {
        const name = `${s}[${cmd}]`;
        if (s === OS) {
          found = true;
          if (skip) test.skip(name, () => runCmd(cmd, resolved));
          else test(name, () => runCmd(cmd, resolved));
        } else test.skip(name, () => runCmd(cmd, resolved));
      }
    const name = `[${cmd}]`;
    if (found || skip) test.skip(name, () => runCmd(cmd, resolved));
    else test(name, () => runCmd(cmd, resolved));
  }
}

function runCmd(options: string, resolved: string) {
  const stdin = getStdin(resolved);
  const resultJson = getResultJson(resolved);
  // create a tmp directory as the base directory to sandbox the child process.
  const tmpDir1 = tmp.dirSync({ prefix: TMP_PREFIX, unsafeCleanup: true });
  const baseDir = tmpDir1.name;
  // copy files needed to the child base directory.
  const { inDir, outDir } = getDirs(resolved);
  if (inDir) fs.copySync(inDir, baseDir);
  runAndCheck(options, { stdin, baseDir, resultJson });
  // setup the expected base directory
  const tmpDir2 = tmp.dirSync({ prefix: TMP_PREFIX, unsafeCleanup: true });
  const baseDirExpected = tmpDir2.name;
  if (inDir) fs.copySync(inDir, baseDirExpected);
  if (outDir) fs.copySync(outDir, baseDirExpected);
  // check base directory content and clean up.
  const r = compareSync(baseDirExpected, baseDir, { compareContent: true });
  tmpDir1.removeCallback();
  tmpDir2.removeCallback();
  // The content of the base directory should be expected.
  expect(r.same).toBeTruthy();
}

// check execution results
function runAndCheck(
  options: string,
  env?: { stdin?: string; baseDir: string; resultJson?: string },
) {
  const actual = run(options, env);
  const result = env?.resultJson ? JSON.parse(fs.readFileSync(env.resultJson, 'utf-8')) : {};
  if (result.stderr) {
    expect(actual.stderr).toMatch(new RegExp(result.stderr));
    delete actual.stderr;
  }
  if (result.stdout) {
    expect(actual.stdout).toMatch(new RegExp(result.stdout));
    delete actual.stdout;
  }
  expect(actual).toMatchSnapshot();
}

function run(
  options: string,
  env?: { stdin?: string; baseDir: string },
): {
  stdout?: string;
  stderr?: string;
  status?: number | null;
} {
  const useTsNode = process.env.USE_TS_NODE === '1' || process.env.USE_TS_NODE === 'true';
  // setup args
  const script = path.resolve(useTsNode ? 'src/bin/main.ts' : 'dist/bin/main.js');
  const args = [script, ...options.split(' ')].filter(a => !!a);
  // setup CWD and STDIN for child process if needed.
  const cwd = env?.baseDir;
  const stdio = env?.stdin ? [fs.openSync(env.stdin, 'r')] : undefined;
  const opt: SpawnSyncOptions = { cwd, stdio };
  const { stdout, stderr, status } = useTsNode
    ? spawnSync('ts-node-script', ['-T', ...args], opt)
    : spawnSync('node', args, opt);
  return { stdout: stdout.toString(), stderr: stderr.toString(), status };
}

function getCmd(dir: string) {
  return { skip: getSkip(dir)?.has(OS), cmds: readLines(dir, CMD) };
}

function getSkip(dir: string) {
  return new Set(readLines(dir, SKIP));
}

function getSpecial(dir: string) {
  return readLines(dir, SPECIAL);
}

function getStdin(dir: string) {
  return checkFile(dir, STDIN);
}

function getResultJson(dir: string) {
  return checkFile(dir, RESULT_JSON);
}

function getDirs(dir: string) {
  const inDir = checkDir(dir, IN_DIR);
  const outDir = checkDir(dir, OUT_DIR);
  return { inDir, outDir };
}

function checkDir(dir: string, name: string) {
  const r = path.resolve(dir, name);
  return fs.existsSync(r) && fs.statSync(r).isDirectory() ? r : undefined;
}

function checkFile(dir: string, name: string) {
  const out = path.resolve(dir, name);
  return fs.existsSync(out) && fs.statSync(out).isFile() ? out : undefined;
}

function readFile(dir: string, fn: string) {
  const file = path.resolve(dir, fn);
  if (!fs.existsSync(file)) return undefined;
  return fs.readFileSync(file).toString();
}

function readLines(dir: string, fn: string) {
  return readFile(dir, fn)?.split(/\r?\n|\n?\r/);
}
