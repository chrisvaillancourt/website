import { siteConfig } from '@/site.config';

const dateFormat = new Intl.DateTimeFormat(
	siteConfig.date.locale,
	siteConfig.date.options,
);

export function getFormattedDate(
	date: string | number | Date,
	options?: Intl.DateTimeFormatOptions,
) {
	if (typeof options !== 'undefined') {
		return new Date(date).toLocaleDateString(siteConfig.date.locale, {
			...(siteConfig.date.options as Intl.DateTimeFormatOptions),
			...options,
		});
	}

	return dateFormat.format(new Date(date));
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it('formats a Date object', () => {
		// Use noon UTC to avoid timezone offset shifting the date
		const result = getFormattedDate(new Date('2024-01-15T12:00:00Z'));
		expect(result).toBe('Jan 15, 2024');
	});

	it('formats a date string', () => {
		const result = getFormattedDate('2023-06-01T12:00:00Z');
		expect(result).toBe('Jun 1, 2023');
	});

	it('formats a timestamp number', () => {
		const result = getFormattedDate(new Date('2022-12-25T12:00:00Z').getTime());
		expect(result).toBe('Dec 25, 2022');
	});

	it('applies custom options', () => {
		const result = getFormattedDate('2024-01-15', {
			weekday: 'long',
			month: 'long',
		});
		expect(result).toContain('January');
	});
}
