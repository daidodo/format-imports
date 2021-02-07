import {
  Configuration,
  mergeConfig,
} from '../../../../../config';
import {
  extractOptions,
  Rules,
} from '../../helper';

const DEFAULT_OPTIONS = { noUselessIndex: false };

type Options = typeof DEFAULT_OPTIONS;

export function translateNoUselessPathSegmentsRule(config: Configuration, rules: Rules) {
  const options = extractOptions(rules, 'import/no-useless-path-segments', DEFAULT_OPTIONS);
  if (!options) return { config };
  return process(config, options);
}

function process(config: Configuration, { noUselessIndex }: Options) {
  const c = mergeConfig(config, {
    removeLastSlashInPath: true,
    removeLastIndexInPath: noUselessIndex,
  });
  return { config: c };
}
