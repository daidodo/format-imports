import isBuiltinModule from 'is-builtin-module';
import path from 'path';

import { assertTrue } from '@dozerg/condition';

import { Configuration } from '../../config';

const NODE_PROTOCOL = 'node:';

export function normalizePath(path: string, options?: Configuration) {
  const { removeLastSlashInPath, removeLastIndexInPath, nodeProtocol } = options ?? {};
  const npFn =
    nodeProtocol === 'always'
      ? addNodeProtocol
      : nodeProtocol === 'none'
      ? removeNodeProtocol
      : undefined;
  return apply(
    path,
    normalize,
    [removeLastIndex, removeLastIndexInPath],
    [removeLastSlash, removeLastSlashInPath],
    [npFn, isBuiltinModule(path)],
  );
}

// Exported for testing purpose.
export function normalize(str: string) {
  if (!str) return '';
  const r = path.normalize(str.replace(/\\/g, '/')).replace(/\\/g, '/');
  return !str.startsWith('.')
    ? r
    : !r.startsWith('.')
    ? './' + r
    : r === '.'
    ? './'
    : r.endsWith('..')
    ? r + '/'
    : r;
}

const PATTERNS = ['index', 'index.js', 'index.jsx', 'index.ts', 'index.tsx'];

// Exported for testing purpose.
export function removeLastSlash(str: string) {
  if (!str || str === '/' || !str.endsWith('/')) return str;
  /**
   * ```txt
   * "a/"       =>  "a"
   * "index/"   =>  "index"
   * "./a/"     =>  "./a"
   *
   * "./index/" =>  "./index/"
   * ```
   */
  const parts = str.split('/');
  assertTrue(parts.length > 1);
  const prev = parts[parts.length - 2];
  if (parts.length > 2 && PATTERNS.includes(prev)) return str;
  return str.substr(0, str.length - 1);
}

// Exported for testing purpose.
export function removeLastIndex(str: string) {
  if (!str) return str;
  const parts = str.split('/');
  if (parts.length < 2) return str;
  if (!PATTERNS.includes(parts[parts.length - 1])) return str;
  /**
   * ```txt
   * "./index"        => "./"
   * "../index"       =>  "../"
   * "./index/index"  =>  "./index/"
   *
   * "index/index"    => "index"
   * ```
   *
   */
  const prev = parts[parts.length - 2];
  if (prev !== '.' && prev !== '..' && (!PATTERNS.includes(prev) || parts.length < 3)) parts.pop();
  else parts[parts.length - 1] = '';
  return parts.join('/') || '/';
}

export function removeNodeProtocol(str: string) {
  return str.startsWith(NODE_PROTOCOL) ? str.slice(NODE_PROTOCOL.length) : str;
}

function addNodeProtocol(str: string) {
  return str.startsWith(NODE_PROTOCOL) ? str : NODE_PROTOCOL + str;
}

type Fn = ((s: string) => string) | undefined;

function apply(str: string, ...norms: (Fn | [Fn, boolean | undefined])[]) {
  return norms.reduce((r, n) => (Array.isArray(n) ? (n[1] ? fn(n[0], r) : r) : fn(n, r)), str);
}

function fn(f: Fn, s: string) {
  return f ? f(s) : s;
}
