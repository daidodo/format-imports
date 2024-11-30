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

[config/index.ts:27](https://github.com/daidodo/format-imports/blob/e188bc4272dba9eddc624b65cf812895c79fd423/src/lib/config/index.ts#L27)
