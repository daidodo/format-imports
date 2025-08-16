[**APIs Documentation**](../README.md)

***

# Interface: WrappingRule

Defined in: [config/types/wrapping.ts:1](https://github.com/daidodo/format-imports/blob/6fa466521c4048be8236686fd87f433f44d2b81e/src/lib/config/types/wrapping.ts#L1)

## Properties

### ignoreComments?

> `readonly` `optional` **ignoreComments**: `boolean`

Defined in: [config/types/wrapping.ts:22](https://github.com/daidodo/format-imports/blob/6fa466521c4048be8236686fd87f433f44d2b81e/src/lib/config/types/wrapping.ts#L22)

Whether to ignore trailing comments when counting line length. Default to _false_.

***

### maxBindingNamesPerLine?

> `readonly` `optional` **maxBindingNamesPerLine**: `number`

Defined in: [config/types/wrapping.ts:5](https://github.com/daidodo/format-imports/blob/6fa466521c4048be8236686fd87f433f44d2b81e/src/lib/config/types/wrapping.ts#L5)

Max binding names per line before wrapping for imports. 0 for no limit. Default to _1_.

***

### maxDefaultAndBindingNamesPerLine?

> `readonly` `optional` **maxDefaultAndBindingNamesPerLine**: `number`

Defined in: [config/types/wrapping.ts:10](https://github.com/daidodo/format-imports/blob/6fa466521c4048be8236686fd87f433f44d2b81e/src/lib/config/types/wrapping.ts#L10)

Max default and binding names per line before wrapping for imports. 0 for no limit. Default
to _2_.

***

### maxExportNamesPerLine?

> `readonly` `optional` **maxExportNamesPerLine**: `number`

Defined in: [config/types/wrapping.ts:14](https://github.com/daidodo/format-imports/blob/6fa466521c4048be8236686fd87f433f44d2b81e/src/lib/config/types/wrapping.ts#L14)

Max binding names per line before wrapping for exports. 0 for no limit. Default to _0_.

***

### maxNamesPerWrappedLine?

> `readonly` `optional` **maxNamesPerWrappedLine**: `number`

Defined in: [config/types/wrapping.ts:18](https://github.com/daidodo/format-imports/blob/6fa466521c4048be8236686fd87f433f44d2b81e/src/lib/config/types/wrapping.ts#L18)

Max names on wrapped lines for imports/exports. 0 for no limit. Default to _1_.
