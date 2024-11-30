[**APIs Documentation**](../README.md)

***

# Function: mergeConfig()

> **mergeConfig**\<`T`\>(...`configs`): `T`

Merge multiple configs together. The latter takes precedence if values have conflicts.

This function is preferred to `{...config1, ...config2}` because some keys need to be
merged instead of overwritten, e.g. `exclude`. Please refer to  [DEFAULT_MERGER](#DEFAULT_MERGER)
for more details.

Example:
```ts
const config1 = { maxLineLength: 80, tabSize: 2 };
const config2 = { maxLineLength: 100 };

const config = mergeConfig(config1, config2);  // { maxLineLength: 100, tabSize: 2 }
```

## Type Parameters

• **T** *extends* [`Configuration`](../interfaces/Configuration.md) = [`Configuration`](../interfaces/Configuration.md)

## Parameters

### configs

...`T`[]

An array of config objects

## Returns

`T`

## Defined in

[config/merge.ts:50](https://github.com/daidodo/format-imports/blob/e188bc4272dba9eddc624b65cf812895c79fd423/src/lib/config/merge.ts#L50)
