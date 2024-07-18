<template>
  <div
    v-for="pack in Packs.packs.value"
    :key="pack.id"
    class="kit"
    :style="{
      top: `${pack.y}px`,
      left: `${pack.x}px`,
      width: `${pack.size}px`,
      height: `${pack.size}px`,
      transform: `translate(-50%, -50%) rotate(${pack.rotate}deg)`,
    }"
  >
    <VIcon v-if="pack.type === 'Kit'" :name="'aid'" :color="'basic'" />
    <VIcon v-if="pack.type === 'Deposit'" :name="'deposit'" :color="'green'" />
  </div>
</template>

<script setup lang="ts">
  import Packs from '@/entities/packs';
</script>

<style lang="scss">
  .kit {
    position: absolute;
    z-index: 1;
    font-size: 3dvh;
  }
</style>
