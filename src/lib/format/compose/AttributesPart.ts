import { Map } from 'immutable';

import { type ComposeConfig } from '../config';
import ComposeLine from './ComposeLine';
import ComposeResult from './ComposeResult';
import { type ComposePart } from './types';

class AttributesPart implements ComposePart {
  constructor(
    private readonly token: string,
    private readonly entries: Map<string, string>,
    private readonly noWrap = false,
  ) {}

  compose(level: number, { bracket, quote, sComma }: ComposeConfig) {
    const fields = this.entries
      .entrySeq()
      .map(([k, v]) => `${k}: ${quote(v)}`)
      .join(', ');
    const line = new ComposeLine(level, `${this.token} ${bracket(fields + sComma)}`);
    return new ComposeResult([line], this.noWrap);
  }

  composeWrap(level: number, config: ComposeConfig) {
    if (this.noWrap) return this.compose(level, config);
    const { mComma, quote } = config;
    const fields = this.entries
      .entrySeq()
      .map(([k, v]) => `${k}: ${quote(v)}`)
      .toArray()
      .map((v, i, { length }) => (i + 1 < length ? `${v},` : v + mComma))
      .map(v => new ComposeLine(level + 1, v));
    const s = new ComposeLine(level, `${this.token} {`);
    const e = new ComposeLine(level, '}');
    return new ComposeResult([s, ...fields, e], true);
  }
}

export default function (
  token: string | undefined,
  entries: Map<string, string> | undefined,
  noWrap = false,
) {
  if (!token || !entries) return undefined;
  return new AttributesPart(token, entries, noWrap);
}
