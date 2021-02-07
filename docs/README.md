APIs

# APIs

## Table of contents

### Interfaces

- [Configuration](interfaces/configuration.md)

## Type aliases

### Extension

Ƭ **Extension**: *js* \| *ts* \| *jsx* \| *tsx*

A type representing file extensions supported.

Defined in: [format/main/index.ts:14](https://github.com/daidodo/format-imports/blob/aecebd4/src/lib/format/main/index.ts#L14)

## Variables

### COMPARE\_RULE\_DEFAULT

• `Const` **COMPARE\_RULE\_DEFAULT**: CompareRule

Default comparison rule for paths and names, which is:
* Comparing letters case-insensitively, and
* `'_'` is in front of `[a-zA-Z]`.

Defined in: [config/types/index.ts:157](https://github.com/daidodo/format-imports/blob/aecebd4/src/lib/config/types/index.ts#L157)

___

### GROUP\_RULES\_DEFAULT

• `Const` **GROUP\_RULES\_DEFAULT**: [*Configuration*](interfaces/configuration.md)[*groupRules*]

Default grouping rules.

Defined in: [config/types/index.ts:143](https://github.com/daidodo/format-imports/blob/aecebd4/src/lib/config/types/index.ts#L143)

___

### SUPPORTED\_EXTENSIONS

• `Const` **SUPPORTED\_EXTENSIONS**: [*Extension*](README.md#extension)[]

File extensions supported.

Defined in: [format/main/index.ts:19](https://github.com/daidodo/format-imports/blob/aecebd4/src/lib/format/main/index.ts#L19)

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

Defined in: [format/main/index.ts:37](https://github.com/daidodo/format-imports/blob/aecebd4/src/lib/format/main/index.ts#L37)

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

Defined in: [format/main/index.ts:63](https://github.com/daidodo/format-imports/blob/aecebd4/src/lib/format/main/index.ts#L63)

___

### isFileExcludedByConfig

▸ **isFileExcludedByConfig**(`fileName`: *string*, `config`: [*Configuration*](interfaces/configuration.md)): *boolean*

Test if a file is excluded by the given config, taking `config.force` flag into account.

The file name will be normalized to use `/` when matching.

#### Parameters:

Name | Type |
------ | ------ |
`fileName` | *string* |
`config` | [*Configuration*](interfaces/configuration.md) |

**Returns:** *boolean*

Defined in: [config/index.ts:44](https://github.com/daidodo/format-imports/blob/aecebd4/src/lib/config/index.ts#L44)

___

### loadConfigFromJsonFile

▸ **loadConfigFromJsonFile**(`filename`: *string*): [*Configuration*](interfaces/configuration.md)

Load config from given file, e.g. _path/to/import-sorter.json_.

Will throw an error if file is unreadable or content is not a valid json object.

Example:
```ts
const config1 = { maxLineLength: 80, tabSize: 2 };
const config2 = { maxLineLength: 100 };

const config = mergeConfig(config1, config2);  // { maxLineLength: 100, tabSize: 2 }
```

#### Parameters:

Name | Type |
------ | ------ |
`filename` | *string* |

**Returns:** [*Configuration*](interfaces/configuration.md)

Defined in: [config/importSorter.ts:80](https://github.com/daidodo/format-imports/blob/aecebd4/src/lib/config/importSorter.ts#L80)

___

### mergeConfig

▸ **mergeConfig**(...`configs`: [*Configuration*](interfaces/configuration.md)[]): [*Configuration*](interfaces/configuration.md)

Merge multiple configs together. The latter takes precedence if values have conflicts.

This function is preferred to `{...config1, ...config2}` in a sense that some keys need to be
merged instead of overwritten, e.g. `exclude`.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`...configs` | [*Configuration*](interfaces/configuration.md)[] | An array of config objects    |

**Returns:** [*Configuration*](interfaces/configuration.md)

Defined in: [config/helper.ts:61](https://github.com/daidodo/format-imports/blob/aecebd4/src/lib/config/helper.ts#L61)

___

### resolveConfigForFile

▸ **resolveConfigForFile**(`fileName`: *string*, `config?`: [*Configuration*](interfaces/configuration.md)): [*Configuration*](interfaces/configuration.md)

Resolve config for a source file.

The following sources will be considered if found (in precedence from high to low):
- [ESLint configuration](https://eslint.org/docs/user-guide/configuring)
- `"importSorter"` section in `package.json`
- `import-sorter.json` (File name is configurable from the base config)
- [Prettier configuration](https://github.com/prettier/prettier-vscode#configuration)
- `.editorconfig`
- The base config provided as parameter

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`fileName` | *string* | - | Source file name   |
`config` | [*Configuration*](interfaces/configuration.md) | ... | Base config    |

**Returns:** [*Configuration*](interfaces/configuration.md)

Defined in: [config/importSorter.ts:30](https://github.com/daidodo/format-imports/blob/aecebd4/src/lib/config/importSorter.ts#L30)

___

### resolveConfigForSource

▸ **resolveConfigForSource**(`text`: *string*, `config?`: [*Configuration*](interfaces/configuration.md)): [*Configuration*](interfaces/configuration.md)

Resolve config for given source text.

This function will detect EOL for the text and update the base config provided.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`text` | *string* | - | Source text   |
`config` | [*Configuration*](interfaces/configuration.md) | ... | Base config    |

**Returns:** [*Configuration*](interfaces/configuration.md)

Defined in: [config/index.ts:35](https://github.com/daidodo/format-imports/blob/aecebd4/src/lib/config/index.ts#L35)
