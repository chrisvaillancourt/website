import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config

export default defineNuxtConfig({
  ssr: true,
  target: 'static',
  css: ['~/assets/styles/app.css', '~/assets/styles/utils.css'],
  modules: ['@nuxt/content'],
  content: {
    // https://content.nuxtjs.org/api/configuration
  },
  typescript: {
    shim: false,
    strict: true,
    typeCheck: true,
    tsConfig: {
      compilerOptions: {
        target: 'esnext',
        useDefineForClassFields: true,
        module: 'esnext',
        moduleResolution: 'node',
        strict: true,
        jsx: 'preserve',
        sourceMap: true,
        resolveJsonModule: true,
        isolatedModules: true,
        esModuleInterop: true,
        lib: ['esnext', 'dom'],
        skipLibCheck: true,
      },
    },
  },
  telemetry: false,
});
