/**
 * Test if an event target is a Node.
 */
export function isNode(target?: EventTarget | null): target is Node {
	return Boolean(target) && target instanceof Node;
}

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest;

	it('returns false for null', () => {
		expect(isNode(null)).toBe(false);
	});

	it('returns false for undefined', () => {
		expect(isNode(undefined)).toBe(false);
	});

	it('returns false for a falsy EventTarget', () => {
		expect(isNode(0 as unknown as EventTarget)).toBe(false);
	});
}
