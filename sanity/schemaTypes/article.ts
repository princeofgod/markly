import { defineField, defineType } from 'sanity';

/**
 * Insight schema (internal type name kept as `article` so existing GROQ queries and
 * any published content keep working — only the Studio display label changed).
 *
 * Written with non-technical writers in mind: every field carries help text, the
 * category is a fixed dropdown (matching the five SEO pillars), image alt text is
 * mandatory, and the rich-text toolbar is deliberately restricted to the styles the
 * site actually renders. Keep the category list in sync with ARTICLE_CATEGORIES in
 * `src/types/article.ts`.
 */
export const article = defineType({
	name: 'article',
	title: 'Insight',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			description: 'The headline. This shows as the main heading on the article page.',
			validation: (rule) => rule.required().max(120),
		}),
		defineField({
			name: 'slug',
			title: 'URL',
			type: 'slug',
			description:
				'The web address, generated from the title. Click "Generate". Avoid changing this after publishing — it breaks existing links.',
			options: { source: 'title', maxLength: 96 },
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'excerpt',
			title: 'Summary',
			type: 'text',
			rows: 3,
			description:
				'One or two sentences. Shown on article cards, and used as the Google description if you leave the SEO description blank.',
			validation: (rule) => rule.required().max(200),
		}),
		defineField({
			name: 'coverImage',
			title: 'Cover image',
			type: 'image',
			options: { hotspot: true },
			description: 'Shown at the top of the article and when shared on social media. Landscape works best.',
			fields: [
				defineField({
					name: 'alt',
					title: 'Alt text',
					type: 'string',
					description: 'Describe the image in a few words (for screen readers and search engines). Required.',
					validation: (rule) => rule.required(),
				}),
			],
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'category',
			title: 'Category',
			type: 'string',
			description: 'Which part of the practice this article belongs to.',
			options: {
				layout: 'dropdown',
				list: [
					{ title: 'Data Protection & Privacy', value: 'Data Protection & Privacy' },
					{ title: 'Regulatory Compliance', value: 'Regulatory Compliance' },
					{ title: 'Intellectual Property', value: 'Intellectual Property' },
					{ title: 'Corporate Governance', value: 'Corporate Governance' },
					{ title: 'Business Growth & Advisory', value: 'Business Growth & Advisory' },
				],
			},
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'author',
			title: 'Author',
			type: 'reference',
			to: [{ type: 'author' }],
			description: 'Who wrote this.',
		}),
		defineField({
			name: 'publishedAt',
			title: 'Publish date',
			type: 'datetime',
			description:
				'Shown on the article. Note: a future date will NOT publish automatically — publish when you are ready.',
			initialValue: () => new Date().toISOString(),
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'body',
			title: 'Content',
			type: 'array',
			description: 'The article itself. Use Heading 2 for main sections and Heading 3 for sub-sections.',
			of: [
				{
					type: 'block',
					// Only the styles the site actually renders. H1 is reserved for the title above.
					styles: [
						{ title: 'Normal', value: 'normal' },
						{ title: 'Heading 2', value: 'h2' },
						{ title: 'Heading 3', value: 'h3' },
						{ title: 'Quote', value: 'blockquote' },
					],
					lists: [
						{ title: 'Bullet list', value: 'bullet' },
						{ title: 'Numbered list', value: 'number' },
					],
					marks: {
						decorators: [
							{ title: 'Bold', value: 'strong' },
							{ title: 'Italic', value: 'em' },
						],
						annotations: [
							{
								name: 'link',
								type: 'object',
								title: 'Link',
								fields: [
									{
										name: 'href',
										type: 'url',
										title: 'URL',
										validation: (rule: any) => rule.required(),
									},
								],
							},
						],
					},
				},
				{
					type: 'image',
					options: { hotspot: true },
					fields: [
						{
							name: 'alt',
							type: 'string',
							title: 'Alt text',
							description: 'Describe the image. Required.',
							validation: (rule: any) => rule.required(),
						},
						{ name: 'caption', type: 'string', title: 'Caption (optional)' },
					],
				},
			],
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'seoTitle',
			title: 'SEO title (optional)',
			type: 'string',
			description: 'Overrides the title shown in Google. Leave blank to use the title above. Keep under 60 characters.',
			validation: (rule) => rule.max(60).warning('Longer than 60 characters may be cut off in Google.'),
		}),
		defineField({
			name: 'seoDescription',
			title: 'SEO description (optional)',
			type: 'text',
			rows: 2,
			description: 'The grey text in Google results. Leave blank to use the summary. Keep under 160 characters.',
			validation: (rule) => rule.max(160).warning('Longer than 160 characters may be cut off in Google.'),
		}),
		defineField({
			name: 'featured',
			title: 'Featured',
			type: 'boolean',
			description: 'Reserved for highlighting an article later. Safe to leave off.',
			initialValue: false,
		}),
	],
	preview: {
		select: { title: 'title', subtitle: 'category', media: 'coverImage' },
	},
	orderings: [
		{
			title: 'Newest first',
			name: 'publishedAtDesc',
			by: [{ field: 'publishedAt', direction: 'desc' }],
		},
	],
});
