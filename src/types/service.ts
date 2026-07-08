import type { IconName } from './icon';

export interface ServiceGroup {
	label?: string;
	items: string[];
}

export interface Service {
	slug: string;
	title: string;
	category: string;
	icon: IconName;
	description?: string;
	groups?: ServiceGroup[];
	note?: string;
}
