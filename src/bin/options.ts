const optionator: (options: any) => Results = require('optionator');

type Results = {
  parseArgv: (input: string[]) => any;
  generateHelp: (helpOptions?: any) => string;
};

const EXE = 'format-imports';

const { parseArgv, generateHelp } = optionator({
  prepend: [
    EXE + ' [options] [FILE ...]',
    '    Format given file(s). If no files provided, format code from STDIN.',
    EXE + ' [options] DIR',
    '    Format supported files under given directory.',
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
      option: 'config',
      alias: 'c',
      type: 'path::String',
      description:
        'Read base config from a file, e.g. import-sorter.json. Each source file can have specific config which will be merged into the base config.',
      example: EXE + ' -c ./import-sorter.json source.ts',
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
      description: 'File extension assumed when reading from STDIN.',
    },
    {
      option: 'recursive',
      alias: 'r',
      type: 'Boolean',
      description: 'Format directories recursively.',
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
      description: 'Test running without modifying any files.',
    },
  ],
});

export interface Options {
  help?: boolean;
  version?: boolean;
  config?: string;
  force?: boolean;
  extension?: string;
  recursive?: boolean;
  output?: string;
  dryRun?: boolean;
  _: string[];
}

export function usage() {
  process.stderr.write(`${generateHelp()}\n`);
  process.exit(1);
}

export function version() {
  const v = require('../../package.json').version;
  process.stderr.write(`v${v}\n`);
  process.exit(1);
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
