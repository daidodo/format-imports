import noNew from '@dozerg/no-new';

import { type ComposeConfig } from '../config';
import ComposeLine from './ComposeLine';
import ComposeResult from './ComposeResult';
import { type ComposePart } from './types';

class SemiPart implements ComposePart {
  constructor(private readonly trailing = 0) {}

  compose(level: number, { semi }: ComposeConfig) {
    const line = new ComposeLine(level, semi, '');
    return new ComposeResult([line], true, this.trailing);
  }
}

export default noNew(SemiPart);
