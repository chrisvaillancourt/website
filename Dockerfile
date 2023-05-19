# syntax=docker/dockerfile:1
# # Dockerfile reference
# https://docs.docker.com/engine/reference/builder/

FROM node:18-alpine

RUN corepack enable
RUN corepack prepare pnpm@8.5.1 --activate

WORKDIR /usr/src/app

COPY pnpm-lock.yaml ./

RUN pnpm fetch

COPY package.json ./

RUN pnpm install --offline --frozen-lockfile

COPY  . ./

EXPOSE 3000

# TODO don't run as root user
# running with node user causes build failure
# USER node
# --chown=node:node
# https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html#rule-2-set-a-user
# https://docs.docker.com/engine/security/userns-remap/

CMD ["pnpm", "run", "dev"]