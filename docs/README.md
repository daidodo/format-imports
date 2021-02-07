APIs

# APIs

## Table of contents

### Interfaces

- [Configuration](interfaces/configuration.md)
- [FormatOptions](interfaces/formatoptions.md)

## Variables

### COMPARE\_RULE\_DEFAULT

• `Const` **COMPARE\_RULE\_DEFAULT**: CompareRule

Default comparison rule for paths and names.

Defined in: [config/types/index.ts:155](https://github.com/daidodo/format-imports/blob/cd1a4d5/src/lib/config/types/index.ts#L155)

___

### GROUP\_RULES\_DEFAULT

• `Const` **GROUP\_RULES\_DEFAULT**: [*Configuration*](interfaces/configuration.md)[*groupRules*]

Default grouping rules.

Defined in: [config/types/index.ts:143](https://github.com/daidodo/format-imports/blob/cd1a4d5/src/lib/config/types/index.ts#L143)

___

### SUPPORTED\_EXTENSIONS

• `Const` **SUPPORTED\_EXTENSIONS**: Extension[]

File extensions supported.

Defined in: [format/main/index.ts:16](https://github.com/daidodo/format-imports/blob/cd1a4d5/src/lib/format/main/index.ts#L16)

## Functions

### formatSourceFromFile

▸ **formatSourceFromFile**(`text`: *string*, `fileName`: *string*, `config`: [*Configuration*](interfaces/configuration.md), `options?`: [*FormatOptions*](interfaces/formatoptions.md)): *undefined* \| *string*

Format given source text from a file.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`text` | *string* | Source text   |
`fileName` | *string* | Source file name   |
`config` | [*Configuration*](interfaces/configuration.md) | Base config   |
`options?` | [*FormatOptions*](interfaces/formatoptions.md) | Format options   |

**Returns:** *undefined* \| *string*

Formatted text or `undefined` if nothing changes

Defined in: [format/main/index.ts:27](https://github.com/daidodo/format-imports/blob/cd1a4d5/src/lib/format/main/index.ts#L27)

___

### formatSourceWithoutFile

▸ **formatSourceWithoutFile**(`text`: *string*, `extension`: Extension, `config`: [*Configuration*](interfaces/configuration.md), `options?`: [*FormatOptions*](interfaces/formatoptions.md)): *undefined* \| *string*

#### Parameters:

Name | Type |
------ | ------ |
`text` | *string* |
`extension` | Extension |
`config` | [*Configuration*](interfaces/configuration.md) |
`options?` | [*FormatOptions*](interfaces/formatoptions.md) |

**Returns:** *undefined* \| *string*

Defined in: [format/main/index.ts:37](https://github.com/daidodo/format-imports/blob/cd1a4d5/src/lib/format/main/index.ts#L37)

___

### isFileExcludedByConfig

▸ **isFileExcludedByConfig**(`fileName`: *string*, `config`: [*Configuration*](interfaces/configuration.md)): *boolean*

#### Parameters:

Name | Type |
------ | ------ |
`fileName` | *string* |
`config` | [*Configuration*](interfaces/configuration.md) |

**Returns:** *boolean*

Defined in: [config/index.ts:33](https://github.com/daidodo/format-imports/blob/cd1a4d5/src/lib/config/index.ts#L33)

___

### loadConfigFromJsonFile

▸ **loadConfigFromJsonFile**(`filename`: *string*): [*Configuration*](interfaces/configuration.md)

#### Parameters:

Name | Type |
------ | ------ |
`filename` | *string* |

**Returns:** [*Configuration*](interfaces/configuration.md)

Defined in: [config/importSorter.ts:55](https://github.com/daidodo/format-imports/blob/cd1a4d5/src/lib/config/importSorter.ts#L55)

___

### mergeConfig

▸ **mergeConfig**(...`configs`: [*Configuration*](interfaces/configuration.md)[]): [*Configuration*](interfaces/configuration.md)

#### Parameters:

Name | Type |
------ | ------ |
`...configs` | [*Configuration*](interfaces/configuration.md)[] |

**Returns:** [*Configuration*](interfaces/configuration.md)

Defined in: [config/helper.ts:54](https://github.com/daidodo/format-imports/blob/cd1a4d5/src/lib/config/helper.ts#L54)

___

### resolveConfigForFile

▸ **resolveConfigForFile**(`fileName`: *string*, `config?`: [*Configuration*](interfaces/configuration.md)): [*Configuration*](interfaces/configuration.md)

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`fileName` | *string* | - |
`config` | [*Configuration*](interfaces/configuration.md) | ... |

**Returns:** [*Configuration*](interfaces/configuration.md)

Defined in: [config/importSorter.ts:17](https://github.com/daidodo/format-imports/blob/cd1a4d5/src/lib/config/importSorter.ts#L17)

___

### resolveConfigForSource

▸ **resolveConfigForSource**(`text`: *string*, `config?`: [*Configuration*](interfaces/configuration.md)): [*Configuration*](interfaces/configuration.md)

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`text` | *string* | - |
`config` | [*Configuration*](interfaces/configuration.md) | ... |

**Returns:** [*Configuration*](interfaces/configuration.md)

Defined in: [config/index.ts:28](https://github.com/daidodo/format-imports/blob/cd1a4d5/src/lib/config/index.ts#L28)
