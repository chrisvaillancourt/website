<script setup lang="ts">
const links = new Set([
  {
    to: "/",
    text: "Home",
  },
  {
    to: "/posts",
    text: "Posts",
  },
  {
    to: "/about",
    text: "About",
  },
  {
    to: "/contact",
    text: "Contact",
  },
]);
</script>

<template>
  <nav>
    <NuxtLink v-for="{ to, text } in links" :key="text" :to="to">
      {{ text }}
    </NuxtLink>
  </nav>
</template>

<style module></style>
