import { defineCliConfig } from 'sanity/cli';

/** Used by the `sanity` CLI (dev / build / deploy). Values come from sanity/.env. */
export default defineCliConfig({
	api: {
		projectId: process.env.SANITY_STUDIO_PROJECT_ID,
		dataset: process.env.SANITY_STUDIO_DATASET || 'production',
	},
});
