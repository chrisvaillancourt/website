import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
import tailwindTypography from '@tailwindcss/typography';
import tailwindAspectRatio from '@tailwindcss/aspect-ratio';
import plugin from 'tailwindcss/plugin';
import daisyui from 'daisyui';

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
			colors: {
				bgColor: 'var(--theme-bg)',
				textColor: 'var(--theme-text)',
				link: 'var(--theme-link)',
				accent: 'var(--theme-accent)',
				'accent-2': 'var(--theme-accent-2)',
			},
			fontFamily: {
				// Add any custom fonts here
				sans: [...fontFamily.sans],
				serif: [...fontFamily.serif],
			},
			transitionProperty: {
				height: 'height',
			},
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			// Remove above once tailwindcss exposes theme type
			typography: (theme) => ({
				cactus: {
					css: {
						'--tw-prose-body': 'var(--theme-text)',
						'--tw-prose-headings': 'var(--theme-accent-2)',
						'--tw-prose-links': 'var(--theme-text)',
						'--tw-prose-bold': 'var(--theme-text)',
						'--tw-prose-bullets': 'var(--theme-text)',
						'--tw-prose-quotes': 'var(--theme-quote)',
						'--tw-prose-code': 'var(--theme-text)',
						'--tw-prose-hr': '0.5px dashed #666',
						'--tw-prose-th-borders': '#666',
					},
				},
				DEFAULT: {
					css: {
						a: {
							'@apply cactus-link no-underline': '',
						},
						strong: {
							fontWeight: '700',
						},
						code: {
							border: '1px dotted #666',
							borderRadius: '2px',
						},
						blockquote: {
							borderLeftWidth: 'none',
						},
						hr: {
							borderTopStyle: 'dashed',
						},
						thead: {
							borderBottomWidth: 'none',
						},
						'thead th': {
							fontWeight: '700',
							borderBottom: '1px dashed #666',
						},
						'tbody tr': {
							borderBottomWidth: 'none',
						},
						tfoot: {
							borderTop: '1px dashed #666',
						},
					},
				},
				sm: {
					css: {
						code: {
							fontSize: theme('fontSize.sm')[0],
							fontWeight: '400',
						},
					},
				},
			}),
		},
	},
	plugins: [
		tailwindTypography,
		tailwindAspectRatio,
		daisyui,
		plugin(function ({ addComponents }) {
			addComponents({
				'.cactus-link': {
					'@apply bg-[size:100%_6px] bg-bottom bg-repeat-x': {},
					backgroundImage:
						'linear-gradient(transparent,transparent 5px,var(--theme-text) 5px,var(--theme-text))',
					'&:hover': {
						backgroundImage:
							'linear-gradient(transparent,transparent 4px,var(--theme-link) 4px,var(--theme-link))',
					},
				},
				'.title': {
					'@apply text-2xl font-semibold text-accent-2': {},
				},
			});
		}),
	],
	daisyui: {
		// * see https://daisyui.com/docs/config/
		themes: [], // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
		darkTheme: 'dark', // name of one of the included themes for dark mode
		base: true, // applies background color and foreground color for root element by default
		styled: true, // include daisyUI colors and design decisions for all components
		utils: true, // adds responsive and modifier utility classes
		rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
		prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
		logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
	},
} satisfies Config;
