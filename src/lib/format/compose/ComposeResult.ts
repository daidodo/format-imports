import { assertTrue } from '@dozerg/condition';

import { type ComposeConfig } from '../config';
import type ComposeLine from './ComposeLine';

export default class ComposeResult {
  constructor(
    private readonly lines: ComposeLine[] = [],
    readonly wrapped = true,
    private readonly trailing = 0,
  ) {}

  get level() {
    if (this.lines.length < 1) return 0;
    return this.lines[this.lines.length - 1].level;
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
    last: boolean,
  ): { result: ComposeResult; needWrap?: boolean } {
    if (other.lines.length < 1) return { result: this };
    const { lines: newLines, line, only } = this.mergeLines(other.lines);
    const trailing = last && only ? this.trailing + other.trailing : 0;
    const needWrap = line.length(tabw) + trailing > maxLength;
    const result = new ComposeResult(newLines, other.wrapped, trailing);
    return { result, needWrap };
  }

  private mergeLines(other: ComposeLine[]) {
    assertTrue(other.length > 0, 'other.length is 0', other);
    if (this.lines.length < 1) return { lines: other, line: other[0], only: other.length < 2 };
    const last = this.lines[this.lines.length - 1];
    const [next, ...rest] = other;
    const line = last.merge(next);
    return {
      lines: [...this.lines.slice(0, this.lines.length - 1), line, ...rest],
      line,
      only: rest.length < 1,
    };
  }
}
