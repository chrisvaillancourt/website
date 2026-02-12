import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import rehypeUnwrapImages from 'rehype-unwrap-images';

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
		rehypePlugins: [rehypeUnwrapImages],
	},
	integrations: [mdx({}), sitemap()],
	vite: {
		plugins: [tailwindcss()],
		optimizeDeps: {
			exclude: ['@resvg/resvg-js'],
		},
	},
	// the toolbar throws an uncaught exception in webkit during e2e tests
	// see https://github.com/chrisvaillancourt/website/issues/181
	devToolbar: { enabled: false },
});
