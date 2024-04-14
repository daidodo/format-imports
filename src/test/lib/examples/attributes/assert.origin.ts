import A from 'a' assert {  }
import D from 'a' assert { a: '' }
import B from 'b' assert { ab:    'xyz' }
import C from 'c' assert { a: 'x',bc:'xyz' }
import E from 'b' with { ab:    'xyz' }

export {A, B, C,D,E}