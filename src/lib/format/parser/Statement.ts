import { assertTrue } from '@dozerg/condition';

import { type Configuration } from '../../config';
import { composeComments } from '../compose';
import { type ComposeConfig } from '../config';
import type {
  NodeComment,
  RangeAndEmptyLines,
} from '../types';

export interface StatementArgs {
  range: RangeAndEmptyLines;
  leadingComments?: NodeComment[];
  trailingCommentsText: string;
  config: Configuration;
}

export default class Statement {
  readonly range: RangeAndEmptyLines;
  private leadingComments_?: NodeComment[];
  private trailingCommentsText_: string;

  protected constructor(args: StatementArgs) {
    this.range = args.range;
    this.leadingComments_ = args.leadingComments;
    this.trailingCommentsText_ = args.trailingCommentsText;
  }

  withinDeclRange(pos: number) {
    const { start, end } = this.range;
    return start.pos <= pos && pos < end.pos;
  }

  hasComments() {
    return this.hasLeadingComments || this.hasTrailingComments;
  }

  private get hasLeadingComments() {
    return !!this.leadingComments_ && this.leadingComments_.length > 0;
  }

  private get hasTrailingComments() {
    return !!this.trailingCommentsText_;
  }

  protected composeComments(config: ComposeConfig) {
    const leadingText = composeComments(this.leadingComments_, config) ?? '';
    const followingNewLines = this.leadingComments_?.slice(-1)[0]?.trailingNewLines;
    const trailingText = this.trailingCommentsText_;
    const tailingLength = config.wrap.skipCmt ? 0 : trailingText.split(/\r?\n/)?.[0]?.length ?? 0;
    return { leadingText, followingNewLines, trailingText, tailingLength };
  }

  protected canMergeComments(node: Statement) {
    return !(
      (this.hasLeadingComments && node.hasLeadingComments) ||
      (this.hasTrailingComments && node.hasTrailingComments)
    );
  }

  protected mergeComments(node: Statement) {
    assertTrue(this.canMergeComments(node));
    if (!this.leadingComments_) this.leadingComments_ = node.leadingComments_;
    if (!this.trailingCommentsText_) this.trailingCommentsText_ = node.trailingCommentsText_;
    node.leadingComments_ = undefined;
    node.trailingCommentsText_ = '';
    return true;
  }
}
