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

[config/index.ts:27](https://github.com/daidodo/format-imports/blob/396a5ae1c6a0ea65fb94ddc38f9df2bc3a9229ed/src/lib/config/index.ts#L27)
