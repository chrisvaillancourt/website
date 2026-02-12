# Dependency Upgrade Plan

## Context

All project dependencies are stale (some by multiple major versions). The
biggest migration is **Tailwind CSS v3 → v4** which is a complete rewrite
requiring coordinated changes to DaisyUI, the Astro Tailwind integration,
PostCSS config, and CSS files. Several other dependencies have major version
bumps with breaking changes. The project has minimal test coverage (2 in-source
vitest tests, 4 E2E Playwright specs), so we need to add tests before migrating
to catch regressions.

## Flags for Your Attention

1. **`src/lib/theme.ts`** — The `daisyui/src/theming/themes` import changes to
   `daisyui/theme/object` in v5. Property names change from
   `accent`/`primary`/`base-100` to
   `--color-accent`/`--color-primary`/`--color-base-100`. Values change from
   hex/HSL to OKLCH. The `THEMES` array currently passed to `tailwind.config.ts`
   moves to CSS `@plugin` syntax. The `DARK_THEME_VALUE`/`LIGHT_THEME_VALUE`
   exports (used in `site.config.ts` and OG image generation) will need OKLCH
   values.

2. **`dotenv` + `dotenv-expand` removal** — Astro/Vite loads `.env` files
   natively with variable expansion. The current `src/lib/env.ts` manually calls
   `dotenv.config()` and `dotenvExpand.expand()`. After removal, `env()` should
   use Astro's built-in `import.meta.env` or `astro:env`. The
   `playwright.config.ts` also calls `env()` which runs outside Vite — it will
   need `dotenv` or a different approach for loading env vars.

3. **Zod v4** — API changes: `.string().email()` → `z.email()`, `.strict()` →
   `z.strictObject()`, etc. Your usage is minimal (env schema in `env.ts`,
   content schema in `content.config.ts`), and a codemod exists. However,
   Astro's `astro:content` uses Zod internally — need to verify Astro's bundled
   Zod version is compatible.

4. **Wrangler v4** — Deployment tool. Breaking changes are minimal (deprecated
   features removed, commands default to local mode). Since this affects your
   deployment pipeline, flagging for awareness.

5. **`satori-html`** — Unmaintained (last publish 3 years ago). A maintained
   fork exists: `@gotedo/satori-html`. Used only in OG image generation.

6. **`remark-unwrap-images`** — Deprecated. Should migrate to
   `rehype-unwrap-images` (move from `remarkPlugins` to `rehypePlugins` in Astro
   config).

## Dependencies to Remove

| Package                     | Reason                                                               |
| --------------------------- | -------------------------------------------------------------------- |
| `@astrojs/tailwind`         | Deprecated; replaced by `@tailwindcss/vite` for Tailwind v4          |
| `@tailwindcss/aspect-ratio` | Not needed/compatible with Tailwind v4 (native `aspect-*` utilities) |
| `autoprefixer`              | Built into Tailwind v4                                               |
| `dotenv`                    | Astro/Vite handles `.env` loading natively                           |
| `dotenv-expand`             | Astro/Vite handles `.env` expansion natively                         |
| `postcss`                   | Not needed when using `@tailwindcss/vite` instead of PostCSS         |
| `postcss-html`              | Only used by the PostCSS pipeline being removed                      |

## Dependencies to Add

| Package             | Reason                                                 |
| ------------------- | ------------------------------------------------------ |
| `@tailwindcss/vite` | Tailwind v4 Vite plugin (replaces `@astrojs/tailwind`) |

## Version Changes

| Package                       | Current  | Target                          | Breaking?               |
| ----------------------------- | -------- | ------------------------------- | ----------------------- |
| `astro`                       | ^5.3.0   | latest 5.x                      | No                      |
| `@astrojs/check`              | ^0.9.4   | latest                          | No                      |
| `@astrojs/mdx`                | ^4.0.8   | latest 4.x                      | No                      |
| `@astrojs/sitemap`            | ^3.2.1   | latest 3.x                      | No                      |
| `@astrojs/rss`                | ^4.0.11  | latest 4.x                      | No                      |
| `tailwindcss`                 | ^3.4.17  | ^4.1                            | **Yes**                 |
| `@tailwindcss/typography`     | ^0.5.16  | latest (v4-compatible)          | **Yes** (config change) |
| `daisyui`                     | ^4.12.23 | ^5.5                            | **Yes**                 |
| `prettier`                    | 3.5.1    | 3.8.1                           | No                      |
| `prettier-plugin-tailwindcss` | ^0.6.11  | ^0.7                            | Minor                   |
| `typescript`                  | ^5.7.3   | ^5.9                            | No                      |
| `@types/node`                 | ^22.13.4 | ^24                             | Yes (matches Node 24)   |
| `@playwright/test`            | ^1.50.1  | latest 1.x                      | No                      |
| `vitest`                      | ^3.0.6   | ^4.0                            | **Yes**                 |
| `wrangler`                    | ^3.109.2 | ^4.0                            | **Yes**                 |
| `satori`                      | ^0.12.1  | ^0.18                           | **Yes** (pre-1.0)       |
| `satori-html`                 | ^0.3.2   | Remove → `@gotedo/satori-html`  | Fork swap               |
| `remark-unwrap-images`        | 4.0.1    | Remove → `rehype-unwrap-images` | Migration               |
| `zod`                         | ^3.24.2  | ^3.24 (keep v3)                 | No                      |
| `sharp`                       | ^0.34.5  | ^0.34.5 (already latest)        | No                      |
| `@mdi/js`                     | ^7.4.47  | ^7.4.47 (already latest)        | No                      |
| `@resvg/resvg-js`             | ^2.6.2   | ^2.6.2 (already latest)         | No                      |

**Note on Zod:** Keep at v3 for now. Astro 5 bundles Zod v3 internally for
content collections. Upgrading to Zod v4 could create version conflicts with
Astro's internal Zod. Revisit when Astro ships with Zod v4 support.

## Implementation Steps

### Step 1: Create branch and verify current state

- Create `chore/update-dependencies` branch
- Run `pnpm build` to verify the project builds
- Run `pnpm test run` to verify existing unit tests pass
- Run `pnpm test:e2e --project=chromium` to verify E2E tests pass (need
  `sfw pnpm dlx playwright install --with-deps chromium` first)

### Step 2: Add pre-migration test coverage

Add tests to capture current behavior before making changes.

**Unit tests (in-source vitest pattern):**

- `src/lib/date.ts` — test `getFormattedDate()` with various date inputs
- `src/lib/guards/isNode.ts` — test `isNode()` with various inputs
- `src/lib/client/dom.ts` — test `toggleClass()` and `hasClass()`
- `src/lib/theme.ts` — test theme constants (`LIGHT_THEME_NAME`,
  `DARK_THEME_NAME`, `THEMES`, `DARK_THEME_VALUE`, `LIGHT_THEME_VALUE`,
  `THEME_STORAGE_KEY`)

**E2E tests:**

- Theme toggle test: verify clicking theme toggle changes `data-theme` attribute
- RSS feed test: verify `/rss.xml` returns valid XML with expected structure
- Navigation test: verify all nav links work, no 404s
- About page test: verify key content renders

### Step 3: Safe dependency updates (no breaking changes)

Update in a single `sfw pnpm update` or manual edits to `package.json`:

- `astro` → latest 5.x
- `@astrojs/check` → latest
- `@astrojs/mdx` → latest 4.x
- `@astrojs/sitemap` → latest 3.x
- `@astrojs/rss` → latest 4.x
- `prettier` → 3.8.1
- `typescript` → latest 5.x
- `@playwright/test` → latest 1.x
- `@types/node` → ^24

Run tests to verify nothing broke.

### Step 4: Tailwind v4 + DaisyUI v5 + Astro integration migration

This is the biggest change and must be done atomically.

**4a. Update packages:**

```
sfw pnpm remove @astrojs/tailwind @tailwindcss/aspect-ratio autoprefixer postcss postcss-html
sfw pnpm add -D @tailwindcss/vite tailwindcss@^4 @tailwindcss/typography daisyui@^5
```

**4b. Update `astro.config.mjs`:**

- Remove `import tailwind from '@astrojs/tailwind'`
- Add `import tailwindcss from '@tailwindcss/vite'`
- Remove `tailwind()` from integrations
- Add `tailwindcss()` to `vite.plugins`

**4c. Delete config files:**

- Delete `postcss.config.cjs`
- Delete `tailwind.config.ts` (config moves to CSS)

**4d. Rewrite `src/styles/global.css`:**

```css
@import 'tailwindcss';

@plugin "daisyui" {
	themes:
		night --default --prefersdark,
		winter;
}

/* Custom winter theme overrides for accessible contrast */
@plugin "daisyui/theme" {
	name: 'winter';
	--color-accent: oklch(56.5% 0.17 325);
	--color-primary: oklch(50% 0.24 260);
}

/* Custom night theme override for cross-browser consistency */
@plugin "daisyui/theme" {
	name: 'night';
	--color-base-100: oklch(20.77% 0.04 265.75);
}

@plugin "@tailwindcss/typography";

@theme {
	--font-sans:
		system-ui, -apple-system, 'Segoe UI', Roboto, Ubuntu, Cantarell,
		'Noto Sans', sans-serif;
	--font-serif: ui-serif, serif;
	--font-mono:
		'Dank Mono', 'Operator Mono', Inconsolata, 'Fira Mono', ui-monospace,
		'SF Mono', Monaco, 'Droid Sans Mono', 'Source Code Pro', monospace;
}

@layer base {
	html {
		@apply h-full scroll-smooth border-t-0;
	}
	html body {
		@apply mx-auto flex h-full max-w-3xl flex-col px-8 pt-16 font-mono text-sm font-normal antialiased;
	}
	:root {
		color-scheme: only dark;
	}
}
```

**4e. Refactor `src/lib/theme.ts`:**

- Change import from `daisyui/src/theming/themes` to `daisyui/theme/object`
- Update property access: `base-100` → `--color-base-100`, `accent` →
  `--color-accent`, etc.
- Remove `THEMES` export (no longer needed — themes configured in CSS)
- Keep `DARK_THEME_VALUE`/`LIGHT_THEME_VALUE` — read from the new theme object
- Keep runtime theme switching functions (they still use `data-theme` attribute
  which DaisyUI v5 supports)

**4f. Run Tailwind v4 upgrade tool for class renames:**

```
sfw npx @tailwindcss/upgrade
```

This handles utility class renames across all template files (e.g., `rounded` →
`rounded-sm` if used).

**4g. Update `prettier-plugin-tailwindcss`:**

```
sfw pnpm add -D prettier-plugin-tailwindcss@^0.7
```

Add `tailwindStylesheet` option to prettier config if needed for Tailwind v4.

**4h.** Run build and all tests to verify.

### Step 5: Remove dotenv and dotenv-expand

- Remove packages: `sfw pnpm remove dotenv dotenv-expand`
- Refactor `src/lib/env.ts`:
  - Remove `dotenv`/`dotenv-expand` imports and calls
  - Use `import.meta.env` (Vite loads `.env` automatically)
  - Keep the Zod validation but read from `import.meta.env`
- Update `playwright.config.ts`:
  - The `// @ts-nocheck` comment suggests this already has issues
  - For Playwright (runs outside Vite), use Node's native `--env-file` flag or
    keep a minimal env loading approach

### Step 6: Migrate remark-unwrap-images to rehype-unwrap-images

```
sfw pnpm remove remark-unwrap-images
sfw pnpm add rehype-unwrap-images
```

- In `astro.config.mjs`: move from `remarkPlugins` to `rehypePlugins`
- Run the `imgWrapper.spec.ts` E2E test to verify images are still unwrapped

### Step 7: Update satori and satori-html

```
sfw pnpm remove satori-html
sfw pnpm add satori@^0.18 @gotedo/satori-html
```

- Update import in `src/pages/og-image/[...slug].png.ts`: change `satori-html`
  to `@gotedo/satori-html`
- Test OG image generation by building and checking a generated image

### Step 8: Update Vitest to v4

```
sfw pnpm add -D vitest@^4
```

- Verify in-source testing pattern still works (the `import.meta.vitest`
  pattern)
- Check `vitest.config.ts` — the `getViteConfig` import from `astro/config`
  should still work
- Update `tsconfig.json` if the `vitest/importMeta` type changes
- Run `pnpm test run` to verify

### Step 9: Update Wrangler to v4

```
sfw pnpm add -D wrangler@^4
```

- Verify `pnpm deploy` and `pnpm preview:wrangler` still work
- Note: `wrangler pages deploy dist` command should still work in v4

### Step 10: Final verification

- Run full build: `pnpm build`
- Run unit tests: `pnpm test run`
- Run E2E tests: `pnpm test:e2e --project=chromium`
- Manual visual check: `pnpm preview` — verify theme toggle, blog post
  rendering, OG images

## Files Modified

| File                                  | Change                                                                |
| ------------------------------------- | --------------------------------------------------------------------- |
| `package.json`                        | Update/add/remove dependencies                                        |
| `pnpm-lock.yaml`                      | Auto-updated                                                          |
| `astro.config.mjs`                    | Remove @astrojs/tailwind, add @tailwindcss/vite, switch rehype plugin |
| `tailwind.config.ts`                  | **Delete**                                                            |
| `postcss.config.cjs`                  | **Delete**                                                            |
| `src/styles/global.css`               | Rewrite for Tailwind v4 + DaisyUI v5 CSS config                       |
| `src/lib/theme.ts`                    | Refactor for DaisyUI v5 theme object API                              |
| `src/lib/env.ts`                      | Remove dotenv, use import.meta.env                                    |
| `src/lib/date.ts`                     | Add in-source tests                                                   |
| `src/lib/guards/isNode.ts`            | Add in-source tests                                                   |
| `src/lib/client/dom.ts`               | Add in-source tests (if viable in Node env)                           |
| `src/pages/og-image/[...slug].png.ts` | Update satori-html import                                             |
| `playwright.config.ts`                | Update env loading (no more dotenv)                                   |
| `vitest.config.ts`                    | Update if needed for Vitest v4                                        |
| `tsconfig.json`                       | Update vitest types if needed                                         |
| `e2e/pages/theme.spec.ts`             | **New** — theme toggle test                                           |
| `e2e/pages/rss.spec.ts`               | **New** — RSS feed test                                               |
| `e2e/pages/about.spec.ts`             | **New** — about page test                                             |
| Template files (`.astro`)             | Possible class renames from Tailwind v4 upgrade tool                  |

## Verification

1. `pnpm build` — production build succeeds
2. `pnpm test run` — all unit tests pass
3. `pnpm test:e2e --project=chromium` — all E2E tests pass
4. `pnpm preview` — visual verification of theme toggle, styling, content
   rendering
5. `pnpm format` — formatting passes
6. `pnpm astro check` — no Astro type errors
7. `pnpm tsc --noEmit` — no TypeScript errors
