# syntax=docker/dockerfile:1
# # Dockerfile reference
# https://docs.docker.com/engine/reference/builder/

ARG NODE_VERSION

FROM node:${NODE_VERSION}-slim

ARG PNPM_VERSION

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable \
    && corepack prepare pnpm@$PNPM_VERSION --activate

USER node

WORKDIR /home/app

COPY --chown=node:node pnpm-lock.yaml ./

RUN pnpm fetch

COPY --chown=node:node package.json ./

RUN pnpm install --offline --frozen-lockfile

COPY --chown=node:node  . ./

# CMD ["pnpm", "run", "dev"]