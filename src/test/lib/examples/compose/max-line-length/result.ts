import 'aaaaaaaa';   // comment
import 'aaaaaaaaaaaaaaaaaaaaa';

import A
  from 'aa';   //comment
import CCCCCCCCCCCCCCCCCCCCCCCCC,
  * as DDDDDDDDDDDDDDDDDDDDDDD
  from 'aaa';
import type AAAA from 'aaaaa';
import C, * as D from 'aaaaa';
import CC, * as DD
  from 'aaaaa';
import CCCCCCCCCCCCCCCCCCCCCCCCC,
  * as DDD from 'aaaaa';
import type AAAA
  from 'aaaaaa';
import AAA from 'aaaaaaaaaaa';
import AA
  from 'aaaaaaaaaaaaa';
import {
  A,
  B,
} from 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
import type { BBBB } from 'b';
import type {
  BBBB,
} from 'bb';
import {
  B,
} from 'bb';//commnt
import { BBB } from 'bbbbbbb';
import {
  BB,
} from 'bbbbbbbbb';
import C =
  require('cc');//cmmt
import CCC = require('ccccc');
import CC =
  require('ccccccc');
import * as D
  from 'dd'; //cmmt
import * as DDD from 'dddddd';
import * as DD
  from 'dddddddd';

export { A, AA, AAA, B, BBB };
export {
  aaaa,
  aaaaa,
  bbb,
} from 'a'; //cmt
export { a, b } from 'a';/*cmt
xxx*/
export type { a, b } from 'a';
export type {
  a,
  b,
} from 'aa';

type X = C & CC & CCC & BB & D & DD & DDD & AAAA & BBBB & CCCCCCCCCCCCCCCCCCCCCCCCC & DDDDDDDDDDDDDDDDDDDDDDD;