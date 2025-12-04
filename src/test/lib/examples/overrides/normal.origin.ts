import content from 'remote';

import localContent from './local';

const a = localContent || content;
