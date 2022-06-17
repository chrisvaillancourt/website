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
