/**
 * This is for keeping unused names.
 *
 * `string` elements will be expanded to `{ path: element }`.
 */
export type KeepUnusedRule =
  | string
  | {
      /**
       * Import path pattern.
       *
       * If it's _undefined_ or empty, the rule will be ignored.
       */
      path: string;
      /**
       * Imported name pattern.
       *
       * If it's _undefined_ or empty, all names will match.
       */
      names?: string[];
    };
