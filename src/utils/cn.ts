/**
 * Joins conditional class name fragments, skipping falsy values.
 * Pure, framework-agnostic — no Astro/DOM APIs.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
	return classes.filter(Boolean).join(' ');
}
