# Interface: GroupRule

## Hierarchy

* **GroupRule**

## Properties

### flags

• `Optional` **flags**: *undefined* \| *single* \| *scripts* \| *multiple* \| *namespace* \| *named* \| *all* \| [*FlagSymbol*](../README.md#flagsymbol)[]

Types of imports this group supports.

If _undefined_, infer the flags from its parent and sub groups.

Defined in: [config/types/grouping.ts:31](https://github.com/daidodo/format-imports/blob/3e88cf9/src/lib/config/types/grouping.ts#L31)

___

### regex

• `Optional` **regex**: *undefined* \| *string*

Import path pattern.

An import matching the pattern will fall into this group.

If it's _undefined_, only imports matching one of [subGroups](#subGroups) fall into this group.

If both [regex](#regex) and [subGroups](#subGroups) are _undefined_, then this is a _fall-back_ group,
i.e. any paths don't match any other groups will fall into this group.

Defined in: [config/types/grouping.ts:43](https://github.com/daidodo/format-imports/blob/3e88cf9/src/lib/config/types/grouping.ts#L43)

___

### sort

• `Optional` **sort**: *undefined* \| [*SortRules*](sortrules.md) \| *none*

Sorting rules for this group.

If it's _undefined_, or either [paths](sortrules.md#paths) or [names](sortrules.md#names) is
_undefined_, then inherit either or both from the parent.

If it's _none_, or either [paths](sortrules.md#paths) or [names](sortrules.md#names) is
_none_, then don't sort either or both of them.

Defined in: [config/types/grouping.ts:75](https://github.com/daidodo/format-imports/blob/3e88cf9/src/lib/config/types/grouping.ts#L75)

___

### sortImportsBy

• `Optional` **sortImportsBy**: *undefined* \| *paths* \| *names*

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

Defined in: [config/types/grouping.ts:64](https://github.com/daidodo/format-imports/blob/3e88cf9/src/lib/config/types/grouping.ts#L64)

___

### subGroups

• `Optional` **subGroups**: *undefined* \| (*string* \| *string*[] \| [*GroupRule*](grouprule.md))[]

Sub-groups and rules. Imports will be sorted as the same order as sub groups defined.
- `string` items will be expanded to `{ regex: elem }`.
- `string[]` items will be expanded to `{ subGroups: elem }`.

Defined in: [config/types/grouping.ts:82](https://github.com/daidodo/format-imports/blob/3e88cf9/src/lib/config/types/grouping.ts#L82)
