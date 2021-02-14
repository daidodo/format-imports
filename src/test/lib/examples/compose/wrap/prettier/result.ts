// ====== Imports ======

// 0 names
import 'a-veeeeeeery-looooooooooong-veeeeeeery-looooooooooong-script';

import {
  A,
  B,
  C,
  D,
} from 'aaaaaaa';
// 1 name
import A from 'aaaaaaaaaaaaaaaaaa';
import type {
  A,
  B,
  C,
  D,
} from 'aaazaaa';
// ====== Import types ======
// 1 name
import type A from 'aabaaaaaaaaaaaaaaa';
import { A, B } from 'b'; // long comment
import A = require('b-veeeeeeery-looooooooooong-veeeeeeery-looooooooooong-module');
// 2+ names
import type B, * as C from 'bdaefadfadffadgadf';
// 2+ names
import B, * as C from 'bdaefadfadsfadgadf';
import * as AA from 'dfefefefeffe';
import type * as AA from 'dfexefefeffe';
import type { A, B } from 'g';     // long comment
import {
  B,
  C,
} from 'ssssssssa';
import A, {
  B,
} from 'sssssssss';
import type {
  B,
  C,
} from 'sssstssss';
import type A, {
  B,
} from 'ssssyssss';
import { XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX } from 'xdfdfdfdfdfdf';
import { XXX } from 'xdfdfdfdsfdfdf';
import type { XXX } from 'xdfdfsfdfdfdf';

// 1 name
export { AAAAAAAAAAAAAAAAAAAAAAA };    //comm

// 2+ names
export {
  BBBBBBBBBBBB,
  CCCCCCCCCC,
};   //comm
export {
  CCCCCCCC,
  EEEEEEEEE,
  FFFFFF,
  XXXXXX,
};    //comm
export { A, B }; // long long comment

// 1 name
export { Z } from 'aaaaaaaaaaaaaaaaa'; // comm

// 2+ names
export {
  B,
  K,
} from 'aaaaaaaaaaaaaaaaa'; // comm
export {
  B,
  C,
  D,
  E,
} from 'aaa';
export { A, B } from 'a'; // long comment
