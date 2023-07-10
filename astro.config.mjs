import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import prefetch from '@astrojs/prefetch';

// https://astro.build/config
export default defineConfig({
	site: 'https://chrisvaillancourt.io/',
	experimental: {
		assets: true,
	},
	markdown: {
		shikiConfig: {
			theme: 'dracula',
			wrap: true,
		},
	},
	integrations: [
		mdx({}),
		tailwind({
			applyBaseStyles: false,
		}),

		sitemap(),
		prefetch(),
	],
	compressHTML: true,
	vite: {
		optimizeDeps: {
			exclude: ['@resvg/resvg-js'],
		},
	},
});
