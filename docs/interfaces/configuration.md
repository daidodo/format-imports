# Interface: Configuration

## Hierarchy

* **Configuration**

## Properties

### bracketSpacing

• `Optional` `Readonly` **bracketSpacing**: *undefined* \| *boolean*

Whether to add spaces between brackets. _true_ for '{ id }' and _false_ for '{id}'. Default to
_true_.

Defined in: [config/types/index.ts:122](https://github.com/daidodo/format-imports/blob/380a9d2/src/lib/config/types/index.ts#L122)

___

### configurationFileName

• `Optional` `Readonly` **configurationFileName**: *undefined* \| *string*

JSON configuration file name. Default to _import-sorter.json_.

Defined in: [config/types/index.ts:18](https://github.com/daidodo/format-imports/blob/380a9d2/src/lib/config/types/index.ts#L18)

___

### emptyLinesAfterAllImports

• `Optional` `Readonly` **emptyLinesAfterAllImports**: *undefined* \| *number*

Number of empty lines after the last import declaration. Default to _1_.

Defined in: [config/types/index.ts:81](https://github.com/daidodo/format-imports/blob/380a9d2/src/lib/config/types/index.ts#L81)

___

### emptyLinesBetweenGroups

• `Optional` `Readonly` **emptyLinesBetweenGroups**: *undefined* \| *number*

Number of empty lines between groups (NOT sub-groups). Default to _1_.

Defined in: [config/types/index.ts:77](https://github.com/daidodo/format-imports/blob/380a9d2/src/lib/config/types/index.ts#L77)

___

### exclude

• `Optional` `Readonly` **exclude**: *undefined* \| *string*[]

Disable formatting for files matching regular expressions. Default to _["node_modules"]_

Defined in: [config/types/index.ts:26](https://github.com/daidodo/format-imports/blob/380a9d2/src/lib/config/types/index.ts#L26)

___

### excludeGlob

• `Optional` `Readonly` **excludeGlob**: *undefined* \| *string*[]

Disable formatting for files matching glob patterns.

Defined in: [config/types/index.ts:30](https://github.com/daidodo/format-imports/blob/380a9d2/src/lib/config/types/index.ts#L30)

___

### force

• `Optional` `Readonly` **force**: *undefined* \| *boolean*

Whether to disregard [exclude](#exclude)/[excludeGlob](#excludeGlob) patterns and file-disable
comments. Default to _false_.

Defined in: [config/types/index.ts:127](https://github.com/daidodo/format-imports/blob/380a9d2/src/lib/config/types/index.ts#L127)

___

### formatExports

• `Optional` `Readonly` **formatExports**: *undefined* \| *boolean*

Whether to format exports as well as imports. Default to _true_.

Defined in: [config/types/index.ts:22](https://github.com/daidodo/format-imports/blob/380a9d2/src/lib/config/types/index.ts#L22)

___

### groupRules

• `Optional` `Readonly` **groupRules**: *undefined* \| (*string* \| *string*[] \| [*GroupRule*](grouprule.md))[]

Grouping rules for path patterns for imports. Default to
[GROUP_RULES_DEFAULT](../README.md#GROUP_RULES_DEFAULT)

**`see`** [Grouping Rules](../../../../wiki/Grouping-Rules)

Defined in: [config/types/index.ts:40](https://github.com/daidodo/format-imports/blob/380a9d2/src/lib/config/types/index.ts#L40)

___

### hasSemicolon

• `Optional` `Readonly` **hasSemicolon**: *undefined* \| *boolean*

Whether to add semicolons at the end of declarations. Default to _true_.

Defined in: [config/types/index.ts:113](https://github.com/daidodo/format-imports/blob/380a9d2/src/lib/config/types/index.ts#L113)

___

### insertFinalNewline

• `Optional` `Readonly` **insertFinalNewline**: *undefined* \| *boolean*

Whether to end files with a new line. Default to _true_.

Defined in: [config/types/index.ts:117](https://github.com/daidodo/format-imports/blob/380a9d2/src/lib/config/types/index.ts#L117)

___

### keepUnused

• `Optional` `Readonly` **keepUnused**: *undefined* \| [*KeepUnusedRule*](../README.md#keepunusedrule)[]

By default all unused imports are removed. Keep some or all of them around with this setting
if you need.

Defined in: [config/types/index.ts:73](https://github.com/daidodo/format-imports/blob/380a9d2/src/lib/config/types/index.ts#L73)

___

### maxBindingNamesPerLine

• `Optional` `Readonly` **maxBindingNamesPerLine**: *undefined* \| *number*

Max binding names per line before wrapping for imports. 0 for no limit. Default to _1_.

Defined in: [config/types/index.ts:55](https://github.com/daidodo/format-imports/blob/380a9d2/src/lib/config/types/index.ts#L55)

___

### maxDefaultAndBindingNamesPerLine

• `Optional` `Readonly` **maxDefaultAndBindingNamesPerLine**: *undefined* \| *number*

Max default and binding names per line before wrapping for imports. 0 for no limit. Default
to _2_.

Defined in: [config/types/index.ts:60](https://github.com/daidodo/format-imports/blob/380a9d2/src/lib/config/types/index.ts#L60)

___

### maxExportNamesPerLine

• `Optional` `Readonly` **maxExportNamesPerLine**: *undefined* \| *number*

Max binding names per line before wrapping for exports. 0 for no limit. Default to _0_.

Defined in: [config/types/index.ts:64](https://github.com/daidodo/format-imports/blob/380a9d2/src/lib/config/types/index.ts#L64)

___

### maxLineLength

• `Optional` `Readonly` **maxLineLength**: *undefined* \| *number*

Max line length before wrapping. 0 for no limit. Default to _80_.

Defined in: [config/types/index.ts:93](https://github.com/daidodo/format-imports/blob/380a9d2/src/lib/config/types/index.ts#L93)

___

### maxNamesPerWrappedLine

• `Optional` `Readonly` **maxNamesPerWrappedLine**: *undefined* \| *number*

Max names on wrapped lines for imports/exports. 0 for no limit. Default to _1_.

Defined in: [config/types/index.ts:68](https://github.com/daidodo/format-imports/blob/380a9d2/src/lib/config/types/index.ts#L68)

___

### quoteMark

• `Optional` `Readonly` **quoteMark**: *undefined* \| *single* \| *double*

Use single or double quotes. Default to _single_.

Defined in: [config/types/index.ts:105](https://github.com/daidodo/format-imports/blob/380a9d2/src/lib/config/types/index.ts#L105)

___

### removeLastIndexInPath

• `Optional` `Readonly` **removeLastIndexInPath**: *undefined* \| *boolean*

Whether to remove the last 'index' when normalizing paths. Default to _false_.

Defined in: [config/types/index.ts:89](https://github.com/daidodo/format-imports/blob/380a9d2/src/lib/config/types/index.ts#L89)

___

### removeLastSlashInPath

• `Optional` `Readonly` **removeLastSlashInPath**: *undefined* \| *boolean*

Whether to remove the last slash when normalizing paths. Default to _false_.

Defined in: [config/types/index.ts:85](https://github.com/daidodo/format-imports/blob/380a9d2/src/lib/config/types/index.ts#L85)

___

### sortImportsBy

• `Optional` `Readonly` **sortImportsBy**: *undefined* \| *paths* \| *names*

Sort import declarations by paths or first names. Default to _paths_.

Defined in: [config/types/index.ts:34](https://github.com/daidodo/format-imports/blob/380a9d2/src/lib/config/types/index.ts#L34)

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

Defined in: [config/types/index.ts:51](https://github.com/daidodo/format-imports/blob/380a9d2/src/lib/config/types/index.ts#L51)

___

### tabSize

• `Optional` `Readonly` **tabSize**: *undefined* \| *number*

Number of spaces to replace a TAB. Default to _2_.

Defined in: [config/types/index.ts:101](https://github.com/daidodo/format-imports/blob/380a9d2/src/lib/config/types/index.ts#L101)

___

### tabType

• `Optional` `Readonly` **tabType**: *undefined* \| *space* \| *tab*

Indent lines with tabs or spaces. Default to _space_.

Defined in: [config/types/index.ts:97](https://github.com/daidodo/format-imports/blob/380a9d2/src/lib/config/types/index.ts#L97)

___

### trailingComma

• `Optional` `Readonly` **trailingComma**: *undefined* \| *none* \| *multiLine*

When to add a trailing comma for the last name. Default to _multiLine_.

Defined in: [config/types/index.ts:109](https://github.com/daidodo/format-imports/blob/380a9d2/src/lib/config/types/index.ts#L109)
