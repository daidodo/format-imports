# APIs Documentation

## Table of contents

### Interfaces

- [Configuration](interfaces/configuration.md)
- [GroupRule](interfaces/grouprule.md)
- [SortRules](interfaces/sortrules.md)
- [WrappingRule](interfaces/wrappingrule.md)

## Type aliases

### CompareRule

Ƭ **CompareRule**: [*SegSymbol*](README.md#segsymbol)[] \| *none*

String comparison rule.

If it's _none_, then there is no sorting at all.

Defined in: [config/types/sorting.ts:18](https://github.com/daidodo/format-imports/blob/e966d7c/src/lib/config/types/sorting.ts#L18)

___

### Extension

Ƭ **Extension**: *js* \| *ts* \| *jsx* \| *tsx*

A type representing file extensions supported.

Defined in: [format/main/index.ts:15](https://github.com/daidodo/format-imports/blob/e966d7c/src/lib/format/main/index.ts#L15)

___

### FlagSymbol

Ƭ **FlagSymbol**: *scripts* \| *multiple* \| *single* \| *namespace* \| *named* \| *all*

Symbols for different types of imports:
- _scripts_: Script imports, e.g. `import 'some_scripts'`.
- _multiple_: Import multiple members, e.g.:
  ```ts
  import A, {B, C} from 'a';
  import A, * as B from 'a';
  ```
- _single_: Import single member, e.g.:
  ```ts
  import A from 'a';
  import { A } from 'a';
  ```
- _namespace_: Import a namespace, e.g.:
  ```ts
  import * as A from 'a';
  ```
- _named_: All _multiple_, _single_ and _namespace_ combined.
- _all_: All _scripts_ and _named_ combined.

Defined in: [config/types/grouping.ts:23](https://github.com/daidodo/format-imports/blob/e966d7c/src/lib/config/types/grouping.ts#L23)

___

### KeepUnusedRule

Ƭ **KeepUnusedRule**: *string* \| { `names?`: *string*[] ; `path`: *string*  }

This is for keeping unused names.

`string` elements will be expanded to `{ path: element }`.

Defined in: [config/types/unused.ts:6](https://github.com/daidodo/format-imports/blob/e966d7c/src/lib/config/types/unused.ts#L6)

___

### SegSymbol

Ƭ **SegSymbol**: *az* \| *AZ* \| *aA* \| *Aa* \| *_*

Symbols for char segments:
- _az_ - Lower case letters, i.e. [a-z].
- _AZ_ - Upper case letters, i.e. [A-Z].
- _aA_ - Both case letters and lower case first, i.e. [a-zA-Z] and `'a' < 'A' < 'b' < 'B' < ...`
- _Aa_ - Both case letters and upper case first, i.e. [a-zA-Z] and `'A' < 'a' < 'B' < 'b' < ...`
- _\__ - Chars with ASCII from 91 to 96, i.e. `[`, `\`, `]`, `^`, `_`, `` ` ``(backtick).

Defined in: [config/types/sorting.ts:11](https://github.com/daidodo/format-imports/blob/e966d7c/src/lib/config/types/sorting.ts#L11)

## Variables

### COMPARE\_RULE\_DEFAULT

• `Const` **COMPARE\_RULE\_DEFAULT**: [*CompareRule*](README.md#comparerule)

Default comparison rule for paths and names, which is:
- Comparing letters case-insensitively, and
- `'_'` is in front of `[a-zA-Z]`.

Defined in: [config/types/index.ts:157](https://github.com/daidodo/format-imports/blob/e966d7c/src/lib/config/types/index.ts#L157)

___

### DEFAULT\_MERGER

• `Const` **DEFAULT\_MERGER**: *Merger*<[*Configuration*](interfaces/configuration.md)\>

Default merge policy for [mergeConfig](#mergeConfig), which is:

- [exclude](interfaces/configuration.md#exclude),
[excludeGlob](interfaces/configuration.md#excludeGlob) and
[keepUnused](interfaces/configuration.md#keepUnused) arrays will be concatenated instead of
replaced;
- [sortRules](interfaces/configuration.md#sortRules) object will be merged instead of replaced;
- All other fields will be replaced and the latter config takes precedence.

When creating your own merge policy, make sure to inherit the default merger and just override
the ones different.

Defined in: [config/merge.ts:20](https://github.com/daidodo/format-imports/blob/e966d7c/src/lib/config/merge.ts#L20)

___

### GROUP\_RULES\_DEFAULT

• `Const` **GROUP\_RULES\_DEFAULT**: [*Configuration*](interfaces/configuration.md)[*groupRules*]

Default grouping rules.

Defined in: [config/types/index.ts:143](https://github.com/daidodo/format-imports/blob/e966d7c/src/lib/config/types/index.ts#L143)

___

### SUPPORTED\_EXTENSIONS

• `Const` **SUPPORTED\_EXTENSIONS**: [*Extension*](README.md#extension)[]

File extensions supported.

Defined in: [format/main/index.ts:20](https://github.com/daidodo/format-imports/blob/e966d7c/src/lib/format/main/index.ts#L20)

## Functions

### formatSourceFromFile

▸ **formatSourceFromFile**(`text`: *string*, `fileName`: *string*, `config`: [*Configuration*](interfaces/configuration.md), `options?`: FormatOptions): *undefined* \| *string*

Format given source text from a file.

This function will try to find _tsconfig.json_ and ESLint config relating to the source file,
and merge them to the base config provided.

`options` can be used to change _tsconfig.json_ and ESLint config loading behavior for testing
purpose.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`text` | *string* | Source text   |
`fileName` | *string* | Source file name   |
`config` | [*Configuration*](interfaces/configuration.md) | Base config   |
`options?` | FormatOptions | Internal/testing options    |

**Returns:** *undefined* \| *string*

Result text or `undefined` if nothing changes.

Defined in: [format/main/index.ts:38](https://github.com/daidodo/format-imports/blob/e966d7c/src/lib/format/main/index.ts#L38)

___

### formatSourceWithoutFile

▸ **formatSourceWithoutFile**(`text`: *string*, `extension`: [*Extension*](README.md#extension), `config`: [*Configuration*](interfaces/configuration.md), `options?`: FormatOptions): *undefined* \| *string*

Format given source text without knowing the source file.

This function will try to find _tsconfig.json_ and ESLint config relating to the source file,
and merge them to the base config provided.

`options` can be used to change _tsconfig.json_ and ESLint config loading behavior for testing
purpose.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`text` | *string* | Source text   |
`extension` | [*Extension*](README.md#extension) | File extension to reveal the source language   |
`config` | [*Configuration*](interfaces/configuration.md) | Base config   |
`options?` | FormatOptions | Internal/testing options    |

**Returns:** *undefined* \| *string*

Result text or `undefined` if nothing changes.

Defined in: [format/main/index.ts:66](https://github.com/daidodo/format-imports/blob/e966d7c/src/lib/format/main/index.ts#L66)

___

### isFileExcludedByConfig

▸ **isFileExcludedByConfig**(`fileName`: *string*, `config`: [*Configuration*](interfaces/configuration.md)): *boolean*

Test if a file is excluded by the given config, taking `config.force` flag into account.

The file name will be normalized to use `/` as path separator before matching.

#### Parameters:

Name | Type |
------ | ------ |
`fileName` | *string* |
`config` | [*Configuration*](interfaces/configuration.md) |

**Returns:** *boolean*

Defined in: [config/index.ts:39](https://github.com/daidodo/format-imports/blob/e966d7c/src/lib/config/index.ts#L39)

___

### loadConfigFromJsonFile

▸ **loadConfigFromJsonFile**(`fileName`: *string*): [*Configuration*](interfaces/configuration.md)

Load config from given file, e.g. _path/to/import-sorter.json_.

Will throw an error if file is unreadable or content is not a valid JSON object.

#### Parameters:

Name | Type |
------ | ------ |
`fileName` | *string* |

**Returns:** [*Configuration*](interfaces/configuration.md)

Defined in: [config/importSorter.ts:80](https://github.com/daidodo/format-imports/blob/e966d7c/src/lib/config/importSorter.ts#L80)

___

### mergeConfig

▸ **mergeConfig**<T\>(...`configs`: T[]): T

Merge multiple configs together. The latter takes precedence if values have conflicts.

This function is preferred to `{...config1, ...config2}` in a sense that some keys need to be
merged instead of overwritten, e.g. `exclude`. Please refer to
[mergeConfigWithMerger](#mergeConfigWithMerger) and [DEFAULT_MERGER](#DEFAULT_MERGER)
for more details.

Example:
```ts
const config1 = { maxLineLength: 80, tabSize: 2 };
const config2 = { maxLineLength: 100 };

const config = mergeConfig(config1, config2);  // { maxLineLength: 100, tabSize: 2 }
```

#### Type parameters:

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`T` | [*Configuration*](interfaces/configuration.md) | [*Configuration*](interfaces/configuration.md) | A type extended from Configuration    |

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`...configs` | T[] | An array of config objects    |

**Returns:** T

Defined in: [config/merge.ts:50](https://github.com/daidodo/format-imports/blob/e966d7c/src/lib/config/merge.ts#L50)

___

### mergeConfigWithMerger

▸ **mergeConfigWithMerger**<T\>(`merger`: *Merger*<T\>, ...`configs`: T[]): T

Merge multiple configs with custom merger.

A merger is an object with the same keys as _T_ but the values are functions, e.g.:

```ts
interface Merger {
  formatExports?: (a: boolean, b: boolean) => boolean;
  exclude?: (a: string[], b: string[]) => string[];
  // ...
};
```

Each field in a merger defines how that field is merged between configs. If _undefined_, the field
will use the default policy which is replacement by the latter.

#### Type parameters:

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`T` | [*Configuration*](interfaces/configuration.md) | [*Configuration*](interfaces/configuration.md) | A type extended from Configuration    |

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`merger` | *Merger*<T\> | A custom object with merge functions for all fields in a config   |
`...configs` | T[] | An array of config objects    |

**Returns:** T

Defined in: [config/merge.ts:75](https://github.com/daidodo/format-imports/blob/e966d7c/src/lib/config/merge.ts#L75)

___

### resolveConfigForFile

▸ **resolveConfigForFile**<T\>(`fileName`: *string*, `config?`: T): T

Resolve config for a source file.

The following sources will be considered if found (in precedence from high to low):
- [ESLint configuration](https://eslint.org/docs/user-guide/configuring)
- `"importSorter"` section in `package.json`
- `import-sorter.json` (File name is configurable from the base config)
- [Prettier configuration](https://github.com/prettier/prettier-vscode#configuration)
- `.editorconfig`
- The base config provided as parameter

#### Type parameters:

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`T` | [*Configuration*](interfaces/configuration.md) | [*Configuration*](interfaces/configuration.md) | A type extended from Configuration    |

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`fileName` | *string* | Source file name   |
`config?` | T | Base config    |

**Returns:** T

Defined in: [config/importSorter.ts:30](https://github.com/daidodo/format-imports/blob/e966d7c/src/lib/config/importSorter.ts#L30)

___

### resolveConfigForSource

▸ **resolveConfigForSource**<T\>(`text`: *string*, `config?`: T): T

Resolve config for given source text.

This function will detect EOL for the text and update the base config provided.

#### Type parameters:

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`T` | [*Configuration*](interfaces/configuration.md) | [*Configuration*](interfaces/configuration.md) | A type extended from Configuration    |

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`text` | *string* | Source text   |
`config?` | T | Base config    |

**Returns:** T

Defined in: [config/index.ts:27](https://github.com/daidodo/format-imports/blob/e966d7c/src/lib/config/index.ts#L27)
