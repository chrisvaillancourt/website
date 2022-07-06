const hasWindow = typeof window !== 'undefined';

// see https://vitejs.dev/guide/ssr.html#conditional-logic
const isServer = import.meta.env.SSR;

export { hasWindow, isServer };
