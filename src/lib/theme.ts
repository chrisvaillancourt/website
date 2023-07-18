// TODO consolidate config in one location / move to src/site.config.ts
// @ts-expect-error there's no type provided for the theme
import daisyuiThemes from 'daisyui/src/theming/themes';

// ! NEED TO MANUALLY SYNC THEME `background_color` and `theme_color` IN `public/manifest.webmanifest

// We need to modify some of the light theme colors to improve contrast with background colors.
// Modifications based on default colors from daisyuiThemes
// and tweaking the lightness value to get sufficient contrast.
// Then convert the modified HSL to hex b/c that's what the config expects.
// See https://color.review/ for help picking accessible colors.
const LIGHT_THEME_NAME = 'winter';

// Default HSL to modified HSL: hsl(310 49% 52%) --> hsl(310 49% 51%)
const LIGHT_THEME_ACCENT = '#bf45ab';
// Default HSL to modified HSL: hsl(212 100% 51%) --> hsl(212 100% 47%)
const LIGHT_THEME_PRIMARY = '#0071F0';

const LIGHT_THEME = Object.freeze({
	...daisyuiThemes[`[data-theme=${LIGHT_THEME_NAME}]`],
	accent: LIGHT_THEME_ACCENT,
	primary: LIGHT_THEME_PRIMARY,
});
const LIGHT_THEME_VALUE = LIGHT_THEME['base-100'];

const DARK_THEME_NAME = 'night';
const DARK_THEME = Object.freeze({
	...daisyuiThemes[`[data-theme=${DARK_THEME_NAME}]`],
});

const DARK_THEME_VALUE = DARK_THEME['base-100'];

/** The name attribute of the theme meta element. */

/** The emitted event type when the user changes the theme. */
const THEME_CHANGE_EVENT_TYPE = 'theme-change';

const THEMES = [
	{
		[DARK_THEME_NAME]: DARK_THEME,
		[LIGHT_THEME_NAME]: LIGHT_THEME,
	},
] as const;

export {
	THEMES,
	THEME_CHANGE_EVENT_TYPE,
	LIGHT_THEME_NAME,
	LIGHT_THEME_VALUE,
	DARK_THEME_NAME,
	DARK_THEME_VALUE,
};
