import { randomUUID } from 'crypto';

/**
 * Generate a random UUID string.
 * Not browser compatible.
 */
export function uuid() {
	// if we need to use this client side:
	// self.crypto.randomUUID();
	return randomUUID();
}
