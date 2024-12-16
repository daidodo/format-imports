[**APIs Documentation**](../README.md)

***

# Function: isFileExcludedByConfig()

> **isFileExcludedByConfig**(`fileName`, `config`): `boolean`

Test if a file is excluded by the given config, taking `config.force` flag into account.

The file name will be normalized to use `/` as path separator before matching.

## Parameters

### fileName

`string`

### config

[`Configuration`](../interfaces/Configuration.md)

## Returns

`boolean`

## Defined in

[config/index.ts:39](https://github.com/daidodo/format-imports/blob/ff017abf6278875690a1b32bf81664f2bd289753/src/lib/config/index.ts#L39)
