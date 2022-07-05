/* eslint-disable vue/no-multiple-template-root */
<template>
  <input
    id="theme-toggle"
    class="theme-toggle"
    type="checkbox"
    name="theme-toggle"
  />
  <label for="theme-toggle" class="theme-toggle-label">
    <span class="dark-mode-hide">Dark Mode</span>
    <span class="light-mode-hide">Light Mode</span>
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
  opacity: 0.00001;
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
.theme-toggle-label:after {
  content: '✔\FE0E';
  height: 1.2rem;
  width: 1.2rem;
  margin-left: 1rem;
  border: solid 2px var(--bg-color);
  text-align: center;
  border-radius: 4px;
  color: transparent;
}
.theme-toggle:checked + .theme-toggle-label:after {
  color: var(--bg-color);
}
</style>
