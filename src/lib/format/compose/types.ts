import { ComposeConfig } from '../config';
import ComposeResult from './ComposeResult';

export interface ComposePart {
  /**
   * Compose the part. Wrap if needed.
   */
  compose: (level: number, config: ComposeConfig) => ComposeResult;
  /**
   * Compose and force-wrap the part, as if it is NOT the first part.
   * If undefined, `compose` will be used.
   */
  composeWrap?: (level: number, config: ComposeConfig) => ComposeResult;
  /**
   * Compose and force-wrap the part, as if it IS the first part.
   * If undefined, `composeWrap` will be used.
   */
  composeWrapFirst?: (level: number, config: ComposeConfig) => ComposeResult;
}
