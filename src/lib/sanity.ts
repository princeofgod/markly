import { createClient } from '@sanity/client';
import type { Article } from '../types';

/**
 * Sanity content source. Read-only, public dataset, queried at BUILD time — the site
 * stays fully static.
 *
 * No API token is used on purpose: without one Sanity only ever serves *published*
 * documents, so unpublished drafts are physically unreachable from this build rather
 * than merely filtered out.
 *
 * When the env vars are absent (e.g. a fresh clone, or before the CMS is provisioned)
 * every query resolves to empty instead of throwing, so `astro build` still succeeds
 * and the Insights section simply renders its empty state.
 */
const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET ?? 'production';

export const isSanityConfigured = Boolean(projectId);

const client = isSanityConfigured
	? createClient({ projectId, dataset, apiVersion: '2024-10-01', useCdn: true, perspective: 'published' })
	: null;

/** Sanity's CDN does transforms via query params — no extra SDK needed. */
export function imageUrl(url: string, opts: { w?: number; h?: number; fit?: string } = {}): string {
	if (!url) return '';
	const p = new URLSearchParams({ auto: 'format', q: '80' });
	if (opts.w) p.set('w', String(opts.w));
	if (opts.h) p.set('h', String(opts.h));
	if (opts.w && opts.h) p.set('fit', opts.fit ?? 'crop');
	return `${url}?${p.toString()}`;
}

const ARTICLE_FIELDS = `
	title,
	"slug": slug.current,
	excerpt,
	category,
	publishedAt,
	"updatedAt": _updatedAt,
	seoTitle,
	seoDescription,
	featured,
	coverImage{
		"url": asset->url,
		"alt": coalesce(alt, ""),
		"lqip": asset->metadata.lqip,
		"width": asset->metadata.dimensions.width,
		"height": asset->metadata.dimensions.height
	},
	author->{ name, role, "avatarUrl": avatar.asset->url }
`;

/** Published articles, newest first. Future-dated posts stay hidden until a later build. */
const PUBLISHED = `_type == "article" && defined(slug.current) && publishedAt <= now()`;

/** Inline images carry only an asset ref; resolve them to real URLs here so the renderer doesn't have to. */
const BODY = `
	body[]{
		...,
		_type == "image" => {
			"url": asset->url,
			"alt": coalesce(alt, ""),
			"width": asset->metadata.dimensions.width,
			"height": asset->metadata.dimensions.height
		}
	}
`;

export async function getArticles(): Promise<Article[]> {
	if (!client) return [];
	return client.fetch(`*[${PUBLISHED}] | order(publishedAt desc){ ${ARTICLE_FIELDS} }`);
}

export async function getLatestArticles(limit = 3): Promise<Article[]> {
	if (!client) return [];
	return client.fetch(`*[${PUBLISHED}] | order(publishedAt desc)[0...${limit}]{ ${ARTICLE_FIELDS} }`);
}

export async function getArticle(slug: string): Promise<Article | null> {
	if (!client) return null;
	return client.fetch(`*[${PUBLISHED} && slug.current == $slug][0]{ ${ARTICLE_FIELDS}, ${BODY} }`, { slug });
}

/** Slugs + body for static path generation. */
export async function getArticlesWithBody(): Promise<Article[]> {
	if (!client) return [];
	return client.fetch(`*[${PUBLISHED}] | order(publishedAt desc){ ${ARTICLE_FIELDS}, ${BODY} }`);
}
