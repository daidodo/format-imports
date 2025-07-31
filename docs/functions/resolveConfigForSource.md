[**APIs Documentation**](../README.md)

***

# Function: resolveConfigForSource()

> **resolveConfigForSource**\<`T`\>(`text`, `config?`): `T`

Defined in: [config/index.ts:27](https://github.com/daidodo/format-imports/blob/fa507828ea2705f4ecb83df3b3b0422b1a8a80a7/src/lib/config/index.ts#L27)

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
