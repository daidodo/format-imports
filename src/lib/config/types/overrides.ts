export interface OverrideRule {
  /**
   * Use this override for for files matching this regular expressions.
   *
   * If it's _undefined_ or empty, the rule will be ignored.
   */
  pattern: string;
  /**
   * The configuration file name to use for matched files.
   *
   * If it's _undefined_ or empty, the rule will be ignored.
   */
  config: string;
}
