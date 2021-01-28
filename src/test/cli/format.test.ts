import { spawnSync } from 'child_process';

function runWith(options: string) {
  const script = 'dist/bin/format-cli.js';
  const { stdout, stderr, status } = spawnSync('node', [script, options]);
  expect({
    stdout: stdout.toString(),
    stderr: stderr.toString(),
    status,
  }).toMatchSnapshot();
}

describe('cli/format-imports', () => {
  test('--help', () => runWith('--help'));
  test('-h', () => runWith('-h'));
  test('--version', () => runWith('--version'));
  test('-v', () => runWith('-v'));
});
