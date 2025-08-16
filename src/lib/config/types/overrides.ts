export interface OverrideRule {
  /**
   * File name pattern.
   *
   * Files matching this regular expression will search for an [override config](#config) to merge onto the current one.
   * If it's _undefined_ or empty, the rule will be ignored.
   */
  pattern: string;
  /**
   * The configuration file name to use for matched files.
   *
   * This is *NOT* a path, but a name analogous to [configurationFileName](Configuration.md#configurationfilename).
   * Format-Imports will automatically look for this override in the directory of the file to be formatted,
   * and in successive parent directories all the way up to the root directory of the filesystem (`unless "root": true` is specified).
   *
   * If it's _undefined_ or empty, the rule will be ignored.
   */
  config: string;
}
