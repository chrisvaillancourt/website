const siteConfig = {
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
	// Date.prototype.toLocaleDateString() parameters, found in src/lib/date.ts.
	date: {
		locale: 'en-US',
		options: {
			day: 'numeric',
			month: 'short',
			year: 'numeric',
		},
	},
} as const;

export { siteConfig };
