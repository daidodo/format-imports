import { type LineAndCharacter } from 'typescript';

export interface Pos extends LineAndCharacter {
  pos: number;
}

export interface LineRange {
  start: Pos;
  end: Pos;
}

export interface NodeComment extends LineRange {
  text: string;
  trailingNewLines?: number;
}

export interface NameBinding {
  propertyName: string;
  aliasName?: string;
  isTypeOnly?: boolean;
}

export type Binding =
  | {
      type: 'namespace';
      alias: string;
    }
  | {
      type: 'named';
      names: NameBinding[];
    };

export interface RangeAndEmptyLines extends LineRange {
  fullStart: Pos;
  leadingNewLines: number;
  trailingNewLines: number;
  fullEnd: Pos;
  eof: boolean;
}
