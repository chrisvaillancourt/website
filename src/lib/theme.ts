// TODO consolidate config in one location / move to src/site.config.ts
// @ts-expect-error there's no type provided for the theme
import daisyuiThemes from 'daisyui/src/theming/themes';

// ! NEED TO MANUALLY SYNC THEME COLOR IN `public/manifest.webmanifest

const LIGHT_THEME_NAME = 'winter';
// The default light theme accent is slightly too light.
// darking it slightly makes it pass accessibility checks
// created by dropping default lightness by 1 then converting from hsl to hex
const LIGHT_THEME_ACCENT = '#bf45ab';

const LIGHT_THEME = Object.freeze({
	...daisyuiThemes[`[data-theme=${LIGHT_THEME_NAME}]`],
	accent: LIGHT_THEME_ACCENT,
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
