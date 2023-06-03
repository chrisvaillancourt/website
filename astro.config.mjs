import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  integrations: [],
  // ! using 'class' breaks components that import styles into separate cascade layer
  // https://github.com/withastro/astro/issues/7282
  scopedStyleStrategy: 'where',
  compressHTML: true,
});
