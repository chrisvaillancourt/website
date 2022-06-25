import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config

export default defineNuxtConfig({
  ssr: true,
  target: 'static',
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
});
