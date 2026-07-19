import { defineField, defineType } from 'sanity';

/**
 * Author schema.
 *
 * Deliberately minimal — it exists so each article can carry a byline and so the
 * BlogPosting structured data has a real `author`. There are no author archive pages
 * in v1, so nothing here needs a slug.
 */
export const author = defineType({
	name: 'author',
	title: 'Author',
	type: 'document',
	fields: [
		defineField({
			name: 'name',
			title: 'Full name',
			type: 'string',
			description: 'Shown as the byline on every article by this person.',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'role',
			title: 'Role',
			type: 'string',
			description: 'Job title shown under the name, e.g. "Chief Executive Officer". Optional.',
		}),
		defineField({
			name: 'avatar',
			title: 'Photo',
			type: 'image',
			description: 'Optional. A square headshot works best — if omitted, the initial is shown instead.',
			options: { hotspot: true },
		}),
	],
	preview: {
		select: { title: 'name', subtitle: 'role', media: 'avatar' },
	},
});
