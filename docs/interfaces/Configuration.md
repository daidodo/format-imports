[**APIs Documentation**](../README.md)

***

# Interface: Configuration

## Properties

### bracketSpacing?

> `readonly` `optional` **bracketSpacing**: `boolean`

Whether to add spaces between brackets. _true_ for `{ id }` and _false_ for `{id}`. Default to
_true_.

#### Defined in

[config/types/index.ts:161](https://github.com/daidodo/format-imports/blob/396a5ae1c6a0ea65fb94ddc38f9df2bc3a9229ed/src/lib/config/types/index.ts#L161)

***

### configurationFileName?

> `readonly` `optional` **configurationFileName**: `string`

JSON configuration file name. Default to _import-sorter.json_.

#### Defined in

[config/types/index.ts:23](https://github.com/daidodo/format-imports/blob/396a5ae1c6a0ea65fb94ddc38f9df2bc3a9229ed/src/lib/config/types/index.ts#L23)

***

### emptyLinesAfterAllImports?

> `readonly` `optional` **emptyLinesAfterAllImports**: `number`

Number of empty lines after the last import declaration. Default to _1_.

#### Defined in

[config/types/index.ts:91](https://github.com/daidodo/format-imports/blob/396a5ae1c6a0ea65fb94ddc38f9df2bc3a9229ed/src/lib/config/types/index.ts#L91)

***

### emptyLinesBetweenGroups?

> `readonly` `optional` **emptyLinesBetweenGroups**: `number`

Number of empty lines between groups (NOT sub-groups). Default to _1_.

#### Defined in

[config/types/index.ts:87](https://github.com/daidodo/format-imports/blob/396a5ae1c6a0ea65fb94ddc38f9df2bc3a9229ed/src/lib/config/types/index.ts#L87)

***

### exclude?

> `readonly` `optional` **exclude**: `string`[]

Disable formatting for files matching regular expressions. Default to _["node_modules"]_.

#### Defined in

[config/types/index.ts:31](https://github.com/daidodo/format-imports/blob/396a5ae1c6a0ea65fb94ddc38f9df2bc3a9229ed/src/lib/config/types/index.ts#L31)

***

### excludeGlob?

> `readonly` `optional` **excludeGlob**: `string`[]

Disable formatting for files matching glob patterns. Default to _[]_.

#### Defined in

[config/types/index.ts:35](https://github.com/daidodo/format-imports/blob/396a5ae1c6a0ea65fb94ddc38f9df2bc3a9229ed/src/lib/config/types/index.ts#L35)

***

### force?

> `readonly` `optional` **force**: `boolean`

Whether to disregard [exclude](#exclude)/[excludeGlob](#excludeGlob) patterns and file-disable
comments. Default to _false_.

#### Defined in

[config/types/index.ts:177](https://github.com/daidodo/format-imports/blob/396a5ae1c6a0ea65fb94ddc38f9df2bc3a9229ed/src/lib/config/types/index.ts#L177)

***

### formatExports?

> `readonly` `optional` **formatExports**: `boolean`

Whether to format exports as well as imports. Default to _true_.

#### Defined in

[config/types/index.ts:27](https://github.com/daidodo/format-imports/blob/396a5ae1c6a0ea65fb94ddc38f9df2bc3a9229ed/src/lib/config/types/index.ts#L27)

***

### groupRules?

> `readonly` `optional` **groupRules**: (`string` \| [`GroupRule`](GroupRule.md) \| `string`[])[]

Grouping rules for path patterns for imports. Default to
[GROUP_RULES_DEFAULT](../README.md#GROUP_RULES_DEFAULT)

#### See

[Grouping Rules](../../../../wiki/Grouping-Rules)

#### Defined in

[config/types/index.ts:45](https://github.com/daidodo/format-imports/blob/396a5ae1c6a0ea65fb94ddc38f9df2bc3a9229ed/src/lib/config/types/index.ts#L45)

***

### hasSemicolon?

> `readonly` `optional` **hasSemicolon**: `boolean`

Whether to add semicolons at the end of declarations. Default to _true_.

#### Defined in

[config/types/index.ts:152](https://github.com/daidodo/format-imports/blob/396a5ae1c6a0ea65fb94ddc38f9df2bc3a9229ed/src/lib/config/types/index.ts#L152)

***

### ignoreESLintRules?

> `readonly` `optional` **ignoreESLintRules**: `string` \| `string`[]

Ignore ESLint rules matching regular expressions. Default to _[]_.

#### Defined in

[config/types/index.ts:172](https://github.com/daidodo/format-imports/blob/396a5ae1c6a0ea65fb94ddc38f9df2bc3a9229ed/src/lib/config/types/index.ts#L172)

***

### insertFinalNewline?

> `readonly` `optional` **insertFinalNewline**: `boolean` \| `"preserve"`

Whether to end files with a new line, or keep it as is if _preserve_ is set. Default to _true_.

#### Defined in

[config/types/index.ts:156](https://github.com/daidodo/format-imports/blob/396a5ae1c6a0ea65fb94ddc38f9df2bc3a9229ed/src/lib/config/types/index.ts#L156)

***

### keepUnused?

> `readonly` `optional` **keepUnused**: [`KeepUnusedRule`](../type-aliases/KeepUnusedRule.md)[]

By default all unused imports are removed. Keep some or all of them around with this setting
if you need.

#### Defined in

[config/types/index.ts:83](https://github.com/daidodo/format-imports/blob/396a5ae1c6a0ea65fb94ddc38f9df2bc3a9229ed/src/lib/config/types/index.ts#L83)

***

### maxLineLength?

> `readonly` `optional` **maxLineLength**: `number`

Max line length before wrapping. 0 for no limit. Default to _80_.

#### Defined in

[config/types/index.ts:103](https://github.com/daidodo/format-imports/blob/396a5ae1c6a0ea65fb94ddc38f9df2bc3a9229ed/src/lib/config/types/index.ts#L103)

***

### nodeProtocol?

> `readonly` `optional` **nodeProtocol**: `"none"` \| `"always"` \| `"preserve"`

Whether to add or remove node protocol ("node:") to/from builtin module paths. Default to _preserve_.
- `always`: Always add `"node:"` to NodeJS builtin modules.
- `none`: Always remove `"node:"` for NodeJS builtin modules.
- `preserve`: Keep it as is.

#### Defined in

[config/types/index.ts:168](https://github.com/daidodo/format-imports/blob/396a5ae1c6a0ea65fb94ddc38f9df2bc3a9229ed/src/lib/config/types/index.ts#L168)

***

### quoteMark?

> `readonly` `optional` **quoteMark**: `"single"` \| `"double"`

Use single or double quotes. Default to _single_.

#### Defined in

[config/types/index.ts:115](https://github.com/daidodo/format-imports/blob/396a5ae1c6a0ea65fb94ddc38f9df2bc3a9229ed/src/lib/config/types/index.ts#L115)

***

### removeLastIndexInPath?

> `readonly` `optional` **removeLastIndexInPath**: `boolean`

Whether to remove the last 'index' when normalizing paths. Default to _false_.

#### Defined in

[config/types/index.ts:99](https://github.com/daidodo/format-imports/blob/396a5ae1c6a0ea65fb94ddc38f9df2bc3a9229ed/src/lib/config/types/index.ts#L99)

***

### removeLastSlashInPath?

> `readonly` `optional` **removeLastSlashInPath**: `boolean`

Whether to remove the last slash when normalizing paths. Default to _false_.

#### Defined in

[config/types/index.ts:95](https://github.com/daidodo/format-imports/blob/396a5ae1c6a0ea65fb94ddc38f9df2bc3a9229ed/src/lib/config/types/index.ts#L95)

***

### root?

> `readonly` `optional` **root**: `boolean`

Whether to stop looking in parent folders for configuration files. Default to _false_.

#### Defined in

[config/types/index.ts:19](https://github.com/daidodo/format-imports/blob/396a5ae1c6a0ea65fb94ddc38f9df2bc3a9229ed/src/lib/config/types/index.ts#L19)

***

### sortImportsBy?

> `readonly` `optional` **sortImportsBy**: `"paths"` \| `"names"`

Sort import declarations by paths or first names. Default to _paths_.

#### Defined in

[config/types/index.ts:39](https://github.com/daidodo/format-imports/blob/396a5ae1c6a0ea65fb94ddc38f9df2bc3a9229ed/src/lib/config/types/index.ts#L39)

***

### sortRules?

> `readonly` `optional` **sortRules**: `"none"` \| [`SortRules`](SortRules.md)

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

#### Defined in

[config/types/index.ts:61](https://github.com/daidodo/format-imports/blob/396a5ae1c6a0ea65fb94ddc38f9df2bc3a9229ed/src/lib/config/types/index.ts#L61)

***

### tabSize?

> `readonly` `optional` **tabSize**: `number`

Number of spaces to replace a TAB. Default to _2_.

#### Defined in

[config/types/index.ts:111](https://github.com/daidodo/format-imports/blob/396a5ae1c6a0ea65fb94ddc38f9df2bc3a9229ed/src/lib/config/types/index.ts#L111)

***

### tabType?

> `readonly` `optional` **tabType**: `"space"` \| `"tab"`

Indent lines with tabs or spaces. Default to _space_.

#### Defined in

[config/types/index.ts:107](https://github.com/daidodo/format-imports/blob/396a5ae1c6a0ea65fb94ddc38f9df2bc3a9229ed/src/lib/config/types/index.ts#L107)

***

### trailingComma?

> `readonly` `optional` **trailingComma**: `"none"` \| `"always"` \| `"multiLine"`

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

[config/types/index.ts:148](https://github.com/daidodo/format-imports/blob/396a5ae1c6a0ea65fb94ddc38f9df2bc3a9229ed/src/lib/config/types/index.ts#L148)

***

### wrappingStyle?

> `readonly` `optional` **wrappingStyle**: [`WrappingRule`](WrappingRule.md) \| `"prettier"`

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

#### Defined in

[config/types/index.ts:78](https://github.com/daidodo/format-imports/blob/396a5ae1c6a0ea65fb94ddc38f9df2bc3a9229ed/src/lib/config/types/index.ts#L78)
