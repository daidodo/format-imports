# Namespace: formatSourceWithoutFile

## Functions

### sync

▸ **sync**(`text`, `extension`, `config`, `options?`): `undefined` \| `string`

Format given source text without knowing the source file, synchronously.

This function will try to find _tsconfig.json_ relating to the source file,
and merge them to the base config provided.

ESLint config will NOT be read because it's supported only by [formatSourceWithoutFile](../README.md#formatsourcewithoutfile).

`options` can be used to change _tsconfig.json_ loading behavior for testing
purpose.

**`see`** [formatSourceWithoutFile](../README.md#formatsourcewithoutfile)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | Source text |
| `extension` | [`Extension`](../README.md#extension) | File extension to reveal the source language |
| `config` | [`Configuration`](../interfaces/Configuration.md) | Base config |
| `options?` | `FormatOptions` | Internal/testing options |

#### Returns

`undefined` \| `string`

The result text or `undefined` if nothing changes.

#### Defined in

[format/main/index.ts:139](https://github.com/daidodo/format-imports/blob/cc4283e/src/lib/format/main/index.ts#L139)
