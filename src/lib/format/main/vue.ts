import { endOfLine } from '@dozerg/end-of-line';
import { parse as parseVue } from '@vue/compiler-sfc';

import { EnhancedConfig } from '../config/index';
import { formatSource } from './format';

export async function formatVueSource(text: string, fileName: string, allConfig: EnhancedConfig) {
  const { descriptor } = parseVue(text);
  const vueScript = descriptor.scriptSetup ?? descriptor.script;
  if (!vueScript) return undefined;

  const originScript = vueScript.content;
  let sortedScript = await formatSource(originScript, fileName, allConfig);
  if (!sortedScript) return undefined;
  // keep eol after script tag
  const originScriptEol = endOfLine(originScript);
  const isOriginScriptStartsWithEol = originScript.startsWith(originScriptEol);
  if (isOriginScriptStartsWithEol && !sortedScript.startsWith(originScriptEol)) {
    sortedScript = originScriptEol + sortedScript;
  }
  return (
    text.slice(0, vueScript.loc.start.offset) + sortedScript + text.slice(vueScript.loc.end.offset)
  );
}
