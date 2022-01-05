import {
  assert,
  assertNonNull,
} from '../../common';
import { ComposeConfig } from '../config';
import { NameBinding } from '../types';

export function composeNames(
  isExport: boolean,
  hasDefault: boolean,
  names: string[] | undefined,
  config: ComposeConfig,
  forceWrap: boolean,
) {
  const { wrap, bracket, nl } = config;
  const maxWords = isExport
    ? wrap.exported
    : hasDefault
    ? wrap.withDefault - 1
    : wrap.withoutDefault;
  if (!names || !names.length) return {};
  if (!forceWrap && names.length <= maxWords) return { text: bracket(names.join(', ')) };
  const lines = [];
  for (let n = names; n.length; ) {
    const { text, left } = composeOneLineNames(n, config);
    lines.push(text);
    n = left;
  }
  return { text: `{${nl}${lines.join(nl)}${nl}}`, wrapped: true };
}

export function composeName(name: NameBinding | undefined) {
  if (!name) return;
  const { propertyName, aliasName, isTypeOnly } = name;
  const type = isTypeOnly ? 'type ' : '';
  if (propertyName) {
    const name = aliasName ? `${propertyName} as ${aliasName}` : propertyName;
    return type + name;
  }
  assertNonNull(aliasName);
  return `* as ${aliasName}`;
}

function composeOneLineNames(
  names: string[],
  { tab, tabw, wrap, maxLength, comma }: ComposeConfig,
) {
  const { length: len } = names;
  assert(len > 0);
  let i = 1;
  for (let sz = tabw + names[0].length; i < len && i < wrap.perLine; ++i) {
    const n = sz + 2 + names[i].length;
    if (n + (i + 1 < len ? 1 : comma.length) > maxLength) break;
    sz = n;
  }
  return {
    text: tab + names.slice(0, i).join(', ') + (i < len ? ',' : comma),
    left: names.slice(i),
  };
}
