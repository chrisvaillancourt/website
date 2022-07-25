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
const viewBox = computed(() => `0 0 ${props.width} ${props.height}`);

const id = `${props.name}-${uid()}`;
</script>

<template>
  <svg
    class="svg"
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="viewBox"
    :width="width"
    :height="height"
    :aria-labelledby="id"
    role="presentation"
  >
    <title :id="id" lang="en">{{ name }} icon</title>
    <g :fill="color">
      <path :d="path"></path>
    </g>
  </svg>
</template>

<style scoped>
.svg {
  vertical-align: baseline;
}
</style>
