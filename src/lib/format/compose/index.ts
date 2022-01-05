import { assert } from '../../common';
import { ComposeConfig } from '../config';
import {
  NameBinding,
  NodeComment,
} from '../types';
import {
  composeName,
  composeNames,
} from './name';

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
  bindingNames: NameBinding[],
  from: string | undefined,
  extraLength: number,
  config: ComposeConfig,
) {
  const { wrap, maxLength } = config;
  const names = bindingNames.map(composeName).filter((w): w is string => !!w);
  const { text, wrapped } = composeNodeAsNamesImpl(
    verb,
    defaultName,
    names,
    from,
    config,
    false,
  );
  const inLen = maxLength >= text.length + (wrap.skipCmt ? 0 : extraLength);
  const noMoreWrap = wrapped || inLen || (!wrap.parts && !defaultName && bindingNames.length < 2);
  return noMoreWrap
    ? text
    : composeNodeAsNamesImpl(verb, defaultName, names, from, config, true).text;
}

function composeNodeAsNamesImpl(
  verb: string,
  defaultName: string | undefined,
  names: string[],
  from: string | undefined,
  config: ComposeConfig,
  forceWrap: boolean,
) {
  const { semi } = config;
  const { text: t, wrapped } = composeNames(
    verb.startsWith('export'),
    !!defaultName,
    names,
    config,
    forceWrap,
  );
  const all = [defaultName, t].filter(s => !!s).join(', ') || '{}';
  const text = [verb, all, from].filter(s => !!s).join(' ') + semi;
  return { text, wrapped };
}
