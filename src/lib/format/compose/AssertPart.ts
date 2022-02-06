import { Map } from 'immutable';

import { ComposeConfig } from '../config';
import ComposeLine from './ComposeLine';
import ComposeResult from './ComposeResult';
import { ComposePart } from './types';

class AssertPart implements ComposePart {
  constructor(private readonly asserts: Map<string, string>, private readonly noWrap = false) {}

  compose(level: number, { bracket, quote, sComma }: ComposeConfig) {
    const fields = this.asserts
      .entrySeq()
      .map(([k, v]) => `${k}: ${quote(v)}`)
      .join(', ');
    const line = new ComposeLine(level, `assert ${bracket(fields + sComma)}`);
    return new ComposeResult([line], this.noWrap);
  }

  composeWrap(level: number, config: ComposeConfig) {
    if (this.noWrap) return this.compose(level, config);
    const { mComma, quote } = config;
    const fields = this.asserts
      .entrySeq()
      .map(([k, v]) => `${k}: ${quote(v)}`)
      .toArray()
      .map((v, i, { length }) => (i + 1 < length ? `${v},` : v + mComma))
      .map(v => new ComposeLine(level + 1, v));
    const s = new ComposeLine(level, 'assert {');
    const e = new ComposeLine(level, '}');
    return new ComposeResult([s, ...fields, e], true);
  }
}

export default function (asserts: Map<string, string> | undefined, noWrap = false) {
  if (!asserts) return undefined;
  return new AssertPart(asserts, noWrap);
}
