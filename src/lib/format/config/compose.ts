import { DeepReadonly } from 'utility-types';

import { Configuration } from '../../config';

export type ComposeConfig = DeepReadonly<ReturnType<typeof configForCompose>>;

export function configForCompose({
  maxLineLength,
  wrappingStyle,
  emptyLinesBetweenGroups,
  emptyLinesAfterAllImports,
  tabType,
  tabSize,
  quoteMark,
  trailingComma,
  hasSemicolon,
  bracketSpacing,
  insertFinalNewline,
  eol,
}: Configuration) {
  const nl = eol === 'CR' ? '\r' : eol === 'CRLF' ? '\r\n' : eol === 'LFCR' ? '\n\r' : '\n';
  const max = Number.MAX_SAFE_INTEGER;
  const tabSz = tabSize ?? 2;
  return {
    maxLength: (maxLineLength ?? 80) || max,
    wrap:
      wrappingStyle === 'prettier'
        ? {
            withoutDefault: max,
            withDefault: max,
            perLine: 1,
            exported: max,
            parts: false,
          }
        : {
            withoutDefault: (wrappingStyle?.maxBindingNamesPerLine ?? 1) || max,
            withDefault: (wrappingStyle?.maxDefaultAndBindingNamesPerLine ?? 2) || max,
            perLine: (wrappingStyle?.maxNamesPerWrappedLine ?? 1) || max,
            exported: wrappingStyle?.maxExportNamesPerLine || max,
            parts: true,
          },
    groupSep: nl.repeat((emptyLinesBetweenGroups ?? 1) + 1),
    groupEnd: (emptyLinesAfterAllImports ?? 1) + 1,
    tab: tabType?.toLowerCase() === 'tab' ? '\t' : ' '.repeat(tabSz),
    tabSz,
    quote:
      quoteMark?.toLowerCase() === 'double' ? (s: string) => `"${s}"` : (s: string) => `'${s}'`,
    comma: trailingComma?.toLowerCase() === 'none' ? '' : ',',
    semi: hasSemicolon === false ? '' : ';',
    bracket: bracketSpacing === false ? (s: string) => `{${s}}` : (s: string) => `{ ${s} }`,
    lastNewLine: insertFinalNewline !== false,
    nl,
  };
}
