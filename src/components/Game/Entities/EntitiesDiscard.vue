<template>
  <div
    v-for="discard in DiscardWaves.discardWaves.value"
    :key="discard.id"
    class="discard"
    :style="{
      top: `${discard.y}px`,
      left: `${discard.x}px`,
      width: `${discard.size}px`,
      height: `${discard.size}px`,
    }"
  />
</template>

<script setup lang="ts">
  import DiscardWaves from '@/entities/discardWaves';
</script>

<style lang="scss">
  .discard {
    position: absolute;
    z-index: 4;
    border: 0.5dvh solid $col-turq;
    border-radius: 50%;
    box-shadow:
      0 0 0.3dvh 0.1dvh $col-turq,
      inset 0 0 0.3dvh 0.1dvh $col-turq;
    transform: translate(-50%, -50%);
  }
</style>
