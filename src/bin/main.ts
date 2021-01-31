import { check } from './check';
import { format } from './format';
import {
  processArgv,
  usage,
  version,
} from './options';

async function main(argv: string[]) {
  const options = processArgv(argv);
  if (options.help) usage();
  if (options.version) version();
  try {
    if (options.check) check(options);
    else await format(options);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : `${e}`;
    process.stderr.write(message + '\n');
    process.exit(1);
  }
}

main(process.argv);
