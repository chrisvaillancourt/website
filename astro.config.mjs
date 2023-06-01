import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  integrations: [],
  // introduced in v2.4
  // https://github.com/withastro/roadmap/pull/543
  scopedStyleStrategy: 'class',
  compressHTML: true,
});
