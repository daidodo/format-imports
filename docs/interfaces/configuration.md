# Interface: Configuration

## Hierarchy

* **Configuration**

## Properties

### autoFormat

• `Optional` `Readonly` **autoFormat**: *undefined* \| *off* \| *onSave*

___

### bracketSpacing

• `Optional` `Readonly` **bracketSpacing**: *undefined* \| *boolean*

___

### configurationFileName

• `Optional` `Readonly` **configurationFileName**: *undefined* \| *string*

JSON configuration file name. Default to _import-sorter.json_.

___

### development

• `Optional` `Readonly` **development**: *undefined* \| { `enableDebug?`: *undefined* \| *boolean*  }

___

### emptyLinesAfterAllImports

• `Optional` `Readonly` **emptyLinesAfterAllImports**: *undefined* \| *number*

___

### emptyLinesBetweenGroups

• `Optional` `Readonly` **emptyLinesBetweenGroups**: *undefined* \| *number*

___

### eol

• `Optional` `Readonly` **eol**: *undefined* \| *LF* \| *CR* \| *CRLF* \| *LFCR*

___

### exclude

• `Optional` `Readonly` **exclude**: *undefined* \| *string*[]

Disable formatting for files matching regular expressions. Default to _["node_modules"]_

___

### excludeGlob

• `Optional` `Readonly` **excludeGlob**: *undefined* \| *string*[]

Disable formatting for files matching glob patterns.

___

### force

• `Optional` `Readonly` **force**: *undefined* \| *boolean*

___

### formatExports

• `Optional` `Readonly` **formatExports**: *undefined* \| *boolean*

Whether to format exports as well. Default to _false_.

___

### groupRules

• `Optional` `Readonly` **groupRules**: *undefined* \| (*string* \| *string*[] \| GroupRule)[]

Grouping rules for path patterns for imports. Default to:
```json
[
  "^react(-dom)?$",
  "^@angular/",
  "^vue$",
  {},
  "^[@]",
  "^[.]"
]
```

**`see`** [Grouping Rules](../../../../wiki/Grouping-Rules)

___

### hasSemicolon

• `Optional` `Readonly` **hasSemicolon**: *undefined* \| *boolean*

___

### insertFinalNewline

• `Optional` `Readonly` **insertFinalNewline**: *undefined* \| *boolean*

___

### keepUnused

• `Optional` `Readonly` **keepUnused**: *undefined* \| KeepUnusedRule[]

___

### maxBindingNamesPerLine

• `Optional` `Readonly` **maxBindingNamesPerLine**: *undefined* \| *number*

___

### maxDefaultAndBindingNamesPerLine

• `Optional` `Readonly` **maxDefaultAndBindingNamesPerLine**: *undefined* \| *number*

___

### maxExportNamesPerLine

• `Optional` `Readonly` **maxExportNamesPerLine**: *undefined* \| *number*

___

### maxLineLength

• `Optional` `Readonly` **maxLineLength**: *undefined* \| *number*

___

### maxNamesPerWrappedLine

• `Optional` `Readonly` **maxNamesPerWrappedLine**: *undefined* \| *number*

___

### quoteMark

• `Optional` `Readonly` **quoteMark**: *undefined* \| *single* \| *double*

___

### removeLastIndexInPath

• `Optional` `Readonly` **removeLastIndexInPath**: *undefined* \| *boolean*

___

### removeLastSlashInPath

• `Optional` `Readonly` **removeLastSlashInPath**: *undefined* \| *boolean*

___

### sortImportsBy

• `Optional` `Readonly` **sortImportsBy**: *undefined* \| *paths* \| *names*

Sort import declarations by paths or first names. Default to _paths_.

___

### sortRules

• `Optional` `Readonly` **sortRules**: *undefined* \| SortRules

___

### tabSize

• `Optional` `Readonly` **tabSize**: *undefined* \| *number*

___

### tabType

• `Optional` `Readonly` **tabType**: *undefined* \| *space* \| *tab*

___

### trailingComma

• `Optional` `Readonly` **trailingComma**: *undefined* \| *none* \| *multiLine*
