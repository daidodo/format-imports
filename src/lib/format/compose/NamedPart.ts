import {
  assert,
  assertNonNull,
  noNew,
} from '../../common';
import { ComposeConfig } from '../config';
import { NameBinding } from '../types';
import ComposeLine from './ComposeLine';
import ComposeResult from './ComposeResult';
import { ComposePart } from './types';

class NamedPart implements ComposePart {
  private readonly names: string[];

  constructor(
    names: NameBinding[],
    private readonly from: string | undefined,
    private readonly maxWords: number,
    private readonly noWrapSingle: boolean,
  ) {
    this.names = names.map(composeName);
  }

  compose(level: number, config: ComposeConfig): ComposeResult {
    assert(this.maxWords >= 1);
    const { bracket, sComma } = config;
    if (0 < this.names.length && this.names.length <= this.maxWords) {
      const n = bracket(`${this.names.join(', ')}${sComma}`);
      const line = new ComposeLine(level, join(n, this.from));
      return new ComposeResult([line], this.noWrapSingle && this.names.length === 1);
    }
    return this.composeWrap(level, config);
  }

  composeWrap(level: number, config: ComposeConfig) {
    if (this.names.length < 1) {
      const line = new ComposeLine(level, join('{}', this.from));
      return new ComposeResult([line], true);
    } else if (this.noWrapSingle && this.names.length === 1) return this.compose(level, config);
    const lines: ComposeLine[] = [];
    for (let n = this.names; n.length; ) {
      const { line, left } = composeLine(level + 1, n, config);
      lines.push(line);
      n = left;
    }
    const s = new ComposeLine(level, '{');
    const e = new ComposeLine(level, join('}', this.from));
    return new ComposeResult([s, ...lines, e], true);
  }
}

function composeName(name: NameBinding) {
  const { propertyName, aliasName, isTypeOnly } = name;
  const type = isTypeOnly ? 'type ' : '';
  if (propertyName) {
    const name = aliasName ? `${propertyName} as ${aliasName}` : propertyName;
    return type + name;
  }
  assertNonNull(aliasName);
  return `* as ${aliasName}`;
}

function composeLine(
  level: number,
  names: string[],
  { wrap, tabw, mComma, maxLength }: ComposeConfig,
) {
  const { length: len } = names;
  assert(len > 0);
  let i = 1;
  for (let sz = tabw * level + names[0].length; i < len && i < wrap.perLine; ++i) {
    const n = sz + 2 + names[i].length;
    if (n + (i + 1 < len ? 1 : mComma.length) > maxLength) break;
    sz = n;
  }
  return {
    line: new ComposeLine(level, names.slice(0, i).join(', ') + (i < len ? ',' : mComma)),
    left: names.slice(i),
  };
}

function join(...arr: (string | undefined)[]) {
  return arr.filter(s => !!s).join(' ');
}

export default noNew(NamedPart);
