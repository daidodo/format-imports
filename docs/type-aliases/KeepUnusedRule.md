[**APIs Documentation**](../README.md)

***

# Type Alias: KeepUnusedRule

> **KeepUnusedRule** = `string` \| \{ `names?`: `string`[]; `path`: `string`; \}

Defined in: [config/types/unused.ts:6](https://github.com/daidodo/format-imports/blob/fa507828ea2705f4ecb83df3b3b0422b1a8a80a7/src/lib/config/types/unused.ts#L6)

This is for keeping unused names.

`string` elements will be expanded to `{ path: element }`.

## Type declaration

`string`

\{ `names?`: `string`[]; `path`: `string`; \}

### names?

> `optional` **names**: `string`[]

Imported name pattern.

If it's _undefined_ or empty, all names will match.

### path

> **path**: `string`

Import path pattern.

If it's _undefined_ or empty, the rule will be ignored.
