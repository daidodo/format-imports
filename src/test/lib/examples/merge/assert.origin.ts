import {A} from 'a'
import {B} from 'a' assert{a: 'a'}
import {C} from 'a' assert{a: 'b'}
import {D} from 'a' assert{b: 'a'}
import {E} from 'a' assert{b: 'b'}
import {F} from 'a' assert{a: 'a', b: 'b'}

import G from 'b' assert {a: 'a'}
import * as H from 'b' assert {a: 'a'}

import I from 'c' assert {a: 'a'}
import {J} from 'c' assert {a: 'a'}
import {K} from 'c' assert {a: 'a'}

export {A,B,C,D,E,F,G,H,I,J,K}