import { parse as parseVue } from '@vue/compiler-sfc';

import {
  mergeConfig,
  SUPPORTED_EXTENSIONS,
} from '../../index';
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

  // Disable removing unused names because imports can be used outside of <script> in Vue.
  // See https://vuejs.org/api/sfc-script-setup.html#using-components
  const config = mergeConfig(allConfig.config, { keepUnused: ['.*'] });

  const sortedScript = await formatSource(originScript, fileName + ext, { ...allConfig, config });
  if (sortedScript === undefined)
    return wrapScript(head, originScript.trim(), tail, allConfig.composeConfig);
  return wrapScript(head, sortedScript, tail, allConfig.composeConfig);
}

function checkLang(lang: string | undefined) {
  if (!lang) return { supported: true, ext: '.js' };
  return { supported: SUPPORTED_EXTENSIONS.some( e => e === lang), ext: '.' + lang };
}

function wrapScript(head: string, script: string, tail: string, cc?: ComposeConfig) {
  if (!script) return head + tail; // <script></script>
  if (!cc) return head + script + tail; // No change
  /**
   * <script>
   * xxx
   * </script>
   */
  const { nl } = cc;
  return head + prefix(nl, suffix(script, nl)) + tail;
}

function prefix(nl: string, str: string) {
  return str.startsWith(nl) ? str : nl + str;
}

function suffix(str: string, nl: string) {
  return str.endsWith(nl) ? str : str + nl;
}
