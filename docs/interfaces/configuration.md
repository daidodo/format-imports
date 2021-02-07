# Interface: Configuration

## Hierarchy

* **Configuration**

## Properties

### bracketSpacing

• `Optional` `Readonly` **bracketSpacing**: *undefined* \| *boolean*

Whether to add spaces between brackets. _true_ for '{ id }' and _false_ for '{id}'. Default to _true_.

Defined in: [config/types/index.ts:118](https://github.com/daidodo/format-imports/blob/09c5b15/src/lib/config/types/index.ts#L118)

___

### configurationFileName

• `Optional` `Readonly` **configurationFileName**: *undefined* \| *string*

JSON configuration file name. Default to _import-sorter.json_.

Defined in: [config/types/index.ts:18](https://github.com/daidodo/format-imports/blob/09c5b15/src/lib/config/types/index.ts#L18)

___

### emptyLinesAfterAllImports

• `Optional` `Readonly` **emptyLinesAfterAllImports**: *undefined* \| *number*

Number of empty lines after the last import declaration. Default to _1_.

Defined in: [config/types/index.ts:78](https://github.com/daidodo/format-imports/blob/09c5b15/src/lib/config/types/index.ts#L78)

___

### emptyLinesBetweenGroups

• `Optional` `Readonly` **emptyLinesBetweenGroups**: *undefined* \| *number*

Number of empty lines between groups (NOT sub-groups). Default to _1_.

Defined in: [config/types/index.ts:74](https://github.com/daidodo/format-imports/blob/09c5b15/src/lib/config/types/index.ts#L74)

___

### exclude

• `Optional` `Readonly` **exclude**: *undefined* \| *string*[]

Disable formatting for files matching regular expressions. Default to _["node_modules"]_

Defined in: [config/types/index.ts:26](https://github.com/daidodo/format-imports/blob/09c5b15/src/lib/config/types/index.ts#L26)

___

### excludeGlob

• `Optional` `Readonly` **excludeGlob**: *undefined* \| *string*[]

Disable formatting for files matching glob patterns.

Defined in: [config/types/index.ts:30](https://github.com/daidodo/format-imports/blob/09c5b15/src/lib/config/types/index.ts#L30)

___

### force

• `Optional` `Readonly` **force**: *undefined* \| *boolean*

Whether to disregard exclude/excludeGlob patterns and file-disable comments. Default to _false_.

Defined in: [config/types/index.ts:122](https://github.com/daidodo/format-imports/blob/09c5b15/src/lib/config/types/index.ts#L122)

___

### formatExports

• `Optional` `Readonly` **formatExports**: *undefined* \| *boolean*

Whether to format exports as well. Default to _false_.

Defined in: [config/types/index.ts:22](https://github.com/daidodo/format-imports/blob/09c5b15/src/lib/config/types/index.ts#L22)

___

### groupRules

• `Optional` `Readonly` **groupRules**: *undefined* \| (*string* \| *string*[] \| GroupRule)[]

Grouping rules for path patterns for imports. Default to [GROUP_RULES_DEFAULT](../README#GROUP_RULES_DEFAULT)

**`see`** [Grouping Rules](../../../../wiki/Grouping-Rules)

Defined in: [config/types/index.ts:39](https://github.com/daidodo/format-imports/blob/09c5b15/src/lib/config/types/index.ts#L39)

___

### hasSemicolon

• `Optional` `Readonly` **hasSemicolon**: *undefined* \| *boolean*

Whether to add semicolons at the end of declarations. Default to _true_.

Defined in: [config/types/index.ts:110](https://github.com/daidodo/format-imports/blob/09c5b15/src/lib/config/types/index.ts#L110)

___

### insertFinalNewline

• `Optional` `Readonly` **insertFinalNewline**: *undefined* \| *boolean*

Whether to end files with a new line. Default to _true_.

Defined in: [config/types/index.ts:114](https://github.com/daidodo/format-imports/blob/09c5b15/src/lib/config/types/index.ts#L114)

___

### keepUnused

• `Optional` `Readonly` **keepUnused**: *undefined* \| KeepUnusedRule[]

By default all unused imports are removed. Keep some or all of them around with this setting if you need.

Defined in: [config/types/index.ts:70](https://github.com/daidodo/format-imports/blob/09c5b15/src/lib/config/types/index.ts#L70)

___

### maxBindingNamesPerLine

• `Optional` `Readonly` **maxBindingNamesPerLine**: *undefined* \| *number*

Max binding names per line before wrapping for imports. 0 for no limit. Default to _1_.

Defined in: [config/types/index.ts:54](https://github.com/daidodo/format-imports/blob/09c5b15/src/lib/config/types/index.ts#L54)

___

### maxDefaultAndBindingNamesPerLine

• `Optional` `Readonly` **maxDefaultAndBindingNamesPerLine**: *undefined* \| *number*

Max default and binding names per line before wrapping for imports. 0 for no limit. Default to _2_.

Defined in: [config/types/index.ts:58](https://github.com/daidodo/format-imports/blob/09c5b15/src/lib/config/types/index.ts#L58)

___

### maxExportNamesPerLine

• `Optional` `Readonly` **maxExportNamesPerLine**: *undefined* \| *number*

Max binding names per line before wrapping for exports. 0 for no limit. Default to _0_.

Defined in: [config/types/index.ts:62](https://github.com/daidodo/format-imports/blob/09c5b15/src/lib/config/types/index.ts#L62)

___

### maxLineLength

• `Optional` `Readonly` **maxLineLength**: *undefined* \| *number*

Max line length before wrapping. 0 for no limit. Default to _80_.

Defined in: [config/types/index.ts:90](https://github.com/daidodo/format-imports/blob/09c5b15/src/lib/config/types/index.ts#L90)

___

### maxNamesPerWrappedLine

• `Optional` `Readonly` **maxNamesPerWrappedLine**: *undefined* \| *number*

Max names on wrapped lines for imports/exports. 0 for no limit. Default to _1_.

Defined in: [config/types/index.ts:66](https://github.com/daidodo/format-imports/blob/09c5b15/src/lib/config/types/index.ts#L66)

___

### quoteMark

• `Optional` `Readonly` **quoteMark**: *undefined* \| *single* \| *double*

Use single or double quotes. Default to _single_.

Defined in: [config/types/index.ts:102](https://github.com/daidodo/format-imports/blob/09c5b15/src/lib/config/types/index.ts#L102)

___

### removeLastIndexInPath

• `Optional` `Readonly` **removeLastIndexInPath**: *undefined* \| *boolean*

Whether to remove the last 'index' when normalizing paths. Default to _false_.

Defined in: [config/types/index.ts:86](https://github.com/daidodo/format-imports/blob/09c5b15/src/lib/config/types/index.ts#L86)

___

### removeLastSlashInPath

• `Optional` `Readonly` **removeLastSlashInPath**: *undefined* \| *boolean*

Whether to remove the last slash when normalizing paths. Default to _false_.

Defined in: [config/types/index.ts:82](https://github.com/daidodo/format-imports/blob/09c5b15/src/lib/config/types/index.ts#L82)

___

### sortImportsBy

• `Optional` `Readonly` **sortImportsBy**: *undefined* \| *paths* \| *names*

Sort import declarations by paths or first names. Default to _paths_.

Defined in: [config/types/index.ts:34](https://github.com/daidodo/format-imports/blob/09c5b15/src/lib/config/types/index.ts#L34)

___

### sortRules

• `Optional` `Readonly` **sortRules**: *undefined* \| SortRules

Sorting rules for paths and names. Default to:
```json
{
  "paths": ["_", "aA"],
  "names": ["_", "aA"]
}
```

**`see`** [Sorting rules](../../../../wiki/Sorting-Rules)

Defined in: [config/types/index.ts:50](https://github.com/daidodo/format-imports/blob/09c5b15/src/lib/config/types/index.ts#L50)

___

### tabSize

• `Optional` `Readonly` **tabSize**: *undefined* \| *number*

Number of spaces to replace a TAB. Default to _2_.

Defined in: [config/types/index.ts:98](https://github.com/daidodo/format-imports/blob/09c5b15/src/lib/config/types/index.ts#L98)

___

### tabType

• `Optional` `Readonly` **tabType**: *undefined* \| *space* \| *tab*

Indent lines with tabs or spaces. Default to _space_.

Defined in: [config/types/index.ts:94](https://github.com/daidodo/format-imports/blob/09c5b15/src/lib/config/types/index.ts#L94)

___

### trailingComma

• `Optional` `Readonly` **trailingComma**: *undefined* \| *none* \| *multiLine*

When to add a trailing comma for the last name. Default to _multiLine_.

Defined in: [config/types/index.ts:106](https://github.com/daidodo/format-imports/blob/09c5b15/src/lib/config/types/index.ts#L106)
