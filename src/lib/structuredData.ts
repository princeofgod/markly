import { company } from '../data/company';
import { socialLinks } from '../data/social';

const siteUrl = company.url.replace(/\/$/, '');

/**
 * Site-wide organization schema. Emitted on every page via MainLayout so search
 * engines have a consistent entity for the business (name, contact, address,
 * social profiles). Uses `ProfessionalService` — the LocalBusiness subtype that
 * fits an advisory firm with a physical address and NAP details.
 *
 * The brand's public/legal name is "Markly Africa" (matching the domain), even
 * though `company.name` carries the short "Markly" wordmark used in the UI.
 */
export const organizationSchema = {
	'@context': 'https://schema.org',
	'@type': 'ProfessionalService',
	'@id': `${siteUrl}/#organization`,
	name: 'Markly Africa',
	alternateName: company.name,
	url: siteUrl,
	logo: `${siteUrl}/apple-touch-icon.png`,
	image: `${siteUrl}/og-image.png`,
	description: company.description,
	email: company.email,
	telephone: company.phone,
	address: {
		'@type': 'PostalAddress',
		streetAddress: '214B Eti-Osa Way, Dolphin Estate, Ikoyi',
		addressLocality: 'Lagos',
		addressCountry: 'NG',
	},
	areaServed: ['Africa', 'Worldwide'],
	sameAs: socialLinks.map((link) => link.href),
};

/**
 * Builds an FAQPage schema from a list of Q&A pairs. Marking up the resources
 * page makes it eligible for expandable FAQ rich results in search.
 */
export function buildFaqSchema(items: { question: string; answer: string }[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: items.map((item) => ({
			'@type': 'Question',
			name: item.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: item.answer,
			},
		})),
	};
}
