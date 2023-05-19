/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import assert from 'node:assert';

import { Configuration } from '../../config';
import {
  normalize,
  normalizePath,
  removeLastIndex,
  removeLastSlash,
} from './path';

describe('path', () => {
  describe('normalizePath', () => {
    test('removeLastIndex', () => {
      const opt = { removeLastIndexInPath: true };
      assert.deepStrictEqual(normalizePath('', opt), '');
      assert.deepStrictEqual(normalizePath('index', opt), 'index');
      assert.deepStrictEqual(normalizePath('index/', opt), 'index/');
      assert.deepStrictEqual(normalizePath('index/index', opt), 'index');
      assert.deepStrictEqual(normalizePath('/', opt), '/');
      assert.deepStrictEqual(normalizePath('/index', opt), '/');
      assert.deepStrictEqual(normalizePath('/index/', opt), '/index/');
      assert.deepStrictEqual(normalizePath('/index/index', opt), '/index/');
      assert.deepStrictEqual(normalizePath('a/index', opt), 'a');
      assert.deepStrictEqual(normalizePath('a/index/', opt), 'a/index/');
      assert.deepStrictEqual(normalizePath('a/index/index', opt), 'a/index/');
      assert.deepStrictEqual(normalizePath('./index', opt), './');
      assert.deepStrictEqual(normalizePath('./index/', opt), './index/');
      assert.deepStrictEqual(normalizePath('./index/index', opt), './index/');
      assert.deepStrictEqual(normalizePath('../index', opt), '../');
      assert.deepStrictEqual(normalizePath('../index/', opt), '../index/');
      assert.deepStrictEqual(normalizePath('../index/index', opt), '../index/');
    });
    test('removeLastSlash', () => {
      const opt = { removeLastSlashInPath: true };
      assert.deepStrictEqual(normalizePath('', opt), '');
      assert.deepStrictEqual(normalizePath('index', opt), 'index');
      assert.deepStrictEqual(normalizePath('index/', opt), 'index');
      assert.deepStrictEqual(normalizePath('index/index', opt), 'index/index');
      assert.deepStrictEqual(normalizePath('index/index/', opt), 'index/index/');
      assert.deepStrictEqual(normalizePath('index/a/', opt), 'index/a');
      assert.deepStrictEqual(normalizePath('/', opt), '/');
      assert.deepStrictEqual(normalizePath('/index', opt), '/index');
      assert.deepStrictEqual(normalizePath('/index/', opt), '/index/');
      assert.deepStrictEqual(normalizePath('/a/', opt), '/a');
      assert.deepStrictEqual(normalizePath('a/index', opt), 'a/index');
      assert.deepStrictEqual(normalizePath('a/index/', opt), 'a/index/');
      assert.deepStrictEqual(normalizePath('a/b/', opt), 'a/b');
      assert.deepStrictEqual(normalizePath('./index', opt), './index');
      assert.deepStrictEqual(normalizePath('./index/', opt), './index/');
      assert.deepStrictEqual(normalizePath('./a/', opt), './a');
      assert.deepStrictEqual(normalizePath('../index', opt), '../index');
      assert.deepStrictEqual(normalizePath('../index/', opt), '../index/');
      assert.deepStrictEqual(normalizePath('../a/', opt), '../a');
    });
    test('removeLastSlash & Index', () => {
      const opt = { removeLastSlashInPath: true, removeLastIndexInPath: true };
      assert.deepStrictEqual(normalizePath('', opt), '');
      assert.deepStrictEqual(normalizePath('index', opt), 'index');
      assert.deepStrictEqual(normalizePath('index/', opt), 'index');
      assert.deepStrictEqual(normalizePath('a/index', opt), 'a');
      assert.deepStrictEqual(normalizePath('index/index', opt), 'index');
      assert.deepStrictEqual(normalizePath('/', opt), '/');
      assert.deepStrictEqual(normalizePath('/index', opt), '/');
      assert.deepStrictEqual(normalizePath('/index/', opt), '/index/');
      assert.deepStrictEqual(normalizePath('/index/index', opt), '/index/');
      assert.deepStrictEqual(normalizePath('/a/index', opt), '/a');
      assert.deepStrictEqual(normalizePath('a/index/', opt), 'a/index/');
      assert.deepStrictEqual(normalizePath('a/index/index', opt), 'a/index/');
      assert.deepStrictEqual(normalizePath('a/b/index', opt), 'a/b');
      assert.deepStrictEqual(normalizePath('./index', opt), '.');
      assert.deepStrictEqual(normalizePath('./index/', opt), './index/');
      assert.deepStrictEqual(normalizePath('./index/index', opt), './index/');
      assert.deepStrictEqual(normalizePath('./a/index', opt), './a');
      assert.deepStrictEqual(normalizePath('../index', opt), '..');
      assert.deepStrictEqual(normalizePath('../index/', opt), '../index/');
      assert.deepStrictEqual(normalizePath('../index/index', opt), '../index/');
      assert.deepStrictEqual(normalizePath('../a/index', opt), '../a');
    });
    test('nodeProtocol: always', () => {
      const opt: Configuration = { nodeProtocol: 'always' };
      assert.deepStrictEqual(normalizePath('', opt), '');
      assert.deepStrictEqual(normalizePath('aaa', opt), 'aaa');
      assert.deepStrictEqual(normalizePath('assert', opt), 'node:assert');
      assert.deepStrictEqual(normalizePath('node:aaa', opt), 'node:aaa');
      assert.deepStrictEqual(normalizePath('node:assert', opt), 'node:assert');
    });
    test('nodeProtocol: none', () => {
      const opt: Configuration = { nodeProtocol: 'none' };
      assert.deepStrictEqual(normalizePath('', opt), '');
      assert.deepStrictEqual(normalizePath('aaa', opt), 'aaa');
      assert.deepStrictEqual(normalizePath('assert', opt), 'assert');
      assert.deepStrictEqual(normalizePath('node:aaa', opt), 'node:aaa');
      assert.deepStrictEqual(normalizePath('node:assert', opt), 'assert');
    });
    test('nodeProtocol: preserve', () => {
      const opt: Configuration = { nodeProtocol: 'preserve' };
      assert.deepStrictEqual(normalizePath('', opt), '');
      assert.deepStrictEqual(normalizePath('aaa', opt), 'aaa');
      assert.deepStrictEqual(normalizePath('assert', opt), 'assert');
      assert.deepStrictEqual(normalizePath('node:aaa', opt), 'node:aaa');
      assert.deepStrictEqual(normalizePath('node:assert', opt), 'node:assert');
    });
    test('isURL', () => {
      assert.deepStrictEqual(normalizePath('http://example.com'), 'http://example.com');
      assert.deepStrictEqual(
        normalizePath('https://esm.sh/clsx@1.2.1'),
        'https://esm.sh/clsx@1.2.1',
      );
    });
  });
  describe('normalize', () => {
    test('forward-slash', () => {
      assert.deepStrictEqual(normalize(''), '');
      assert.deepStrictEqual(normalize('a'), 'a');
      assert.deepStrictEqual(normalize('a/'), 'a/');
      assert.deepStrictEqual(normalize('a/b'), 'a/b');
      assert.deepStrictEqual(normalize('a/b/'), 'a/b/');
      assert.deepStrictEqual(normalize('a/b/.'), 'a/b');
      assert.deepStrictEqual(normalize('a/b/./'), 'a/b/');
      assert.deepStrictEqual(normalize('a/b/./..'), 'a');
      assert.deepStrictEqual(normalize('a/b/./../'), 'a/');
      assert.deepStrictEqual(normalize('a/b/..'), 'a');
      assert.deepStrictEqual(normalize('a/b/../'), 'a/');
      assert.deepStrictEqual(normalize('a/b/../.'), 'a');
      assert.deepStrictEqual(normalize('a/b/.././'), 'a/');
      assert.deepStrictEqual(normalize('.a'), '.a');
      assert.deepStrictEqual(normalize('.a/'), '.a/');
      assert.deepStrictEqual(normalize('.a/b'), '.a/b');
      assert.deepStrictEqual(normalize('.a/b/'), '.a/b/');
      assert.deepStrictEqual(normalize('.a/b/.'), '.a/b');
      assert.deepStrictEqual(normalize('.a/b/./'), '.a/b/');
      assert.deepStrictEqual(normalize('.a/b/./..'), '.a');
      assert.deepStrictEqual(normalize('.a/b/./../'), '.a/');
      assert.deepStrictEqual(normalize('.a/b/..'), '.a');
      assert.deepStrictEqual(normalize('.a/b/../'), '.a/');
      assert.deepStrictEqual(normalize('.a/b/../.'), '.a');
      assert.deepStrictEqual(normalize('.a/b/.././'), '.a/');
      assert.deepStrictEqual(normalize('.'), './');
      assert.deepStrictEqual(normalize('./'), './');
      assert.deepStrictEqual(normalize('./a'), './a');
      assert.deepStrictEqual(normalize('./a/'), './a/');
      assert.deepStrictEqual(normalize('./a/b'), './a/b');
      assert.deepStrictEqual(normalize('./a/b/'), './a/b/');
      assert.deepStrictEqual(normalize('./a/b/.'), './a/b');
      assert.deepStrictEqual(normalize('./a/b/./'), './a/b/');
      assert.deepStrictEqual(normalize('./a/b/./..'), './a');
      assert.deepStrictEqual(normalize('./a/b/./../'), './a/');
      assert.deepStrictEqual(normalize('./a/b/..'), './a');
      assert.deepStrictEqual(normalize('./a/b/../'), './a/');
      assert.deepStrictEqual(normalize('./a/b/../.'), './a');
      assert.deepStrictEqual(normalize('./a/b/.././'), './a/');
      assert.deepStrictEqual(normalize('..'), '../');
      assert.deepStrictEqual(normalize('../'), '../');
      assert.deepStrictEqual(normalize('../a'), '../a');
      assert.deepStrictEqual(normalize('../a/'), '../a/');
      assert.deepStrictEqual(normalize('../a/b'), '../a/b');
      assert.deepStrictEqual(normalize('../a/b/'), '../a/b/');
      assert.deepStrictEqual(normalize('../a/b/.'), '../a/b');
      assert.deepStrictEqual(normalize('../a/b/./'), '../a/b/');
      assert.deepStrictEqual(normalize('../a/b/./..'), '../a');
      assert.deepStrictEqual(normalize('../a/b/./../'), '../a/');
      assert.deepStrictEqual(normalize('../a/b/..'), '../a');
      assert.deepStrictEqual(normalize('../a/b/../'), '../a/');
      assert.deepStrictEqual(normalize('../a/b/../.'), '../a');
      assert.deepStrictEqual(normalize('../a/b/.././'), '../a/');
      assert.deepStrictEqual(normalize('./.'), './');
      assert.deepStrictEqual(normalize('././'), './');
      assert.deepStrictEqual(normalize('./..'), '../');
      assert.deepStrictEqual(normalize('./../'), '../');
      assert.deepStrictEqual(normalize('../.'), '../');
      assert.deepStrictEqual(normalize('.././'), '../');
      assert.deepStrictEqual(normalize('../..'), '../../', '../..');
      assert.deepStrictEqual(normalize('../../'), '../../');
      assert.deepStrictEqual(normalize('a//b'), 'a/b');
      assert.deepStrictEqual(normalize('a//b//'), 'a/b/');
    });
    test('back-slash', () => {
      assert.deepStrictEqual(normalize('a'), 'a');
      assert.deepStrictEqual(normalize('a\\'), 'a/');
      assert.deepStrictEqual(normalize('a\\b'), 'a/b');
      assert.deepStrictEqual(normalize('a\\b\\'), 'a/b/');
      assert.deepStrictEqual(normalize('a\\b\\.'), 'a/b');
      assert.deepStrictEqual(normalize('a\\b\\.\\'), 'a/b/');
      assert.deepStrictEqual(normalize('a\\b\\.\\..'), 'a');
      assert.deepStrictEqual(normalize('a\\b\\.\\..\\'), 'a/');
      assert.deepStrictEqual(normalize('a\\b\\..'), 'a');
      assert.deepStrictEqual(normalize('a\\b\\..\\'), 'a/');
      assert.deepStrictEqual(normalize('a\\b\\..\\.'), 'a');
      assert.deepStrictEqual(normalize('a\\b\\..\\.\\'), 'a/');
      assert.deepStrictEqual(normalize('.'), './');
      assert.deepStrictEqual(normalize('.\\'), './');
      assert.deepStrictEqual(normalize('.\\a'), './a');
      assert.deepStrictEqual(normalize('.\\a\\'), './a/');
      assert.deepStrictEqual(normalize('.\\a\\b'), './a/b');
      assert.deepStrictEqual(normalize('.\\a\\b\\'), './a/b/');
      assert.deepStrictEqual(normalize('.\\a\\b\\.'), './a/b');
      assert.deepStrictEqual(normalize('.\\a\\b\\.\\'), './a/b/');
      assert.deepStrictEqual(normalize('.\\a\\b\\.\\..'), './a');
      assert.deepStrictEqual(normalize('.\\a\\b\\.\\..\\'), './a/');
      assert.deepStrictEqual(normalize('.\\a\\b\\..'), './a');
      assert.deepStrictEqual(normalize('.\\a\\b\\..\\'), './a/');
      assert.deepStrictEqual(normalize('.\\a\\b\\..\\.'), './a');
      assert.deepStrictEqual(normalize('.\\a\\b\\..\\.\\'), './a/');
      assert.deepStrictEqual(normalize('..'), '../');
      assert.deepStrictEqual(normalize('..\\'), '../');
      assert.deepStrictEqual(normalize('..\\a'), '../a');
      assert.deepStrictEqual(normalize('..\\a\\'), '../a/');
      assert.deepStrictEqual(normalize('..\\a\\b'), '../a/b');
      assert.deepStrictEqual(normalize('..\\a\\b\\'), '../a/b/');
      assert.deepStrictEqual(normalize('..\\a\\b\\.'), '../a/b');
      assert.deepStrictEqual(normalize('..\\a\\b\\.\\'), '../a/b/');
      assert.deepStrictEqual(normalize('..\\a\\b\\.\\..'), '../a');
      assert.deepStrictEqual(normalize('..\\a\\b\\.\\..\\'), '../a/');
      assert.deepStrictEqual(normalize('..\\a\\b\\..'), '../a');
      assert.deepStrictEqual(normalize('..\\a\\b\\..\\'), '../a/');
      assert.deepStrictEqual(normalize('..\\a\\b\\..\\.'), '../a');
      assert.deepStrictEqual(normalize('..\\a\\b\\..\\.\\'), '../a/');
      assert.deepStrictEqual(normalize('.\\.'), './');
      assert.deepStrictEqual(normalize('.\\.\\'), './');
      assert.deepStrictEqual(normalize('.\\..'), '../');
      assert.deepStrictEqual(normalize('.\\..\\'), '../');
      assert.deepStrictEqual(normalize('..\\.'), '../');
      assert.deepStrictEqual(normalize('..\\.\\'), '../');
      assert.deepStrictEqual(normalize('..\\..'), '../../', '../..');
      assert.deepStrictEqual(normalize('..\\..\\'), '../../');
      assert.deepStrictEqual(normalize('C:\\'), 'C:/');
      assert.deepStrictEqual(normalize('C:\\a'), 'C:/a');
      assert.deepStrictEqual(normalize('C:\\a\\'), 'C:/a/');
      assert.deepStrictEqual(normalize('a\\\\b'), 'a/b');
      assert.deepStrictEqual(normalize('a\\\\b\\\\'), 'a/b/');
    });
  });
  describe('removeLastSlash', () => {
    test('all', () => {
      assert.deepStrictEqual(removeLastSlash(''), '');
      assert.deepStrictEqual(removeLastSlash('/'), '/');
      assert.deepStrictEqual(removeLastSlash('/a'), '/a');
      assert.deepStrictEqual(removeLastSlash('/a/'), '/a');
      assert.deepStrictEqual(removeLastSlash('.'), '.');
      assert.deepStrictEqual(removeLastSlash('./'), '.');
      assert.deepStrictEqual(removeLastSlash('./a'), './a');
      assert.deepStrictEqual(removeLastSlash('./a/'), './a');
      assert.deepStrictEqual(removeLastSlash('..'), '..');
      assert.deepStrictEqual(removeLastSlash('../'), '..');
      assert.deepStrictEqual(removeLastSlash('../a'), '../a');
      assert.deepStrictEqual(removeLastSlash('../a/'), '../a');
      assert.deepStrictEqual(removeLastSlash('a'), 'a');
      assert.deepStrictEqual(removeLastSlash('a/'), 'a');
      assert.deepStrictEqual(removeLastSlash('a/b'), 'a/b');
      assert.deepStrictEqual(removeLastSlash('a/b/'), 'a/b');
    });
  });
  describe('removeLastIndex', () => {
    test('index', () => {
      const I = 'index';
      assert.deepStrictEqual(removeLastIndex(''), '');
      assert.deepStrictEqual(removeLastIndex(I), I);
      assert.deepStrictEqual(removeLastIndex(I + '/'), I + '/');
      assert.deepStrictEqual(removeLastIndex(I + '/a'), I + '/a');
      assert.deepStrictEqual(removeLastIndex(I + '/' + I), I, I + '/' + I);
      assert.deepStrictEqual(removeLastIndex('a' + I), 'a' + I);
      assert.deepStrictEqual(removeLastIndex('a/' + I), 'a');
      assert.deepStrictEqual(removeLastIndex('a/a' + I), 'a/a' + I);
      assert.deepStrictEqual(removeLastIndex('a/' + I + '/'), 'a/' + I + '/');
      assert.deepStrictEqual(removeLastIndex('a/' + I + '/' + I), 'a/' + I + '/');
      assert.deepStrictEqual(removeLastIndex('/'), '/');
      assert.deepStrictEqual(removeLastIndex('/' + I), '/');
      assert.deepStrictEqual(removeLastIndex('/' + I + '/'), '/' + I + '/');
      assert.deepStrictEqual(removeLastIndex('/' + I + '/' + I), '/' + I + '/');
      assert.deepStrictEqual(removeLastIndex('/a' + I), '/a' + I);
      assert.deepStrictEqual(removeLastIndex('/a/' + I), '/a');
      assert.deepStrictEqual(removeLastIndex('.'), '.');
      assert.deepStrictEqual(removeLastIndex('.' + I), '.' + I);
      assert.deepStrictEqual(removeLastIndex('./'), './');
      assert.deepStrictEqual(removeLastIndex('./' + I), './');
      assert.deepStrictEqual(removeLastIndex('./' + I + '/'), './' + I + '/');
      assert.deepStrictEqual(removeLastIndex('./' + I + '/' + I), './' + I + '/');
      assert.deepStrictEqual(removeLastIndex('./a' + I), './a' + I);
      assert.deepStrictEqual(removeLastIndex('./a/' + I), './a');
      assert.deepStrictEqual(removeLastIndex('..'), '..');
      assert.deepStrictEqual(removeLastIndex('..' + I), '..' + I);
      assert.deepStrictEqual(removeLastIndex('../'), '../');
      assert.deepStrictEqual(removeLastIndex('../' + I), '../');
      assert.deepStrictEqual(removeLastIndex('../' + I + '/'), '../' + I + '/');
      assert.deepStrictEqual(removeLastIndex('../' + I + '/' + I), '../' + I + '/');
      assert.deepStrictEqual(removeLastIndex('../a' + I), '../a' + I);
      assert.deepStrictEqual(removeLastIndex('../a/' + I), '../a');
    });
    test('index.js', () => {
      const I = 'index.js';
      assert.deepStrictEqual(removeLastIndex(''), '');
      assert.deepStrictEqual(removeLastIndex(I), I);
      assert.deepStrictEqual(removeLastIndex(I + '/'), I + '/');
      assert.deepStrictEqual(removeLastIndex(I + '/a'), I + '/a');
      assert.deepStrictEqual(removeLastIndex(I + '/' + I), I, I + '/' + I);
      assert.deepStrictEqual(removeLastIndex('a' + I), 'a' + I);
      assert.deepStrictEqual(removeLastIndex('a/' + I), 'a');
      assert.deepStrictEqual(removeLastIndex('a/a' + I), 'a/a' + I);
      assert.deepStrictEqual(removeLastIndex('a/' + I + '/'), 'a/' + I + '/');
      assert.deepStrictEqual(removeLastIndex('a/' + I + '/' + I), 'a/' + I + '/');
      assert.deepStrictEqual(removeLastIndex('/'), '/');
      assert.deepStrictEqual(removeLastIndex('/' + I), '/');
      assert.deepStrictEqual(removeLastIndex('/' + I + '/'), '/' + I + '/');
      assert.deepStrictEqual(removeLastIndex('/' + I + '/' + I), '/' + I + '/');
      assert.deepStrictEqual(removeLastIndex('/a' + I), '/a' + I);
      assert.deepStrictEqual(removeLastIndex('/a/' + I), '/a');
      assert.deepStrictEqual(removeLastIndex('.'), '.');
      assert.deepStrictEqual(removeLastIndex('.' + I), '.' + I);
      assert.deepStrictEqual(removeLastIndex('./'), './');
      assert.deepStrictEqual(removeLastIndex('./' + I), './');
      assert.deepStrictEqual(removeLastIndex('./' + I + '/'), './' + I + '/');
      assert.deepStrictEqual(removeLastIndex('./' + I + '/' + I), './' + I + '/');
      assert.deepStrictEqual(removeLastIndex('./a' + I), './a' + I);
      assert.deepStrictEqual(removeLastIndex('./a/' + I), './a');
      assert.deepStrictEqual(removeLastIndex('..'), '..');
      assert.deepStrictEqual(removeLastIndex('..' + I), '..' + I);
      assert.deepStrictEqual(removeLastIndex('../'), '../');
      assert.deepStrictEqual(removeLastIndex('../' + I), '../');
      assert.deepStrictEqual(removeLastIndex('../' + I + '/'), '../' + I + '/');
      assert.deepStrictEqual(removeLastIndex('../' + I + '/' + I), '../' + I + '/');
      assert.deepStrictEqual(removeLastIndex('../a' + I), '../a' + I);
      assert.deepStrictEqual(removeLastIndex('../a/' + I), '../a');
    });
    test('index.jsx', () => {
      const I = 'index.jsx';
      assert.deepStrictEqual(removeLastIndex(''), '');
      assert.deepStrictEqual(removeLastIndex(I), I);
      assert.deepStrictEqual(removeLastIndex(I + '/'), I + '/');
      assert.deepStrictEqual(removeLastIndex(I + '/a'), I + '/a');
      assert.deepStrictEqual(removeLastIndex(I + '/' + I), I, I + '/' + I);
      assert.deepStrictEqual(removeLastIndex('a' + I), 'a' + I);
      assert.deepStrictEqual(removeLastIndex('a/' + I), 'a');
      assert.deepStrictEqual(removeLastIndex('a/a' + I), 'a/a' + I);
      assert.deepStrictEqual(removeLastIndex('a/' + I + '/'), 'a/' + I + '/');
      assert.deepStrictEqual(removeLastIndex('a/' + I + '/' + I), 'a/' + I + '/');
      assert.deepStrictEqual(removeLastIndex('/'), '/');
      assert.deepStrictEqual(removeLastIndex('/' + I), '/');
      assert.deepStrictEqual(removeLastIndex('/' + I + '/'), '/' + I + '/');
      assert.deepStrictEqual(removeLastIndex('/' + I + '/' + I), '/' + I + '/');
      assert.deepStrictEqual(removeLastIndex('/a' + I), '/a' + I);
      assert.deepStrictEqual(removeLastIndex('/a/' + I), '/a');
      assert.deepStrictEqual(removeLastIndex('.'), '.');
      assert.deepStrictEqual(removeLastIndex('.' + I), '.' + I);
      assert.deepStrictEqual(removeLastIndex('./'), './');
      assert.deepStrictEqual(removeLastIndex('./' + I), './');
      assert.deepStrictEqual(removeLastIndex('./' + I + '/'), './' + I + '/');
      assert.deepStrictEqual(removeLastIndex('./' + I + '/' + I), './' + I + '/');
      assert.deepStrictEqual(removeLastIndex('./a' + I), './a' + I);
      assert.deepStrictEqual(removeLastIndex('./a/' + I), './a');
      assert.deepStrictEqual(removeLastIndex('..'), '..');
      assert.deepStrictEqual(removeLastIndex('..' + I), '..' + I);
      assert.deepStrictEqual(removeLastIndex('../'), '../');
      assert.deepStrictEqual(removeLastIndex('../' + I), '../');
      assert.deepStrictEqual(removeLastIndex('../' + I + '/'), '../' + I + '/');
      assert.deepStrictEqual(removeLastIndex('../' + I + '/' + I), '../' + I + '/');
      assert.deepStrictEqual(removeLastIndex('../a' + I), '../a' + I);
      assert.deepStrictEqual(removeLastIndex('../a/' + I), '../a');
    });
    test('index.ts', () => {
      const I = 'index.ts';
      assert.deepStrictEqual(removeLastIndex(''), '');
      assert.deepStrictEqual(removeLastIndex(I), I);
      assert.deepStrictEqual(removeLastIndex(I + '/'), I + '/');
      assert.deepStrictEqual(removeLastIndex(I + '/a'), I + '/a');
      assert.deepStrictEqual(removeLastIndex(I + '/' + I), I, I + '/' + I);
      assert.deepStrictEqual(removeLastIndex('a' + I), 'a' + I);
      assert.deepStrictEqual(removeLastIndex('a/' + I), 'a');
      assert.deepStrictEqual(removeLastIndex('a/a' + I), 'a/a' + I);
      assert.deepStrictEqual(removeLastIndex('a/' + I + '/'), 'a/' + I + '/');
      assert.deepStrictEqual(removeLastIndex('a/' + I + '/' + I), 'a/' + I + '/');
      assert.deepStrictEqual(removeLastIndex('/'), '/');
      assert.deepStrictEqual(removeLastIndex('/' + I), '/');
      assert.deepStrictEqual(removeLastIndex('/' + I + '/'), '/' + I + '/');
      assert.deepStrictEqual(removeLastIndex('/' + I + '/' + I), '/' + I + '/');
      assert.deepStrictEqual(removeLastIndex('/a' + I), '/a' + I);
      assert.deepStrictEqual(removeLastIndex('/a/' + I), '/a');
      assert.deepStrictEqual(removeLastIndex('.'), '.');
      assert.deepStrictEqual(removeLastIndex('.' + I), '.' + I);
      assert.deepStrictEqual(removeLastIndex('./'), './');
      assert.deepStrictEqual(removeLastIndex('./' + I), './');
      assert.deepStrictEqual(removeLastIndex('./' + I + '/'), './' + I + '/');
      assert.deepStrictEqual(removeLastIndex('./' + I + '/' + I), './' + I + '/');
      assert.deepStrictEqual(removeLastIndex('./a' + I), './a' + I);
      assert.deepStrictEqual(removeLastIndex('./a/' + I), './a');
      assert.deepStrictEqual(removeLastIndex('..'), '..');
      assert.deepStrictEqual(removeLastIndex('..' + I), '..' + I);
      assert.deepStrictEqual(removeLastIndex('../'), '../');
      assert.deepStrictEqual(removeLastIndex('../' + I), '../');
      assert.deepStrictEqual(removeLastIndex('../' + I + '/'), '../' + I + '/');
      assert.deepStrictEqual(removeLastIndex('../' + I + '/' + I), '../' + I + '/');
      assert.deepStrictEqual(removeLastIndex('../a' + I), '../a' + I);
      assert.deepStrictEqual(removeLastIndex('../a/' + I), '../a');
    });
    test('index.tsx', () => {
      const I = 'index.tsx';
      assert.deepStrictEqual(removeLastIndex(''), '');
      assert.deepStrictEqual(removeLastIndex(I), I);
      assert.deepStrictEqual(removeLastIndex(I + '/'), I + '/');
      assert.deepStrictEqual(removeLastIndex(I + '/a'), I + '/a');
      assert.deepStrictEqual(removeLastIndex(I + '/' + I), I, I + '/' + I);
      assert.deepStrictEqual(removeLastIndex('a' + I), 'a' + I);
      assert.deepStrictEqual(removeLastIndex('a/' + I), 'a');
      assert.deepStrictEqual(removeLastIndex('a/a' + I), 'a/a' + I);
      assert.deepStrictEqual(removeLastIndex('a/' + I + '/'), 'a/' + I + '/');
      assert.deepStrictEqual(removeLastIndex('a/' + I + '/' + I), 'a/' + I + '/');
      assert.deepStrictEqual(removeLastIndex('/'), '/');
      assert.deepStrictEqual(removeLastIndex('/' + I), '/');
      assert.deepStrictEqual(removeLastIndex('/' + I + '/'), '/' + I + '/');
      assert.deepStrictEqual(removeLastIndex('/' + I + '/' + I), '/' + I + '/');
      assert.deepStrictEqual(removeLastIndex('/a' + I), '/a' + I);
      assert.deepStrictEqual(removeLastIndex('/a/' + I), '/a');
      assert.deepStrictEqual(removeLastIndex('.'), '.');
      assert.deepStrictEqual(removeLastIndex('.' + I), '.' + I);
      assert.deepStrictEqual(removeLastIndex('./'), './');
      assert.deepStrictEqual(removeLastIndex('./' + I), './');
      assert.deepStrictEqual(removeLastIndex('./' + I + '/'), './' + I + '/');
      assert.deepStrictEqual(removeLastIndex('./' + I + '/' + I), './' + I + '/');
      assert.deepStrictEqual(removeLastIndex('./a' + I), './a' + I);
      assert.deepStrictEqual(removeLastIndex('./a/' + I), './a');
      assert.deepStrictEqual(removeLastIndex('..'), '..');
      assert.deepStrictEqual(removeLastIndex('..' + I), '..' + I);
      assert.deepStrictEqual(removeLastIndex('../'), '../');
      assert.deepStrictEqual(removeLastIndex('../' + I), '../');
      assert.deepStrictEqual(removeLastIndex('../' + I + '/'), '../' + I + '/');
      assert.deepStrictEqual(removeLastIndex('../' + I + '/' + I), '../' + I + '/');
      assert.deepStrictEqual(removeLastIndex('../a' + I), '../a' + I);
      assert.deepStrictEqual(removeLastIndex('../a/' + I), '../a');
    });
  });
});
