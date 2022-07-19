<script setup lang="ts">
useHead({
  title: 'Christopher Vaillancourt',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  charset: 'utf-8',
  meta: [
    {
      name: 'description',
      content: "Christopher Vaillancourt's personal website.",
    },
  ],
  link: [
    {
      rel: 'icon',
      href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🐢</text></svg>',
    },
    // TODO is shortcut icon needed?
    // {
    //   rel: "shortcut icon",
    //   type: "image/ico",
    //   href: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🐢</text></svg>",
    // },
  ],
});
</script>

<template>
  <div>
    <!-- theme toggle needs to be first to apply theme styles -->
    <AppThemeToggle />
    <div class="content">
      <AppNav class="app-nav" />
      <NuxtPage />
    </div>
  </div>
</template>

<style scoped>
.content {
  padding-block-start: var(--content-padding-block-start);
}
</style>
