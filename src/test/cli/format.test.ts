import { spawnSync } from 'child_process';

function run(options: string) {
  const script = 'src/bin/format-cli.ts';
  const { stdout, stderr, status } = spawnSync('ts-node', [script, options]);
  expect({
    stdout: stdout.toString(),
    stderr: stderr.toString(),
    status,
  }).toMatchSnapshot();
}

describe('cli/format-imports', () => {
  test('--help', () => run('--help'));
  test('-h', () => run('-h'));

  test('--version', () => run('--version'));
  test('-v', () => run('-v'));
});
