# Interface: GroupRule

## Properties

### flags

• `Optional` **flags**: [`FlagSymbol`](../README.md#flagsymbol) \| [`FlagSymbol`](../README.md#flagsymbol)[]

Types of imports this group supports.

If _undefined_, infer the flags from its parent and sub groups.

#### Defined in

[config/types/grouping.ts:31](https://github.com/daidodo/format-imports/blob/f5a9209/src/lib/config/types/grouping.ts#L31)

___

### importType

• `Optional` **importType**: `boolean`

Whether to accepts `import` or `import type`:

- If it's _true_, the group accepts only `import type`;
- If it's _false_, the group accepts only `import`;
- If it's _undefined_, the group accepts both.

Default to _undefined_.

#### Defined in

[config/types/grouping.ts:54](https://github.com/daidodo/format-imports/blob/f5a9209/src/lib/config/types/grouping.ts#L54)

___

### regex

• `Optional` **regex**: `string`

Import path pattern.

An import matching the pattern will fall into this group.

If it's _undefined_, only imports matching one of [subGroups](#subGroups) fall into this group.

If both [regex](#regex) and [subGroups](#subGroups) are _undefined_, then this is a _fall-back_ group,
i.e. any paths don't match any other groups will fall into this group.

#### Defined in

[config/types/grouping.ts:43](https://github.com/daidodo/format-imports/blob/f5a9209/src/lib/config/types/grouping.ts#L43)

___

### sort

• `Optional` **sort**: ``"none"`` \| [`SortRules`](SortRules.md)

Sorting rules for this group.

If it's _undefined_, or either/both [paths](sortrules.md#paths) or [names](sortrules.md#names) is
_undefined_, then inherit either/both from the parent.

If it's _none_, or either/both [paths](sortrules.md#paths) or [names](sortrules.md#names) is
_none_, then don't sort either/both of them.

#### Defined in

[config/types/grouping.ts:86](https://github.com/daidodo/format-imports/blob/f5a9209/src/lib/config/types/grouping.ts#L86)

___

### sortImportsBy

• `Optional` **sortImportsBy**: ``"paths"`` \| ``"names"``

Sort import statements by paths or first names.

If it's _undefined_, then use the parent's value, or _paths_ if this is a top group.

If by paths, the result is:

```ts
import B from 'a';
import A from 'b';
```

If by names, the result is:

```ts
import A from 'b';
import B from 'a';
```

#### Defined in

[config/types/grouping.ts:75](https://github.com/daidodo/format-imports/blob/f5a9209/src/lib/config/types/grouping.ts#L75)

___

### subGroups

• `Optional` **subGroups**: (`string` \| `string`[] \| [`GroupRule`](GroupRule.md))[]

Sub-groups and rules. Imports will be sorted as the same order as sub groups defined.
- `string` items will be expanded to `{ regex: elem }`.
- `string[]` items will be expanded to `{ subGroups: elem }`.

#### Defined in

[config/types/grouping.ts:93](https://github.com/daidodo/format-imports/blob/f5a9209/src/lib/config/types/grouping.ts#L93)
