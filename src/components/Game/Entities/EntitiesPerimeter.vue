<template>
  <div
    id="perimeter"
    :style="[
      {
        top: `${Perimeter.y}px`,
        left: `${Perimeter.x}px`,
        width: `${Perimeter.size.value}px`,
        height: `${Perimeter.size.value}px`,
      },
      revivalBuff,
    ]"
  />
</template>

<script setup lang="ts">
  import Perimeter from '@/entities/perimeter.js';
  import Tower from '@/entities/tower';
  import { computed } from 'vue';

  const revivalBuff = computed(() => {
    if (Tower.u_revival.value > 0)
      return `box-shadow: 0 0 2dvh 0 var(--col-blue); border: 0.3dvh solid var(--col-blue);`;
    return `border: 0.3dvh solid var(--col-grey);`;
  });
</script>

<style lang="scss">
  #perimeter {
    position: absolute;
    z-index: 1;
    background: $col-bg;
    border-radius: 100%;
    transform: translate(-50%, -50%);
    transition: 0.1s ease-in-out;
  }
</style>
