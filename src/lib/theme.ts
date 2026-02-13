import daisyuiThemes from 'daisyui/theme/object';

// ! NEED TO MANUALLY SYNC THEME `background_color` and `theme_color` IN `public/manifest.webmanifest`

const LIGHT_THEME_NAME = 'winter';
const DARK_THEME_NAME = 'night';

const LIGHT_THEME = daisyuiThemes[LIGHT_THEME_NAME];
const DARK_THEME = daisyuiThemes[DARK_THEME_NAME];

const LIGHT_THEME_VALUE = LIGHT_THEME['--color-base-100'];
const DARK_THEME_VALUE = DARK_THEME['--color-base-100'];

/** The emitted event type when the user changes the theme. */
const THEME_CHANGE_EVENT_TYPE = 'theme-change';

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

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it('LIGHT_THEME_NAME is winter', () => {
		expect(LIGHT_THEME_NAME).toBe('winter');
	});

	it('DARK_THEME_NAME is night', () => {
		expect(DARK_THEME_NAME).toBe('night');
	});

	it('THEME_STORAGE_KEY is theme', () => {
		expect(THEME_STORAGE_KEY).toBe('theme');
	});

	it('DARK_THEME_VALUE is a string', () => {
		expect(typeof DARK_THEME_VALUE).toBe('string');
		expect(DARK_THEME_VALUE.length).toBeGreaterThan(0);
	});

	it('LIGHT_THEME_VALUE is a string', () => {
		expect(typeof LIGHT_THEME_VALUE).toBe('string');
		expect(LIGHT_THEME_VALUE.length).toBeGreaterThan(0);
	});
}
