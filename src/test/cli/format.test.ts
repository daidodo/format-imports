import {
  spawnSync,
  SpawnSyncOptions,
} from 'child_process';
import { compareSync } from 'dir-compare';
import fs from 'fs-extra';
import path from 'path';
import tmp from 'tmp';

import { assertNonNull } from '../../lib/common';

const CMD = 'cmd.txt';
const STDIN = 'stdin.txt';
const BASE_DIR = '__base';

describe('cli/format-imports', () => {
  test('--help', () => run('--help'));
  test('-h', () => run('-h'));

  test('--version', () => run('--version'));
  test('-v', () => run('-v'));

  const examples = path.resolve(__dirname, 'examples');
  // Run all tests
  runTestSuite(examples);
  // Or, run a specific test suite
  //  runTestSuite(examples, 'eslint/sort');
});

function getCmd(dir: string) {
  return readFile(dir, CMD)?.split('\n');
}

function getStdin(dir: string) {
  const out = path.resolve(dir, STDIN);
  return fs.existsSync(out) && fs.statSync(out).isFile() ? out : undefined;
}

function getBaseDir(dir: string) {
  const out = path.resolve(dir, BASE_DIR);
  return fs.existsSync(out) && fs.statSync(out).isDirectory() ? out : undefined;
}

function readFile(dir: string, fn: string) {
  const file = path.resolve(dir, fn);
  if (!fs.existsSync(file)) return undefined;
  return fs.readFileSync(file).toString();
}

function runTestSuite(resolved: string, relative?: string | string[]): void {
  const [name, ...rest] = relative ? (typeof relative === 'string' ? [relative] : relative) : [];
  if (name) return describe(name, () => runTestSuite(path.resolve(resolved, name), rest));
  const entries = fs.readdirSync(resolved, { withFileTypes: true });
  if (entries.some(e => e.name === CMD)) runTestCase(resolved);
  entries
    .filter(e => e.isDirectory() && e.name !== BASE_DIR)
    .forEach(e => describe(e.name, () => runTestSuite(path.resolve(resolved, e.name))));
}

function runTestCase(resolved: string) {
  const cmds = getCmd(resolved);
  assertNonNull(cmds, 'Missing cmd.txt.');
  for (const cmd of cmds) test(cmd ? `[${cmd}]` : '[no-args]', () => runCmd(cmd, resolved));
}

function runCmd(options: string, resolved: string) {
  const stdin = getStdin(resolved);
  // create a tmp directory as the base directory to sandbox child process.
  const tmpDir = tmp.dirSync();
  const baseDir = tmpDir.name;
  // copy files needed to sandbox base directory.
  const baseSrc = getBaseDir(resolved);
  if (baseSrc) fs.copySync(baseSrc, baseDir);
  run(options, { stdin, baseDir });
  // check base directory content, or ensure there is no files inside.
  if (baseSrc) {
    const r = compareSync(baseSrc, baseDir, { compareContent: true });
    expect(r.same).toBeTruthy();
  } else expect(fs.readdirSync(baseDir).length).toBe(0);
}

function run(options: string, env?: { stdin?: string; baseDir: string }) {
  // setup CWD and STDIN for child process if needed.
  const cwd = env?.baseDir;
  const stdio = env?.stdin ? [fs.openSync(env.stdin, 'r')] : undefined;
  const opt: SpawnSyncOptions = { cwd, stdio };
  // setup args
  const script = path.resolve('dist/bin/format-cli.js');
  const args = options ? [script, ...options.split(' ')] : [script];
  const { stdout, stderr, status } = spawnSync('ts-node', args, opt);
  // check execution results
  expect({
    stdout: stdout.toString(),
    stderr: stderr.toString(),
    status,
  }).toMatchSnapshot();
}
