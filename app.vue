<script setup lang="ts">
useHead({
  title: "Christopher Vaillancourt",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  charset: "utf-8",
  meta: [
    {
      name: "description",
      content: "Christopher Vaillancourt's personal website.",
    },
  ],
});
</script>

<template>
  <div>
    <NuxtLayout>
      <AppNav />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
@import "open-props/normalize";
@import "open-props/style";

:root {
  --link-visited: var(--link); /* use consistent link style */
}

body {
  font-family: var(--font-sans);
}

a[href],
a[href]:visited {
  color: var(--link);
  text-decoration-color: var(--link);
}
</style>
