import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import { z } from 'zod';

/**
 * The app's environment variables.
 */
function env() {
	return validateEnv(readEnv());
}

/**
 * Get an object of all environment variables.
 */
function readEnv() {
	const _env = dotenv.config();
	dotenvExpand.expand(_env);
	const { parsed, error } = _env;
	if (error) throw error;
	if (!parsed) throw new Error('No environment variables exist.');
	return parsed;
}
/**
 * Get the mode the app is running in.
 */
function appMode() {
	// see https://docs.astro.build/en/guides/environment-variables/#default-environment-variables
	// can't use `import.meta.env.PROD` or `import.meta.env.DEV`
	// import.meta.env.DEV is true during production build
	return import.meta.env.MODE;
}
/**
 * Check if the app is running in development mode.
 */
function isDev() {
	const devModeString = 'development';
	return appMode() === devModeString;
}
/**
 * Check if the app is running in production mode.
 */
function isProd() {
	const productionModeString = 'production';
	return appMode() === productionModeString;
}

/**
 * Validate the environment variable object.
 */
function validateEnv(env: ReturnType<typeof readEnv>) {
	const envSchema = z.object({
		APP_URL: z.string(),
	});

	return envSchema.parse(env);
}

export { isDev, isProd, env };
