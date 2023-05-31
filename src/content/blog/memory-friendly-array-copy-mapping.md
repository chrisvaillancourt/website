---
title: Memory Friendly Array mapping with `Array.from()`
summary: Improve memory efficiency when copying & mapping JavaScript arrays.
added: 9-20-22
updated: 5-31-23
tags: [TIL, JavaScript]
---

## Memory Efficiency

JavaScript's static Array method `Array.from()` has a second parameter that
allows you to efficiently map over an array as it's copied to avoid creating an
intermediate array.

```ts
const elements = document.querySelectorAll('*');
const elementClasses = Array.from(elements, getNodeClasses);

function getNodeClasses(node: Element) {
  const { classList } = node;
  return classList;
}
```

vs

```ts
const elements = document.querySelectorAll('*');
const elementClasses = [...elements].map(getNodeClasses); // creates intermediate array

function getNodeClasses(node: Element) {
  const { classList } = node;
  return classList;
}
```

## Resources

- MDN docs on
  [`Array.from()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#description)
