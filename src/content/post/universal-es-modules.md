---
title: How to write universal ESM
description: Author ecmascript modules for any runtime.
publishDate: 06-23-2023
tags: ['node', 'esm']
---

When writing native JavaScript/ES modules, we want to write them in a way that
allows them to be run in as many environments as possible. Sometimes we need to
use features that're inconsistent across environments.

If we want to write universal JavaScript modules we need to:

1. declare a module level variable
2. check the environment we're in
3. use the features available in each environment and update the module level
   variable accordingly

For example, if we wanted to write a UUID utility for node.js and client side
JavaScript,

```ts
import { isSSR } from '@/lib/env';
/**
 * Generate a random UUID string.
 */
var uuid: () => `${string}-${string}-${string}-${string}-${string}`;

if (isSSR()) {
	const { randomUUID } = await import('node:crypto');
	uuid = function ssrUUID() {
		return randomUUID();
	};
} else {
	uuid = function clientUUID() {
		return self.crypto.randomUUID();
	};
}

export { uuid };
```
