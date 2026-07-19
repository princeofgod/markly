import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';

/**
 * Markly Africa content Studio.
 *
 * This is a standalone app — it is NOT part of the Astro build. It gets deployed to
 * Sanity's hosting (`npx sanity deploy` → https://<name>.sanity.studio), which is where
 * writers log in with an email + password. The Astro site only ever *reads* published
 * content from the Sanity API at build time.
 *
 * projectId/dataset come from env so the same config works across environments.
 */
export default defineConfig({
	name: 'markly',
	title: 'Markly Africa',
	projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
	dataset: process.env.SANITY_STUDIO_DATASET || 'production',
	plugins: [structureTool()],
	schema: { types: schemaTypes },
});
