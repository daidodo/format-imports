import { ExportNode } from '../parser';

/**
 * Decide which export to keep if there are multiple empty exports and no imports.
 *
 * Scenarios:
 * 1. If there are both `export {} from 'a'` and `export {}`, keep only `export {}`.
 * 2. If there are `export {} from 'a'` and `export {} from 'b'`, keep the first of them.
 */
export function decideKeep(emptyNodes: ExportNode[]) {
  const noPaths = emptyNodes.filter(n => !n.hasModuleIdentifier());
  if (noPaths.length < 1) return emptyNodes.slice(0, 1);
  return noPaths.slice(noPaths.length - 1);
}
