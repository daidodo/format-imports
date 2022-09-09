/**
 * Get parent folder for a file. It's different from `path.join(fileName, '..')`.
 */
export function parentFolder(fileName: string | undefined | null) {
  if (!fileName) return '';
  const p = fileName.replace(/\/+/g, '/').replace(/\\+/g, '\\');
  const i = p.search(/[\\/][^\\/]*$/);
  if (i < 0) return '';
  if (i === 0) return /[\\/]$/.test(p) ? '' : p.substr(0, 1);
  return p.substring(0, i);
}
