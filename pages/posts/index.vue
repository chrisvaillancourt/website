<script setup lang="ts">
import { logError } from '~/lib/logger';
// TODO add page level metadata with `useHead()`
const posts = ref(null);
// TODO use async data: https://content.nuxtjs.org/guide/displaying/querying#with-useasyncdata
queryContent('/posts')
  .find()
  .then((content) => {
    posts.value = content;
  })
  .catch((error) => {
    logError({ msg: 'There was an error loading all posts.', error });
  });
</script>

<template>
  <main>
    <h2>All Posts</h2>
    <ul>
      <li v-for="{ title } in posts" :key="title">{{ title }}</li>
    </ul>
  </main>
</template>

<style module></style>
