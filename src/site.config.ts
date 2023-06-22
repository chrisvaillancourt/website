export const siteConfig = {
	// Used as both a meta property (src/components/BaseHead.astro L:31 + L:49) & the generated satori png (src/pages/og-image/[slug].png.ts)
	author: 'Chris Vaillancourt',
	// Meta property used to construct the meta title property, found in src/components/BaseHead.astro L:11
	title: 'Chris Vaillancourt',
	// Meta property used as a default description meta property
	description: "Chris Vaillancourt's personal website",
	// HTML lang property, found in src/layouts/Base.astro L:18
	lang: 'en-US',
	// Meta property, found in src/components/BaseHead.astro L:42
	ogLocale: 'en_US',
	// Sets the meta data theme-color, found in src/components/BaseHead.astro L:34. Toggling the dark mode will update the meta content with either light/dark color, implementation in src/layouts/Base.astro L:41.
	themeColorLight: '#fafafa',
	themeColorDark: '#1d1f21',
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
