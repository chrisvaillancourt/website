// TODO consolidate config in one location / move to src/site.config.ts
/** The name attribute of the theme meta element. */
const METADATA_NAME = 'theme-color';
/** The emitted event type when the user changes the theme. */
const THEME_CHANGE_EVENT_TYPE = 'theme-change';

// ! NEED TO MANUALLY SYNC THEME COLOR IN `public/manifest.webmanifest

const LIGHT_THEME_NAME = 'winter';
const LIGHT_THEME_VALUE = '#fff';

const DARK_THEME_NAME = 'night';
// dark theme value based on background color
const DARK_THEME_VALUE = '#3abff8';

export {
	METADATA_NAME,
	THEME_CHANGE_EVENT_TYPE,
	LIGHT_THEME_NAME,
	LIGHT_THEME_VALUE,
	DARK_THEME_NAME,
	DARK_THEME_VALUE,
};
