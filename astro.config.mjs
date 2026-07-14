// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	// Canonical origin. Required for sitemap generation and any absolute-URL needs.
	site: 'https://marklyafrica.com',
	integrations: [sitemap()],
	vite: {
		plugins: [tailwindcss()],
	},
});
