# AGENTS.md

Guidance for AI coding assistants working with this repository.

## Commands

```bash
# Development
pnpm dev                  # Start dev server (with astro check --watch)
pnpm start                # Start dev server (astro dev only)
pnpm preview              # Preview production build
pnpm preview:wrangler     # Preview via Wrangler (Cloudflare Pages)

# Build
pnpm build                # Full build: astro check + tsc --noEmit + format check + astro build

# Testing
pnpm test                 # Unit tests (Vitest, watch mode)
pnpm test run             # Unit tests (single run)
pnpm test:e2e             # E2E tests (Playwright, all browsers)

# Code Quality
pnpm format               # Prettier check
pnpm format:fix           # Prettier fix
pnpm tsc --noEmit         # TypeScript type check
pnpm astro check          # Astro-specific type check

# Deployment
pnpm deploy               # Deploy to Cloudflare Pages via Wrangler

# Docker
docker compose up dev                              # Dev server with hot reloading
docker compose --profile production up production   # Production preview
docker compose --profile test run --rm test         # Run tests in container
docker compose --profile build run --rm build       # Build in container
```

## Environment Variables

Copy `.env-example` to `.env` for local development.

| Variable                | Required | Description                       |
| ----------------------- | -------- | --------------------------------- |
| `APP_URL`               | Yes      | Base URL (set to dev or prod)     |
| `APP_URL_DEV`           | Yes      | Dev URL (`http://localhost:4321`) |
| `APP_URL_PROD`          | Yes      | Prod URL                          |
| `CLOUDFLARE_ACCOUNT_ID` | No       | Cloudflare deployment             |
| `CLOUDFLARE_API_TOKEN`  | No       | Cloudflare deployment             |

Environment variables are validated at runtime via Zod in `src/lib/env.ts`.

## Architecture

**Framework:** Astro 5 (static site generation) **Styling:** Tailwind CSS +
DaisyUI (winter/night themes) **Deployment:** Cloudflare Pages

```
src/
├── assets/           # Static assets (images, fonts)
├── components/       # Reusable Astro components
│   └── blog/         # Blog-specific components
├── content/          # Content collections (blog posts in MDX)
├── content.config.ts # Content collection schema (Zod)
├── layouts/          # Page layouts (Base, BlogPost)
├── lib/              # Utility functions
│   ├── client/       # Client-side utilities (DOM, idle)
│   ├── constants/    # App constants and links
│   ├── guards/       # Type guards
│   ├── icons/        # Icon utilities
│   ├── date.ts       # Date formatting
│   ├── env.ts        # Env var validation (Zod)
│   ├── post.ts       # Blog post utilities
│   ├── theme.ts      # Theme management
│   └── uid.ts        # UID generation
├── pages/            # File-based routing
│   ├── og-image/     # Dynamic OG image generation (Satori)
│   ├── posts/        # Blog post list + individual pages
│   ├── tags/         # Tag listing + filtered views
│   ├── 404.astro
│   ├── about.astro
│   ├── index.astro
│   └── rss.xml.ts    # RSS feed
├── site.config.ts    # Site-level configuration
├── styles/
│   └── global.css    # Global styles
└── types/
    └── index.ts      # Shared TypeScript types
```

## Key Patterns

**Path aliases** (configured in `tsconfig.json`):

- `@/*` → `src/*`
- `@/components/*` → `src/components/*`
- `@/layouts/*` → `src/layouts/*`

**Content collections:** Blog posts live in `src/content/post/` as MDX files.
Schema defined in `src/content.config.ts` with Zod validation.

**Dynamic routes:** `[slug].astro` for individual posts, `[...page].astro` for
paginated lists.

**Environment handling:** Use `env()` from `src/lib/env.ts`. Helper functions:
`isDev()`, `isProd()`, `isSSR()`.

**OG image generation:** Dynamic OG images via Satori in
`src/pages/og-image/[...slug].png.ts`.

## Testing

**Unit tests (Vitest):** Uses in-source testing with `import.meta.vitest` blocks
embedded directly in source files (e.g., `src/lib/env.ts`, `src/lib/uid.ts`).
Run with `pnpm test` or `pnpm test run`.

**E2E tests (Playwright):** Tests in `e2e/` directory. Helper utilities in
`e2e/utils.ts` (`waitForAllLoadStates`, `getPageLinks`, `collectPageErrors`).
Runs across Chromium, Firefox, WebKit, and mobile viewports. CI runs Chromium
only with 2 retries.

Playwright browsers require installation:
`pnpm dlx playwright install --with-deps`

## Code Style

- **TypeScript:** Strict mode (`astro/tsconfigs/strictest`). `noUnusedLocals`,
  `noUnusedParameters`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`
  enabled.
- **Formatter:** Prettier with `prettier-plugin-astro` and
  `prettier-plugin-tailwindcss`. Single quotes, semicolons, trailing commas.
- **Package manager:** pnpm 10.29.2 (enforced via `preinstall` script). Do not
  use npm or yarn.
- **Node version:** 24 (specified in `.nvmrc`).
- **Line endings:** LF. Indentation: tabs (size 2).

## CI/CD

GitHub Actions runs on push/PR to main:

1. **lint** — format check, astro check, tsc
2. **test** — Vitest unit tests
3. **e2e** — Playwright (Chromium only)
4. **build** — production build

Docker workflow validates container builds for Docker-related file changes.
