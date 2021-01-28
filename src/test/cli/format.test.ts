import { expect } from 'chai';
import { spawnSync } from 'child_process';

function runWith(options: string, that: Mocha.Context) {
  const script = 'dist/bin/format-cli.js';
  const { stdout, stderr, status } = spawnSync('node', [script, options]);
  expect({
    stdout: stdout.toString().split('\n'),
    stderr: stderr.toString().split('\n'),
    status,
  }).to.matchSnapshot(that);
  console.log('🚀 ~ file: format.test.ts ~ line 10 ~ runWith ~ code', status);
  console.log('🚀 ~ file: format.test.ts ~ line 10 ~ runWith ~ stdout', stdout.toString());
  console.log('🚀 ~ file: format.test.ts ~ line 10 ~ runWith ~ stderr', stderr.toString());
}

suite('CLI Test Suite', () => {
  test('--help', function () {
    runWith('--help', this);
  });
});
