import { SortRules } from './sorting';

/**
 * Different types of imports:
 * - _scripts_: Script imports, e.g. `import 'some_scripts'`.
 * - _multiple_: Import multiple names, e.g.:
 * ```ts
 *   import A, {B, C} from 'a';
 *   import A, * as B from 'a';
 * ```
 * - _single_: Import single name, e.g.:
 * ```ts
 *   import A from 'a';
 *   import { A } from 'a';
 * ```
 * - _namespace_: Import a namespace, e.g.:
 * ```ts
 *   import * as A from 'a';
 * ```
 * - _named_: All _multiple_, _single_ and _namespace_ combined.
 * - _all_: All _scripts_ and _named_ combined.
 */
export type FlagSymbol = 'scripts' | 'multiple' | 'single' | 'namespace' | 'named' | 'all';

export interface GroupRule {
  /**
   * Types of imports this group supports.
   *
   * If _undefined_, infer the flags from its parent and sub groups.
   */
  flags?: FlagSymbol | FlagSymbol[];

  /**
   * Import path pattern.
   *
   * An import matching the pattern will fall into this group.
   *
   * If it's _undefined_, only imports matching one of [subGroups](#subGroups) fall into this group.
   *
   * If both [regex](#regex) and [subGroups](#subGroups) are _undefined_, then this is a _fall-back_ group,
   * i.e. any paths don't match any other groups will fall into this group.
   */
  regex?: string;

  /**
   * Whether to accept `import` or `import type`:
   *
   * - If it's _true_, the group accepts only `import type`;
   * - If it's _false_, the group accepts only `import`;
   * - If it's _undefined_, the group accepts both.
   *
   * Default to _undefined_.
   */
  importType?: boolean;

  /**
   * Whether to accept NodeJS builtin modules:
   *
   * - If it's _true_, the group accepts only builtin module imports, e.g.:
   * ```ts
   *   import fs from 'fs'`;
   *   import { sep } from 'node:path';
   * ```
   * - If it's _false_, the group accepts only non-builtin module imports, e.g.:
   * ```ts
   *   import React from 'react';
   *   import A from '@my_module';
   *   import { B } from './some/path';
   * ```
   * - If it's _undefined_, the group accepts both.
   */
  builtin?: boolean;

  /**
   * Sort import statements by paths or first names.
   *
   * If it's _undefined_, then use the parent's value, or _paths_ if this is a top group.
   *
   * If by paths, the result is:
   *
   * ```ts
   * import B from 'a';
   * import A from 'b';
   * ```
   *
   * If by names, the result is:
   *
   * ```ts
   * import A from 'b';
   * import B from 'a';
   * ```
   */
  sortImportsBy?: 'paths' | 'names';

  /**
   * Sorting rules for this group.
   *
   * If it's _undefined_, or either/both [paths](sortrules.md#paths) or [names](sortrules.md#names) is
   * _undefined_, then inherit either/both from the parent.
   *
   * If it's _none_, or either/both [paths](sortrules.md#paths) or [names](sortrules.md#names) is
   * _none_, then don't sort either/both of them.
   */
  sort?: 'none' | SortRules;

  /**
   * Sub-groups and rules. Imports will be sorted as the same order as sub groups defined.
   * - `string` items will be expanded to `{ regex: elem }`.
   * - `string[]` items will be expanded to `{ subGroups: elem }`.
   */
  subGroups?: (string | string[] | GroupRule)[];
}

export function breakFlag(flag: FlagSymbol): FlagSymbol[] {
  switch (flag) {
    case 'all':
      return ['scripts', ...breakFlag('named')];
    case 'named':
      return ['multiple', 'single', 'namespace'];
    default:
      return [flag];
  }
}
