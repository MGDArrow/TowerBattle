<template>
  <div
    v-for="mine in Mines.mines.value"
    :key="mine.id"
    class="mine"
    :style="{
      top: `${mine.y}px`,
      left: `${mine.x}px`,
      width: `${mine.size}px`,
      height: `${mine.size}px`,
      background: `conic-gradient(var(--col-purple) ${mine.time_progress}%, var(--col-bg-focus) 0%)`,
    }"
  />
</template>

<script setup lang="ts">
  import Mines from '@/entities/mines';
</script>

<style lang="scss">
  .mine {
    position: absolute;
    z-index: 1;
    border-radius: 50%;
    box-shadow: 0 0 1dvh 0 $col-turq;
    transform: translate(-50%, -50%);
    &::before {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 70%;
      height: 70%;
      background: $col-bg;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      content: ' ';
    }
    &::after {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 30%;
      height: 30%;
      background: $col-purple;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      content: ' ';
    }
  }
</style>
