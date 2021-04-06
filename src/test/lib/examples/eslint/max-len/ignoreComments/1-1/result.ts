import A from 'aaaaaaaaaaaaa';
import B
  from 'aaaaaaaaaaaaaa';

import C from './a'; // aaaaaa
import D from './b'; // bbbbbbb

const a = A & B & C & D;

export { D } from 'ccccccccc';
export {
  E,
} from 'cccccccccc';
export { F } from 'd'; // dddd
export { G } from 'e'; // eeeee
