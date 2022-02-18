/* eslint-disable @typescript-eslint/no-var-requires */

const { name: EXE, version: VERSION } = require('../../package.json');

const optionator: (options: any) => Results = require('optionator');

type Results = {
  parseArgv: (input: string[]) => any;
  generateHelp: (helpOptions?: any) => string;
};

const { parseArgv, generateHelp } = optionator({
  prepend: [
    `${EXE} [options] [FILE ...]`,
    '        Format given file(s). If no files provided, read from STDIN.',
    '',
    `${EXE} [options] DIR`,
    '        Format supported files under given directory.',
    '',
    `${EXE} -c [options] FILE/DIR [FILE/DIR ...]`,
    '        Check if files (under directories) are formatted.',
  ].join('\n'),
  options: [
    {
      option: 'help',
      alias: 'h',
      type: 'Boolean',
      description: 'Show help.',
    },
    {
      option: 'version',
      alias: 'v',
      type: 'Boolean',
      description: 'Show version number.',
    },
    {
      option: 'log',
      alias: 'l',
      type: 'Boolean',
      description: 'Show debug logs in the output.',
    },
    {
      option: 'check',
      alias: 'c',
      type: 'Boolean',
      description: 'Check if files/directories are formatted.',
    },
    {
      option: 'config',
      type: 'path::String',
      description:
        "Path to base config file, e.g. import-sorter.json. The formatted file's config will be merged into this base config.",
    },
    {
      option: 'force',
      alias: 'f',
      type: 'Boolean',
      description:
        'Always format file(s) regardless of exclude config and file disable comments. Statement level disable comments will still work.',
    },
    {
      option: 'extension',
      alias: 'e',
      type: 'String',
      enum: ['ts', 'tsx', 'js', 'jsx'],
      default: 'ts',
      description:
        'File extension assumed when reading from STDIN and output file extension is unknown.',
    },
    {
      option: 'recursive',
      type: 'Boolean',
      default: 'true',
      description: 'Format directory recursively or not.',
    },
    {
      option: 'output',
      alias: 'o',
      type: 'path::String',
      description: 'Specify the output file or directory.',
    },
    {
      option: 'dry-run',
      alias: 'd',
      type: 'Boolean',
      description: 'Test running without changing any files.',
    },
  ],
});

export interface Options {
  help?: boolean;
  version?: boolean;
  log?: boolean;
  check?: boolean;
  output?: string;
  config?: string;
  force?: boolean;
  extension?: string;
  recursive?: boolean;
  dryRun?: boolean;
  _: string[];
}

export function usage(code = 1) {
  const out = code === 0 ? process.stdout : process.stderr;
  out.write(`${generateHelp()}\n`);
  process.exit(code);
}

export function version(code = 1) {
  const out = code === 0 ? process.stdout : process.stderr;
  out.write(`v${VERSION}\n`);
  process.exit(code);
}

export function processArgv(argv: string[]) {
  try {
    return parseArgv(argv) as Options;
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : `${e}`;
    process.stderr.write(message + '\n\n');
    usage();
    throw e; // Just to satisfy the compiler.
  }
}
