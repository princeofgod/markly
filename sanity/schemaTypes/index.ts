import { article } from './article';
import { author } from './author';

/** Every document type the Studio knows about. Registered in `sanity.config.ts`. */
export const schemaTypes = [article, author];
