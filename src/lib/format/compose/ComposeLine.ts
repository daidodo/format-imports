import { ComposeConfig } from '../config';

export default class ComposeLine {
  constructor(
    readonly level: number,
    private readonly text_?: string,
    private readonly noSpace?: boolean,
  ) {}

  text({ tab }: ComposeConfig) {
    if (this.level < 1 || !this.text_) return this.text_ ?? '';
    return tab.repeat(this.level) + this.text_;
  }

  merge(other: ComposeLine) {
    if (!this.text_) return other;
    const text = !other.text_
      ? this.text_
      : other.noSpace
      ? this.text_ + other.text_
      : `${this.text_} ${other.text_}`;
    return new ComposeLine(other.level, text);
  }

  length(tabSz: number) {
    if (!this.text_) return 0;
    return this.level * tabSz + this.text_.length;
  }
}
