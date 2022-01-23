import A from 'a' assert { aaa: 'aaa' };
import B from 'a' assert { aaa: 'aaaa' };
import C from 'aaaaaaaaaaaaaaaa' assert { aaa: 'aaaaa' };
import CCaaaaaaaaaaaaaa from 'a' assert { a: 'aaaaaaaaaaaa' };
import CCaaaaaaaaaaaaab from 'a' assert { a: 'aaaaaaaaaaaaa' };
import CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC
  from 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' assert { aaa: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaa' };

export { A,B,C,CCaaaaaaaaaaaaaa,CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC,CCaaaaaaaaaaaaab };
