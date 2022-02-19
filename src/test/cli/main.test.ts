import {
  spawnSync,
  SpawnSyncOptions,
} from 'child_process';
import { compareSync } from 'dir-compare';
import fs from 'fs-extra';
import os from 'os';
import path from 'path';
import tmp from 'tmp';

const OS = os.platform();

const CMD = 'cmd.txt';
const SKIP = 'skip.txt';
const SPECIAL = 'special.txt';
const STDIN = 'stdin.dat';
const IN_DIR = '__in';
const OUT_DIR = '__out';
const TMP_PREFIX = 'format-imports';

describe('CLI', () => {
  describe('version', () => {
    const PATTERN = /^v\d+\.\d+\.\d+\n$/;
    test('--version', () => {
      const { stdout, stderr, status } = run('--version');
      expect(stderr).toBe('');
      expect(status).toBe(0);
      expect(stdout).toMatch(PATTERN);
    });
    test('-v', () => {
      const { stdout, stderr, status } = run('-v');
      expect(stderr).toBe('');
      expect(status).toBe(0);
      expect(stdout).toMatch(PATTERN);
    });
  });

  describe('log', () => {
    const PATTERN = /\[(DEBUG|INFO)\]/;
    const env = { baseDir: __dirname };
    test('--log', () => {
      const { stdout, stderr, status } = run('-c ./main.test.ts --log', env);
      expect(stderr).toBe('');
      expect(status).toBe(0);
      expect(stdout).toMatch(PATTERN);
    });
    test('-l', () => {
      const { stdout, stderr, status } = run('-c ./main.test.ts -l', env);
      expect(stderr).toBe('');
      expect(status).toBe(0);
      expect(stdout).toMatch(PATTERN);
    });
  });

  const examples = path.resolve(__dirname, 'examples');
  // Run all tests
  runTestSuite(examples);
  // Or, run specific test case(s)
  // runTestSuite(examples, 'format/stdin');
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
        if (rest && rest.length > 0) describe(e.name, () => runTestSuite(rp, rest));
        else describe.only(e.name, () => runTestSuite(rp));
      } else describe(e.name, () => runTestSuite(rp));
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
  // create a tmp directory as the base directory to sandbox the child process.
  const tmpDir1 = tmp.dirSync({ prefix: TMP_PREFIX, unsafeCleanup: true });
  const baseDir = tmpDir1.name;
  // copy files needed to the child base directory.
  const { inDir, outDir } = getDirs(resolved);
  if (inDir) fs.copySync(inDir, baseDir);
  runAndCheck(options, { stdin, baseDir });
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
function runAndCheck(options: string, env?: { stdin?: string; baseDir: string }) {
  const { stdout, stderr, status } = run(options, env);
  expect({ stderr, status, stdout }).toMatchSnapshot();
}

function run(options: string, env?: { stdin?: string; baseDir: string }) {
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
  const out = path.resolve(dir, STDIN);
  return fs.existsSync(out) && fs.statSync(out).isFile() ? out : undefined;
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

function readFile(dir: string, fn: string) {
  const file = path.resolve(dir, fn);
  if (!fs.existsSync(file)) return undefined;
  return fs.readFileSync(file).toString();
}

function readLines(dir: string, fn: string) {
  return readFile(dir, fn)?.split(/\r?\n|\n?\r/);
}
