<!-- markdownlint-configure-file
{
  "no-inline-html": {
    "allowed_elements": ["img"]
  }
}
-->

# Thanks <!-- omit in toc -->

Thank you for helping improve the project!

# Open an issue <!-- omit in toc -->

Please use the following links to:

- [Request a New Feature](https://github.com/daidodo/format-imports/issues/new?template=feature_request.md), or
- [Report a Bug](https://github.com/daidodo/tsimportsorter/issues/new?template=bug_report.md)

# Table of Content <!-- omit in toc -->

- [Contribute to code](#contribute-to-code)
- [Integration Tests and Examples](#integration-tests-and-examples)
  - [Integration Tests for CLI](#integration-tests-for-cli)
    - [`cmd.txt`](#cmdtxt)
    - [`stdin.dat`](#stdindat)
    - [`__in/`](#__in)
    - [`__out/`](#__out)
    - [`skip.txt`](#skiptxt)
    - [`special.txt`](#specialtxt)
  - [Integration Tests for library](#integration-tests-for-library)
    - [Configuration Files](#configuration-files)
    - [More Tips](#more-tips)

# Contribute to code

All source files are in `src/` and split into several modules:

- `bin/`: Code for `format-imports` CLI.
- `lib/`: Code for the core library and APIs, and unit tests.
  - `config/`: Configuration searching and loading.
  - `format/`: The core formatting logic.
- `test/`: Integration tests.
  - `cli`: Integration tests and examples for CLI.
  - `lib`: Integration tests and examples for library.

# Integration Tests and Examples

After you've made some code changes, you should always add integration tests and examples to make sure it's working.

## Integration Tests for CLI

The main test entry point is in `src/test/cli/main.test.ts`.

The test will search `examples/` directory for `cmd.txt`, and spawn child processes to run CLI and check the output (exit code, `STDOUT` and `STDERR`) and updated files. The exit code, `STDOUT` and `STDERR` are tested against snapshots.

All test cases are organized in the same way as the file structure under `example/` for easy management. For example, `example/check/empty/cmd.txt` will generate test cases:

```sh
check
    empty
        ✓ [--check]
        ✓ [-c]
```

Under the hood, the child process runs in a sandbox environment, with `CWD` set to a temporary directory. The environment will be teared down after child process exits.

### `cmd.txt`

This file specifies options to the CLI, one per line, e.g.:

_cmd.txt:_

```txt
--check
-c
```

Will spawn two child processes running `format-imports --check` and `format-imports -c` respectively.

### `stdin.dat`

If your test case needs input from `STDIN`, you can put them in `stdin.dat`.

### `__in/`

If your test case needs input files, e.g. a source file for CLI to read, you can put them under `__in/` directory of your example. The files and directories will be copied to the sandbox environment of the child process.

### `__out/`

If your test case creates or updates files, you can put expected files in `__out/` directory. After the child process finishes, these files will be compared to the actual written files in the sandbox environment to validate the execution.

### `skip.txt`

Some test cases are meaningless in certain OS. For example, `formats-imports --check /dev/null` will produce unwanted results in Windows because it doesn't have `/dev/null`.

You can edit `skip.txt` to skip tests in such OSes, one per line. E.g.:

_skip.txt:_

```txt
win32
```

OS names will be compared to [os.platform()](https://nodejs.org/api/os.html#os_os_platform).

### `special.txt`

When a test case has different results on different OSes, you can specify them in `special.txt`.

For example, `examples/check/1-processed/reject/cmd.txt` has different results on MacOS/Linux and Windows. To reflect that, there is a:

_special.txt:_

```txt
win32
```

So that a different snapshot is generated for Windows:

```snap
exports[`CLI check 1-processed rejected [--check a] 1`] = `
Object {
  "status": 1,
  "stderr": "'a/1.ts' is different after formatting.
",
  "stdout": "Checked 1 file, of which:
  1 file has formatting issues.
",
}
`;

exports[`CLI check 1-processed rejected win32[--check a] 1`] = `
Object {
  "status": 1,
  "stderr": "'a\\\\1.ts' is different after formatting.
",
  "stdout": "Checked 1 file, of which:
  1 file has formatting issues.
",
}
`;
```

Please note the `win32` tag in the 2nd snapshot.

## Integration Tests for library

All tests start from `src/test/lib/formatSource.test.ts`

The test will look into `examples/` directory and search for `.origin.ts` files as input, format it, and compare the output with the corresponding `.result.ts` files, e.g. `abc.origin.ts` => `abc.result.ts`, `origin.ts` => `result.ts`.

All test cases are organized the same way as the file structure for easy management. For example, `example/compose/comma/origin.ts` will generate a test case:

```sh
compose
    comma
        ✓ default
```

You can specify test cases to run by changing the 2nd parameter of `runTestSuite`:

- `runTestSuite(examples)` will run all test cases.
- `runTestSuite(examples, 'some/folder')` will run test cases under `examples/some/folder/`, including sub-folders.
- `runTestSuite(examples, 'folder/name')` will run single test case `examples/folder/name.origin.ts`. (Please note that `.origin.ts` is not included in the parameter)
- `runTestSuite(examples, 'folder/default')` will run single test case `examples/folder/origin.ts`.

### Configuration Files

You can provide config files to your test cases to cover different scenarios.

- `import-sorter.json`

  Configurations from `import-sorter.json` will be MERGED from current folder to its parent and so on until `src/test/suite/examples/`. The closer to the example, the higher precedence.

  That means you can put general configs in the parent folders, and test case specific configs in the current folder. It's also ok if there is no `import-sorter.json`, which means the parent's configs will be used.

- `tsconfig.json`

  If you need to customize TypeScript compiler options for your test cases, you can add a `tsconfig.json` in your test case folder.

  Please note that `tsconfig.json` is NOT inheritable, which means parent folders' `tsconfig.json` will not affect the children. If there is no `tsconfig.json`, the TypeScript compiler options will be undefined.

  Please check `examples/js/jsx/` for an example.

- `.eslintrc.json`

  To test ESLint related test cases, you can add an `.eslintrc.json` to your test case folder.

  It is recommended that you always add `"root": true` in your `.eslintrc.json` to avoid unexpected rules from parent folders. That way, `.eslintrc.json` becomes non-inheritable, which means parent folders' `.eslintrc.json` will not affect the children, the same as `tsconfig.json`.

  Please check `examples/eslint/` for more examples.

### More Tips

There are a few convenient features to reduce boiler-plate code:

- If the output is the same as input, `.result.ts` can be omitted. E.g.:

  _abc.origin.ts:_

  ```ts
  // ts-import-sorter: disable

  import { A } from 'a';
  ```

  You don't need an `abc.result.ts` because the library won't change the code because of the file-disable comment.

- If multiple `.origin.ts`s share the same output, you can merge them into one `result.ts`. E.g.:

  ```shell
  examples/folder
   ┣ 0-0.origin.ts
   ┣ 1-1.origin.ts
   ┣ 2-2.origin.ts
   ┗ result.ts
  ```

  All outputs for `0-0`, `1-1` and `2-2` will be compared with `result.ts`. Please note that it's ok to NOT have a `origin.ts` in place.
