---
title: JavaScript Functions Are Objects
description: A function is a specialized object that's callable.
publishDate: 01-30-2025
updatedDate: 01-31-2025
tags: ['javascript']
---

It may surprise you but it's right there in
[function's definition](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function):

> The `Function` object provides methods for functions. In JavaScript, every
> function is actually a `Function` object.

## An example

For example, functions can have properties, just like objects:

```js
function hello(name) {
	if (!hello.names) {
		hello.names = new Set([name]);
	} else {
		hello.names.add(name);
	}
	return `Hello, ${name}!`;
}

hello('Sue');
hello('Beth');
hello('Tom');

console.log(hello.names); // {"Sue","Beth","Tom"}
```

## Just because you can doesn't mean you should

This is a neat party trick but I don't think it's a good idea.

Code clarity is everything and this pattern gets messy quickly. It is a fun
trick though!

## Deep dive

Checkout
[Kyle Simpson's discussion of functions in his You Don't Know JS series](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch2.md#functions).
