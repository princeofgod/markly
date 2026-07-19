import type { PortableTextBlock } from '@portabletext/types';

/** The five SEO content pillars. Fixed list — mirrored in the Sanity schema dropdown. */
export const ARTICLE_CATEGORIES = [
	'Data Protection & Privacy',
	'Regulatory Compliance',
	'Intellectual Property',
	'Corporate Governance',
	'Business Growth & Advisory',
] as const;

export type ArticleCategory = (typeof ARTICLE_CATEGORIES)[number];

export interface SanityImage {
	url: string;
	alt: string;
	lqip?: string;
	width?: number;
	height?: number;
}

export interface Author {
	name: string;
	role?: string;
	avatarUrl?: string;
}

export interface Article {
	title: string;
	slug: string;
	excerpt: string;
	coverImage: SanityImage;
	body: PortableTextBlock[];
	publishedAt: string;
	updatedAt?: string;
	author?: Author;
	category: ArticleCategory;
	/** Optional SEO overrides; fall back to title/excerpt. */
	seoTitle?: string;
	seoDescription?: string;
	featured?: boolean;
}
