<!-- markdownlint-disable first-line-h1 -->

### Features

- Support `\r` and `\n\r` as newlines.
- Support for .vue files. ([Link](https://github.com/daidodo/tsimportsorter/issues/37), [Link](https://github.com/MLoughry/sort-typescript-imports/issues/31))
- Sort numbers naturally. ([Example](https://github.com/lydell/eslint-plugin-simple-import-sort#sorting))
- Support rules from [awesome-eslint](https://github.com/dustinspecker/awesome-eslint).
- Support [benmosher/eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import) rules. ([Link](https://github.com/SoominHan/import-sorter/issues/43), [exports-last](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/exports-last.md), [import/order](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md))
- Support [Tibfib/eslint-plugin-import-helpers](https://github.com/Tibfib/eslint-plugin-import-helpers) rules. ([Link](https://github.com/SoominHan/import-sorter/issues/36))
- Group level comments. ([Link](https://github.com/SoominHan/import-sorter/issues/46))
- Import namespace alias. ([Link](https://github.com/SoominHan/import-sorter/issues/29))
- Sort by file name instead of full path. ([Link](https://github.com/neilsoult/typescript-imports-sort/issues/3))
- Do not remove imports of commented code. ([Link](https://gitlab.com/smartive-private/christoph/typescript-hero/-/issues/460))
- Prevent organize import on parse error. ([Link](https://gitlab.com/smartive-private/christoph/typescript-hero/-/issues/406))
- Add setting for one import per line. ([Link](https://gitlab.com/smartive-private/christoph/typescript-hero/-/issues/351))
- Sort css imports to the bottom by default. ([Link](https://github.com/zeilmannnoah/orion-import-sorter/issues/1), [Ref](https://raygun.com/blog/css-preprocessors-examples/)).

### Implementation

- Use Immutable.js.

### Bugs

- Inner comments are removed after formatting. E.g. `import A /*inner comment*/ from 'a'`.
