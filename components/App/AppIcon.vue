<script setup lang="ts">
import { uid } from '~/lib/uid';

const props = withDefaults(
  defineProps<{
    width?: string | number;
    height?: string | number;
    name: string;
    path: string;
    color?: string;
  }>(),
  {
    width: 24,
    height: 24,
    color: 'currentColor',
  },
);

const id = `${props.name}-${uid()}`;
</script>

<template>
  <svg
    class="svg"
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 24 24"
    :aria-labelledby="name"
    role="presentation"
  >
    <title :id="id" lang="en">{{ name }} icon</title>
    <g :fill="color">
      <!-- TODO refactor to use default slot and not path prop -->
      <path :d="path"></path>
    </g>
  </svg>
</template>

<style scoped>
.svg {
  /* display: inline-block; */
  vertical-align: baseline;
  margin-bottom: -2px;
}
</style>
