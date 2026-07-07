export type SocialPlatform = 'linkedin' | 'twitter' | 'facebook' | 'instagram';

export interface SocialLink {
	platform: SocialPlatform;
	href: string;
	label: string;
}
