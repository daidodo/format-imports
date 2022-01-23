// ====== Imports ======

// 0 names
import 'a-veeeeeeery-looooooooooong-veeeeeeery-looooooooooong-script';

// 1 name
import A from 'aaaaaaaaaaaaaaaaaa'
import {XXX} from 'xdfdfdfdsfdfdf'
import { XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX } from 'xdfdfdfdfdfdf'
import * as AA from 'dfefefefeffe'
import A = require('b-veeeeeeery-looooooooooong-veeeeeeery-looooooooooong-module');


// 2+ names
import B, * as C from 'bdaefadfadsfadgadf'
import { B, C } from 'ssssssssa'
import A, { B } from 'sssssssss'
import {
  A, B,
  C, D,
} from 'aaaaaaa'
import { A, B } from 'b'; // long comment

// ====== Import types ======

// 1 name
import type A from 'aabaaaaaaaaaaaaaaa'
import type {XXX} from 'xdfdfsfdfdfdf'
import type * as AA from 'dfexefefeffe'


// 2+ names
import type B, * as C from 'bdaefadfadffadgadf'
import type { B, C } from 'sssstssss'
import type A, { B } from 'ssssyssss'
import type {
  A, B,
  C, D,
} from 'aaazaaa'
import type { A, B } from 'g';     // long comment



// ====== Exports ======

// 0 names
export {}   //comm

// 1 name
export { AAAAAAAAAAAAAAAAAAAAAAA }    //comm

// 2+ names
export { BBBBBBBBBBBB, CCCCCCCCCC }   //comm
export {
 CCCCCCCC, EEEEEEEEE,
 FFFFFF, XXXXXX,
}    //comm
export { A, B }; // long long comment

// ====== Exports from ======

// 0 names
export {} from 'aaaaaaaaaazaaaaaaa' // comm

// 1 name
export {Z} from 'aaaaaaaaaaaaaaaaa' // comm

// 2+ names
export {K, B} from 'aaaaaaaaaaaaaaaaa' // comm
export {
  B, C,
  D, E,
} from 'aaa'
export { A, B, } from 'a'; // long comment

// assert
import A from 'aaaaa' assert { a: 'a', b: 'b' }
import * as A from 'aaaaa' assert { a: 'a', b: 'e' }
import {A} from 'aaaaa' assert { a: 'a', b: 'c' }
import {A,B} from 'aaaaa' assert { a: 'a', b: 'd' }