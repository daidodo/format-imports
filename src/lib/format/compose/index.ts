import {
  assertNonNull,
  isNonNull,
} from '@dozerg/condition';

import { ComposeConfig } from '../config';
import { NodeComment } from '../types';
import AssertPart from './AssertPart';
import ComposeResult from './ComposeResult';
import NamedPart from './NamedPart';
import SemiPart from './SemiPart';
import StringPart from './StringPart';
import { ComposePart } from './types';

export { AssertPart, NamedPart, SemiPart, StringPart };

export function composeParts(parts: (ComposePart | undefined)[], config: ComposeConfig) {
  const ps = parts.filter(isNonNull);
  const result = composePartsImpl(ps, config);
  assertNonNull(result);
  return result.text(config);
}

function composePartsImpl(
  parts: ComposePart[],
  config: ComposeConfig,
  result = new ComposeResult(),
  forceWrap?: boolean,
): ComposeResult | undefined {
  if (parts.length < 1) return result;
  const [part, ...rest] = parts;
  const { compose: c1, composeWrap: c2, composeWrapFirst: c3 } = part;
  const level = result.level;
  const compose = !forceWrap ? c1 : !result.empty ? c2 ?? c1 : c3 ?? c2 ?? c1;
  const cur = compose.apply(part, [level, config]);
  const { result: newResult, needWrap } = result.merge(cur, config, rest.length < 1);
  if (needWrap) {
    if (!cur.wrapped) return composePartsImpl(parts, config, result, true);
    else if (!result.wrapped) return undefined;
  }
  return composePartsImpl(rest, config, newResult) ?? composePartsImpl(parts, config, result, true);
}

export function composeComments(comments: NodeComment[] | undefined, { nl }: ComposeConfig) {
  if (!comments || !comments.length) return;
  return comments.map(c => c.text).join(nl) + nl;
}
