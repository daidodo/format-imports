import * as A from 'a' assert { a: 'a' };
import * as B from 'a' assert {
  a: 'aa',
};
import * as C
  from 'aaaaaaaaaaaa' assert { a: 'aa' };
import * as D
  from 'aaaaaaaaaaaa' assert {
    a: 'aaa',
  };
import * as DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
  from 'aaaaaaaaaaaaaaaaaaaaaaaa' assert {
    a: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  };

export {
  A,
  B,
  C,
  D,
  DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD,
};
