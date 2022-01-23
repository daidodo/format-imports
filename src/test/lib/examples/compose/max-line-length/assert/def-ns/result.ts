import A, * as B from 'a' assert { a: 'a' };
import C, * as D from 'a' assert {
  a: 'aa',
};
import E, * as F
  from 'aaaaaaaaaaaa' assert { a: 'aaaaa' };
import GGGGGGGGGGGGGGGGGGGGGGGGGGGGG, * as H
  from 'aaaaaaaaaaaa' assert {
    a: 'aaaaaa',
  };
import GGGGGGGGGGGGGGGGGGGGGGGGGGGGGG,
  * as I from 'b' assert { a: 'aaaaaaaaa' };
import GGGGGGGGGGGGGGGGGGGGGGGGGGGGGH,
  * as J from 'bbbbbbbbbbbbbbbbbbb' assert {
    a: 'aaaaaaaaaa',
  };
import GGGGGGGGGGGGGGGGGGGGGGGGGGGGGI,
  * as JJJJJJJJJJJJJJJJJJJJJJJJJJJJJ
  from 'c' assert { a: 'aaaaaaaaaaaaaaaa' };
import GGGGGGGGGGGGGGGGGGGGGGGGGGGGGJ,
  * as JJJJJJJJJJJJJJJJJJJJJJJJJJJJK
  from 'c' assert {
    a: 'aaaaaaaaaaaaaaaaa',
  };
import GGGGGGGGGGGGGGGGGGGGGGGGGGGGGJJJJJJJJJJ,
  * as JJJJJJJJJJJJJJJJJJJJJJJJJJJJKKKKKKKKKKKKK
  from 'ccccccccccccccccccccccccccccccc' assert {
    a: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  };

export {
  A,
  B,
  C,
  D,
  E,
  F,
  GGGGGGGGGGGGGGGGGGGGGGGGGGGGG,
  GGGGGGGGGGGGGGGGGGGGGGGGGGGGGG,
  GGGGGGGGGGGGGGGGGGGGGGGGGGGGGH,
  GGGGGGGGGGGGGGGGGGGGGGGGGGGGGI,
  GGGGGGGGGGGGGGGGGGGGGGGGGGGGGJ,
  GGGGGGGGGGGGGGGGGGGGGGGGGGGGGJJJJJJJJJJ,
  H,
  I,
  J,
  JJJJJJJJJJJJJJJJJJJJJJJJJJJJJ,
  JJJJJJJJJJJJJJJJJJJJJJJJJJJJK,
  JJJJJJJJJJJJJJJJJJJJJJJJJJJJKKKKKKKKKKKKK,
};
