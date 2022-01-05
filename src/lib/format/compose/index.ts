import {
  assert,
  assertNonNull,
} from '../../common';
import { ComposeConfig } from '../config';
import {
  NameBinding,
  NodeComment,
} from '../types';

export function composeNodeAsParts(
  verb: string,
  parts: string[],
  from: string,
  extraLength: number,
  { wrap, maxLength, tab, nl, semi }: ComposeConfig,
) {
  const [first, ...rest] = parts;
  assert(!!first, `Invalid parts=${parts} for verb=${verb}, from=${from}`);
  const wrapParts = wrap.parts;
  let text = `${verb} ${first}` + (rest.length ? ',' : '');
  const lines = [];
  rest.forEach((p, i, a) => {
    const c = i + 1 < a.length ? ',' : '';
    const n = `${text} ${p}${c}`;
    if (wrapParts && n.length >= maxLength) {
      lines.push(text);
      text = tab + p + c;
    } else text = n;
  });
  const f = from + semi;
  const n = `${text} ${f}`;
  const inLen = maxLength >= n.length + (wrap.skipCmt ? 0 : extraLength);
  if (wrapParts && !inLen) lines.push(text, tab + f);
  else lines.push(n);
  return lines.join(nl);
}

export function composeComments(comments: NodeComment[] | undefined, { nl }: ComposeConfig) {
  if (!comments || !comments.length) return;
  return comments.map(c => c.text).join(nl) + nl;
}

export function composeNodeAsNames(
  verb: string,
  defaultName: string | undefined,
  names: NameBinding[],
  from: string | undefined,
  extraLength: number,
  config: ComposeConfig,
) {
  const { wrap, maxLength } = config;
  const { text, wrapped } = composeNodeAsNamesImpl(verb, defaultName, names, from, config, false);
  const inLen = maxLength >= text.length + (wrap.skipCmt ? 0 : extraLength);
  const noMoreWrap = wrapped || inLen || (!wrap.parts && !defaultName && names.length < 2);
  return noMoreWrap
    ? text
    : composeNodeAsNamesImpl(verb, defaultName, names, from, config, true).text;
}

function composeNodeAsNamesImpl(
  verb: string,
  defaultName: string | undefined,
  names: NameBinding[],
  from: string | undefined,
  config: ComposeConfig,
  forceWrap: boolean,
) {
  const { semi } = config;
  const { text: t, wrapped } = composeNames(verb, !!defaultName, names, config, forceWrap);
  const all = [defaultName, t].filter(s => !!s).join(', ') || '{}';
  const text = [verb, all, from].filter(s => !!s).join(' ') + semi;
  return { text, wrapped };
}

function composeNames(
  verb: string,
  hasDefault: boolean,
  names: NameBinding[] | undefined,
  config: ComposeConfig,
  forceWrap: boolean,
) {
  const { wrap, bracket, nl } = config;
  const maxWords = verb.startsWith('export')
    ? wrap.exported
    : hasDefault
    ? wrap.withDefault - 1
    : wrap.withoutDefault;
  const words = names?.map(composeName).filter((w): w is string => !!w);
  if (!words || !words.length) return {};
  if (!forceWrap && words.length <= maxWords) return { text: bracket(words.join(', ')) };
  const lines = [];
  for (let n = words; n.length; ) {
    const { text, left } = composeOneLineNames(n, config);
    lines.push(text);
    n = left;
  }
  return { text: `{${nl}${lines.join(nl)}${nl}}`, wrapped: true };
}

function composeName(name: NameBinding | undefined) {
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
  words: string[],
  { tab, tabw, wrap, maxLength, comma }: ComposeConfig,
) {
  assert(words.length > 0);
  const maxWords = wrap.perLine;
  const cl = comma.length;
  let i = 1;
  for (let len = tabw + words[0].length; i < words.length && i < maxWords; ++i) {
    const n = len + 2 + words[i].length;
    const c = i + 1 < words.length ? 1 : cl;
    if (n + c > maxLength) break;
    len = n;
  }
  return {
    text: tab + words.slice(0, i).join(', ') + (i < words.length ? ',' : comma),
    left: words.slice(i),
  };
}
