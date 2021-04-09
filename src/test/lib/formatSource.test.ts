import assert from 'assert';
import fs from 'fs';
import path, { sep } from 'path';

import {
  Configuration,
  formatSourceFromFile,
  mergeConfig,
  resolveConfigForSource,
} from '../../lib';
import { assertNonNull } from '../../lib/common';
import { fileConfig } from '../../lib/config/importSorter';

interface TestSuite {
  name: string;
  config?: Configuration;
  tsConfigPath?: string;
  cases: TestCase[];
  suites: TestSuite[];
}

interface TestCase {
  name?: string;
  origin?: string; // origin can be undefined in default case
  result?: string;
  eslintConfigPath?: string;
}

const CONF = 'import-sorter.json';
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
  // Run all tests
  return runTestSuite(examples);
  // Or, run specific test case(s)
  // return runTestSuite(examples, 'eslint/indent');
});

function getTestSuite(dir: string, name: string): TestSuite | undefined {
  const path = dir + sep + name;
  const entries = fs.readdirSync(path, { withFileTypes: true });
  // Search and load 'import-sorter.json' under path.
  const config = entries.find(({ name }) => name === CONF) && fileConfig(path + sep + CONF);
  // Search for 'tsconfig.json' under path.
  const tsConfigPath = entries.find(({ name }) => name === TS_CONF) && path + sep + TS_CONF;
  // Search for '.eslintrc.json' under path.
  const eslintConfigPath =
    entries.find(({ name }) => name === ESLINT_CONF) && path + sep + ESLINT_CONF;
  const suites = entries
    .filter(e => e.isDirectory())
    .map(({ name }) => getTestSuite(path, name))
    .filter((s): s is TestSuite => !!s);
  const map = new Map<string, TestCase>();
  entries
    .filter(e => e.isFile())
    .forEach(({ name }) => {
      const r = /^(.+\.)?(origin|result)\.[jt]sx?$/.exec(name);
      if (!r) return;
      const [, n, t] = r;
      const p = path + sep + name;
      const k = n ? n.slice(0, n.length - 1) : '';
      const v = map.get(k) ?? { origin: '', name: k ? k : undefined, eslintConfigPath };
      if (t === 'origin') v.origin = p;
      else v.result = p;
      map.set(k, v);
    });
  return { name, config, tsConfigPath, suites, cases: [...map.values()] };
}

function runTestSuite(ts: TestSuite, specific?: string, preConfig?: Configuration) {
  const { name, config: curConfig, tsConfigPath, cases, suites } = ts;
  const defResult = cases.find(c => !c.name && !c.origin)?.result;
  const config =
    curConfig && preConfig ? mergeConfig(preConfig, curConfig) : curConfig ?? preConfig;
  describe(name, () => {
    if (!specific) {
      cases.forEach(c => runTestCase(c, defResult, config, tsConfigPath));
      suites.forEach(s => runTestSuite(s, undefined, config));
    } else {
      const [n, ...rest] = specific.split('/').filter(s => !!s);
      if (!rest.length) {
        const c = cases.find(c => (c.name ?? 'default') === n);
        if (c) return runTestCase(c, defResult, config, tsConfigPath);
      }
      const s = suites.find(s => s.name === n);
      assertNonNull(s, `Test case/suite '${n}' not found in suite '${name}'`);
      runTestSuite(s, rest.join('/'), config);
    }
  });
}

function runTestCase(
  { name, origin, result, eslintConfigPath }: TestCase,
  defResult?: string,
  config?: Configuration,
  tsConfigPath?: string,
) {
  if (!name && !origin) return;
  it(name ?? 'default', async () => {
    assertNonNull(origin, `Missing origin in test case '${name ?? 'default'}'`);
    const res = result || defResult;
    const source = fs.readFileSync(origin).toString();
    const c = resolveConfigForSource(source, config);
    const skipTsConfig = !tsConfigPath;
    const skipEslintConfig = !eslintConfigPath;
    const options = { skipTsConfig, tsConfigPath, skipEslintConfig, eslintConfigPath };
    const actual = formatSourceFromFile(source, origin, c, options) ?? source;
    const expected = res ? fs.readFileSync(res).toString() : source;
    if (UPDATE_RESULT && actual !== expected && result) fs.writeFileSync(result, actual);
    assert.strictEqual(actual, expected);
  });
}
