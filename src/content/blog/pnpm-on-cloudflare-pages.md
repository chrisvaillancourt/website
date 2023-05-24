---
title: Using pnpm with Cloudflare Pages
layout: ../../layouts/PostLayout.astro
summary: How to setup a Cloudflare Pages deployment with pnpm.
added: 09-4-2022
tags: [pnpm, cloudflare, CI/CD]
---

## TLDR

This
[community post](https://community.cloudflare.com/t/add-pnpm-to-pre-installed-cloudflare-pages-tools/288514/5)
offers an effective solution:

1. add an environment variable to the build settings that skips the npm install:
   `NPM_FLAGS = --version`
2. install pnpm and cache the pnpm store:
   `npx pnpm i --store=node_modules/.pnpm-store && npm run build`

## The problem with pnpm on Cloudflare Pages

While deploying this site to Cloudflare pages, I ran into a challenge with using
[this project's default build command](https://github.com/chrisvaillancourt/website/blob/72b36c4e2ae73ff7b3821b8f33917a6635f89446/package.json#L9):
`pnpm build`.

The issue is Cloudflare pages
[uses npm for Astro projects](https://developers.cloudflare.com/pages/platform/build-configuration#framework-presets)
so executing `pnpm build` fails spectacularly. The docs (as of September 2022)
don't provide any insight or recommendations for using pnpm as a package manage.

Fortunately, a
[community post](https://community.cloudflare.com/t/add-pnpm-to-pre-installed-cloudflare-pages-tools/288514/5)
offers an effective solution.
