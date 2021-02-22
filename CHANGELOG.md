<!-- markdownlint-configure-file
{
  "no-duplicate-heading": {
    "siblings_only": true
  }
}
-->

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<!-- [Stacked changes]

-->

## [2.2] - 2021-02-22

### Added

- Add `importType` to `GroupRule` to distinguish `import` and `import type`.

## [2.1] - 2021-02-19

### Changed

- Config `sortRules` can also be `"none"` which means both `paths` and `names` are `"none"`.

## [2.0] - 2021-02-14

### Added

- Config `wrappingStyle` which can be either a preset style `"prettier"` or an object of:
  - `maxBindingNamesPerLine`
  - `maxDefaultAndBindingNamesPerLine`
  - `maxExportNamesPerLine`
  - `maxNamesPerWrappedLine`

### Removed

- Top level config:
  - `maxBindingNamesPerLine`
  - `maxDefaultAndBindingNamesPerLine`
  - `maxExportNamesPerLine`
  - `maxNamesPerWrappedLine`

## [1.0] - 2021-02-07

### Added

- Publish APIs: `formatSourceForFile`, `resolveConfigForFile`, `isFileExcludedByConfig` and more.
- Release CLI `format-imports`.
