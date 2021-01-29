import fs from 'fs';
import log4js from 'log4js';
import path, { sep } from 'path';

export function assert(condition: unknown, message?: string): asserts condition {
  if (!condition) throw Error(message ?? `Assert failed, condition = ${condition}`);
}

export function assertNonNull<T>(value: T, message?: string): asserts value is NonNullable<T> {
  if (value === undefined || value === null) {
    throw Error(message ?? `Assert Non-Null failed, value = ${value}`);
  }
}

export function logger(category?: string) {
  return log4js.getLogger(category);
}

interface FileEntry {
  relativePath: string;
  resolvedPath: string;
}

/**
 * @link https://stackoverflow.com/a/45130990/1736817
 */
export async function* getFiles(
  dir: string | FileEntry,
  noRecursive?: boolean,
): AsyncGenerator<FileEntry> {
  const { relativePath: rel, resolvedPath: res } =
    typeof dir === 'string' ? { relativePath: '', resolvedPath: dir } : dir;
  const entries = fs.readdirSync(res, { withFileTypes: true });
  for (const entry of entries) {
    const relativePath = (rel ? rel + sep : '') + entry.name;
    const resolvedPath = path.resolve(res, entry.name);
    if (entry.isFile()) yield { relativePath, resolvedPath };
    else if (!noRecursive && entry.isDirectory()) yield* getFiles({ relativePath, resolvedPath });
  }
}
