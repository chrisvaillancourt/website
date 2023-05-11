/**
 * Defer a function until the browser is idle.
 * Must only be called client-side.
 */
export function idle(cb: () => void) {
  if (!window) throw new Error('idle requires a browser context.');
  Object.hasOwn(window, 'requestIdleCallback')
    ? window.requestIdleCallback(cb)
    : window.addEventListener('load', () => {
        cb();
      });
}
