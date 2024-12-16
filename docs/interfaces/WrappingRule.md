[**APIs Documentation**](../README.md)

***

# Interface: WrappingRule

## Properties

### ignoreComments?

> `readonly` `optional` **ignoreComments**: `boolean`

Whether to ignore trailing comments when counting line length. Default to _false_.

#### Defined in

[config/types/wrapping.ts:22](https://github.com/daidodo/format-imports/blob/ff017abf6278875690a1b32bf81664f2bd289753/src/lib/config/types/wrapping.ts#L22)

***

### maxBindingNamesPerLine?

> `readonly` `optional` **maxBindingNamesPerLine**: `number`

Max binding names per line before wrapping for imports. 0 for no limit. Default to _1_.

#### Defined in

[config/types/wrapping.ts:5](https://github.com/daidodo/format-imports/blob/ff017abf6278875690a1b32bf81664f2bd289753/src/lib/config/types/wrapping.ts#L5)

***

### maxDefaultAndBindingNamesPerLine?

> `readonly` `optional` **maxDefaultAndBindingNamesPerLine**: `number`

Max default and binding names per line before wrapping for imports. 0 for no limit. Default
to _2_.

#### Defined in

[config/types/wrapping.ts:10](https://github.com/daidodo/format-imports/blob/ff017abf6278875690a1b32bf81664f2bd289753/src/lib/config/types/wrapping.ts#L10)

***

### maxExportNamesPerLine?

> `readonly` `optional` **maxExportNamesPerLine**: `number`

Max binding names per line before wrapping for exports. 0 for no limit. Default to _0_.

#### Defined in

[config/types/wrapping.ts:14](https://github.com/daidodo/format-imports/blob/ff017abf6278875690a1b32bf81664f2bd289753/src/lib/config/types/wrapping.ts#L14)

***

### maxNamesPerWrappedLine?

> `readonly` `optional` **maxNamesPerWrappedLine**: `number`

Max names on wrapped lines for imports/exports. 0 for no limit. Default to _1_.

#### Defined in

[config/types/wrapping.ts:18](https://github.com/daidodo/format-imports/blob/ff017abf6278875690a1b32bf81664f2bd289753/src/lib/config/types/wrapping.ts#L18)
