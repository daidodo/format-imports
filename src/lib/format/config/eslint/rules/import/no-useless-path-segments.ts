import {
  type Configuration,
  mergeConfig,
} from '../../../../../config';
import {
  extractOptions,
  type Rules,
} from '../../helper';

const DEFAULT_OPTIONS = { noUselessIndex: false };

type Options = typeof DEFAULT_OPTIONS;

export function translateNoUselessPathSegmentsRule(config: Configuration, rules: Rules) {
  const options = extractOptions(config, rules, DEFAULT_OPTIONS, 'import/no-useless-path-segments');
  return options === undefined ? { config } : process(config, options);
}

function process(config: Configuration, { noUselessIndex }: Options) {
  const c = mergeConfig(config, {
    removeLastSlashInPath: true,
    removeLastIndexInPath: noUselessIndex,
  });
  return { config: c };
}
