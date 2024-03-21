import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import remarkUnwrapImages from 'remark-unwrap-images';

// https://astro.build/config
export default defineConfig({
	site: 'https://chrisvaillancourt.io/',
	prefetch: {
		defaultStrategy: 'viewport',
	},
	markdown: {
		shikiConfig: {
			theme: 'dracula',
			wrap: true,
		},
		remarkPlugins: [remarkUnwrapImages],
	},
	integrations: [
		mdx({}),
		tailwind({
			applyBaseStyles: false,
		}),

		sitemap(),
	],
	vite: {
		optimizeDeps: {
			exclude: ['@resvg/resvg-js'],
		},
	},
	// the toolbar throws an uncaught exception in webkit during e2e tests
	// see https://github.com/chrisvaillancourt/website/issues/181
	devToolbar: { enabled: false },
});
