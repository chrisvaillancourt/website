import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import { z } from 'zod';

/**Immutable object of environment variables. */
const ENV = Object.freeze(validateEnv(readEnv()));

/**
 * Get an object of all environment variables.
 */
function readEnv() {
	const _env = dotenv.config();
	dotenvExpand.expand(_env);
	const { parsed, error } = _env;
	if (error) throw error;
	return parsed;
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

export { ENV };
