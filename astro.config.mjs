import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import prefetch from '@astrojs/prefetch';
import remarkUnwrapImages from 'remark-unwrap-images';

// https://astro.build/config
export default defineConfig({
	site: 'https://chrisvaillancourt.io/',
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
		prefetch({
			// Allow up to three links to be prefetched concurrently
			throttle: 3,
		}),
	],
	vite: {
		optimizeDeps: {
			exclude: ['@resvg/resvg-js'],
		},
	},
});
