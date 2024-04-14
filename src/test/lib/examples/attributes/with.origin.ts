import A from 'a' with {  }
import D from 'a' with { a: '' }
import B from 'b' with { ab:    'xyz' }
import C from 'c' with { a: 'x',bc:'xyz' }
import E from 'c' assert { a: 'x',bc:'xyz' }

export {A, B, C,D,E}