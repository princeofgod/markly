export interface CompanyInfo {
	name: string;
	/** Full public/legal brand name ("Markly Africa"), used for SEO titles and structured data. `name` stays the short UI wordmark. */
	legalName: string;
	tagline: string;
	description: string;
	email: string;
	phone: string;
	address: string;
	url: string;
}
