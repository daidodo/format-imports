# Interface: Configuration

## Hierarchy

* **Configuration**

## Properties

### bracketSpacing

• `Optional` `Readonly` **bracketSpacing**: *undefined* \| *boolean*

Whether to add spaces between brackets. _true_ for '{ id }' and _false_ for '{id}'. Default to
_true_.

Defined in: [config/types/index.ts:120](https://github.com/daidodo/format-imports/blob/38995ba/src/lib/config/types/index.ts#L120)

___

### configurationFileName

• `Optional` `Readonly` **configurationFileName**: *undefined* \| *string*

JSON configuration file name. Default to _import-sorter.json_.

Defined in: [config/types/index.ts:19](https://github.com/daidodo/format-imports/blob/38995ba/src/lib/config/types/index.ts#L19)

___

### emptyLinesAfterAllImports

• `Optional` `Readonly` **emptyLinesAfterAllImports**: *undefined* \| *number*

Number of empty lines after the last import declaration. Default to _1_.

Defined in: [config/types/index.ts:79](https://github.com/daidodo/format-imports/blob/38995ba/src/lib/config/types/index.ts#L79)

___

### emptyLinesBetweenGroups

• `Optional` `Readonly` **emptyLinesBetweenGroups**: *undefined* \| *number*

Number of empty lines between groups (NOT sub-groups). Default to _1_.

Defined in: [config/types/index.ts:75](https://github.com/daidodo/format-imports/blob/38995ba/src/lib/config/types/index.ts#L75)

___

### exclude

• `Optional` `Readonly` **exclude**: *undefined* \| *string*[]

Disable formatting for files matching regular expressions. Default to _["node_modules"]_

Defined in: [config/types/index.ts:27](https://github.com/daidodo/format-imports/blob/38995ba/src/lib/config/types/index.ts#L27)

___

### excludeGlob

• `Optional` `Readonly` **excludeGlob**: *undefined* \| *string*[]

Disable formatting for files matching glob patterns.

Defined in: [config/types/index.ts:31](https://github.com/daidodo/format-imports/blob/38995ba/src/lib/config/types/index.ts#L31)

___

### force

• `Optional` `Readonly` **force**: *undefined* \| *boolean*

Whether to disregard [exclude](#exclude)/[excludeGlob](#excludeGlob) patterns and file-disable
comments. Default to _false_.

Defined in: [config/types/index.ts:125](https://github.com/daidodo/format-imports/blob/38995ba/src/lib/config/types/index.ts#L125)

___

### formatExports

• `Optional` `Readonly` **formatExports**: *undefined* \| *boolean*

Whether to format exports as well as imports. Default to _true_.

Defined in: [config/types/index.ts:23](https://github.com/daidodo/format-imports/blob/38995ba/src/lib/config/types/index.ts#L23)

___

### groupRules

• `Optional` `Readonly` **groupRules**: *undefined* \| (*string* \| *string*[] \| [*GroupRule*](grouprule.md))[]

Grouping rules for path patterns for imports. Default to
[GROUP_RULES_DEFAULT](../README.md#GROUP_RULES_DEFAULT)

**`see`** [Grouping Rules](../../../../wiki/Grouping-Rules)

Defined in: [config/types/index.ts:41](https://github.com/daidodo/format-imports/blob/38995ba/src/lib/config/types/index.ts#L41)

___

### hasSemicolon

• `Optional` `Readonly` **hasSemicolon**: *undefined* \| *boolean*

Whether to add semicolons at the end of declarations. Default to _true_.

Defined in: [config/types/index.ts:111](https://github.com/daidodo/format-imports/blob/38995ba/src/lib/config/types/index.ts#L111)

___

### insertFinalNewline

• `Optional` `Readonly` **insertFinalNewline**: *undefined* \| *boolean*

Whether to end files with a new line. Default to _true_.

Defined in: [config/types/index.ts:115](https://github.com/daidodo/format-imports/blob/38995ba/src/lib/config/types/index.ts#L115)

___

### keepUnused

• `Optional` `Readonly` **keepUnused**: *undefined* \| [*KeepUnusedRule*](../README.md#keepunusedrule)[]

By default all unused imports are removed. Keep some or all of them around with this setting
if you need.

Defined in: [config/types/index.ts:71](https://github.com/daidodo/format-imports/blob/38995ba/src/lib/config/types/index.ts#L71)

___

### maxLineLength

• `Optional` `Readonly` **maxLineLength**: *undefined* \| *number*

Max line length before wrapping. 0 for no limit. Default to _80_.

Defined in: [config/types/index.ts:91](https://github.com/daidodo/format-imports/blob/38995ba/src/lib/config/types/index.ts#L91)

___

### quoteMark

• `Optional` `Readonly` **quoteMark**: *undefined* \| *single* \| *double*

Use single or double quotes. Default to _single_.

Defined in: [config/types/index.ts:103](https://github.com/daidodo/format-imports/blob/38995ba/src/lib/config/types/index.ts#L103)

___

### removeLastIndexInPath

• `Optional` `Readonly` **removeLastIndexInPath**: *undefined* \| *boolean*

Whether to remove the last 'index' when normalizing paths. Default to _false_.

Defined in: [config/types/index.ts:87](https://github.com/daidodo/format-imports/blob/38995ba/src/lib/config/types/index.ts#L87)

___

### removeLastSlashInPath

• `Optional` `Readonly` **removeLastSlashInPath**: *undefined* \| *boolean*

Whether to remove the last slash when normalizing paths. Default to _false_.

Defined in: [config/types/index.ts:83](https://github.com/daidodo/format-imports/blob/38995ba/src/lib/config/types/index.ts#L83)

___

### sortImportsBy

• `Optional` `Readonly` **sortImportsBy**: *undefined* \| *paths* \| *names*

Sort import declarations by paths or first names. Default to _paths_.

Defined in: [config/types/index.ts:35](https://github.com/daidodo/format-imports/blob/38995ba/src/lib/config/types/index.ts#L35)

___

### sortRules

• `Optional` `Readonly` **sortRules**: *undefined* \| [*SortRules*](sortrules.md)

Sorting rules for paths and names. Default to:
```json
{
  "paths": ["_", "aA"],
  "names": ["_", "aA"]
}
```

**`see`** [Sorting rules](../../../../wiki/Sorting-Rules)

Defined in: [config/types/index.ts:52](https://github.com/daidodo/format-imports/blob/38995ba/src/lib/config/types/index.ts#L52)

___

### tabSize

• `Optional` `Readonly` **tabSize**: *undefined* \| *number*

Number of spaces to replace a TAB. Default to _2_.

Defined in: [config/types/index.ts:99](https://github.com/daidodo/format-imports/blob/38995ba/src/lib/config/types/index.ts#L99)

___

### tabType

• `Optional` `Readonly` **tabType**: *undefined* \| *space* \| *tab*

Indent lines with tabs or spaces. Default to _space_.

Defined in: [config/types/index.ts:95](https://github.com/daidodo/format-imports/blob/38995ba/src/lib/config/types/index.ts#L95)

___

### trailingComma

• `Optional` `Readonly` **trailingComma**: *undefined* \| *none* \| *multiLine*

When to add a trailing comma for the last name. Default to _multiLine_.

Defined in: [config/types/index.ts:107](https://github.com/daidodo/format-imports/blob/38995ba/src/lib/config/types/index.ts#L107)

___

### wrappingStyle

• `Optional` `Readonly` **wrappingStyle**: *undefined* \| [*WrappingRule*](wrappingrule.md) \| *prettier*

When and how to wrap a line. Default to:
```json
{
  "maxBindingNamesPerLine": 1,
  "maxDefaultAndBindingNamesPerLine": 2,
  "maxExportNamesPerLine": 0,
  "maxNamesPerWrappedLine": 1
}
```

If it's set to _prettier_, then wrap lines in compatible with [Prettier](https://prettier.io/).

Defined in: [config/types/index.ts:66](https://github.com/daidodo/format-imports/blob/38995ba/src/lib/config/types/index.ts#L66)
