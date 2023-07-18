import type { Config } from 'tailwindcss';
import tailwindTypography from '@tailwindcss/typography';
import tailwindAspectRatio from '@tailwindcss/aspect-ratio';
import daisyui from 'daisyui';
import { fontFamily } from 'tailwindcss/defaultTheme';
import { THEMES, DARK_THEME_NAME } from './src/lib/theme';

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
		...fontFamily.sans,
	],
	serif: ['ui-serif', 'serif', ...fontFamily.serif],
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
		...fontFamily.mono,
	],
});

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	corePlugins: {
		// disable aspect ratio as per docs -> @tailwindcss/aspect-ratio
		aspectRatio: false,
		// disable some core plugins as they are included in the css, even when unused
		touchAction: false,
		ringOffsetWidth: false,
		ringOffsetColor: false,
		scrollSnapType: false,
		borderOpacity: false,
		textOpacity: false,
		fontVariantNumeric: false,
	},
	theme: {
		extend: {
			fontFamily: fonts,
			transitionProperty: {
				height: 'height',
			},
			typography: (theme) => ({
				// TODO look at daisyUI + typography; what do we lose by removing this?
				// cactus: {
				// 	css: {
				// 		'--tw-prose-body': 'var(--theme-text)',
				// 		'--tw-prose-headings': 'var(--theme-accent-2)',
				// 		'--tw-prose-links': 'var(--theme-text)',
				// 		'--tw-prose-bold': 'var(--theme-text)',
				// 		'--tw-prose-bullets': 'var(--theme-text)',
				// 		'--tw-prose-quotes': 'var(--theme-quote)',
				// 		'--tw-prose-code': 'var(--theme-text)',
				// 		'--tw-prose-hr': '0.5px dashed #666',
				// 		'--tw-prose-th-borders': '#666',
				// 	},
				// },
				// DEFAULT: {
				// 	css: {
				// 		a: {
				// 			'@apply cactus-link no-underline': '',
				// 		},
				// 		strong: {
				// 			fontWeight: '700',
				// 		},
				// 		code: {
				// 			border: '1px dotted #666',
				// 			borderRadius: '2px',
				// 		},
				// 		blockquote: {
				// 			borderLeftWidth: 'none',
				// 		},
				// 		hr: {
				// 			borderTopStyle: 'dashed',
				// 		},
				// 		thead: {
				// 			borderBottomWidth: 'none',
				// 		},
				// 		'thead th': {
				// 			fontWeight: '700',
				// 			borderBottom: '1px dashed #666',
				// 		},
				// 		'tbody tr': {
				// 			borderBottomWidth: 'none',
				// 		},
				// 		tfoot: {
				// 			borderTop: '1px dashed #666',
				// 		},
				// 	},
				// },
				// sm: {
				// 	css: {
				// 		code: {
				// 			fontSize: theme('fontSize.sm')[0],
				// 			fontWeight: '400',
				// 		},
				// 	},
				// },
			}),
		},
	},
	plugins: [tailwindTypography, tailwindAspectRatio, daisyui],
	daisyui: {
		// * see https://daisyui.com/docs/config/
		themes: THEMES,
		darkTheme: DARK_THEME_NAME,
		base: true, // applies background color and foreground color for root element by default
		styled: true, // include daisyUI colors and design decisions for all components
		utils: true, // adds responsive and modifier utility classes
		rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
		prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
		logs: false, // Shows info about daisyUI version and used config in the console when building
	},
} satisfies Config;
