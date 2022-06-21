import { defineNuxtConfig } from 'nuxt';
import eslintVitePlugin from 'vite-plugin-eslint';

// https://v3.nuxtjs.org/api/configuration/nuxt.config

export default defineNuxtConfig({
  modules: ['@nuxt/content'],
  content: {
    // https://content.nuxtjs.org/api/configuration
  },
  typescript: {
    shim: false,
    strict: true,
    typeCheck: true,
  },
  telemetry: false,
  vite: {
    plugins: [
      eslintVitePlugin({
        include: ['./**/*.vue|ts|js|jsx|tsx'],
      }),
    ],
  },
});
