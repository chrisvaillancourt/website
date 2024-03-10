---
title: Fixing pnpm copyfile error in VS Code Dev Container
description:
  Resolving permission errors when running pnpm in a container as a non-root
  user.
publishDate: 03-09-2024
tags: ['pnpm', 'docker', 'dev container']
---

## Problem

While developing in a VS Code dev container, running `pnpm install` throws the
following `copyfile ` error:

```
 ERR_PNPM_ENOENT  ENOENT: no such file or directory, copyfile '/workspaces/.pnpm-store/v3/files/1f/37fdd340ec3e8b464af6c4d30bbb126f2ddf2af71779c8a799a0b7c2fa99d566dce68a3d15ca3f54bc766e02c254ca521e3fce66b4de7540aff593b554c8b2' -> '/workspaces/<project_name>/node_modules/.pnpm/shikiji@0.9.19/node_modules/shikiji_tmp_930/dist/langs/cmake.d.mts'
```

## Why

This happens if the dev container is running as a non root user and path to the
pnpm store is in the root user directory instead of the user running the
container.

## Solution

Move the pnpm store into the home directory of the user running the container
instead of the root user. In this case, I'm using the `node` user so we can add
the following the dockerfile to prevent access errors:

```docker
pnpm config set store-dir /home/node/.local/share/pnpm/store
```

See the working version
[here](https://github.com/chrisvaillancourt/website/blob/d3986560ab587dc63891cb53ed61b37af73e1e57/Dockerfile#L25).
