import A, { B, C } from 'a' assert { a: 'a' };
import D, { E, F } from 'a' assert { a: 'aa' };
import G, { H, I } from 'aaaaaaaaaaaa' assert { a: 'aaaaaaa' };
import J, { K, L } from 'aaaaaaaaaaaa' assert { a: 'aaaaaaaa' };
import JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ, { KK, LL } 
  from 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' assert { 
    a: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' };

export {A,B,C,D,E,F,G,H,I,J,K,L,JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ, KK ,LL}