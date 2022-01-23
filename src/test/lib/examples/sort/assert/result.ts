import A from 'a';
import A from 'a' assert { a: '' };
import A from 'a' assert { a: 'a' };
import A from 'a' assert { a: 'a', b: '' };
import A from 'a' assert { a: 'a', b: 'b' };
import A from 'a' assert { a: 'a', b: 'c' };
import A from 'a' assert { a: 'b' };
import A from 'a' assert { b: '' };
import A from 'a' assert { b: 'a' };
import A from 'a' assert { b: 'b' };

export {A}