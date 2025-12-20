import type { Config } from 'tailwindcss';
import tailwindTypography from '@tailwindcss/typography';
import tailwindAspectRatio from '@tailwindcss/aspect-ratio';
import daisyui from 'daisyui';

const fonts = Object.freeze({
	sans: [
		'system-ui',
		'-apple-system',
		'Segoe UI',
		'Roboto',
		'Ubuntu',
		'Cantarell',
		'Noto Sans',
		'sans-serif',
	],
	serif: ['ui-serif', 'serif'],
	mono: [
		'Dank Mono',
		'Operator Mono',
		'Inconsolata',
		'Fira Mono',
		'ui-monospace',
		'SF Mono',
		'Monaco',
		'Droid Sans Mono',
		'Source Code Pro',
		'monospace',
	],
});

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: fonts,
			transitionProperty: {
				height: 'height',
			},
		},
	},
	plugins: [
		tailwindTypography,
		tailwindAspectRatio,
		daisyui({
			// * see https://daisyui.com/docs/config/
			themes: ['winter --default', 'night --prefersdark'],
			logs: false,
		}),
	],
} satisfies Config;
