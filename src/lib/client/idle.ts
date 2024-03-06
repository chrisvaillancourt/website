/**
 * Defer a function until the browser is idle.
 * Only available in a browser context (i.e. not server side).
 * @throws Throws an error if called outside of a browser context.
 */
export function idle<T extends (...args: Parameters<T>) => ReturnType<T>>(
	cb: T,
	...args: Parameters<T>
): Promise<ReturnType<T>> {
	if (!window) throw new Error('idle requires a browser context.');
	return new Promise((resolve) => {
		Object.hasOwn(window, 'requestIdleCallback')
			? window.requestIdleCallback(() => {
					resolve(cb(...args));
				})
			: window.addEventListener('load', () => {
					resolve(cb(...args));
				});
	});
}
