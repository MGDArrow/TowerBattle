<template>
  <div
    v-for="(mine, i) in Mines.mines.value"
    :key="i"
    class="mine flex-center shadow-purple"
    :style="{
      top: `${mine.y}px`,
      left: `${mine.x}px`,
      width: `${mine.size}px`,
      height: `${mine.size}px`,
      background: `conic-gradient(var(--col-purple) ${mine.time_progress}%, var(--col-grey) 0%)`,
    }"
  >
    <div class="bg-bg flex-center">
      <div class="bg-purple"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Mines from '@/entities/mines';
</script>

<style lang="scss">
  .mine {
    position: absolute;
    z-index: 1;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    & > div {
      width: 75%;
      height: 75%;
      border-radius: 50%;
      & > div {
        width: 60%;
        height: 60%;
        border-radius: 50%;
      }
    }
  }
</style>
