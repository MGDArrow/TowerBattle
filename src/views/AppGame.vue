<template>
  <div class="app-game">
    <GameBase />
    <GamePanel />
  </div>
</template>

<script setup lang="ts">
  import GameBase from '@/components/Game/GameBase.vue';
  import GamePanel from '@/components/Game/GamePanel.vue';
</script>

<style lang="scss">
  .app-game {
    width: 100vw;
    height: 100dvh;
  }
</style>
