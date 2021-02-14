export interface WrappingRule {
  /**
   * Max binding names per line before wrapping for imports. 0 for no limit. Default to _1_.
   */
  readonly maxBindingNamesPerLine?: number;
  /**
   * Max default and binding names per line before wrapping for imports. 0 for no limit. Default
   * to _2_.
   */
  readonly maxDefaultAndBindingNamesPerLine?: number;
  /**
   * Max binding names per line before wrapping for exports. 0 for no limit. Default to _0_.
   */
  readonly maxExportNamesPerLine?: number;
  /**
   * Max names on wrapped lines for imports/exports. 0 for no limit. Default to _1_.
   */
  readonly maxNamesPerWrappedLine?: number;
}
