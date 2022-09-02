# Interface: Configuration

## Properties

### bracketSpacing

• `Optional` `Readonly` **bracketSpacing**: `boolean`

Whether to add spaces between brackets. _true_ for `{ id }` and _false_ for `{id}`. Default to
_true_.

#### Defined in

[config/types/index.ts:171](https://github.com/daidodo/format-imports/blob/c7fea1c/src/lib/config/types/index.ts#L171)

___

### configurationFileName

• `Optional` `Readonly` **configurationFileName**: `string`

JSON configuration file name. Default to _import-sorter.json_.

#### Defined in

[config/types/index.ts:33](https://github.com/daidodo/format-imports/blob/c7fea1c/src/lib/config/types/index.ts#L33)

___

### emptyLinesAfterAllImports

• `Optional` `Readonly` **emptyLinesAfterAllImports**: `number`

Number of empty lines after the last import declaration. Default to _1_.

#### Defined in

[config/types/index.ts:101](https://github.com/daidodo/format-imports/blob/c7fea1c/src/lib/config/types/index.ts#L101)

___

### emptyLinesBetweenGroups

• `Optional` `Readonly` **emptyLinesBetweenGroups**: `number`

Number of empty lines between groups (NOT sub-groups). Default to _1_.

#### Defined in

[config/types/index.ts:97](https://github.com/daidodo/format-imports/blob/c7fea1c/src/lib/config/types/index.ts#L97)

___

### exclude

• `Optional` `Readonly` **exclude**: `string`[]

Disable formatting for files matching regular expressions. Default to _["node_modules"]_.

#### Defined in

[config/types/index.ts:41](https://github.com/daidodo/format-imports/blob/c7fea1c/src/lib/config/types/index.ts#L41)

___

### excludeGlob

• `Optional` `Readonly` **excludeGlob**: `string`[]

Disable formatting for files matching glob patterns. Default to _[]_.

#### Defined in

[config/types/index.ts:45](https://github.com/daidodo/format-imports/blob/c7fea1c/src/lib/config/types/index.ts#L45)

___

### force

• `Optional` `Readonly` **force**: `boolean`

Whether to disregard [exclude](#exclude)/[excludeGlob](#excludeGlob) patterns and file-disable
comments. Default to _false_.

#### Defined in

[config/types/index.ts:187](https://github.com/daidodo/format-imports/blob/c7fea1c/src/lib/config/types/index.ts#L187)

___

### formatExports

• `Optional` `Readonly` **formatExports**: `boolean`

Whether to format exports as well as imports. Default to _true_.

#### Defined in

[config/types/index.ts:37](https://github.com/daidodo/format-imports/blob/c7fea1c/src/lib/config/types/index.ts#L37)

___

### groupRules

• `Optional` `Readonly` **groupRules**: (`string` \| [`GroupRule`](GroupRule.md) \| `string`[])[]

Grouping rules for path patterns for imports. Default to
[GROUP_RULES_DEFAULT](../README.md#GROUP_RULES_DEFAULT)

**`See`**

[Grouping Rules](../../../../wiki/Grouping-Rules)

#### Defined in

[config/types/index.ts:55](https://github.com/daidodo/format-imports/blob/c7fea1c/src/lib/config/types/index.ts#L55)

___

### hasSemicolon

• `Optional` `Readonly` **hasSemicolon**: `boolean`

Whether to add semicolons at the end of declarations. Default to _true_.

#### Defined in

[config/types/index.ts:162](https://github.com/daidodo/format-imports/blob/c7fea1c/src/lib/config/types/index.ts#L162)

___

### ignoreESLintRules

• `Optional` `Readonly` **ignoreESLintRules**: `string` \| `string`[]

Ignore ESLint rules matching regular expressions. Default to _[]_.

#### Defined in

[config/types/index.ts:182](https://github.com/daidodo/format-imports/blob/c7fea1c/src/lib/config/types/index.ts#L182)

___

### insertFinalNewline

• `Optional` `Readonly` **insertFinalNewline**: `boolean` \| ``"preserve"``

Whether to end files with a new line, or keep it as is if _preserve_ is set. Default to _true_.

#### Defined in

[config/types/index.ts:166](https://github.com/daidodo/format-imports/blob/c7fea1c/src/lib/config/types/index.ts#L166)

___

### keepUnused

• `Optional` `Readonly` **keepUnused**: [`KeepUnusedRule`](../README.md#keepunusedrule)[]

By default all unused imports are removed. Keep some or all of them around with this setting
if you need.

#### Defined in

[config/types/index.ts:93](https://github.com/daidodo/format-imports/blob/c7fea1c/src/lib/config/types/index.ts#L93)

___

### maxLineLength

• `Optional` `Readonly` **maxLineLength**: `number`

Max line length before wrapping. 0 for no limit. Default to _80_.

#### Defined in

[config/types/index.ts:113](https://github.com/daidodo/format-imports/blob/c7fea1c/src/lib/config/types/index.ts#L113)

___

### nodeProtocol

• `Optional` `Readonly` **nodeProtocol**: ``"none"`` \| ``"always"`` \| ``"preserve"``

Whether to add node protocol ("node:") to builtin module paths. Default to _preserve_.
- `always`: Always add `"node:"` to NodeJS builtin modules.
- `none`: Always remove `"node:"` for NodeJS builtin modules.
- `preserve`: Keep it as is.

#### Defined in

[config/types/index.ts:178](https://github.com/daidodo/format-imports/blob/c7fea1c/src/lib/config/types/index.ts#L178)

___

### quoteMark

• `Optional` `Readonly` **quoteMark**: ``"single"`` \| ``"double"``

Use single or double quotes. Default to _single_.

#### Defined in

[config/types/index.ts:125](https://github.com/daidodo/format-imports/blob/c7fea1c/src/lib/config/types/index.ts#L125)

___

### removeLastIndexInPath

• `Optional` `Readonly` **removeLastIndexInPath**: `boolean`

Whether to remove the last 'index' when normalizing paths. Default to _false_.

#### Defined in

[config/types/index.ts:109](https://github.com/daidodo/format-imports/blob/c7fea1c/src/lib/config/types/index.ts#L109)

___

### removeLastSlashInPath

• `Optional` `Readonly` **removeLastSlashInPath**: `boolean`

Whether to remove the last slash when normalizing paths. Default to _false_.

#### Defined in

[config/types/index.ts:105](https://github.com/daidodo/format-imports/blob/c7fea1c/src/lib/config/types/index.ts#L105)

___

### root

• `Optional` `Readonly` **root**: `boolean`

Whether to stop looking in parent folders for configuration files. Default to _false_.

#### Defined in

[config/types/index.ts:29](https://github.com/daidodo/format-imports/blob/c7fea1c/src/lib/config/types/index.ts#L29)

___

### sortImportsBy

• `Optional` `Readonly` **sortImportsBy**: ``"paths"`` \| ``"names"``

Sort import declarations by paths or first names. Default to _paths_.

#### Defined in

[config/types/index.ts:49](https://github.com/daidodo/format-imports/blob/c7fea1c/src/lib/config/types/index.ts#L49)

___

### sortRules

• `Optional` `Readonly` **sortRules**: ``"none"`` \| [`SortRules`](SortRules.md)

Sorting rules for paths and names. Default to:

```json
{
  "paths": ["_", "aA"],
  "names": ["_", "aA"]
}
```

If it's _none_, then there is no sorting in all groups, unless they have their own
[sort](grouprule.md#sort) defined.

**`See`**

[Sorting rules](../../../../wiki/Sorting-Rules)

#### Defined in

[config/types/index.ts:71](https://github.com/daidodo/format-imports/blob/c7fea1c/src/lib/config/types/index.ts#L71)

___

### tabSize

• `Optional` `Readonly` **tabSize**: `number`

Number of spaces to replace a TAB. Default to _2_.

#### Defined in

[config/types/index.ts:121](https://github.com/daidodo/format-imports/blob/c7fea1c/src/lib/config/types/index.ts#L121)

___

### tabType

• `Optional` `Readonly` **tabType**: ``"space"`` \| ``"tab"``

Indent lines with tabs or spaces. Default to _space_.

#### Defined in

[config/types/index.ts:117](https://github.com/daidodo/format-imports/blob/c7fea1c/src/lib/config/types/index.ts#L117)

___

### trailingComma

• `Optional` `Readonly` **trailingComma**: ``"none"`` \| ``"always"`` \| ``"multiLine"``

When to add a trailing comma for the last name. Default to _multiLine_.
- `none`: Disallow trailing commas.

```
  import { A, B } from 'a';
  import {
    C,
    D
  } from 'b';
```

- `always`: Require trailing commas.

```
  import { A, B, } from 'a';
  import {
    C,
    D,
  } from 'b';
```

- `multiLine`: Require trailing commas for multiline and disallow trailing commas when in the same line.

```
  import { A, B } from 'a';
  import {
    C,
    D,
  } from 'b';
```

#### Defined in

[config/types/index.ts:158](https://github.com/daidodo/format-imports/blob/c7fea1c/src/lib/config/types/index.ts#L158)

___

### wrappingStyle

• `Optional` `Readonly` **wrappingStyle**: [`WrappingRule`](WrappingRule.md) \| ``"prettier"``

When and how to wrap a line. Default to:

```json
{
  "maxBindingNamesPerLine": 1,
  "maxDefaultAndBindingNamesPerLine": 2,
  "maxExportNamesPerLine": 0,
  "maxNamesPerWrappedLine": 1,
  "ignoreComments": false
}
```

If it's set to _prettier_, then wrap lines in compatible with [Prettier](https://prettier.io/).

**`See`**

[Line Wrapping Style](../../../../wiki/Line-Wrapping-Style)

#### Defined in

[config/types/index.ts:88](https://github.com/daidodo/format-imports/blob/c7fea1c/src/lib/config/types/index.ts#L88)
