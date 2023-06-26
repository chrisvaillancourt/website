---
title: Unwrapping Astro Components
description:
  Remove unnecessary wrapper elements with Astro's built-in `<Fragment>`
  component
publishDate: 06-23-2023
tags: ['Astro', 'HTML']
draft: true
---

## TLDR

Astro's `<Fragment>` component removes unnecessary wrapper components when using
component slots.

```html
<div class="card">
	<span class="text-xl font-bold sm:text-2xl">
		<slot name="title" />
	</span>
</div>
```

### Without a Fragment

```html
<Card>
  <span slot="title">The Title</span>
</Card
```

Randers the following HTML:

```html
<div class="card">
	<span class="text-xl font-bold sm:text-2xl">
		<span>The Title</span>
	</span>
</div>
```

### With a Fragment

```html
<Card>
	<Fragment slot="title">Chris Vaillancourt</Fragment>
</Card>
```

Randers the following HTML:

```html
<div class="card">
	<span class="text-xl font-bold sm:text-2xl"> The Title </span>
</div>
```
