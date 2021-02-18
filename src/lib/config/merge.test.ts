import { mergeConfig } from './merge';
import { Configuration } from './types';

describe('config/merge', () => {
  describe('mergeConfig', () => {
    test('No config', () => {
      expect(mergeConfig()).toEqual({});
    });
    test('1 config', () => {
      const C: Configuration = { trailingComma: 'none', exclude: ['abc'] };
      expect(mergeConfig(C)).toEqual(C);
    });
    describe('2 configs', () => {
      describe('Common fields', () => {
        test('empty + empty', () => {
          expect(mergeConfig({}, {})).toEqual({});
        });
        test('empty + undefined', () => {
          const C: Configuration = { trailingComma: undefined };
          expect(mergeConfig({}, C)).toEqual({});
          expect(mergeConfig(C, {})).toEqual({});
        });
        test('empty + value', () => {
          const C: Configuration = { trailingComma: 'none' };
          expect(mergeConfig({}, C)).toEqual(C);
          expect(mergeConfig(C, {})).toEqual(C);
        });
        test('undefined + undefined', () => {
          const C: Configuration = { trailingComma: undefined };
          expect(mergeConfig(C, C)).toEqual({});
          expect(mergeConfig(C, C)).toEqual({});
        });
        test('undefined + value', () => {
          const C1: Configuration = { trailingComma: undefined };
          const C: Configuration = { trailingComma: 'none' };
          expect(mergeConfig(C1, C)).toEqual(C);
          expect(mergeConfig(C, C1)).toEqual(C);
        });
        test('value + value', () => {
          const C1: Configuration = { maxLineLength: 10 };
          const C: Configuration = { maxLineLength: 20 };
          expect(mergeConfig(C1, C)).toEqual(C);
        });
      });
      test('exclude', () => {
        const C1: Configuration = { exclude: ['a'], maxLineLength: 10 };
        const C2: Configuration = { exclude: ['b'], sortImportsBy: 'names' };
        const C: Configuration = {
          exclude: ['a', 'b'],
          maxLineLength: 10,
          sortImportsBy: 'names',
        };
        expect(mergeConfig(C1, C2)).toEqual(C);
      });
      test('excludeGlob', () => {
        const C1: Configuration = { excludeGlob: ['a'], maxLineLength: 10 };
        const C2: Configuration = { excludeGlob: ['b'], sortImportsBy: 'names' };
        const C: Configuration = {
          excludeGlob: ['a', 'b'],
          maxLineLength: 10,
          sortImportsBy: 'names',
        };
        expect(mergeConfig(C1, C2)).toEqual(C);
      });
      test('keepUnused', () => {
        const C1: Configuration = {
          keepUnused: ['a', { path: 'b', names: ['A'] }],
          maxLineLength: 10,
        };
        const C2: Configuration = { keepUnused: ['b'], sortImportsBy: 'names' };
        const C: Configuration = {
          keepUnused: ['a', { path: 'b', names: ['A'] }, 'b'],
          maxLineLength: 10,
          sortImportsBy: 'names',
        };
        expect(mergeConfig(C1, C2)).toEqual(C);
      });
      test('sortRules', () => {
        const C1: Configuration = {
          sortRules: { paths: ['AZ', '_'], names: ['Aa'] },
          maxLineLength: 10,
        };
        const C2: Configuration = { sortRules: { paths: ['az', '_'] }, sortImportsBy: 'names' };
        const C: Configuration = {
          sortRules: { paths: ['az', '_'], names: ['Aa'] },
          maxLineLength: 10,
          sortImportsBy: 'names',
        };
        expect(mergeConfig(C1, C2)).toEqual(C);
      });
    });
  });
});
