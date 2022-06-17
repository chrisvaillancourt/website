# Solid cheatsheet

## Components

Components are stateless and act as a factory function for DOM elements and
reactive primitives. Since components are factories, they only run once.

## Reactivity

There are three reactive primitives, all use the observer pattern:

1. Signals
2. Memos
3. Effects

- No VDOM used
- Reactive dependencies are auto tracked when referenced in Effects and JSX code
- Reactive primitives are factory functions that (usually) return a tuple
  - the first is a readable primitive and the second is a setter
- signals are the simplest primitive

  ```js
  const [count, setCount] = createSignal(0);
  ```

- Effects are functions that wrap reads of a signal and re-execute whenever a dependent signal's value changes

  - useful for side effects

  ```js
  console.log("The latest count is", count()));
  ```

- Memos are cached computed values

  - they automatically track their dependencies, and re-run when their dependencies change
  - they're trackable signals too

  ```js
  const fullName = createMemo(() => `${firstName()} ${lastName()}`);
  ```

## JSX Props

- Components can access properties passed in to them with a `props` argument
  - Don't destructure the props of a component—this breaks the reactivity system
- Props looks like an object but it's actually reactive, similar to `signal`
- Since function components are only executed once, we can't depend on the reactivity system to track props changes in this example:

  ```js
  const BasicComponent = (props) => {
    const value = props.value || "default";

    return <div>{value}</div>;
  };
  ```

- If we passed in a reactive value to `value=...`, the component wouldn't work as expected because the statement `const value = props.value || "default";` only runs once when the component is first initialized
- Instead, we need to do the reactive parts

  - in the JSX

  ```js
  const BasicComponent = (props) => {
    return <div>{props.value || "default"}</div>;
  };
  ```

  - in a `createMemo`

  ```js
  const BasicComponent = (props) => {
    const value = createMemo(() => props.value || "default");

    return <div>{value()}</div>;
  };
  ```

  - `createEffect`
  - Function expression

  ```js
  const BasicComponent = (props) => {
    const value = () => props.value || "default";

    return <div>{value()}</div>;
  };
  ```

  - with `mergeProps` helper

  ```js
  const BasicComponent = (props) => {
    props = mergeProps({ value: "default" }, props);

    return <div>{props.value}</div>;
  };
  ```

### Prop helpers

```js
// default props
props = mergeProps({ name: "Smith" }, props);
// clone props
const newProps = mergeProps(props);
// merge props
props = mergeProps(props, otherProps);
// split props into multiple props objects
const [local, others] = splitProps(props, ["className"])
<div {...others} className={cx(local.className, theme.component)} />

```

## Children

```js
// single child
const Label = (props) => <div class="label">Hi, { props.children }</div>

<Label><span>Josie</span></Label>

// multi child
const List = (props) => <div>{props.children}</div>;

<List>
  <div>First</div>
  {state.expression}
  <Label>Judith</Label>
</List>

// map children
const List = (props) => <ul>
  <For each={props.children}>{item => <li>{item}</li>}</For>
</ul>;

// modify and map children using helper
const List = (props) => {
  // children helper memoizes value and resolves all intermediate reactivity
  const memo = children(() => props.children);
  createEffect(() => {
    const children = memo();
    children.forEach((c) => c.classList.add("list-child"))
  })
  return <ul>
    <For each={memo()}>{item => <li>{item}</li>}</For>
  </ul>;
```

- Children are treated like dynamic reactive expressions so they are lazily evaluated on `prop` access
  - Be careful of accessing them multiple times or destructuring

## Server Side

## Derived signals

```js
function Counter() {
  const [count, setCount] = createSignal(0);
  function countDoubled() {
    // a derived signal
    return count() * 2;
  }
  setInterval(() => setCount(count() + 1), 1000);
  return <div>Count doubled: {countDoubled()}</div>;
}
```

## Control flow

### Show

```js
import { render } from "solid-js/web";
import { createSignal, Show } from "solid-js";

function App() {
  const [loggedIn, setLoggedIn] = createSignal(false);
  const toggle = () => setLoggedIn(!loggedIn());
  return (
    <Show when={loggedIn()} fallback={<button onClick={toggle}>Log in</button>}>
      <button onClick={toggle}>Log out</button>
    </Show>
  );
}
```

### For

```js
import { render } from "solid-js/web";
import { createSignal, For } from "solid-js";

function App() {
  const [cats, setCats] = createSignal([
    { id: "J---aiyznGQ", name: "Keyboard Cat" },
    { id: "z_AbfPXTKms", name: "Maru" },
    { id: "OUtn3pvWmpg", name: "Henri The Existential Cat" },
  ]);

  return (
    <ul>
      <For each={cats()}>
        {(cat, i) => (
          <li>
            <a
              target="_blank"
              href={`https://www.youtube.com/watch?v=${cat.id}`}
            >
              {i() + 1}: {cat.name}
            </a>
          </li>
        )}
      </For>
    </ul>
  );
}
```

### Index

May incur fewer rerenders than a `<For>...</For>` component. The `<For>`
component uses referential equality to compare elements with the state of the
array. If using `<For>` with primitive values or arrays of arrays. General rule
of thumb is to use `<Index>` when working with primitives. Each rendered node corresponds to a spot in the array. Whenever the data in that spot changes, the signal will update.

`<For>` cares about each piece of data in your array, and the position of that data can change; `<Index>` cares about each index in your array, and the content at each index can change.

```js
import { render } from "solid-js/web";
import { createSignal, Index } from "solid-js";

function App() {
  const [cats, setCats] = createSignal([
    { id: "J---aiyznGQ", name: "Keyboard Cat" },
    { id: "z_AbfPXTKms", name: "Maru" },
    { id: "OUtn3pvWmpg", name: "Henri The Existential Cat" },
  ]);

  return (
    <ul>
      <Index each={cats()}>
        {(cat, i) => (
          <li>
            <a
              target="_blank"
              href={`https://www.youtube.com/watch?v=${cat().id}`}
            >
              {i + 1}: {cat().name}
            </a>
          </li>
        )}
      </Index>
    </ul>
  );
}
```

### Switch

Useful for situations with >2 conditional outcomes.

```js
import { render } from "solid-js/web";
import { createSignal, Show, Switch, Match } from "solid-js";

function App() {
  const [x] = createSignal(17);

  return (
    <Switch fallback={<p>{x()} is between 5 and 10</p>}>
      <Match when={x() < 5}>
        <p>{x()} is less than 5</p>
      </Match>
      <Match when={x() > 10}>
        <p>{x()} is greater than 10</p>
      </Match>
    </Switch>
  );
}
```

### Dynamic components

Use to render a component based on dynamic data.

```js
import { render, Dynamic } from "solid-js/web";
import { createSignal, Switch, Match, For } from "solid-js";

const RedThing = () => <strong style="color: red">Red Thing</strong>;
const GreenThing = () => <strong style="color: green">Green Thing</strong>;
const BlueThing = () => <strong style="color: blue">Blue Thing</strong>;

const options = {
  red: RedThing,
  green: GreenThing,
  blue: BlueThing,
};

function App() {
  const [selected, setSelected] = createSignal("red");

  return (
    <>
      <select
        value={selected()}
        onInput={(e) => setSelected(e.currentTarget.value)}
      >
        <For each={Object.keys(options)}>
          {(color) => <option value={color}>{color}</option>}
        </For>
      </select>
      <Dynamic component={options[selected()]} />
    </>
  );
}
```

### Portal component

Allows inserting an element outside of the normal flow.

### Error Boundary

Prevents the whole app from crashing;. Will catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed

```js
import { render } from "solid-js/web";
import { ErrorBoundary } from "solid-js";

const Broken = (props) => {
  throw new Error("Oh No");
  return <>Never Getting Here</>;
};

function App() {
  return (
    <>
      <div>Before</div>
      <ErrorBoundary fallback={(err) => err}>
        <Broken />
      </ErrorBoundary>
      <div>After</div>
    </>
  );
}
```

## Lifecycle Methods

### `onMount`

An alias for a `createEffect` that doesn't track its dependencies and runs once, after the initial render completes.

Will only run on the client in a SSR app.

```js
import { render } from "solid-js/web";
import { createSignal, onMount, For } from "solid-js";
import "./styles.css";

function App() {
  const [photos, setPhotos] = createSignal([]);
  onMount(() =>
    fetch(`https://jsonplaceholder.typicode.com/photos?_limit=20`)
      .then((res) => res.json())
      .then((jsonData) => setPhotos(jsonData))
      .catch((err) => console.error("There was an error loading photos: ", err))
  );

  return (
    <>
      <h1>Photo album</h1>

      <div class="photos">
        <For each={photos()} fallback={<p>Loading...</p>}>
          {(photo) => (
            <figure>
              <img src={photo.thumbnailUrl} alt={photo.title} />
              <figcaption>{photo.title}</figcaption>
            </figure>
          )}
        </For>
      </div>
    </>
  );
}
```

### `onCleanup`

Can call in any scope; will run when the scope is discarded.

```js
import { render } from "solid-js/web";
import { createSignal, onCleanup } from "solid-js";

function Counter() {
  const [count, setCount] = createSignal(0);

  const timer = setInterval(() => setCount(count() + 1), 1000);
  onCleanup(() => clearInterval(timer));
  return <div>Count: {count()}</div>;
}
```

## Events

- Prefixed with `on`.
- Only bound once, when the component function runs
- Automatically delegated to the document
- Use the array syntax to call the handler with arguments without creating extra closures

```js
const handler = (data, event) => console.log('...')

<button onClick={[handler, data]}>Click Me</button>
```

- All event names need to be case insensitive which means event names need to be lowercase
- Use `on:` namespace to match event handlers that follows the colon:

  ```js
  <button on:DOMContentLoaded={() => console.log("...")}>Click Me</button>
  ```

## Bindings

### Style

- Accepts strings or objects
- Object form takes dash-case (i.e. `background-color` instead of `backgroundColor`) and requires explicit units (i.e. `500px` vs `500`)
- Enables setting CSS variables:

  ```js
  <div style={{ "--my-custom-color": themeColor() }} />
  ```

```js
import { render } from "solid-js/web";
import { createSignal } from "solid-js";

function App() {
  const [num, setNum] = createSignal(0);
  setInterval(() => setNum((num() + 1) % 255), 30);

  return (
    <div
      style={{
        color: `rgb(${num()}, 180, ${num()})`,
        "font-weight": 800,
        "font-size": `${num()}px`,
      }}
    >
      Some Text
    </div>
  );
}
```

### ClassList

- Solid supports `class` and `className` to set a class on an element.
- solid has a built-in `classList` JSX attribute to conditionally set classes
  - Takes an object where the key is a class name and value is the boolean expression.
  - truthy expressions add the class, falsey remove it

```js
import { createSignal } from "solid-js";
import "./style.css";

function App() {
  const [current, setCurrent] = createSignal("foo");

  return (
    <>
      <button
        classList={{ selected: current() === "foo" }}
        onClick={() => setCurrent("foo")}
      >
        foo
      </button>
      <button
        classList={{ selected: current() === "bar" }}
        onClick={() => setCurrent("bar")}
      >
        bar
      </button>
      <button
        classList={{ selected: current() === "baz" }}
        onClick={() => setCurrent("baz")}
      >
        baz
      </button>
    </>
  );
}
```

### Refs

- You can get a reference to a DOM element through assignment (JSX creates actual DOM elements) with `const myDiv = <div>My Element</div>;`
- However, putting all JSX in a single, contiguous JSX template allows Solid to optimize element creation
- Use the `ref` attribute to get a reference to an element
  - happen at creation time before they're attached to the DOM

```js
let myDiv;

<div ref={myDiv}>My Element</div>;
```

- ref can also take a callback function
  - good for encapsulating logic that doesnt need to wait until the elements are attached

`<div ref={el => { // do stuff with element}}>`

### Forwarding refs

- Allows exposing a ref inside a component to a parent
- Use the same on a component as a native element--can pass it a variable to be assigned to or a callback fn.

### Spreads

Useful for spreading an object of props on a component.

```js
import Info from "./info";

const pkg = {
  name: "solid-js",
  version: 1,
  speed: "⚡️",
  website: "https://solidjs.com",
};

function App() {
  return <Info {...pkg} />;
}
```

## Props

## Props

## Stores

## Reactivity

## Async
