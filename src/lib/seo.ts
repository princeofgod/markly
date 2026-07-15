import { company } from '../data/company';

interface BuildSeoOptions {
	title: string;
	description?: string;
	ogImage?: string;
	path: string;
}

interface SeoResult {
	title: string;
	description: string;
	canonicalUrl: string;
	ogImage: string;
}

/**
 * Builds page metadata (title, description, canonical URL, Open Graph image)
 * with company-level defaults from data/company.ts as the fallback source.
 */
export function buildSeo({ title, description, ogImage, path }: BuildSeoOptions): SeoResult {
	const siteUrl = company.url.replace(/\/$/, '');
	const canonicalPath = path === '/' ? '' : path;

	return {
		title: `${title} | ${company.legalName}`,
		description: description ?? company.description,
		canonicalUrl: `${siteUrl}${canonicalPath}`,
		ogImage: ogImage ?? `${siteUrl}/og-image.png`,
	};
}
