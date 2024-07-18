<template>
  <div
    id="tower"
    :style="{
      top: `${Tower.y}px`,
      left: `${Tower.x}px`,
      width: `${Tower.size}px`,
      height: `${Tower.size}px`,
    }"
  />
</template>

<script setup lang="ts">
  import Tower from '@/entities/tower';
</script>

<style lang="scss">
  #tower {
    position: absolute;
    z-index: 5;
    background: $col-black;
    border: 0.6dvh solid $col-blue;
    border-radius: 100%;
    box-shadow: 0 0 1.2dvh 0.3dvh $col-blue;
    transform: translate(-50%, -50%);
  }
</style>
