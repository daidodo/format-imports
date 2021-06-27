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

### Added

- Support ESLint [eol-last](https://eslint.org/docs/rules/eol-last) rule.
- Bugs fix.

-->

## [2.4.0] - 2021-04-29

### Added

- Add `ignoreESLintRules` config to ignore specific ESLint rules.

### Changed

- Update default `GroupRules` to group [`node:` imports](https://nodejs.org/api/esm.html#esm_node_imports) separately.

## [2.3.3] - 2021-04-09

### Added

- Support ESLint [indent](https://eslint.org/docs/rules/indent) and
  [@typescript-eslint/indent](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/indent.md)
  rules.

### Changed

- `tabWidth` from ESLint [max-len](https://eslint.org/docs/rules/max-len) doesn't impact `tabSize` config.

## [2.3.1] - 2021-04-06

### Added

- Support ESLint [max-len](https://eslint.org/docs/rules/max-len) rule.

## [2.3] - 2021-04-02

### Added

- Add `wrappingStyle.ignoreComments` to skip trailing comments when counting line length.

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
