/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
	// @ts-expect-error
	test: {
		exclude: [
			'**/node_modules/**',
			'**/dist/**',
			'**/cypress/**',
			'**/.{idea,git,cache,output,temp}/**',
			'**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
			'e2e/**',
		],
		includeSource: ['src/**/*.{js,ts}'],
	},
	define: {
		'import.meta.vitest': 'undefined',
	},
});
