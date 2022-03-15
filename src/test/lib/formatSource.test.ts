import assert from 'assert';
import fs from 'fs';
import path, { sep } from 'path';

import {
  assertNonNull,
  isNonNull,
} from '@dozerg/condition';

import {
  formatSourceFromFile,
  resolveConfigForFile,
} from '../../lib';

interface TestSuite {
  name: string;
  tsConfigPath?: string;
  eslintConfigPath?: string;
  cases: TestCase[];
  suites: TestSuite[];
}

interface TestCase {
  name?: string;
  origin?: string; // origin can be undefined in default case
  result?: string;
}

const TS_CONF = 'tsconfig.json';
const ESLINT_CONF = '.eslintrc.json';

/**
 * If set to true, the result file will be updated if test fails.
 *
 * ! Use it with cautions.
 */
const UPDATE_RESULT = false;

describe('lib/formatSource', () => {
  const dir = path.resolve(__dirname);
  const examples = getTestSuite(dir, 'examples');
  if (!examples) return;
  // Run all tests or specific test case(s)
  runTestSuite(examples);
  // runTestSuite(examples, 'compose/comma');
});

function getTestSuite(dir: string, name: string): TestSuite | undefined {
  const path = dir + sep + name;
  const entries = fs.readdirSync(path, { withFileTypes: true });
  // Search for 'tsconfig.json' under path.
  const tsConfigPath = entries.find(({ name }) => name === TS_CONF) && path + sep + TS_CONF;
  // Search for '.eslintrc.json' under path.
  const eslintConfigPath =
    entries.find(({ name }) => name === ESLINT_CONF) && path + sep + ESLINT_CONF;
  const suites = entries
    .filter(e => e.isDirectory())
    .map(({ name }) => getTestSuite(path, name))
    .filter(isNonNull);
  const map = new Map<string, TestCase>();
  entries
    .filter(e => e.isFile())
    .forEach(({ name }) => {
      const r = /^(.+\.)?(origin|result)\.[jt]sx?$/.exec(name);
      if (!r) return;
      const [, n, t] = r;
      const p = path + sep + name;
      const k = n ? n.slice(0, n.length - 1) : '';
      const v = map.get(k) ?? { name: k ? k : undefined };
      if (t === 'origin') v.origin = p;
      else v.result = p;
      map.set(k, v);
    });
  return { name, eslintConfigPath, tsConfigPath, suites, cases: [...map.values()] };
}

function runTestSuite(ts: TestSuite, specific?: string) {
  const { name, eslintConfigPath, tsConfigPath, cases, suites } = ts;
  const defResult = cases.find(c => !c.name && !c.origin)?.result;
  describe(name, () => {
    if (!specific) {
      cases.forEach(c => runTestCase(c, defResult, eslintConfigPath, tsConfigPath));
      suites.forEach(s => runTestSuite(s, undefined));
    } else {
      const [n, ...rest] = specific.split('/').filter(s => !!s);
      if (!rest.length) {
        const c = cases.find(c => (c.name ?? 'default') === n);
        if (c) return runTestCase(c, defResult, eslintConfigPath, tsConfigPath);
      }
      const s = suites.find(s => s.name === n);
      assertNonNull(s, `Test case/suite '${n}' not found in suite '${name}'`);
      runTestSuite(s, rest.join('/'));
    }
  });
}

function runTestCase(
  { name, origin, result }: TestCase,
  defResult?: string,
  eslintConfigPath?: string,
  tsConfigPath?: string,
) {
  if (!origin) return;
  it(name ?? 'default', async () => {
    const res = result || defResult;
    const source = fs.readFileSync(origin).toString();
    const config = resolveConfigForFile(origin);
    const skipTsConfig = !tsConfigPath;
    const skipEslintConfig = !eslintConfigPath;
    const options = { skipTsConfig, tsConfigPath, skipEslintConfig, eslintConfigPath };
    const actual = (await formatSourceFromFile(source, origin, config, options)) ?? source;
    const expected = res ? fs.readFileSync(res).toString() : source;
    if (UPDATE_RESULT && actual !== expected && result) fs.writeFileSync(result, actual);
    assert.strictEqual(actual, expected);
  });
}
