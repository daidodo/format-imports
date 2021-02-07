# APIs

## Table of contents

### Interfaces

- [Configuration](interfaces/configuration.md)

## Variables

### SUPPORTED\_EXTENSIONS

• `Const` **SUPPORTED\_EXTENSIONS**: Extension[]

## Functions

### formatSourceFromFile

▸ **formatSourceFromFile**(`text`: *string*, `fileName`: *string*, `config`: [*Configuration*](interfaces/configuration.md), `options?`: ConfigOptions): *undefined* \| *string*

#### Parameters:

Name | Type |
------ | ------ |
`text` | *string* |
`fileName` | *string* |
`config` | [*Configuration*](interfaces/configuration.md) |
`options?` | ConfigOptions |

**Returns:** *undefined* \| *string*

___

### formatSourceWithoutFile

▸ **formatSourceWithoutFile**(`text`: *string*, `extension`: Extension, `config`: [*Configuration*](interfaces/configuration.md), `options?`: ConfigOptions): *undefined* \| *string*

#### Parameters:

Name | Type |
------ | ------ |
`text` | *string* |
`extension` | Extension |
`config` | [*Configuration*](interfaces/configuration.md) |
`options?` | ConfigOptions |

**Returns:** *undefined* \| *string*

___

### isFileExcludedByConfig

▸ **isFileExcludedByConfig**(`fileName`: *string*, `config`: [*Configuration*](interfaces/configuration.md)): *boolean*

#### Parameters:

Name | Type |
------ | ------ |
`fileName` | *string* |
`config` | [*Configuration*](interfaces/configuration.md) |

**Returns:** *boolean*

___

### loadConfigFromJsonFile

▸ **loadConfigFromJsonFile**(`filename`: *string*): [*Configuration*](interfaces/configuration.md)

#### Parameters:

Name | Type |
------ | ------ |
`filename` | *string* |

**Returns:** [*Configuration*](interfaces/configuration.md)

___

### mergeConfig

▸ **mergeConfig**(...`configs`: [*Configuration*](interfaces/configuration.md)[]): [*Configuration*](interfaces/configuration.md)

#### Parameters:

Name | Type |
------ | ------ |
`...configs` | [*Configuration*](interfaces/configuration.md)[] |

**Returns:** [*Configuration*](interfaces/configuration.md)

___

### resolveConfigForFile

▸ **resolveConfigForFile**(`fileName`: *string*, `config?`: [*Configuration*](interfaces/configuration.md)): [*Configuration*](interfaces/configuration.md)

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`fileName` | *string* | - |
`config` | [*Configuration*](interfaces/configuration.md) | ... |

**Returns:** [*Configuration*](interfaces/configuration.md)

___

### resolveConfigForSource

▸ **resolveConfigForSource**(`text`: *string*, `config?`: [*Configuration*](interfaces/configuration.md)): [*Configuration*](interfaces/configuration.md)

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`text` | *string* | - |
`config` | [*Configuration*](interfaces/configuration.md) | ... |

**Returns:** [*Configuration*](interfaces/configuration.md)
