// TODO consolidate config in one location / move to src/site.config.ts

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
	...daisyuiThemes[LIGHT_THEME_NAME],
	accent: LIGHT_THEME_ACCENT,
	primary: LIGHT_THEME_PRIMARY,
});

const base100 = 'base-100';

if (!(base100 in LIGHT_THEME)) throw new Error('missing required property');
if (typeof LIGHT_THEME[base100] != 'string')
	throw new TypeError(`${base100} theme property must be a string`);

const LIGHT_THEME_VALUE = LIGHT_THEME[base100];

const DARK_THEME_NAME = 'night';
const DARK_THEME = Object.freeze({
	...daisyuiThemes[DARK_THEME_NAME],
	// ! Need to override b/c the default causes differences in computed
	// ! value between chrome and safari.
	// ! Only is an issue in playwright when comparing computed colors to expected color.
	'base-100': 'oklch(20.77% 0.04 265.75)',
});

if (DARK_THEME[base100] === undefined)
	throw new TypeError(`${base100} theme property must be a string`);
const DARK_THEME_VALUE = DARK_THEME[base100];

/** The name attribute of the theme meta element. */

/** The emitted event type when the user changes the theme. */
const THEME_CHANGE_EVENT_TYPE = 'theme-change';

const THEMES = [
	{
		[DARK_THEME_NAME]: DARK_THEME,
		[LIGHT_THEME_NAME]: LIGHT_THEME,
	},
] as const;
/**
 * The name of the key in local storage to save the selected theme
 */
const THEME_STORAGE_KEY = 'theme';

function localStorageAvailable() {
	return typeof localStorage !== 'undefined';
}

type Theme = typeof LIGHT_THEME_NAME | typeof DARK_THEME_NAME;

function getStoredTheme(): string {
	if (!localStorageAvailable()) {
		console.warn('local storage is not available');
		return '';
	}
	const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
	return storedTheme || '';
}

function setStoredTheme(theme: Theme) {
	if (!localStorageAvailable()) {
		console.warn('local storage is not available');
		return;
	}
	localStorage.setItem(THEME_STORAGE_KEY, theme);
}

function emitThemeChange(theme: Theme) {
	const themeChangeEvent = new CustomEvent(THEME_CHANGE_EVENT_TYPE, {
		detail: {
			theme,
		},
	});
	if (!document) {
		console.warn('document is not defined');
		return;
	}
	document.documentElement.dispatchEvent(themeChangeEvent);
}

export {
	THEMES,
	THEME_CHANGE_EVENT_TYPE,
	LIGHT_THEME_NAME,
	LIGHT_THEME_VALUE,
	DARK_THEME_NAME,
	DARK_THEME_VALUE,
	THEME_STORAGE_KEY,
	getStoredTheme,
	setStoredTheme,
	emitThemeChange,
};
