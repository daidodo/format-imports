[**APIs Documentation**](../README.md)

***

# Variable: DEFAULT\_MERGER

> `const` **DEFAULT\_MERGER**: `Merger`\<[`Configuration`](../interfaces/Configuration.md)\>

Default merge rules for [mergeConfig](#mergeConfig), which are:

- exclude, excludeGlob and keepUnused arrays will be concatenated instead of replaced;
- sortRules object will be merged instead of replaced;
- All other fields will be replaced and the latter config takes precedence.

When creating your own merge policy, make sure to inherit the default merger and just override
the ones different.

## Defined in

[config/merge.ts:21](https://github.com/daidodo/format-imports/blob/e188bc4272dba9eddc624b65cf812895c79fd423/src/lib/config/merge.ts#L21)
