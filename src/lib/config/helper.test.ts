import assert from 'assert';

import { parentFolder } from './helper';

describe('config/helper', () => {
  describe('parentFolder', () => {
    test('forward-slash', () => {
      assert.deepStrictEqual(parentFolder(undefined), '');
      assert.deepStrictEqual(parentFolder(null), '');
      assert.deepStrictEqual(parentFolder(''), '');
      assert.deepStrictEqual(parentFolder('a'), '');
      assert.deepStrictEqual(parentFolder('a/'), 'a');
      assert.deepStrictEqual(parentFolder('a/b'), 'a');
      assert.deepStrictEqual(parentFolder('/'), '');
      assert.deepStrictEqual(parentFolder('/a'), '/');
      assert.deepStrictEqual(parentFolder('/a/'), '/a');
      assert.deepStrictEqual(parentFolder('/a/b'), '/a');

      assert.deepStrictEqual(parentFolder('a//'), 'a');
      assert.deepStrictEqual(parentFolder('a//b'), 'a');
      assert.deepStrictEqual(parentFolder('//'), '');
      assert.deepStrictEqual(parentFolder('//a'), '/');
      assert.deepStrictEqual(parentFolder('//a//'), '/a');
      assert.deepStrictEqual(parentFolder('//a//b'), '/a');
    });
    test('back-slash', () => {
      assert.deepStrictEqual(parentFolder('a\\'), 'a');
      assert.deepStrictEqual(parentFolder('a\\b'), 'a');
      assert.deepStrictEqual(parentFolder('\\'), '');
      assert.deepStrictEqual(parentFolder('\\a'), '\\');
      assert.deepStrictEqual(parentFolder('\\a\\'), '\\a');
      assert.deepStrictEqual(parentFolder('\\a\\b'), '\\a');

      assert.deepStrictEqual(parentFolder('a\\\\'), 'a');
      assert.deepStrictEqual(parentFolder('a\\\\b'), 'a');
      assert.deepStrictEqual(parentFolder('\\\\'), '');
      assert.deepStrictEqual(parentFolder('\\\\a'), '\\');
      assert.deepStrictEqual(parentFolder('\\\\a\\\\'), '\\a');
      assert.deepStrictEqual(parentFolder('\\\\a\\\\b'), '\\a');

      assert.deepStrictEqual(parentFolder('C:'), '');
      assert.deepStrictEqual(parentFolder('C:\\'), 'C:');
      assert.deepStrictEqual(parentFolder('C:\\a'), 'C:');
      assert.deepStrictEqual(parentFolder('C:\\a\\'), 'C:\\a');
    });
  });
});
