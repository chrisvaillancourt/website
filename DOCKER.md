# Docker Development Guide

Docker setup for development, testing, and production builds.

## Prerequisites

- A Docker-compatible runtime:
  [Docker Desktop](https://www.docker.com/products/docker-desktop/),
  [OrbStack](https://orbstack.dev/),
  [Colima](https://github.com/abiosoft/colima), or [Podman](https://podman.io/)
- macOS 12+ (or Linux)

Install via Homebrew:

```bash
# Docker Desktop
brew install --cask docker

# OrbStack (lighter alternative)
brew install --cask orbstack

# Colima (open source)
brew install colima docker docker-compose
colima start --cpu 4 --memory 8
```

Verify: `docker --version && docker compose version`

## Quick Start

```bash
# Development with hot reloading
docker compose up dev
# → http://localhost:4321

# Production preview
docker compose --profile production up production

# Run tests
docker compose --profile test run --rm test

# Build production assets (outputs to ./dist)
docker compose --profile build run --rm build
```

## Development

```bash
docker compose up dev          # foreground
docker compose up -d dev       # background
docker compose logs -f dev     # view logs
docker compose exec dev sh     # shell into container
docker compose down            # stop
docker compose up --build dev  # rebuild after Dockerfile changes
```

Source code is mounted at `/app` with hot reloading. Node modules, pnpm store,
and Playwright browsers are persisted in named volumes.

## VS Code Dev Containers

1. Install the
   [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
   extension
2. Open project, then `Cmd+Shift+P` > "Dev Containers: Reopen in Container"
3. Run `pnpm run dev` in the container terminal

The container includes Node.js, pnpm, Git, GitHub CLI, Playwright browsers, and
VS Code extensions for Astro, TypeScript, and Tailwind.

## Dockerfile Targets

| Target        | Purpose                | Base          |
| ------------- | ---------------------- | ------------- |
| `base`        | Node.js + pnpm         | -             |
| `deps`        | Installed dependencies | `base`        |
| `development` | Dev environment        | `base`        |
| `test`        | Test runner            | `development` |
| `build`       | Production build       | `base`        |
| `production`  | Serve built site       | `base`        |

## Troubleshooting

```bash
# Node modules issues — clear volumes and rebuild
docker compose down -v && docker compose up --build dev

# Playwright issues — reinstall browsers
docker compose exec dev pnpm dlx playwright install --with-deps

# Permission errors
docker compose exec dev sudo chown -R node:node /app

# Reset everything
docker compose down -v
docker image prune -f
docker compose up --build dev
```

## Using Podman

Podman is a drop-in Docker replacement. Install with `brew install podman` and
use `podman-compose` instead of `docker compose`, or create shell aliases:

```bash
alias docker=podman
alias docker-compose=podman-compose
```

For VS Code Dev Containers with Podman, set in VS Code settings:

```json
{
	"dev.containers.dockerPath": "podman",
	"dev.containers.dockerComposePath": "podman-compose"
}
```
