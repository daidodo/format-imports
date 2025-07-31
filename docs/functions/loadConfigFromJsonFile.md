[**APIs Documentation**](../README.md)

***

# Function: loadConfigFromJsonFile()

> **loadConfigFromJsonFile**(`fileName`): [`Configuration`](../interfaces/Configuration.md)

Defined in: [config/importSorter.ts:99](https://github.com/daidodo/format-imports/blob/fa507828ea2705f4ecb83df3b3b0422b1a8a80a7/src/lib/config/importSorter.ts#L99)

Load config from given file, e.g. _path/to/import-sorter.json_.

Will throw an error if file is unreadable or content is not a valid JSON object.

## Parameters

### fileName

`string`

## Returns

[`Configuration`](../interfaces/Configuration.md)
