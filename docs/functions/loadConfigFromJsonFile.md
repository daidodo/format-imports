[**APIs Documentation**](../README.md)

***

# Function: loadConfigFromJsonFile()

> **loadConfigFromJsonFile**(`fileName`): [`Configuration`](../interfaces/Configuration.md)

Defined in: [config/importSorter.ts:99](https://github.com/daidodo/format-imports/blob/6fa466521c4048be8236686fd87f433f44d2b81e/src/lib/config/importSorter.ts#L99)

Load config from given file, e.g. _path/to/import-sorter.json_.

Will throw an error if file is unreadable or content is not a valid JSON object.

## Parameters

### fileName

`string`

## Returns

[`Configuration`](../interfaces/Configuration.md)
