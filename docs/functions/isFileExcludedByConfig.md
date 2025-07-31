[**APIs Documentation**](../README.md)

***

# Function: isFileExcludedByConfig()

> **isFileExcludedByConfig**(`fileName`, `config`): `boolean`

Defined in: [config/index.ts:39](https://github.com/daidodo/format-imports/blob/fa507828ea2705f4ecb83df3b3b0422b1a8a80a7/src/lib/config/index.ts#L39)

Test if a file is excluded by the given config, taking `config.force` flag into account.

The file name will be normalized to use `/` as path separator before matching.

## Parameters

### fileName

`string`

### config

[`Configuration`](../interfaces/Configuration.md)

## Returns

`boolean`
