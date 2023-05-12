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

# Format-Imports <!-- omit in toc -->

This package contains CLI and APIs to format **imports** and **exports** for **JavaScript** and **TypeScript** code.

[![npm](https://img.shields.io/npm/v/format-imports.svg)](https://www.npmjs.com/package/format-imports)
![Downloads](https://img.shields.io/npm/dm/format-imports.svg)
[![Build Status](https://github.com/daidodo/format-imports/actions/workflows/node.js.yml/badge.svg)](https://github.com/daidodo/format-imports/actions)

It's originally developed for a VSCode Plugin [JS/TS Imports/Exports Sorter](https://marketplace.visualstudio.com/items?itemName=dozerg.tsimportsorter), then extracted to standalone CLI and lib for more use cases (e.g. CI/CD) and IDEs (e.g. [IntelliJ](https://plugins.jetbrains.com/plugin/16195-js-ts-import-export-sorter)).

## [3.2.x]

### Added

- Support formatting `<script>` in Vue.
- Support [use server](https://nextjs.org/blog/next-13-4#server-actions-alpha)

# Table of contents <!-- omit in toc -->

- [Features](#features)
- [Install](#install)
- [CLI](#cli)
  - [Format Files](#format-files)
  - [Format a Directory](#format-a-directory)
  - [Check Files and Directories](#check-files-and-directories)
- [APIs](#apis)
  - [Extending Configuration](#extending-configuration)
  - [Extending JSON schemas](#extending-json-schemas)
- [Configuration Resolution](#configuration-resolution)
  - [ESLint Compatibility](#eslint-compatibility)
- [Ignoring Files or Declarations](#ignoring-files-or-declarations)
  - [Ignoring Files](#ignoring-files)
  - [Ignore Declarations](#ignore-declarations)
- [Grouping Rules](#grouping-rules)
- [Sorting Rules](#sorting-rules)
- [Keeping Unused Imports](#keeping-unused-imports)
- [Line Wrapping Style](#line-wrapping-style)
- [Monorepo Support](#monorepo-support)
- [Contribution](#contribution)
- [License](#license)

# Features

- Group and sort imports by custom rules, including sort by paths or names.
- Remove duplicated and unused names with configurable exceptions.
- Ignore files or declarations by config or inline comments.
- Respect [ESLint](https://eslint.org) and [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import) rules.
- Respect configs from [Prettier](https://prettier.io) and [EditorConfig](https://editorconfig.org).
- Preserve `'use strict/client/server'`, `///` directives, shebang (`#!`) and comments.
- Support [Type-Only imports/exports](https://devblogs.microsoft.com/typescript/announcing-typescript-3-8/#type-only-imports-exports), [Type Modifier on names](https://devblogs.microsoft.com/typescript/announcing-typescript-4-5/#type-on-import-names), [Import Assertions](https://devblogs.microsoft.com/typescript/announcing-typescript-4-5/#import-assertions) and [satisfies](https://devblogs.microsoft.com/typescript/announcing-typescript-4-9/#satisfies) operator.
- Support NodeJS builtin modules.
- Cross-platform consistency: Windows, macOS and Linux (Ubuntu).
- Monorepo friendly.
- Support formatting `<script>` in [Vue.js](https://vuejs.org).

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

- Options

  - `-o, --output path::String`

    If not set, the results will be written back to input files, or `STDOUT` when reading from `STDIN`.

    If set, the results will be written to that file. You can't specify output file when there are multiple input files.

    When there is one input file and the output path is a directory, the result will be written to a new file under the output path with the same name as the input file.

  - `--config path::String`

    If set, `format-imports` will read configurations from provided file, e.g. `path/to/import-sorter.json`. The path can be either absolute or relative to the CWD (current work directory).

    When formatting a source file, `format-imports` will try to resolve configurations specific to that source file, and then merge it with the configurations from `--config` option. Source file specific configurations will have higher precedence.

  - `-f, --force`

    Format all [supported files](docs/README.md#supported_extensions), and ignore exclude patterns/globs and file-disable comments from no matter `--config` option or source file specific configurations.

  - `-d, --dry-run`

    Test-run the command without modifying or creating any files. Useful when you're not sure what will happen and want to be cautious.

  - `-e, --extension js|ts|jsx|tsx`

    Default to `ts`.

    When reading from `STDIN`, you can specify source code type via this option. Supported types are `js`, `ts`, `jsx` and `tsx`.

    If it's not set but `--output` is provided, `format-imports` will try to infer code type from the output file extension.

  - `-l, --log`

    Show debug logs in STDOUT.

## Format a Directory

```sh
format-imports [options] DIRECTORY
```

This command formats all [supported files](docs/README.md#supported_extensions) under a directory.

- Options

  - `-o, --output path::String`

    If not set, the results will be written back to input files.

    If set, the results will be written to new files under the output directory, with the same file structure as the input directory.

    If the output directory doesn't exist, it'll be created.

  - `--config path::String`

    See above.

  - `--no-recursive`

    If not set, `format-imports` will search for [supported source files](docs/README.md#supported_extensions) recursively under the input directory.

    Otherwise, the search will be non-recursive.

  - `-f, --force`

    See above.

  - `-d, --dry-run`

    See above.

  - `-l, --log`

    See above.

## Check Files and Directories

```sh
format-imports --check [options] FILE1/DIR1 [FILE2/DIR2 ...]
```

- Options

  - `-c, --check`

    If set, `format-imports` will check if provided files/directories are formatted. No changes will be made to any of the files.

    A non-zero code will be returned if any file fails to match the format, or any other error happens.

  - `--config path::String`

    See above.

  - `--no-recursive`

    See above.

  - `-f, --force`

    Check all [supported files](docs/README.md#supported_extensions), and ignore exclude patterns/globs and file-disable comments from no matter `--config` option or source file specific configurations.

  - `-l, --log`

    See above.

# APIs

Example:

```ts
import fs from 'fs';

import {
  formatSourceFromFile,
  isFileExcludedByConfig,
  resolveConfigForFile,
} from 'format-imports';

const fileName = '/path/to/source/file.ts';

const config = resolveConfigForFile(fileName)
// Skip if file is excluded.
if (isFileExcludedByConfig(fileName, config))
  return;

const text = fs.readFileSync(fileName).toString();
// Use sync version of formatSourceFromFile()
const newText = formatSourceFromFile.sync(text, fileName, config);

if (newText === undefined)
  console.log("Everything is sorted!");
else
  console.log(newText);
```

_Caveat:_

- _Sync version of `formatSourceFromFile` and `formatSourceWithoutFile` don't support ESLint config._

Please refer to [APIs Documentation](docs/README.md) for full details.

## Extending Configuration

You might want to extend [Configuration](docs/interfaces/Configuration.md) and add your own options when integrating the APIs. It's already supported and actually working in [JS/TS Imports/Exports Sorter](https://marketplace.visualstudio.com/items?itemName=dozerg.tsimportsorter) extension.

All you need to do is defining your extended config type and using it as normal:

```ts
import {
  Configuration,
  mergeConfig,
  resolveConfigForFile,
} from 'format-imports';

interface MyConfig extends Configuration {
  sayHello?: boolean; // Must be optional
}

const initialConfig: MyConfig = initMyConfig();
const extraConfig: MyConfig = loadExtraConfig();

// Merge extended configs
const baseConfig = mergeConfig(initialConfig, extraConfig)

// Resolve extended config for source file
const config = resolveConfigForFile('/path/to/file.ts', baseConfig);

if (config.sayHello) {
  console.log('Hello!');
}

// ...
```

Please note that the new options must be **optional**.

_import-sorter.json:_

```ts
{
  "sayHello": true
  // ...
}
```

You can even customize how options are merged between configs. Please refer to [mergeConfig](docs/README.md#mergeConfig) and [DEFAULT_MERGER](docs/README.md#DEFAULT_MERGER) for more details.

## Extending JSON schemas

This package provides config JSON schemas for `import-sorter.json` and `package.json` (under `schemas/`):

<img width="527" alt="1" src="https://user-images.githubusercontent.com/8170176/109087085-b37fbe00-7704-11eb-8599-0137c69ea2e4.png">

It's recommended to update the schemas after you've extended your config, if you want the new options to be available in `import-sorter.json` and `package.json`. An example of how that works can be found in [JS/TS Imports/Exports Sorter](https://marketplace.visualstudio.com/items?itemName=dozerg.tsimportsorter) extension [source code](https://github.com/daidodo/format-imports-vscode/tree/master/schemas).

# Configuration Resolution

The following configuration sources will be checked and merged when formatting a file:

- [ESLint configuration](https://eslint.org/docs/user-guide/configuring).
- `"importSorter"` section in `package.json`
- `import-sorter.json` (File name is configurable)
- [Prettier configuration](https://github.com/prettier/prettier-vscode#configuration)
- `.editorconfig`

It's ok if any or all of them are not found, in which case default values will be used in config.

All config fields you can set in `import-sorter.json` or `package.json` under `"importSorter"` section can be found in [Configuration](docs/interfaces/Configuration.md).

## ESLint Compatibility

If installed, [ESLint](https://eslint.org) and plugins rules will be detected and consulted, so that the result code will comply to the lint rules.

Currently, the supported rules are:

- [sort-imports](../../wiki/ESLint-Compatibility#sort-imports)
- [max-len](../../wiki/ESLint-Compatibility#max-len)
- [indent](../../wiki/ESLint-Compatibility#indent)
- [eol-last](../../wiki/ESLint-Compatibility#eol-last)
- [semi](../../wiki/ESLint-Compatibility#semi)
- [comma-dangle](../../wiki/ESLint-Compatibility#comma-dangle)
- [object-curly-spacing](../../wiki/ESLint-Compatibility#object-curly-spacing)
- [import/newline-after-import](../../wiki/ESLint-Compatibility#importnewline-after-import)
- [import/no-useless-path-segments](../../wiki/ESLint-Compatibility#importno-useless-path-segments)

If there are conflicts between user config and ESLint rules, the ESLint rules will win to avoid any lint errors.

_Note: You can ignore some or all ESLint rules via [ignoreESLintRules](docs/interfaces/Configuration.md#ignoreESLintRules)._

For more info about how the conflicts are resolved, please check the [ESLint Compatibility](../../wiki/ESLint-Compatibility) wiki.

# Ignoring Files or Declarations

## Ignoring Files

There are a few ways to exclude files from inspection:

1. Add [exclude](docs/interfaces/Configuration.md#exclude) or [excludeGlob](docs/interfaces/Configuration.md#excludeGlob) patterns to [Configuration](docs/interfaces/Configuration.md), or via `package.json` or `import-sorter.json`. E.g.:

   ```json
   "exclude": ["regexPattern"],
   "excludeGlob": ["globPattern"],
   ```

   - _[mergeConfig](docs/README.md#mergeConfig) will **merge** all path patterns instead of overwrite._
   - _Use **forward-slash** (`/`) as path separator no matter in MacOS, Linux or Windows, because [isFileExcludedByConfig](docs/README.md#isFileExcludedByConfig) will normalize the file name before matching._

2. Add the following comment at the beginning of the source file and add at least one empty line after:

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

- _Excluded paths and file-disable comments are **ignored** if [force](docs/interfaces/Configuration.md#force) flag is set._

## Ignore Declarations

To exclude a specific `import` or `export` declaration from formatting, please add the following as its leading or trailing comments:

```ts
// ts-import-sorter: disable
import Excluded from 'import/sorter';
```

or

```ts
export { Excluded } from 'import/sorter'; /* ts-import-sorter: disable */
```

To disable formatting for all exports, just set [formatExports](docs/interfaces/Configuration.md#formatExports) to `false`.

# Grouping Rules

You can sorts imports into different groups separated by empty lines (configurable), based on the rules defined in [groupRules](docs/interfaces/Configuration.md#groupRules).

A grouping rule defines:

- Types of imports to apply.
- Path pattern to match.
- How to sort imports, by paths or first names, inside the group.
- [Sorting Rules](../../wiki/Sorting-Rules) for paths and names within the group.
- Sub-groups to further adjust the order.

_Notes:_

- _There are NO blank lines between sub-groups._
- _Use [emptyLinesBetweenGroups](docs/interfaces/Configuration.md#emptyLinesBetweenGroups) to change empty lines between groups._
- _A group can have its own [sortImportsBy](docs/interfaces/grouprule.md#sortImportsBy) regardless of the global option, and sub groups will respect it._

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

For a complete guide, please refer to [the Wiki](../../wiki/Grouping-Rules).

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

You can also disable sorting by assigning `"none"` to `sortRules` or its members, e.g.:

```json
"sortRules": "none"
```

or

```json
"sortRules": {
  "paths": "none",
  "names": "none"
}
```

If you set `paths` to `"none"`, import declarations will not be sorted.

If you set `names` to `"none"`, names will not be sorted within an import or export declaration.

_Note:_

- Setting `paths` or `names` to `null` doesn't disable sorting but uses the fall-back sorting rules, i.e. `["AZ", "_", "az"]`.

For more details and how to construct your own rules, please read [the Wiki](../../wiki/Sorting-Rules).

# Keeping Unused Imports

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
- _By default, [keepUnused](docs/interfaces/Configuration.md#keepUnused) array is empty, i.e. DON'T keep any unused imports._
- _To keep ALL unused imports you can simply set:_

```json
"keepUnused": [".*"]
```

# Line Wrapping Style

You can determine when and how an import/export declaration is wrapped, e.g. how many binding names are allowed before wrapping.

There is also a preset style compatible with [Prettier](https://prettier.io), that could be useful when, e.g., you are using `prettier --check` in your CI/CD process.

For details please refer to [the Wiki](../../wiki/Line-Wrapping-Style).

# Monorepo Support

When reading config from `import-sorter.json` or `package.json`, Format-Imports will automatically look for them in the directory of the file to be formatted, and in successive parent directories all the way up to the root directory of the filesystem (unless `"root": true` is specified).

Multiple `import-sorter.json` or `package.json` files can be useful when you want different configurations for different sub projects of your monorepo, while common settings are kept in the root `import-sorter.json` or `package.json`. When there is a conflict, the sub project (more localized) config will take precedence.

# Contribution

This is an open source project so your contribution will be well appreciated. Please refer to [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

# License

MIT © Zhao DAI <daidodo@gmail.com>
