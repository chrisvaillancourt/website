# syntax=docker/dockerfile:1
# # Dockerfile reference
# https://docs.docker.com/engine/reference/builder/

ARG NODE_VERSION

FROM node:${NODE_VERSION}-slim

ARG PNPM_VERSION

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
# stop corepack from adding packageManager field to package.json
# we don't need this since we already specify the package manager 
# and version in the root compose.yaml
# https://github.com/nodejs/corepack/blob/main/README.md#environment-variables
ENV COREPACK_ENABLE_AUTO_PIN=0

RUN corepack enable \
    && corepack prepare pnpm@$PNPM_VERSION --activate \
    && apt-get update \
    # need to add ability to use sudo to node user so we can install playwright dependencies in dev container
    && apt-get install -y sudo \
    && echo node ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/node \
    && chmod 0440 /etc/sudoers.d/node

USER node

WORKDIR /home/app

# Need to change the default store location to avoid permission errors
# https://github.com/pnpm/pnpm/issues/5803#issuecomment-1974820613
RUN pnpm config set store-dir /home/node/.local/share/pnpm/store

COPY --chown=node:node pnpm-lock.yaml ./

RUN pnpm fetch

COPY --chown=node:node package.json ./

RUN pnpm install --offline --frozen-lockfile \
    && pnpm dlx playwright install --with-deps

COPY --chown=node:node  . ./

# CMD ["pnpm", "run", "dev"]