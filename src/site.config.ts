import { LIGHT_THEME_VALUE, DARK_THEME_VALUE } from '@/lib/theme';

export const siteConfig = {
	// Used as both a meta property (src/components/BaseHead.astro) & the generated satori png (src/pages/og-image/[slug].png.ts)
	author: 'Chris Vaillancourt',
	// Meta property used to construct the meta title property, found in src/components/BaseHead.astro
	title: 'Chris Vaillancourt',
	// Meta property used as a default description meta property
	description: "Chris Vaillancourt's personal website",
	// HTML lang property, found in src/layouts/Base.astro
	lang: 'en-US',
	// Meta property, found in src/components/BaseHead.astro
	ogLocale: 'en_US',
	// Sets the meta data theme-color, found in src/components/BaseHead.astro. Toggling the dark mode will update the meta content with either light/dark color, implementation in src/layouts/Base.astro.
	themeColorLight: LIGHT_THEME_VALUE,
	themeColorDark: DARK_THEME_VALUE,
	// Date.prototype.toLocaleDateString() parameters, found in src/utils/date.ts.
	date: {
		locale: 'en-US',
		options: {
			day: 'numeric',
			month: 'short',
			year: 'numeric',
		},
	},
} as const;
