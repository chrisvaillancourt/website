---
title: Combining TypeScript satisfies operator and const assertion
description: Use satisfies operator with const assertions to get the best of type inference, type safety, and immutability.
publishDate: 07-06-2023
tags: ['TypeScript', 'immutability']
---

## TLDR

Combine `const` assertion and the `satisfies` operator with the `as const satisfies SomeType` syntax:

```ts
type Metadata = string | number | { [key: string]: Metadata };
type Profile = Record<string, Metadata>;

const profile = {
 name: 'topher',
 age: 2,
 status: 'active',
} as const satisfies Profile;

profile.status; // ✅ type inferred as string!
profile.age = 2; // 🚫 error! age is read-only


```

## Why `satisfies`?

TypeScript added the `satisfies` operator in the [4.9 release](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator) to improve type inference and type safety. `satisfies` allows TypeScript to infer types for object's and array's while providing type safety using an explicit type.

For example, say we have the following types:

```ts
type Metadata = string | number | { [key: string]: Metadata };
type Profile = Record<string, Metadata>;
```

And an object literal representing a user profile:

```ts
const profile = {
 name: 'topher',
 age: 2,
 status: 'active',
}
```

As written, `profile`'s type is inferred which gives us great editor support and autocomplete:

```ts
profile.age; // ✅ number, great!
```

On the downside, there's no relationship between the `Profile` type and the `profile` object so we won't get type errors if the `profile` object is incompatible with `Profile` type.

## Before `satisfies`

Before TypeScript 4.9, we could type the `profile` object with:

1. an explicit annotation: `const profile: Profile = ...`
2. or a [type assertion](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions): `const profile = ... as Profile`

### Types via explicit type annotation

Adding an explicit type annotation (i.e. `const profile: Profile = ...`) helps us catch errors if the `profile` object differs from the `Profile` type:

```ts
const profile: Profile = {
  name: 'toph',
  age: 21,
  status: 'active',
  groups: [], // 🚫 error! not a member of `Profile`. Thanks TypeScript 🥰
 };
```

The downside TypeScript no longer infers types from the object literal so our type info isn't as helpful:

```ts
// exists but type is `Metadata` | `undefined` 😭
console.log(profile.status); 
```

### Types via type assertion

Another option is to use a type assertion with the `const profile = {/* ... */} as Profile` syntax:

```ts
const profile = {
  name: 'toph',
  age: 21,
  status: 'active',
 } as Profile;
```

This introduces a new problem because TypeScript assumes you know what you're doing and [treats the assertion as valid, even when it may not be](https://github.com/microsoft/TypeScript/issues/49436).

## Using `satisfies` operator

`satisfies` gives us a new way to add types:

```ts
const profile = {
 name: 'toph',
 age: 21,
 status: 'active',
} satisfies Profile;
```

While retaining inferred types:

```ts
console.log(profile.age); // ✅ number
console.log(profile.status); // ✅ string 
```

And providing type safety:

```ts
 const profile = {
  name: 'toph',
  age: 21,
  status: 'active', 
  groups: ['foo'] // 🚫 string[] is not assignable to type `Metadata`
 } satisfies Profile;
```

## `const` assertions

[TypeScript 3.4 introduced `const` assertions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions)
as a way to:

- prevent type widening
- type all object properties `readonly`
- type array's as readonly tuples

## Combining `const` assertion and `satisfies`

We can combine `const` assertions and `satisfies` using the `as const satisfies SomeType` syntax:

```ts
 const profile = {
  name: 'topher',
  age: 2,
  status: 'active',
 } as const satisfies Profile;
```

This gives us the best type inference and immutability:

```ts
console.log(profile.age); // ✅ number;
 profile.groups = ['foo']; // 🚫 string[] is not assignable to type `Metadata`
```
