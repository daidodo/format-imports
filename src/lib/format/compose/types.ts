import { ComposeConfig } from '../config';
import ComposeResult from './ComposeResult';

export interface ComposePart {
  /**
   * Compose the part. Wrap if needed.
   */
  compose: (level: number, config: ComposeConfig) => ComposeResult;
  /**
   * Compose and force-wrap the part, as if it is NOT the first part.
   */
  composeWrap: (level: number, config: ComposeConfig) => ComposeResult;
  /**
   * Compose and force-wrap the part, as if it IS the first part.
   */
  composeWrapFirst: (level: number, config: ComposeConfig) => ComposeResult;
}
