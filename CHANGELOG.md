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

-->

## [4.0.8] - 2025-08-01

### Added

- Support [use cache](https://nextjs.org/docs/app/api-reference/directives/use-cache).


## [4.0.7] - 2024-12-16

### Added

- Support [ArkTS](https://developer.huawei.com/consumer/en/doc/harmonyos-guides-V5/introduction-to-arkts-V5) (.ets files).

## [4.0.4] - 2024-04-14

### Added

- Support [Import Attributes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-3.html#import-attributes).

## [4.0.0] - 2023-12-11

### Changes

- Change `resolveConfigForFile` to async function due to [Prettier API](https://prettier.io/docs/en/api#prettierresolveconfigfileurlorpath--options) update.

## [3.2.5] - 2023-05-19

### Added

- Support URL as module identifier.

## [3.2.4] - 2023-05-12

### Added

- Support [use server](https://nextjs.org/blog/next-13-4#server-actions-alpha)

## [3.2.0] - 2023-01-02

### Added

- Support formatting `<script>` in Vue.

## [3.1.3] - 2022-11-24

### Added

- Support TypeScript 4.9 [satisfies](https://devblogs.microsoft.com/typescript/announcing-typescript-4-9/#satisfies) operator.

## [3.1.1] - 2022-10-28

### Added

- Support React 18 [use client](https://github.com/reactjs/rfcs/blob/main/text/0227-server-module-conventions.md) directive.

## [3.1.0] - 2022-09-02

### Added

- Add `builtin` to `GroupRule` to support NodeJS builtin module imports.
- Add `nodeProtocol` to support adding or removing `"node:"` to builtin module paths.

## [3.0.5] - 2022-04-01

### Added

- Support ESLint rule [object-curly-spacing](https://eslint.org/docs/rules/object-curly-spacing) and [@typescript-eslint/object-curly-spacing](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/object-curly-spacing.md).

## [3.0.4] - 2022-03-31

### Changes

- Enable webpack.
- Prefer ESLint from user workspace.

## [3.0.0] - 2022-02-28

### Added

- Add `--log, -l` option to CLI.
- Add `formatSourceFromFile.sync` and `formatSourceWithoutFile.sync` as sync version without support to ESLint config.

### Changes

- `formatSourceFromFile` and `formatSourceWithoutFile` are changed to async functions.

## [2.4.10] - 2022-02-06

### Added

- Add `always` option for `trailingComma` config.
- Support ESLint rules:
  - [comma-dangle](https://eslint.org/docs/rules/comma-dangle)
  - [@typescript-eslint/comma-dangle](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/comma-dangle.md)
  - [@typescript-eslint/semi](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/semi.md)

## [2.4.7] - 2022-01-24

### Added

- Support ESLint [semi](https://eslint.org/docs/rules/semi) rule.

## [2.4.6] - 2022-01-23

### Added

- Support formatting [Import Assertions](https://devblogs.microsoft.com/typescript/announcing-typescript-4-5/#import-assertions).

## [2.4.4] - 2021-12-22

### Added

- Add `root` config to support monorepo projects.
- Add `preserve` option for `insertFinalNewline` config.

## [2.4.2] - 2021-12-03

### Added

- Support `type` [modifiers](https://devblogs.microsoft.com/typescript/announcing-typescript-4-5/#type-on-import-names) on import names

## [2.4.1] - 2021-06-27

### Added

- Support ESLint [eol-last](https://eslint.org/docs/rules/eol-last) rule.

### Changed

- Fix Prettier option `"trailingComma": "es5"`.

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
