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

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;
	it('uuid', () => {
		const [a, b] = [uuid(), uuid()];
		expect(a).not.toEqual(b);
	});
}
