import { type DeepReadonly } from 'utility-types';

import { type Configuration } from '../../config';
import { type ESLintConfigProcessed } from './eslint';

export type ComposeConfig = DeepReadonly<ReturnType<typeof configForCompose>>;

export function configForCompose(config: Configuration, processed?: ESLintConfigProcessed) {
  const {
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
  } = config;
  const nl = eol === 'CR' ? '\r' : eol === 'CRLF' ? '\r\n' : eol === 'LFCR' ? '\n\r' : '\n';
  const max = Number.MAX_SAFE_INTEGER;
  const tabSz = tabSize ?? 2;
  const comma = trailingComma?.toLowerCase();
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
            skipCmt: true,
          }
        : {
            withoutDefault: (wrappingStyle?.maxBindingNamesPerLine ?? 1) || max,
            withDefault: (wrappingStyle?.maxDefaultAndBindingNamesPerLine ?? 2) || max,
            perLine: (wrappingStyle?.maxNamesPerWrappedLine ?? 1) || max,
            exported: wrappingStyle?.maxExportNamesPerLine || max,
            parts: true,
            skipCmt: !!wrappingStyle?.ignoreComments,
          },
    groupSep: nl.repeat((emptyLinesBetweenGroups ?? 1) + 1),
    groupEnd: (emptyLinesAfterAllImports ?? 1) + 1,
    tab: tabType?.toLowerCase() === 'tab' ? '\t' : ' '.repeat(tabSz),
    tabw: processed?.tabWidth ?? tabSz,
    quote:
      quoteMark?.toLowerCase() === 'double' ? (s: string) => `"${s}"` : (s: string) => `'${s}'`,
    sComma: comma === 'always' ? ',' : '',
    mComma: comma === 'none' ? '' : ',',
    semi: hasSemicolon === false ? '' : ';',
    bracket: bracketSpacing === false ? (s: string) => `{${s}}` : (s: string) => `{ ${s} }`,
    /**
     * - true: Always insert a final newline
     * - false: Always delete the final newline
     * - _undefined_: Do not insert or delete the final newline
     */
    lastNewLine: insertFinalNewline === 'preserve' ? undefined : insertFinalNewline !== false,
    nl,
  };
}
