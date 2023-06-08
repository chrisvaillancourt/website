---
title: Hacking 100vh On Mobile
summary: Fixing 100vh on mobile
added: 09-02-2022
tags: [CSS]
---

## The problem

[100vh breaks on mobile](https://chanind.github.io/javascript/2019/09/28/avoid-100vh-on-mobile-web.html).

## 99% it's 100%

One workaround is to set the height of the HTML and body to `height: 100%`:

```css
html,
body {
  height: 100%;
}
```

The problem with this is it doesn't work for external SVG's; they don't respect
% units 😓. The result: 99% of the time this does the trick.

## PostCSS 100vh

A friendly [PostCSS plugin](https://github.com/postcss/postcss-100vh-fix) fixes
this on iOS. The downside is it doesn't fix a bug in Chrome for Android.

You may need
[postcss-viewport-height-correction](https://github.com/Faisal-Manzer/postcss-viewport-height-correction)
for a more robust `100vh` fix but relying on JS for this isn't enticing.

## Native CSS solution

The CSS spec offers a solution to this with new
[large, small, and dynamic viewport units](https://www.w3.org/TR/css-values-4/#viewport-variants)
(obligatory
[CSS-Tricks post](https://css-tricks.com/the-large-small-and-dynamic-viewports/)).
Chrome still has these behind a flag so you can't depend on it
[until we see the ✅](https://developer.mozilla.org/en-US/docs/Web/CSS/length#browser_compatibility)

Syntax suggests using `100vh` ass a fallback for the new units:

```css
html,
body {
  /* fallback to 100vh if dvh isn't supported */
  height: 100vh;
  /* use dynamic viewport height if available */
  height: 100dvh;
}
```
