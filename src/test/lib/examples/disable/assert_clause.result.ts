'use strict'
import B from 'B';
import C from 'c';

export {} from 'd' //ts-import-sorter: disable

import A from 'a' assert { type: 'json' }

export { B, C };
