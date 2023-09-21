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

This app may be run without using Docker. Run all commands from the root of the
project, from a terminal:

| Command             | Action                                               |
| :------------------ | :--------------------------------------------------- |
| `pnpm install`      | Installs dependencies                                |
| `pnpm dev`          | Starts local dev server at `localhost:3000`          |
| `pnpm build`        | Build your production site to `./dist/`              |
| `pnpm preview`      | Preview your build locally, before deploying         |
| `pnpm astro ...`    | Run CLI commands like `astro add`, `astro preview`   |
| `pnpm astro --help` | Get help using the Astro CLI                         |
| `pnpm tsc`          | Run the TypeScript compiler with any compiler option |

## Testing

This project uses playwright for e2e testing. To start playwright's codegen
tool, run: `pnpm exec playwright codegen http://localhost:3000/  `

## Deployment

To build and deploy, run `pnpm i && pnpm build && pnpm run deploy` and follow
the output instructions.

## Development with docker

### Misc. docker commands

To build the container, run `docker build . -t website:latest`. To run the image
and expose port: `docker run -p 3000:3000 website` Run the built container with:
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
