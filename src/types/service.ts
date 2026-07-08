import type { IconName } from './icon';

export interface Service {
	slug: string;
	title: string;
	category: string;
	icon: IconName;
}
