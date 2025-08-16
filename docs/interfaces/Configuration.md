[**APIs Documentation**](../README.md)

***

# Interface: Configuration

Defined in: [config/types/index.ts:15](https://github.com/daidodo/format-imports/blob/6fa466521c4048be8236686fd87f433f44d2b81e/src/lib/config/types/index.ts#L15)

## Properties

### bracketSpacing?

> `readonly` `optional` **bracketSpacing**: `boolean`

Defined in: [config/types/index.ts:161](https://github.com/daidodo/format-imports/blob/6fa466521c4048be8236686fd87f433f44d2b81e/src/lib/config/types/index.ts#L161)

Whether to add spaces between brackets. _true_ for `{ id }` and _false_ for `{id}`. Default to
_true_.

***

### configurationFileName?

> `readonly` `optional` **configurationFileName**: `string`

Defined in: [config/types/index.ts:23](https://github.com/daidodo/format-imports/blob/6fa466521c4048be8236686fd87f433f44d2b81e/src/lib/config/types/index.ts#L23)

JSON configuration file name. Default to _import-sorter.json_.

***

### emptyLinesAfterAllImports?

> `readonly` `optional` **emptyLinesAfterAllImports**: `number`

Defined in: [config/types/index.ts:91](https://github.com/daidodo/format-imports/blob/6fa466521c4048be8236686fd87f433f44d2b81e/src/lib/config/types/index.ts#L91)

Number of empty lines after the last import declaration. Default to _1_.

***

### emptyLinesBetweenGroups?

> `readonly` `optional` **emptyLinesBetweenGroups**: `number`

Defined in: [config/types/index.ts:87](https://github.com/daidodo/format-imports/blob/6fa466521c4048be8236686fd87f433f44d2b81e/src/lib/config/types/index.ts#L87)

Number of empty lines between groups (NOT sub-groups). Default to _1_.

***

### exclude?

> `readonly` `optional` **exclude**: `string`[]

Defined in: [config/types/index.ts:31](https://github.com/daidodo/format-imports/blob/6fa466521c4048be8236686fd87f433f44d2b81e/src/lib/config/types/index.ts#L31)

Disable formatting for files matching regular expressions. Default to _["node_modules"]_.

***

### excludeGlob?

> `readonly` `optional` **excludeGlob**: `string`[]

Defined in: [config/types/index.ts:35](https://github.com/daidodo/format-imports/blob/6fa466521c4048be8236686fd87f433f44d2b81e/src/lib/config/types/index.ts#L35)

Disable formatting for files matching glob patterns. Default to _[]_.

***

### force?

> `readonly` `optional` **force**: `boolean`

Defined in: [config/types/index.ts:177](https://github.com/daidodo/format-imports/blob/6fa466521c4048be8236686fd87f433f44d2b81e/src/lib/config/types/index.ts#L177)

Whether to disregard [exclude](#exclude)/[excludeGlob](#excludeGlob) patterns and file-disable
comments. Default to _false_.

***

### formatExports?

> `readonly` `optional` **formatExports**: `boolean`

Defined in: [config/types/index.ts:27](https://github.com/daidodo/format-imports/blob/6fa466521c4048be8236686fd87f433f44d2b81e/src/lib/config/types/index.ts#L27)

Whether to format exports as well as imports. Default to _true_.

***

### groupRules?

> `readonly` `optional` **groupRules**: (`string` \| [`GroupRule`](GroupRule.md) \| `string`[])[]

Defined in: [config/types/index.ts:45](https://github.com/daidodo/format-imports/blob/6fa466521c4048be8236686fd87f433f44d2b81e/src/lib/config/types/index.ts#L45)

Grouping rules for path patterns for imports. Default to
[GROUP_RULES_DEFAULT](../README.md#GROUP_RULES_DEFAULT)

#### See

[Grouping Rules](../../../../wiki/Grouping-Rules)

***

### hasSemicolon?

> `readonly` `optional` **hasSemicolon**: `boolean`

Defined in: [config/types/index.ts:152](https://github.com/daidodo/format-imports/blob/6fa466521c4048be8236686fd87f433f44d2b81e/src/lib/config/types/index.ts#L152)

Whether to add semicolons at the end of declarations. Default to _true_.

***

### ignoreESLintRules?

> `readonly` `optional` **ignoreESLintRules**: `string` \| `string`[]

Defined in: [config/types/index.ts:172](https://github.com/daidodo/format-imports/blob/6fa466521c4048be8236686fd87f433f44d2b81e/src/lib/config/types/index.ts#L172)

Ignore ESLint rules matching regular expressions. Default to _[]_.

***

### insertFinalNewline?

> `readonly` `optional` **insertFinalNewline**: `boolean` \| `"preserve"`

Defined in: [config/types/index.ts:156](https://github.com/daidodo/format-imports/blob/6fa466521c4048be8236686fd87f433f44d2b81e/src/lib/config/types/index.ts#L156)

Whether to end files with a new line, or keep it as is if _preserve_ is set. Default to _true_.

***

### keepUnused?

> `readonly` `optional` **keepUnused**: [`KeepUnusedRule`](../type-aliases/KeepUnusedRule.md)[]

Defined in: [config/types/index.ts:83](https://github.com/daidodo/format-imports/blob/6fa466521c4048be8236686fd87f433f44d2b81e/src/lib/config/types/index.ts#L83)

By default all unused imports are removed. Keep some or all of them around with this setting
if you need.

***

### maxLineLength?

> `readonly` `optional` **maxLineLength**: `number`

Defined in: [config/types/index.ts:103](https://github.com/daidodo/format-imports/blob/6fa466521c4048be8236686fd87f433f44d2b81e/src/lib/config/types/index.ts#L103)

Max line length before wrapping. 0 for no limit. Default to _80_.

***

### nodeProtocol?

> `readonly` `optional` **nodeProtocol**: `"none"` \| `"always"` \| `"preserve"`

Defined in: [config/types/index.ts:168](https://github.com/daidodo/format-imports/blob/6fa466521c4048be8236686fd87f433f44d2b81e/src/lib/config/types/index.ts#L168)

Whether to add or remove node protocol ("node:") to/from builtin module paths. Default to _preserve_.
- `always`: Always add `"node:"` to NodeJS builtin modules.
- `none`: Always remove `"node:"` for NodeJS builtin modules.
- `preserve`: Keep it as is.

***

### quoteMark?

> `readonly` `optional` **quoteMark**: `"single"` \| `"double"`

Defined in: [config/types/index.ts:115](https://github.com/daidodo/format-imports/blob/6fa466521c4048be8236686fd87f433f44d2b81e/src/lib/config/types/index.ts#L115)

Use single or double quotes. Default to _single_.

***

### removeLastIndexInPath?

> `readonly` `optional` **removeLastIndexInPath**: `boolean`

Defined in: [config/types/index.ts:99](https://github.com/daidodo/format-imports/blob/6fa466521c4048be8236686fd87f433f44d2b81e/src/lib/config/types/index.ts#L99)

Whether to remove the last 'index' when normalizing paths. Default to _false_.

***

### removeLastSlashInPath?

> `readonly` `optional` **removeLastSlashInPath**: `boolean`

Defined in: [config/types/index.ts:95](https://github.com/daidodo/format-imports/blob/6fa466521c4048be8236686fd87f433f44d2b81e/src/lib/config/types/index.ts#L95)

Whether to remove the last slash when normalizing paths. Default to _false_.

***

### root?

> `readonly` `optional` **root**: `boolean`

Defined in: [config/types/index.ts:19](https://github.com/daidodo/format-imports/blob/6fa466521c4048be8236686fd87f433f44d2b81e/src/lib/config/types/index.ts#L19)

Whether to stop looking in parent folders for configuration files. Default to _false_.

***

### sortImportsBy?

> `readonly` `optional` **sortImportsBy**: `"paths"` \| `"names"`

Defined in: [config/types/index.ts:39](https://github.com/daidodo/format-imports/blob/6fa466521c4048be8236686fd87f433f44d2b81e/src/lib/config/types/index.ts#L39)

Sort import declarations by paths or first names. Default to _paths_.

***

### sortRules?

> `readonly` `optional` **sortRules**: `"none"` \| [`SortRules`](SortRules.md)

Defined in: [config/types/index.ts:61](https://github.com/daidodo/format-imports/blob/6fa466521c4048be8236686fd87f433f44d2b81e/src/lib/config/types/index.ts#L61)

Sorting rules for paths and names. Default to:

```json
{
  "paths": ["_", "aA"],
  "names": ["_", "aA"]
}
```

If it's _none_, then there is no sorting in all groups, unless they have their own
[sort](grouprule.md#sort) defined.

#### See

[Sorting rules](../../../../wiki/Sorting-Rules)

***

### tabSize?

> `readonly` `optional` **tabSize**: `number`

Defined in: [config/types/index.ts:111](https://github.com/daidodo/format-imports/blob/6fa466521c4048be8236686fd87f433f44d2b81e/src/lib/config/types/index.ts#L111)

Number of spaces to replace a TAB. Default to _2_.

***

### tabType?

> `readonly` `optional` **tabType**: `"space"` \| `"tab"`

Defined in: [config/types/index.ts:107](https://github.com/daidodo/format-imports/blob/6fa466521c4048be8236686fd87f433f44d2b81e/src/lib/config/types/index.ts#L107)

Indent lines with tabs or spaces. Default to _space_.

***

### trailingComma?

> `readonly` `optional` **trailingComma**: `"none"` \| `"always"` \| `"multiLine"`

Defined in: [config/types/index.ts:148](https://github.com/daidodo/format-imports/blob/6fa466521c4048be8236686fd87f433f44d2b81e/src/lib/config/types/index.ts#L148)

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

***

### wrappingStyle?

> `readonly` `optional` **wrappingStyle**: [`WrappingRule`](WrappingRule.md) \| `"prettier"`

Defined in: [config/types/index.ts:78](https://github.com/daidodo/format-imports/blob/6fa466521c4048be8236686fd87f433f44d2b81e/src/lib/config/types/index.ts#L78)

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

#### See

[Line Wrapping Style](../../../../wiki/Line-Wrapping-Style)
