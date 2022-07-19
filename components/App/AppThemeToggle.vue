/* eslint-disable vue/no-multiple-template-root */
<script setup lang="ts">
import { weatherSunny, weatherNight } from '~/lib/icons';
</script>
<template>
  <input
    id="theme-toggle"
    class="theme-toggle"
    type="checkbox"
    name="theme-toggle"
  />
  <label for="theme-toggle" class="theme-toggle-label">
    <AppIcon
      class="dark-mode-hide"
      name="dark mode icon"
      :path="weatherNight"
    />
    <AppIcon
      class="light-mode-hide"
      name="light mode icon"
      :path="weatherSunny"
    />
  </label>
</template>

<style>
.theme-toggle:checked ~ * {
  --bg-color: var(--bg-color-dark);
  --color: var(--color-dark);
}
@media (prefers-color-scheme: dark) {
  .theme-toggle:checked ~ * {
    --bg-color: var(--bg-color-light);
    --color: var(--color-light);
  }
}

.light-mode-hide {
  display: none;
}
@media (prefers-color-scheme: dark) {
  .dark-mode-hide {
    display: none;
  }
}
@media (prefers-color-scheme: dark) {
  .light-mode-hide {
    display: initial;
  }
}
</style>
<style scoped>
.theme-toggle,
.theme-toggle-label {
  position: absolute;
}
.theme-toggle {
  opacity: 0;
  width: 1rem;
  height: 1rem;
}
.theme-toggle-label {
  background-color: var(--color);
  color: var(--bg-color);
  cursor: pointer;
  background: var(--color);
  color: var(--bg-color);
  padding: 1rem;
  top: var(--content-padding-block-start);
  left: 85vw;
  display: flex;
  align-items: center;
  border-radius: 6px;
  user-select: none;
}
.theme-toggle:focus + .theme-toggle-label {
  /* TODO add focus styles */
  /* outline: 2px dashed red; */
  /* outline-offset: 4px; */
}
.theme-toggle-label:active {
  transform: translateY(1px);
  /* box-shadow: 0 1px var(--bg), 0 3px var(--text); */
}
.theme-toggle:checked + .theme-toggle-label:after {
  color: var(--bg-color);
}
</style>
