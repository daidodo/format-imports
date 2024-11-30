[**APIs Documentation**](../README.md)

***

# Function: formatSourceFromFile()

> **formatSourceFromFile**(`text`, `fileName`, `config`, `options`?): `Promise`\<`undefined` \| `string`\>

Format given source text from a file, asynchronously.

This function will try to find _tsconfig.json_ and ESLint config relating to the source file,
and merge them to the base config provided.

`options` can be used to change _tsconfig.json_ and ESLint config loading behavior for testing
purpose.

## Parameters

### text

`string`

Source text

### fileName

`string`

Source file name

### config

[`Configuration`](../interfaces/Configuration.md)

Base config

### options?

`FormatOptions`

Internal/testing options

## Returns

`Promise`\<`undefined` \| `string`\>

Promise of the result text or `undefined` if nothing changes.

## See

[formatSourceFromFile.sync](formatSourceFromFile.md#sync)

## Defined in

[format/main/index.ts:42](https://github.com/daidodo/format-imports/blob/396a5ae1c6a0ea65fb94ddc38f9df2bc3a9229ed/src/lib/format/main/index.ts#L42)
