[**APIs Documentation**](../README.md)

***

# Function: formatSourceWithoutFile()

> **formatSourceWithoutFile**(`text`, `extension`, `config`, `options`?): `Promise`\<`undefined` \| `string`\>

Format given source text without knowing the source file, asynchronously.

This function will try to find _tsconfig.json_ and ESLint config relating to the source file,
and merge them to the base config provided.

`options` can be used to change _tsconfig.json_ and ESLint config loading behavior for testing
purpose.

## Parameters

### text

`string`

Source text

### extension

[`Extension`](../type-aliases/Extension.md)

File extension to reveal the source language

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

[formatSourceWithoutFile.sync](formatSourceWithoutFile.md#sync)

## Defined in

[format/main/index.ts:107](https://github.com/daidodo/format-imports/blob/ff017abf6278875690a1b32bf81664f2bd289753/src/lib/format/main/index.ts#L107)
