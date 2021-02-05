<!-- markdownlint-configure-file
{
  "no-inline-html": {
    "allowed_elements": ["img"]
  },
  "no-duplicate-heading": {
    "siblings_only": true
  }
}
-->

# format-imports

This package contains CLI and APIs to format **imports** and **exports** for **JavaScript** and **TypeScript** code.

It's originally developed for a VSCode Plugin [JS/TS Imports/Exports Sorter](https://marketplace.visualstudio.com/items?itemName=dozerg.tsimportsorter), then extracted to standalone CLI and lib for more use cases (e.g. CI/CD) and editors (hopefully).

## [1.0] Release Notes

### Added

- Publish APIs: `formatSource`, `resolveConfigForFile`, `isFileExcludedByConfig` and more.
- Release CLI `format-imports`.

# Table of contents

<!--Updated via `gh-md-toc --insert ./README.md`-->
<!--ts-->

- [Features](#features)
- [How to use](#how-to-use)
- [Extension Settings](#extension-settings)
- [Configuration](#configuration)
  - [ESLint Compatibility](#eslint-compatibility)
- [Ignore files or declarations](#ignore-files-or-declarations)
- [Maximum names per line](#maximum-names-per-line)
  - [maxBindingNamesPerLine](#maxbindingnamesperline)
  - [maxDefaultAndBindingNamesPerLine](#maxdefaultandbindingnamesperline)
  - [maxExportNamesPerLine](#maxexportnamesperline)
  - [maxNamesPerWrappedLine](#maxnamesperwrappedline)
- [Grouping Rules](#grouping-rules)
- [Sorting Rules](#sorting-rules)
- [Unused Imports Removal](#unused-imports-removal)
- [Contribution](#contribution)
- [Thanks](#thanks)
- [License](#license)

<!--te-->

# Features

- Group and sort imports by custom rules, including sort by paths or names.
- Remove duplicated and unused names with configurable exceptions.
- Ignore files or declarations by config or inline comments.
- Respect [ESLint](https://eslint.org) and [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import) rules.
- Respect configs from [Prettier](https://prettier.io) and [EditorConfig](https://editorconfig.org).
- Preserve `'use strict'`, `///` directives, shebang (`#!`) and comments.
- Support [Type-Only imports/exports](https://devblogs.microsoft.com/typescript/announcing-typescript-3-8/#type-only-imports-exports).
- Cross-platform consistency: Windows and MacOS.

# Install

```sh
npm i -D format-imports
```

# CLI

## Format Files

```sh
format-imports [options] [FILE1 FILE2 ...]
```

This command formats a number of given files.

If no files provided, it'll read the source from `STDIN` and format it.

### Options

#### `-o, --output path::String`

If not set, the results will be written back to input files, or `STDOUT` when reading from `STDIN`.

If set, the results will be written to that file. You can't specify output file when there are multiple input files.

When there is one input file and the output path is a directory, the result will be written to a new file under the output path with the same name as the input file.

#### `--config path::String`

If set, `format-imports` will read configurations from provided file, e.g. `path/to/import-sorter.json`. The path can be either absolute or relative to the CWD (current work directory).

When formatting a source file, `format-imports` will try to resolve configurations specific to that source file, and then merge it with the configurations from `--config` option. Source file specific configurations will have higher precedence.

#### `-f, --force`

Format all supported files, and ignore exclude patterns/globs and file-disable comments from no matter `--config` option or source file specific configurations.

#### `-d, --dry-run`

Test-run the command without modifying or creating any files. Useful when you're not sure what will be changed and want to be cautious.

#### `-e, --extension js|ts|jsx|tsx`

Default to `ts`.

When reading from `STDIN`, you can specify the source code type via this option.

If it's not set but `--output` is provided, `format-imports` will try to infer code type from output file extension.

## Format a Directory

```sh
format-imports [options] DIRECTORY
```

This command formats all supported files under a directory.

### Options

#### `-o, --output path::String`

If not set, the results will be written back to input files.

If set, the results will be written to new files under the output directory, with the same file structure as the input directory.

If the output directory doesn't exist, it'll be created.

#### `--config path::String`

See [above](#--config-pathstring).

#### `--no-recursive`

If not set, `format-imports` will search for supported source files recursively under the input directory.

Otherwise, the search will be non-recursive.

#### `-f, --force`

See [above](#-f,--force)

# Extension Settings

All VS Code settings under `"tsImportSorter"` section and their default values:

```json
// Configuration file name.
"tsImportSorter.configuration.configurationFileName": "import-sorter.json",

// When to auto format imports/exports. Valid values are 'off' or 'onSave'.
"tsImportSorter.configuration.autoFormat": "onSave",

// Whether to format exports as well.
"tsImportSorter.configuration.formatExports": true,

// Disable formatting for files matching regular expressions.
"tsImportSorter.configuration.exclude": ["node_modules"],

// Disable formatting for files matching glob patterns.
"tsImportSorter.configuration.excludeGlob": [],

// Sort import declarations by paths or first names. Valid values are 'paths' or 'names'.
"tsImportSorter.sortImportsBy": "paths",

// Grouping rules for path patterns for imports. {} is the fall-back group.
"tsImportSorter.configuration.groupRules": [
  "^react(-dom)?$",
  "^@angular/",
  "^vue$",
  {},
  "^[@]",
  "^[.]"
],

// Sorting rule for import paths. Valid values are 'none' or string array.
"tsImportSorter.configuration.sortRules.paths": ["_", "aA"],

// Sorting rule for imported/exported names. Valid values are 'none' or string array.
"tsImportSorter.configuration.sortRules.names": ["_", "aA"],

// By default all unused imports are removed. Keep some or all them around with this setting if you need.
"tsImportSorter.configuration.keepUnused": [],

// Max binding names per line before wrapping for imports. 0 for no limit.
"tsImportSorter.configuration.maxBindingNamesPerLine": 1,

// Max default and binding names per line before wrapping for imports. 0 for no limit.
"tsImportSorter.configuration.maxDefaultAndBindingNamesPerLine": 2,

// Max binding names per line before wrapping for exports. 0 for no limit.
"tsImportSorter.configuration.maxExportNamesPerLine": 0,

// Max names on wrapped lines. 0 for no limit.
"tsImportSorter.configuration.maxNamesPerWrappedLine": 1,

// Number of empty lines between groups (NOT sub-groups).
"tsImportSorter.configuration.emptyLinesBetweenGroups": 1,

// Number of empty lines after the last import declaration.
"tsImportSorter.configuration.emptyLinesAfterAllImports": 1,

// Whether to remove the last slash when normalizing paths.
"tsImportSorter.configuration.removeLastSlashInPath": false,

// Whether to remove the last 'index' when normalizing paths.
"tsImportSorter.configuration.removeLastIndexInPath": false,

// Whether to enable debug mode and print detailed logs to the output channel.
"tsImportSorter.configuration.development.enableDebug": false,
```

# Configuration

JS/TS Import/Export Sorter reads configurations from the following sources (in precedence from high to low):

- [ESLint configuration](https://eslint.org/docs/user-guide/configuring) if installed.
- `"importSorter"` section in `package.json`
- `import-sorter.json` (File name is configurable)
- [Prettier configuration](https://github.com/prettier/prettier-vscode#configuration) if installed
- `.editorconfig`
- VS Code `"editor"` and `"files"` settings
- VS Code `"tsImportSorter"` settings

Here are all configs in `package.json` under `"importSorter"` section and their default values:

```javascript
{
  "importSorter": {
    // When to auto format imports/exports. Valid values are 'off' or 'onSave'.
    "autoFormat": "onSave",

    // Whether to format exports as well.
    "formatExports": true,

    // Disable formatting for files matching regular expressions.
    "exclude": ["node_modules"],

    // Disable formatting for files matching glob patterns.
    "excludeGlob": [],

    // Sort import declarations by paths or first names. Valid values are 'paths' or 'names'.
    "sortImportsBy": "paths",

    // Grouping rules for path patterns for imports. {} is the fall-back group.
    "groupRules": ["^react(-dom)?$", "^@angular/", "^vue$", {}, "^[@]", "^[.]"],

    "sortRules": {
      // Sorting rule for import paths. Valid values are 'none' or string array.
      "paths": ["_", "aA"],

      // Sorting rule for imported/exported names. Valid values are 'none' or string array.
      "names": ["_", "aA"]
    },

    // By default all unused imports are removed. Keep some or all them around with this setting if you need.
    "keepUnused": [],

    // Max line length before wrapping. 0 for no limit.
    "maxLineLength": 80,

    // Max binding names per line before wrapping for imports. 0 for no limit.
    "maxBindingNamesPerLine": 1,

    // Max default and binding names per line before wrapping for imports. 0 for no limit.
    "maxDefaultAndBindingNamesPerLine": 2,

    // Max binding names per line before wrapping for exports. 0 for no limit.
    "maxExportNamesPerLine": 0,

    // Max names on wrapped lines. 0 for no limit.
    "maxNamesPerWrappedLine": 1,

    // Number of empty lines between groups (NOT sub-groups).
    "emptyLinesBetweenGroups": 1,

    // Number of empty lines after the last import declaration.
    "emptyLinesAfterAllImports": 1,

    // Whether to remove the last slash when normalizing paths.
    "removeLastSlashInPath": false,

    // Whether to remove the last 'index' when normalizing paths.
    "removeLastIndexInPath": false,

    // Number of spaces to replace a TAB.
    "tabSize": 2,

    // Indent lines with tabs or spaces. Valid values are 'tab' or 'space'.
    "tabType": "space",

    // Use single or double quotes. Valid values are 'single' or 'double'.
    "quoteMark": "single",

    // When to add trailing a comma for the last name. Valid values are 'none' or 'multiLine'.
    "trailingComma": "multiLine",

    // Whether to add semicolons at the end of declarations.
    "hasSemicolon": true,

    // Whether to end files with a new line.
    "insertFinalNewline": true,

    // Whether to add spaces between brackets. true for '{ id }' and false for '{id}'.
    "bracketSpacing": true
  }
}
```

`import-sorter.json` has all configs above. Example:

```json
{
  "maxLineLength": 100,
  "quoteMark": "double",
  "tabSize": 4,
  "insertFinalNewline": false
}
```

## ESLint Compatibility

If installed, [ESLint](https://eslint.org) and plugins rules will be detected and consulted, so that the result code will comply to the lint rules.

Currently supported rules are:

- [sort-imports](https://github.com/daidodo/tsimportsorter/wiki/ESLint-Compatibility#import-sorting-sort-imports)
- [import/newline-after-import](https://github.com/daidodo/tsimportsorter/wiki/ESLint-Compatibility#importnewline-after-import)
- [import/no-useless-path-segments](https://github.com/daidodo/tsimportsorter/wiki/ESLint-Compatibility#importno-useless-path-segments)

If there are conflicts between user config and ESLint rules, the ESLint rules will win to avoid any lint errors.

For more info about how the conflicts are resolved, please check the [ESLint Compatibility](https://github.com/daidodo/tsimportsorter/wiki/ESLint-Compatibility) wiki.

# Ignore files or declarations

There are a few ways to exclude files from inspection:

1. Add path patterns to `exclude` or `excludeGlob` in user or workspace settings in VSCode.

   ```json
   "tsImportSorter.configuration.exclude": ["regexPattern"],
   "tsImportSorter.configuration.excludeGlob": ["globPattern"],
   ```

2. Add path patterns to `package.json` or `import-sorter.json`.

   - _All path patterns are **merged** together instead of overwritten._
   - _Use **forward-slash** (`/`) as path separator no matter in MacOS, \*nix or Windows._

3. Add the following comment at the beginning of the source file and keep at least one empty line from the next declaration:

```ts
// ts-import-sorter: disable

[Other code]
```

or

```ts
/* ts-import-sorter: disable */

[Other code]
```

_Note:_

- _Excluded paths and file disable-comments are **ignored** if the formatting is triggered manually, i.e. from Command Palette, editor context menu or shortcut._

To exclude a specific `import` or `export` declaration from formatting, please add the following as its leading or trailing comments:

```ts
// ts-import-sorter: disable
import Excluded from 'import/sorter';
```

or

```ts
export { Excluded } from 'import/sorter'; /* ts-import-sorter: disable */
```

To disable formatting for all exports, just set `"formatExports": false` in the config.

# Maximum names per line

Whether to wrap an `import` declaration is decided by `maxBindingNamesPerLine` and `maxDefaultAndBindingNamesPerLine`, as well as `maxLineLength`.

Whether to wrap an `export` declaration is decided by `maxExportNamesPerLine`, as well as `maxLineLength`.

## `maxBindingNamesPerLine`

For a declaration importing only _binding names_, this value determines how many names are allowed before wrapping.

For example, if you set:

```json
"maxBindingNamesPerLine": 2,
```

then

```typescript
import { A } from 'a';    // No wrap as there is 1 name
import { B, C } from 'b'; // No wrap as there are 2 names

import {
  D,
  E,
  F,
} from 'c';   // Wrapped as there are more than 2 names
```

## `maxDefaultAndBindingNamesPerLine`

For a declaration importing _default_ and _binding names_, this value determines how many names are allowed before wrapping.

For example, if you set:

```json
"maxDefaultAndBindingNamesPerLine": 2,
```

then

```typescript
import A from 'a';        // No wrap as there is 1 name
import B, { C } from 'b'; // No wrap as there are 2 names
import D, {
  E,
  F,
} from 'c'; // Wrapped as there are more than 2 names
```

## `maxExportNamesPerLine`

For `export {}` or `export {} from 'x'` declarations, this value determines how many names are allowed before wrapping.

For example, if you set:

```json
"maxExportNamesPerLine": 2,
```

then

```typescript
export { A };             // No wrap as there is 1 name
export { B, C } from 'b'; // No wrap as there are 2 names
export {
  D,
  E,
  F,
} from 'c'; // Wrapped as there are more than 2 names
```

## `maxNamesPerWrappedLine`

If an import/export declaration is wrapped, this value decides how many names there are per line.

For example, if you set:

```json
"maxNamesPerWrappedLine": 2,
```

then

```typescript
import {
  A, B,
  C, D,
  E,
} from 'a'; // There are 2 names at most per wrapped line

export {
  A, B,
  C, D,
  E,
}; // There are 2 names at most per wrapped line
```

# Grouping Rules

JS/TS Import/Export Sorter can put imports into different groups separated by empty lines (configurable), based on the rules defined in `groupRules`.

A grouping rule defines:

- Types of imports to apply.
- Path pattern to match.
- How to sort imports, by paths or first names, inside the group.
- [Sorting Rules](https://github.com/daidodo/tsimportsorter/wiki/Sorting-Rules) for paths and names within the group.
- Sub-groups to further adjust the order.

_Notes:_

- _There are NO blank lines between sub-groups._
- _Use `emptyLinesBetweenGroups` to change empty lines between groups._
- _A group can have its own `sortImportsBy` regardless of the global option, and sub groups will respect it._

For example, `"groupRules": ["^react$", {}, "^[.]"]` defines 3 groups (and their order):

- `"^react$"`: matches any _named_ imports from exact path `"react"`.
- `{}`: is the fall-back group, i.e. any imports that don't match any other groups will fall into this group.
- `"^[.]"`: matches any _named_ imports from paths starting with `"."`.

The following is an example of the results:

```ts
import React from 'react';

import { TextDocument } from 'vscode';

import MyInput from './MyInput';
```

_Notes:_

- _By default, script imports are in the first group if you don't explicitly define rules for them._
- _Script imports will NOT be sorted within a (sub) group, though sub groups may change their order._
- _Exports will NOT be grouped. Grouping Rules are only for imports._

For a complete guide, please refer to [the Wiki](https://github.com/daidodo/tsimportsorter/wiki/Grouping-Rules).

# Sorting Rules

You can customize sorting rules for all imports and exports, or imports within a group, on:

- How to compare import paths;
- How to compare imported/exported names;

_Note:_

- _Exports will NOT be sorted based on paths. Only names within an export are sorted._
- _Script imports will NOT be sorted._

You can decide:

- Whether to compare letters case-sensitively or -insensitively;
- The rank among lower-case letters, upper-case letters and `'_'`;

Here is an example:

```json
"sortRules": {
  "paths": ["_", "aA"],
  "names": ["_", "aA"]
}
```

The above `["_", "aA"]` means:

- Strings are compared case-insensitively, and lower-case goes first in case of a tie.
- `[`, `\`, `]`, `^`, `_` and `` ` ``(backtick) are in front of letters (`[a-zA-Z]`).

A sorted array might be `['_', 'a', 'A', 'b', 'B']`.

You can also disable sorting by specifying `"none"` in `sortRules`, e.g.:

```json
"sortRules": {
  "paths": "none",
  "names": "none"
}
```

If you set `paths` to `"none"`, import declarations will not be sorted.

If you set `names` to `"none"`, names will not be sorted within an import or export declaration.

_Note:_

- _Setting `paths` or `names` to `null` doesn't disable sorting but uses the fall-back sorting rules, i.e. `["AZ", "_", "az"]`.\_

For more details and how to construct your own rules, please read [the Wiki](https://github.com/daidodo/tsimportsorter/wiki/Sorting-Rules).

# Unused Imports Removal

By default all unused imports are removed. In some cases you might want to keep the import even if it's unused. For example to keep `import tw from 'twin.macro'` you can do the following:

```json
"keepUnused": ["twin.macro"]
```

This is equivalent to a more verbose version:

```json
"keepUnused": [{ "path": "twin.macro" }]
```

Another example is `import styled, { css } from 'styled-components'` and if you want to keep `css` import while `styled` is removed if unused, you can achieve that with the following configuration:

```json
"keepUnused": [
  { "path": "styled-components", "names": ["css"] }
]
```

Both `path` and `names` are converted to regular expressions so you can get really wild here.

_Note:_

- _You DON'T need to add `React` ([React](https://reactjs.org)) and `h` ([Stencil](https://stenciljs.com/)) to `keepUnused` as they are handled already._
- _By default, `"keepUnused"` array is empty, i.e. DON'T keep any unused imports._
- _To keep ALL unused imports you can simply set:_

```json
"keepUnused": [".*"]
```

# Contribution

This is a community supported project so your contribution will be well appreciated. Please refer to [CONTRIBUTING.md](https://github.com/daidodo/tsimportsorter/blob/master/CONTRIBUTING.md) for more information.

# Thanks

The initiative came from [import-sorter](https://github.com/SoominHan/import-sorter).

# License

MIT
