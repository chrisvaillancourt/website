# syntax=docker/dockerfile:1.7

# Multi-stage build supporting development, testing, and production.
#
# Targets:
#   base        - Node.js setup with pnpm
#   deps        - Install dependencies
#   development - Full dev environment with Playwright browsers
#   test        - Run tests (unit + e2e)
#   build       - Build production static assets
#   production  - Serve production build

ARG NODE_VERSION=24
ARG PNPM_VERSION=11.3.0

# --- base: Node.js + pnpm ---------------------------------------------------
FROM node:${NODE_VERSION}-slim AS base

ARG PNPM_VERSION

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV COREPACK_ENABLE_AUTO_PIN=0

RUN corepack enable \
    && corepack prepare pnpm@${PNPM_VERSION} --activate

WORKDIR /app

# https://github.com/pnpm/pnpm/issues/5803
RUN pnpm config set store-dir /pnpm/store

# --- deps: install dependencies ---------------------------------------------
FROM base AS deps

COPY pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm fetch

COPY package.json ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    CI=true pnpm install --offline --frozen-lockfile

# --- development: full dev environment ---------------------------------------
FROM base AS development

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        sudo \
        git \
        curl \
        ca-certificates \
        procps \
        # Playwright system dependencies
        libnss3 \
        libnspr4 \
        libatk1.0-0 \
        libatk-bridge2.0-0 \
        libcups2 \
        libdrm2 \
        libdbus-1-3 \
        libxkbcommon0 \
        libatspi2.0-0 \
        libxcomposite1 \
        libxdamage1 \
        libxfixes3 \
        libxrandr2 \
        libgbm1 \
        libasound2 \
        libpango-1.0-0 \
        libcairo2 \
    && rm -rf /var/lib/apt/lists/* \
    && echo "node ALL=(root) NOPASSWD:ALL" > /etc/sudoers.d/node \
    && chmod 0440 /etc/sudoers.d/node

RUN chown node:node /app

USER node
WORKDIR /app

# Use a user-writable store path since we're running as non-root (USER node).
# The base stage sets /pnpm/store which is owned by root.
RUN pnpm config set store-dir /home/node/.local/share/pnpm/store

COPY --from=deps --chown=node:node /app/node_modules ./node_modules
COPY --from=deps --chown=node:node /app/package.json ./
COPY --from=deps --chown=node:node /app/pnpm-workspace.yaml ./

RUN CI=true ./node_modules/.bin/playwright install --with-deps chromium chromium-headless-shell firefox webkit

EXPOSE 4321
CMD ["pnpm", "run", "dev"]

# --- test: run unit and e2e tests -------------------------------------------
FROM development AS test

COPY --chown=node:node . .

CMD ["sh", "-c", "pnpm format && pnpm tsc --noEmit && pnpm test run && pnpm test:e2e"]

# --- build: production static assets ----------------------------------------
FROM base AS build

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./
COPY . .

RUN cp .env-example .env \
    && pnpm run build

# --- production: serve built assets ------------------------------------------
FROM base AS production

USER node

COPY --from=build --chown=node:node /app/dist ./dist
COPY --from=build --chown=node:node /app/package.json ./
COPY --from=deps --chown=node:node /app/node_modules ./node_modules

EXPOSE 4321
CMD ["pnpm", "run", "preview"]
