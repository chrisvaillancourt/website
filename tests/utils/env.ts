import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
	APP_URL: z.string(),
});

const ENV = envSchema.parse(process.env);

export { ENV };
