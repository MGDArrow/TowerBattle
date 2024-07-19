<template>
  <div
    v-for="slug in Sluges.sluges.value"
    :key="slug.target"
    class="slug"
    :style="{
      top: `${slug.y}px`,
      left: `${slug.x}px`,
      width: `${slug.size}px`,
      height: `${slug.size * 3}px`,
      transform: `translate(-50%, -50%) rotate(${slug.rotate}deg)`,
    }"
  />
</template>

<script setup lang="ts">
  import Sluges from '@/entities/sluges';
</script>

<style lang="scss">
  .slug {
    position: absolute;
    z-index: 1;
    background: linear-gradient(to bottom, $col-orange -150%, rgb(255 255 255 / 1%) 100%);
    &::after {
      position: relative;
      left: 50%;
      display: block;
      width: 100%;
      height: calc(100% / 3);
      border: 0.3dvh solid $col-orange;
      border-radius: 100%;
      transform: translate(-50%, -50%);
      content: ' ';
    }
  }
</style>
