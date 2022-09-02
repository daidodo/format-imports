import path, { sep } from 'node:path';

import fs from 'fs-extra';

interface FileEntry {
  relativePath: string;
  resolvedPath: string;
}

/**
 * {@link https://stackoverflow.com/a/45130990/1736817}
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
