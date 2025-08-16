[**APIs Documentation**](../README.md)

***

# Function: resolveConfigForSource()

> **resolveConfigForSource**\<`T`\>(`text`, `config?`): `T`

Defined in: [config/index.ts:27](https://github.com/daidodo/format-imports/blob/6fa466521c4048be8236686fd87f433f44d2b81e/src/lib/config/index.ts#L27)

Resolve config for given source text.

This function will detect EOL for the text and update the base config provided.

## Type Parameters

### T

`T` *extends* [`Configuration`](../interfaces/Configuration.md) = [`Configuration`](../interfaces/Configuration.md)

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
