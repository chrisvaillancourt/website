---
title: Fixing pnpm copyfile error in VS Code Dev Container
description: TODO
publishDate: 03-07-2024
tags: ['pnpm', 'docker', 'dev container']
---

## The problem

While developing in a VS Code dev container, running `pnpm install` throws the following `copyfile ` error:

```
 ERR_PNPM_ENOENT  ENOENT: no such file or directory, copyfile '/workspaces/.pnpm-store/v3/files/1f/37fdd340ec3e8b464af6c4d30bbb126f2ddf2af71779c8a799a0b7c2fa99d566dce68a3d15ca3f54bc766e02c254ca521e3fce66b4de7540aff593b554c8b2' -> '/workspaces/website/node_modules/.pnpm/shikiji@0.9.19/node_modules/shikiji_tmp_930/dist/langs/cmake.d.mts'
```

## Solution

Add the following to the dockerfile:

```docker
pnpm config set store-dir /home/node/.local/share/pnpm/store
```