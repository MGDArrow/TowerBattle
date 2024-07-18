<template>
  <div
    v-for="ball in Balls.balls.value"
    :key="ball.id"
    class="ball"
    :style="{
      top: `${ball.y}px`,
      left: `${ball.x}px`,
      width: `${ball.size}px`,
      height: `${ball.size}px`,
    }"
  />
</template>

<script setup lang="ts">
  import Balls from '@/entities/balls';
</script>

<style lang="scss">
  .ball {
    position: absolute;
    z-index: 1;
    background: $col-white;
    border: 0.5dvh solid $col-turq;
    border-radius: 50%;
    box-shadow: 0 0 1dvh 0 $col-turq;
    transform: translate(-50%, -50%);
  }
</style>
