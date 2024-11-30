[**APIs Documentation**](../README.md)

***

# Type Alias: FlagSymbol

> **FlagSymbol**: `"scripts"` \| `"multiple"` \| `"single"` \| `"namespace"` \| `"named"` \| `"all"`

Different types of imports:
- _scripts_: Script imports, e.g. `import 'some_scripts'`.
- _multiple_: Import multiple names, e.g.:
```ts
  import A, {B, C} from 'a';
  import A, * as B from 'a';
```
- _single_: Import single name, e.g.:
```ts
  import A from 'a';
  import { A } from 'a';
```
- _namespace_: Import a namespace, e.g.:
```ts
  import * as A from 'a';
```
- _named_: All _multiple_, _single_ and _namespace_ combined.
- _all_: All _scripts_ and _named_ combined.

## Defined in

[config/types/grouping.ts:23](https://github.com/daidodo/format-imports/blob/e188bc4272dba9eddc624b65cf812895c79fd423/src/lib/config/types/grouping.ts#L23)
