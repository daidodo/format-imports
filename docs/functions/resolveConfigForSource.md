[**APIs Documentation**](../README.md)

***

# Function: resolveConfigForSource()

> **resolveConfigForSource**\<`T`\>(`text`, `config`?): `T`

Resolve config for given source text.

This function will detect EOL for the text and update the base config provided.

## Type Parameters

• **T** *extends* [`Configuration`](../interfaces/Configuration.md) = [`Configuration`](../interfaces/Configuration.md)

## Parameters

### text

`string`

Source text

### config?

`T`

Base config

## Returns

`T`

## Typeparam

T - A type extended from Configuration

## Defined in

[config/index.ts:27](https://github.com/daidodo/format-imports/blob/ff017abf6278875690a1b32bf81664f2bd289753/src/lib/config/index.ts#L27)
