<template>
  <div
    v-for="bullet in Bullets.bullets.value"
    :key="bullet.id"
    class="bullet"
    :style="{
      top: `${bullet.y}px`,
      left: `${bullet.x}px`,
      width: `${bullet.size}px`,
      height: `${bullet.size * 4}px`,
      transform: `translate(-50%, -50%) rotate(${bullet.rotate}deg)`,
    }"
  />
</template>

<script setup lang="ts">
  import Bullets from '@/entities/bullets';
</script>

<style lang="scss">
  .bullet {
    position: absolute;
    z-index: 1;
    background: linear-gradient(to bottom, $col-blue -150%, rgb(255 255 255 / 1%) 100%);
    &::after {
      position: relative;
      left: 50%;
      display: block;
      width: 100%;
      height: calc(100% / 4);
      border: 0.3dvh solid $col-white;
      border-radius: 100%;
      transform: translate(-50%, -50%);
      content: ' ';
    }
  }
</style>
