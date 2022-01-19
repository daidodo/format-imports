import { assert } from 'console';

import { ComposeConfig } from '../config';
import ComposeLine from './ComposeLine';

export default class ComposeResult {
  constructor(
    private readonly lines: ComposeLine[] = [],
    readonly wrapped: boolean = true,
    private readonly trailing = 0,
  ) {}

  get level() {
    if (this.lines.length < 1) return 0;
    return this.lines[0].level;
  }

  get empty() {
    return this.lines.length < 1;
  }

  text(config: ComposeConfig) {
    return this.lines.map(l => l.text(config)).join(config.nl);
  }

  merge(
    other: ComposeResult,
    { tabw, maxLength }: ComposeConfig,
  ): { result: ComposeResult; needWrap?: boolean } {
    if (other.lines.length < 1) return { result: this };
    const { lines: newLines, line, last } = this.mergeLines(other.lines);
    const trailing = this.trailing + other.trailing;
    const needWrap = line.length(tabw) + (last ? trailing : 0) > maxLength;
    const result = new ComposeResult(newLines, other.wrapped, trailing);
    return { result, needWrap };
  }

  private mergeLines(other: ComposeLine[]) {
    assert(other.length > 0);
    if (this.lines.length < 1) return { lines: other, line: other[0], last: other.length < 2 };
    const last = this.lines[this.lines.length - 1];
    const [next, ...rest] = other;
    const line = last.merge(next);
    return {
      lines: [...this.lines.slice(0, this.lines.length - 1), line, ...rest],
      line,
      last: rest.length < 1,
    };
  }
}
