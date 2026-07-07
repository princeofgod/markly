import type { IconName } from './icon';

export interface Service {
	slug: string;
	title: string;
	summary: string;
	icon: IconName;
}
