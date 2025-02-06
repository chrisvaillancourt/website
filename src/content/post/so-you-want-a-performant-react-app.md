---
title: So You Want a Performant React App?
description: A collection of techniques to optimize react performance
publishDate: 02-06-2025
tags: ['react', 'performance']
---

> Note: this is a draft post 🔨. It's a rough draft and is under active
> development

<details><summary>Meandering discussion of react</summary>
React is the most popular javascript library. The fact that it was released in
2013 and is still the
[most popular framework](https://2024.stateofjs.com/en-US/libraries/) is a
remarkable feat. Especially in the world where a new javascript framework comes
out every week.

Despite it's popularity, React has problems. Most notorious is it's runtime
performance. It's not that React isn't necessarily less performant than other
frameworks like Solid, Vue, or svelte. The problem with React is it requires
more engineering effort to make a performant app so larger React apps often run
into performance issues that aren't as problematic in other frameworks.

React historically put the effort of optimizing performance on developers. This
may be changing with the introduction of the
[React Compiler](https://react.dev/learn/react-compiler) which is a welcome
improvement. However, the react compiler doesn't solve all of React's
performance issues so we still need to keep manual performance techniques in our
toolbox.

This post is a brief overview of common techniques to creating a performant
react app.

</details>

## App Architecture

Optimizing performance starts with a well architected app. It's hard to
prescribe a good architecture in a broad sense because each app is different.
Instead of prescribing a specific architecture, there are signs we have a good
architecture:

- Fast initial loads: lazy loading components and route based code splitting
- no data loading during renders, no loading spinners as components fetch the
  data they need to render
- common page level interactions are fast, scrolling and general navigation are
  fast
- assets are easily cached
- decent
  [core web vitals](https://developer.chrome.com/docs/devtools/performance/overview#live-metrics)

### Fast initial loads

Optimize the initial page load by lazy loading non-essential components with
[`lazy()`](https://react.dev/reference/react/lazy) and using a
[`<Suspense>`](https://react.dev/reference/react/Suspense) boundary.

Routes should also be lazy loaded. libraries like TanStack Router make
[lazy loading routes](https://tanstack.com/router/latest/docs/framework/react/guide/code-splitting#using-the-lazytsx-suffix)
trivial.

### No data fetching during renders

React's component model is lovely for devs. Putting everything in a component
has a
[problem](https://bobaekang.com/blog/component-colocation-composition/#welcome-to-the-jungle)
though. Specifically, when a component needs to render, fetch, then show a
meaningful UI. This pattern causes extensive waterfalls and long loading
spinners.

An app built on this pattern hae a lifecycle like this:

1. user fetches initial HTML
1. html is parsed, fetches JavaScript assets from the server
1. app level component renders, starts fetching again (roundtrip)
1. app level component finishes render, starts rendering child components
1. a child needs more data based on the data loaded earlier, fetches more data
   from the server
1. data loads and the child component can render

Instead, move all of the data requests to the top level of the page or use a
full stack meta-framework that streams components from the server to the client
as components load the data they need.

GraphQL + [Relay](https://relay.dev/) is the best way to automatically move
requests to the top of a page while retaining the joy of writing network
requests inside a component.

### Don't overshare global state

Putting all app state in a global app
[context](https://react.dev/reference/react/createContext) will cause
unnecessary re-renders in components consuming that context. For example, if you
put app preferences and app authentication in one context, components consuming
that context will re-render whenever a preference or authentication changes.
Logically separate context's to minimize unnecessary re-renders.

Or better yet, use a state management library that provides fine grained
updates. [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction)
and [Jotai](https://jotai.org) are great choices.

### Don't use css-in-js solutions

Specifically, avoid creating styles at runtime. Libraries like
[styled-components](https://styled-components.com) and
[emotion](https://emotion.sh/docs/introduction) add unnecessary overhead to
rendering. See
[this post from an Emotion maintainer on why he's no longer using css in js solutions](https://dev.to/srmagura/why-were-breaking-up-wiht-css-in-js-4g9b).

Using css-in-js also prevents them from being cached separately meaning more
network requests to the server.

Use altnertives like [linaria](https://linaria.dev),
[panda css](https://panda-css.com), or
[vanilla extract](https://vanilla-extract.style).

## Avoid unnecessary re-renders

[See my post on this](./reducing-react-re-renders-with-memoized-references/).

### Avoid extra calculations

Reuse computations with
[`useMemo()`](https://react.dev/reference/react/useMemo). Note, `useMemo()` only
cache's one value so it will won't cache more than one result at a time.

TODO: demo custom memo hook that cache's more than one result

## When to `memo()`

- when a component re-renders many times with the same props (memo only applies
  to props changine, not internal state)
- rendering is cpu expensive
- Your app has lots of fine grained interactions

## When to not `memo()`

- wrapping a component? Accept `children` as props
- push state down when you don't need to expose/share it

### Defer UI updates

React's `useDeferredValue()` allows us to defer (delay) updates to parts of the
UI. We can use it to solve the problem in the previous example where we have a
piece of state (`color`) that's used in an expensive component. None of the
previous techniques help us because the color state can't be isolated or
memoized. Instead, `useDeferredValue()` tells react we have a piece of state
whose updates will be delayed. React will immediately update the UI when state
created with useState() is changed. Instead, updates to state with
useDeferredValue() are de-prioritized so react updates them less frequently.

```jsx
const ExpensiveTree = memo(function ExpensiveTree({ color }) {
	const now = performance.now();
	while (performance.now() - now < 100) {
		// delay render by 100ms
	}
	return <p>slow component 🐌 {color}</p>;
});

function SlowApp() {
	const [color, setColor] = useState('red');
	const deferredColor = useDeferredValue(color);

	return (
		<form style={{ color }}>
			<label htmlFor="color-input">Set color: </label>
			<input
				value={color}
				id="color-input"
				onChange={(e) => setColor(e.target.value)}
			/>
			<p style={{ color }}>Hello, world!</p>
			<ExpensiveTree color={deferredColor} />
		</form>
	);
}
```

Now, whenever we call `setColor()`, react will eventually synchronize
`deferredColor` to the same value but in a way that doesn't block the UI.
