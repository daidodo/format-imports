import { parse as parseVue } from '@vue/compiler-sfc';

import {
  ComposeConfig,
  EnhancedConfig,
} from '../config/index';
import { formatSource } from './format';

export async function formatVueSource(text: string, fileName: string, allConfig: EnhancedConfig) {
  const { descriptor } = parseVue(text);
  const vueScript = descriptor.scriptSetup ?? descriptor.script;
  if (!vueScript) return undefined;
  const { supported, ext } = checkLang(vueScript.lang);
  if (!supported) return undefined;
  const head = text.slice(0, vueScript.loc.start.offset);
  const originScript = vueScript.content;
  const tail = text.slice(vueScript.loc.end.offset);
  const sortedScript = await formatSource(originScript, fileName + ext, allConfig);
  if (sortedScript === undefined)
    return wrapScript(head, originScript, tail, allConfig.composeConfig);
  return wrapScript(head, sortedScript, tail, allConfig.composeConfig);
}

function checkLang(lang: string | undefined) {
  const SUPPORTED_LANG = ['js', 'ts', 'jsx', 'tsx'];
  if (!lang) return { supported: true, ext: '.js' };
  return { supported: SUPPORTED_LANG.includes(lang), ext: '.' + lang };
}

function wrapScript(head: string, script: string, tail: string, { nl }: ComposeConfig) {
  if (!script) return head + tail; // <script></script>
  /**
   * <script>
   * xxx
   * </script>
   */
  if (script.endsWith(nl)) return head + nl + script + tail;
  return head + nl + script + nl + tail;
}
