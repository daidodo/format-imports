[**APIs Documentation**](../README.md)

***

# Function: resolveConfigForFile()

> **resolveConfigForFile**\<`T`\>(`fileName`, `config`?): `Promise`\<`T`\>

Resolve config for a source file.

The following sources will be considered if found (in precedence from high to low):
- [ESLint configuration](https://eslint.org/docs/user-guide/configuring)
- `"importSorter"` section in `package.json`
- `import-sorter.json` (File name is configurable from the base config)
- [Prettier configuration](https://github.com/prettier/prettier-vscode#configuration)
- `.editorconfig`
- The base config provided as parameters

## Type Parameters

• **T** *extends* [`Configuration`](../interfaces/Configuration.md) = [`Configuration`](../interfaces/Configuration.md)

## Parameters

### fileName

`string`

Source file name

### config?

`T`

Base config

## Returns

`Promise`\<`T`\>

## Typeparam

T - A type extended from Configuration

## Defined in

[config/importSorter.ts:28](https://github.com/daidodo/format-imports/blob/ff017abf6278875690a1b32bf81664f2bd289753/src/lib/config/importSorter.ts#L28)
