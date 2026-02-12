import { z } from 'zod';

/**
 * The app's environment variables.
 */
function env() {
	return validateEnv(import.meta.env);
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
 * Check if currently running server side.
 */
function isSSR(): boolean {
	return typeof process !== 'undefined' && process.release.name === 'node';
}

/**
 * Validate the environment variable object.
 */
function validateEnv(env: Record<string, unknown>) {
	const envSchema = z.object({
		APP_URL: z.string(),
	});

	return envSchema.parse(env);
}

export { isDev, isProd, isSSR, env };

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;
	it('isSSR', () => {
		const result = isSSR();
		expect(result).toBe(true);
	});
	it('validates env with APP_URL', () => {
		const result = validateEnv({ APP_URL: 'http://localhost:4321' });
		expect(result).toHaveProperty('APP_URL');
	});
	it('throws on missing APP_URL', () => {
		expect(() => validateEnv({})).toThrow();
	});
}
