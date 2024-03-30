import { isSSR } from '@/lib/env';
/**
 * Generate a random UUID string.
 */
var uuid: () => `${string}-${string}-${string}-${string}-${string}`;

if (isSSR()) {
	const { randomUUID } = await import('node:crypto');
	uuid = function ssrUUID() {
		return randomUUID();
	};
} else {
	uuid = function clientUUID() {
		return self.crypto.randomUUID();
	};
}

export { uuid };

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;
	it('uuid', () => {
		const [a, b] = [uuid(), uuid()];
		expect(a).not.toEqual(b);
	});
}
