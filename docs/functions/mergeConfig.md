[**APIs Documentation**](../README.md)

***

# Function: mergeConfig()

> **mergeConfig**\<`T`\>(...`configs`): `T`

Defined in: [config/merge.ts:50](https://github.com/daidodo/format-imports/blob/6fa466521c4048be8236686fd87f433f44d2b81e/src/lib/config/merge.ts#L50)

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

### T

`T` *extends* [`Configuration`](../interfaces/Configuration.md) = [`Configuration`](../interfaces/Configuration.md)

## Parameters

### configs

...`T`[]

An array of config objects

## Returns

`T`
