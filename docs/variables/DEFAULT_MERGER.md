[**APIs Documentation**](../README.md)

***

# Variable: DEFAULT\_MERGER

> `const` **DEFAULT\_MERGER**: `Merger`\<[`Configuration`](../interfaces/Configuration.md)\>

Defined in: [config/merge.ts:21](https://github.com/daidodo/format-imports/blob/6fa466521c4048be8236686fd87f433f44d2b81e/src/lib/config/merge.ts#L21)

Default merge rules for [mergeConfig](#mergeConfig), which are:

- exclude, excludeGlob and keepUnused arrays will be concatenated instead of replaced;
- sortRules object will be merged instead of replaced;
- All other fields will be replaced and the latter config takes precedence.

When creating your own merge policy, make sure to inherit the default merger and just override
the ones different.
