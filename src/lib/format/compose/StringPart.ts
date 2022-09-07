import noNew from '@dozerg/no-new';

import ComposeLine from './ComposeLine';
import ComposeResult from './ComposeResult';
import { type ComposePart } from './types';

class StringPart implements ComposePart {
  constructor(private readonly text: string, private readonly noWrap = false) {}

  compose(level: number) {
    const line = new ComposeLine(level, this.text);
    return new ComposeResult([line], this.noWrap);
  }

  composeWrap(level: number) {
    if (this.noWrap) return this.composeWrapFirst(level);
    const nl = new ComposeLine(level);
    const line = new ComposeLine(Math.max(level, 1), this.text);
    return new ComposeResult([nl, line], true);
  }

  composeWrapFirst(level: number) {
    const line = new ComposeLine(level, this.text);
    return new ComposeResult([line], true);
  }
}

export default noNew(StringPart);
