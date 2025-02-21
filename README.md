# Website

## Deployed app

View the deployed app at
[chrisvaillancourt.io](https://www.chrisvaillancourt.io/)

## Local development

Running locally requires node v18.17.x and pnpm. You can use pnpm to control
your node version by running `pnpm env use --global lts`.

Create environment variables by copying the [`.env-example`](./env-example)
file.

## Development without docker

It's possible to run this app without Docker. Run all commands from the root of
the project, from a terminal:

| Command             | Action                                               |
| :------------------ | :--------------------------------------------------- |
| `pnpm install`      | Installs dependencies                                |
| `pnpm dev`          | Starts local dev server at `localhost:4321`          |
| `pnpm build`        | Build your production site to `./dist/`              |
| `pnpm preview`      | Preview your build locally, before deploying         |
| `pnpm astro ...`    | Run CLI commands like `astro add`, `astro preview`   |
| `pnpm astro --help` | Get help using the Astro CLI                         |
| `pnpm tsc`          | Run the TypeScript compiler with any compiler option |

## Testing

This project uses playwright for e2e testing. To start playwright's codegen
tool, run: `pnpm playwright codegen http://localhost:4321/`

### Specifying e2e tests

To run a specific test, pass the path to the test file:
`pnpm playwright test <path_to_test>`. For example,
`pnpm playwright test e2e/components/ThemeToggle.spec.ts`

### Running tests against deployed site

By default, playwright sets the base URL for tests using the environment
variable `APP_URL`. We set this from the `.env` file but we can override
variables by passing them in at runtime with `VARIABLE_NAME=VALUE` syntax. To
run e2e tests against the production site, we can run
`APP_URL=https://chrisvaillancourt.io/ pnpm test:e2e`.

### Downloading playwright browsers

Playwright doesn't automatically download browsers for running tests. To
download browsers:

1. install project dependencies: `pnpm i`
2. install playwright browsers: `pnpm dlx playwright install --with-deps`

## Deployment

First, build the site and preview it so we can run e2e tests against the
production build. To do this:

1. Install dependencies by running `pnpm i`
2. Build the site by running `pnpm build`
3. Start the preview server by running `pnpm preview`
4. Run the e2e test suite with `pnpm test:e2e`

If all tests pass, stop the preview server and deploy the built site by running
`pnpm run deploy`. Follow the CLI instructions to finish the deployment.

## Development with docker

### Misc. docker commands

To build the container, run `docker build . -t website:latest`. To run the image
and expose port: `docker run -p 4321:4321 website` Run the built container with:
`docker run website:latest pnpm build` To run and build the compose project:
`docker compose up --build`. To run a production build, run:
`docker build -t website . && docker run website pnpm run build`. To run a
production build and deploy the build:
`docker build -t website . && docker run website pnpm run build && pnpm run deploy`

### VS Code dev container

To use a dev container, open the project root in VS Code and open the command
pallet and select `Dev Containers: Reopen in container`. VS Code will build the
container and configure the dev environment.

_Note_: the container automatically installs dependencies after it's created but
may run into an error copying files from the PNPM store. If the initial install
throws an error, re-run the install with `pnpm i`. Rerunning the install command
typically resolves the issue.

After the dev container starts and installs dependencies, run the local dev
server by running `pnpm dev` from the dev container.

## Astro dependency changelogs

This project uses astro dependencies that have changelogs in separate locations.
Below is a list of frequently referenced changelogs:

- [astro](https://github.com/withastro/astro/blob/main/packages/astro/CHANGELOG.md)
- [@astrojs/sitemap](https://github.com/withastro/astro/blob/main/packages/integrations/sitemap/CHANGELOG.md)
- [@astrojs/mdx](https://github.com/withastro/astro/blob/main/packages/integrations/mdx/CHANGELOG.md)
- [@astrojs/tailwind](https://github.com/withastro/astro/blob/main/packages/integrations/tailwind/CHANGELOG.md)
- [@astrojs/rss](https://github.com/withastro/astro/blob/main/packages/astro-rss/CHANGELOG.md)
- [@astrojs/check](https://github.com/withastro/language-tools/blob/main/packages/astro-check/CHANGELOG.md)

## Misc. dependency changelogs

- [prettier](https://github.com/prettier/prettier/blob/main/CHANGELOG.md)
