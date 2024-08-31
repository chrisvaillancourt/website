---
title: Writing Universal JavaScript Modules
description:
  How to write native ECMAScript modules (ESM) for different JS runtimes.
publishDate: 05-23-2024
tags: ['node', 'esm', 'bun', 'deno']
---

When writing JavaScript modules, we often need to use features or modules from
the runtime environment. With the proliferation of JavaScript, we need to write
modules that run in different runtimes. The runtime could be a client side
browser, or a non-browser environment like [Node](https://nodejs.org/),
[Deno](https://deno.com/), or [Bun](https://bun.sh/).

We should try to author JS modules that are flexible to different runtimes so
our code can be used in any environment. If we write code that assumes a
specific runtime like Node, then it may be impossible to run our code in Deno or
Bun.

One way to write universal modules is write separate implementations for each
environment and then call the appropriate function for each environment.

For example, if we wanted to write a file reader for Bun, Deno, and Node, we
first detect the runtime:

```js
// universalTextReader.js
const isBun = !!globalThis.Bun || !!globalThis.process?.versions?.bun;
const isNode = globalThis.process?.release?.name === 'node' && !isBun;
const isDeno = !!globalThis.Deno;
```

Then define an implementation for each runtime

```js
// universalTextReader.js
const isBun = !!globalThis.Bun || !!globalThis.process?.versions?.bun;
const isNode = globalThis.process?.release?.name === 'node' && !isBun;
const isDeno = !!globalThis.Deno;

async function denoTextReader() {
	// deno specific implementation
	const decoder = new TextDecoder('utf-8');
	const data = await Deno.readFile(file);
	return decoder.decode(data);
}

async function nodeTextReader() {
	// node specific implementation
	const { readFile } = await import('node:fs/promises');
	return readFile(file, 'utf8');
}

async function bunTextReader() {
	// bun specific implementation
	const foo = Bun.file(file);
	return foo.text();
}
```

Lastly call the correct function for each environment:

```js
// universalTextReader.js
function universalTextReader(file) {
	if (isDeno) {
		return denoTextReader(file);
	} else if (isBun) {
		return bunTextReader(file);
	} else if (isNode) {
		return nodeTextReader(file);
	}
}
```

Another approach is to change the exported value based on the environment we're
in. Once we know what environment we're in, we can use top level await to
asynchronously import modules as needed.

To do this:

1. declare a module level variable
2. check the environment we're in
3. use the features available in each environment and update the module level
   variable accordingly
