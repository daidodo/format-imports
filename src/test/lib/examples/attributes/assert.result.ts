import A from 'a';
import D from 'a' assert { a: '' };
import B from 'b' assert { ab: 'xyz' };
import E from 'b' with { ab: 'xyz' };
import C from 'c' assert { a: 'x', bc: 'xyz' };

export {A, B, C,D,E}