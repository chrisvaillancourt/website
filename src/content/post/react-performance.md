---
title: React Performance
description: The many techniques to optimize react performance
publishDate: 01-30-2025
updatedDate: 01-31-2025
tags: ['react', 'performance']
draft: true
---

Here's a summary of common react performance techniques. Some of these aren't
specific to React.

## App level optimizations

### Lazy load components

Optimize the initial page load by lazy loading non-essential components with
[`lazy()`](https://react.dev/reference/react/lazy) and using a
[`<Suspense>`](https://react.dev/reference/react/Suspense) boundary.

### Create separate route bundles

Use a router that allows you to create separate bundles for each of your route.
Libraries like TanStack Router make
[code splitting](https://tanstack.com/router/latest/docs/framework/react/guide/code-splitting#using-the-lazytsx-suffix)
a breeze.

### Don't fetch on render

Don't fetch an external resource that's needed to render when your component is
rendering. Instead, fetch as early as possible, either at the page level or use
a full stack meta-framework that streams components from the server to the
client as resources load.

GraphQL + [Relay](https://relay.dev/) lets you write components that declare the
data they need without actually loading data in the render.

### Optimize global state

If you're using [context](https://react.dev/reference/react/createContext),
create a separate context for each logically separate piece of state. Separating
by logic keeps logically separate updates from triggering extra re-renders.

Or better yet, use a state management library like
[Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction) or
[Jotai](https://jotai.org) to get fine grained updates.

### Extract styles from the react runtime

Avoid css-in-js solutions that are calculated at runtime (looking at you
[styled-components](https://styled-components.com) and
[emotion](https://emotion.sh/docs/introduction)).

Generate css styles at build time with libraries like
[linaria](https://linaria.dev), [panda css](https://panda-css.com), or
[vanilla extract](https://vanilla-extract.style).

## Component level optimizations

To create fast components, we need to eliminate unnecessary re-renders, reduce
computations, and avoid blocking the main thread.

### Eliminate re-renders

Defining variables and functions in the render of your function may be
triggering extra renders. Define event handlers with `useCallback()`. Memoize
static data with `useMemo()` so it isn't created on every render.

### Extract components that don't use local state

Any state update causes a component re-render so we can create separate
components based on the state they care about. For example:

```jsx
function SlowApp() {
	const [color, setColor] = useState('red');

	return (
		<>
			<form>
				<label htmlFor="color-input">Set color: </label>
				<input
					value={color}
					id="color-input"
					onChange={(e) => setColor(e.target.value)}
				/>
				<p style={{ color }}>Hello, world!</p>
			</form>
			{/* ⬇ in the same scope as the color state so it re-renders whenever we call setColor() */}
			<ExpensiveTree />{' '}
		</>
	);
}
function ExpensiveTree() {
	const now = performance.now();
	while (performance.now() - now < 100) {
		// delay render by 100ms
	}
	return <p>slow component 🐌</p>;
}
```

React re-renders the entire `<SlowApp />` component every time we call
`setColor()`. We could memoize `<ExpensiveTree />` with
[`memo()`](https://react.dev/reference/react/memo) or we could separate the
component tree so their renders are independent:

```jsx
function FastApp() {
	return (
		<>
			{/* ⬇ no shared state between component trees so local state changes don't trigger re-renders 🚀*/}
			<Form />
			<ExpensiveTree />
		</>
	);
}
function ExpensiveTree() {
	const now = performance.now();
	while (performance.now() - now < 100) {
		// delay render by 100ms
	}
	return <p>slow component 🐌</p>;
}

function Form() {
	const [color, setColor] = useState('red');

	return (
		<form>
			<label htmlFor="color-input">Set color: </label>
			<input
				value={color}
				id="color-input"
				onChange={(e) => setColor(e.target.value)}
			/>
			<p style={{ color }}>Hello, world!</p>
		</form>
	);
}
```

The above only works if state is independent from the component tree. This
approach won't work if the state is used throughout the component tree. For
example, we use `color` state to style the form and the `<ExpensiveTree />`:

```jsx
function SlowApp() {
	const [color, setColor] = useState('red');

	return (
		<form style={{ color }}>
			<label htmlFor="color-input">Set color: </label>
			<input
				value={color}
				id="color-input"
				onChange={(e) => setColor(e.target.value)}
			/>
			<p style={{ color }}>Hello, world!</p>
			<ExpensiveTree /> {/* ⬅ depends on color for its style */}
		</form>
	);
}

function ExpensiveTree() {
	const now = performance.now();
	while (performance.now() - now < 100) {
		// delay render by 100ms
	}
	return <p>slow component 🐌</p>;
}
```

Instead, we can extract the logic that uses `color` to a separate component
children as props:

```tsx
function ColorPicker({ children }: { children?: ReactNode }) {
	const [color, setColor] = useState('red');
	return (
		<form style={{ color }}>
			<label htmlFor="color-input">Set color: </label>
			<input
				value={color}
				id="color-input"
				onChange={(e) => setColor(e.target.value)}
			/>
			{children}
		</form>
	);
}

function FastApp() {
	return (
		<ColorPicker>
			{/* These children stay the same between renders so react doesn't 
			re-render this part of the component treet */}
			<p>Hello, world!</p>
			<ExpensiveTree />
		</ColorPicker>
	);
}

function ExpensiveTree() {
	const now = performance.now();
	while (performance.now() - now < 100) {
		// delay render by 100ms
	}
	return <p>slow component 🐌</p>;
}
```

This works because we isolated the `color` state to `<ColorPicker>` and the
`children` prop received by `<ColorPicker>` doesn't change so react doesn't need
to re-render them.

This only works because our `<ExpensiveTree>` doesn't depend on `color` as a
prop. If it did (i.e.`<ExpensiveTree color={color} />`) then we'd need another
solution. Enter `useDeferredValue()`
