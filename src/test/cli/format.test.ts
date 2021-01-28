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

describe('CLI Test Suite', () => {
  test('--help', () => runWith('--help'));
});
