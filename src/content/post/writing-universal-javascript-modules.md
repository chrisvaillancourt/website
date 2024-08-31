---
title: Writing Universal JavaScript Modules
description:
  How to write native ECMAScript modules (ESM) for different JS runtimes.
publishDate: 05-23-2024
tags: ['node', 'esm', 'bun', 'deno']
---

## Why universal JavaScript modules

When writing JavaScript modules, we often need to use features or modules from
the runtime environment. With the proliferation of JavaScript, we need to write
modules that run in different runtimes. The runtime could be a client side
browser, or a non-browser environment like [Node](https://nodejs.org/),
[Deno](https://deno.com/), or [Bun](https://bun.sh/).

We should try to author JS modules that are flexible to different runtimes so
our code can be used in any environment. If we write code that assumes a
specific runtime like Node, then it may be impossible to run our code in Deno or
Bun.

## Example: Reading a text file in Node, Bun, and Deno

One way to write universal modules is write separate implementations for each
environment and then call the appropriate function for each environment.

The general workflow is as follows:

1. Detect the environment
2. Write separate implementations for each environment
3. Call the appropriate function given the environment

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

You could also refactor the extended `if`/`else` by using an object connecting the runtime name with the implementation:

```js
const deno = 'deno';
const bun = 'bun';
const node = 'node';

function getRuntime() {
	return isDeno ? deno : isBun ? bun : isNode ? node : '';
}

function universalTextReader(file) {
	const readers = {
		[deno]: denoTextReader,
		[bun]: bunTextReader,
		[node]: nodeTextReader,
	};

	return readers[getRuntime()](file);
}
```

## Example 2: Node and Browser UUID Generator

Another approach is to change the exported value based on the environment we're
in. Once we know what environment we're in, we can use top level await to
asynchronously import modules as needed.

To do this:

1. declare a module level variable
2. check the environment we're in
3. use the features available in each environment and update the module level
   variable accordingly

For example, if we're writing a UUID generator for Node or the browser. First,
declare a module level variable `uuid`.

```js
// uuid.js
var uuid;
```

Next, check if we're in node or a browser:

```js
// uuid.js
var uuid;
const isNode = globalThis.process?.release?.name === 'node';
```

Then, use top-level `await` to import the node's crypto module if we're in node
or `crypto.randomUUID()` if we're in the browser:

```js
// uuid.js
var uuid;
const isNode = globalThis.process?.release?.name === 'node';

if (isNode) {
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

## Third Party Helpers

Shout-out to [std-env](https://github.com/unjs/std-env) for making runtime
detection a breeze.
