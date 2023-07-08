---
title: Fully Typed Higher Order Functions
description:
  Improving type safety of functions that take functions fully typed parameters
  and return values.
publishDate: 06-30-2023
tags: ['TypeScript', 'generic']
---

## TLDR

```ts
export function genericWrapper<
	T extends (...args: Parameters<T>) => ReturnType<T>,
>(cb: T, ...args: Parameters<T>): ReturnType<T> {
	// do something
	return cb(...args);
}
```

## Scenario

Sometimes we need to define a function that accepts a callback function. That
callback function may have one or more parameters.

We want to implement this in a way that gives us type safety for inputs (the
callback and parameter list) as well as the return type.

I ran into this writing a utility function that deferred a callback function
until the browser was idle.

A vanilla JavaScript implementation may look like this:

```js
function idle(cb, ...args) {
	return new Promise((resolve) => {
		window.requestIdleCallback(() => {
			resolve(cb(...args));
		});
	});
}
```

Note: see
[the real implementation](https://github.com/chrisvaillancourt/website/blob/fdace012e6ad91543aeea815a3eb6316103e8efe/src/lib/client/idle.ts)
for a complete example.

If we have some function:

```ts
/**
 * Check if an element exists.
 */
function elementExists(selector: string) {
	const el = document.querySelector(selector);
	return Boolean(el);
}
```

We can use it like so:

```ts
const buttonExists = await idle(elementExists, 'button');
```

This works but isn't using any types so we don't know what to pass for `cb` or
`args`. One approach is to annotate `cb` as a function:

```ts
function idle(cb: (...args: unknown[]) => unknown, ...args: unknown[]) {
	return new Promise((resolve) => {
		window.requestIdleCallback(() => {
			resolve(cb(...args));
		});
	});
}
```

Better! With this, we know `idle()` expects a function for the `cb` argument.
Passing anything else raises a type error:

```ts
const foo = await idle(elementExists, 'button');
const bar = await idle(123); // Error! Argument of type `number` is not assignable to parameter of type (...args: unknown[]) => unknown
```

The issue with this solution is:

- we don't know the return type
- we don't have any type safety when passing parameters

We can solve both of these issues with
[TypeScript generics](https://www.typescriptlang.org/docs/handbook/2/generics.html).

## Using generics

TypeScript generics allow us to write type-safe code that infers type
information from the context in which it's used. They're often referred to as
variables for types.

In this scenario, we'll use a generic to represent the callback function that's
passed in. That way, we can derive the return type and the parameter type based
on the function passed in.

We'll start with the final code and break it down piece by piece.

### Final code

```ts
function idle<T extends (...args: Parameters<T>) => ReturnType<T>>(
	cb: T,
	...args: Parameters<T>
): Promise<ReturnType<T>> {
	return new Promise((resolve) => {
		window.requestIdleCallback(() => {
			resolve(cb(...args));
		});
	});
}
```

We define the generic type with
`<T extends (...args: Parameters<T>) => ReturnType<T>>`.

This constrains `cb`'s type to a function so we get an error if we pass in
anything else.

We then use that type variable to annotate the callback parameter `cb: T`.

Once we have the generic, we define `args`'s type using the
[`Parameters<Type>` type utility](https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype):
`...args: Parameters<T>`

Next, we annotate the return type with the
[`ReturnType<Type>` type utility](https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype):
`Promise<ReturnType<T>>`

Now, we get type errors if we pass incorrect parameters:

```ts
function double(num: number) {
	return num * 2;
}

const foo = await idle(double, 2); // correct
const bar = await idle(double, '2'); // Error! Argument of type `string` is not assignable to parameter of type `number`.
```

We also get the correct return type. If we hover over `foo`, we see it's type is
`number`.
