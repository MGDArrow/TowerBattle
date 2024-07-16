<template>
  <div class="app-game">
    <div class="game__base"></div>
    <div class="game__panel">
      <PanelValuta />
      <PanelLvlbar />
      <PanelPlayzone />
      <PanelOptions />
    </div>
  </div>
</template>

<script setup lang="ts">
  import PanelValuta from '@/components/Game/Panel/PanelValuta.vue';
  import PanelLvlbar from '@/components/Game/Panel/PanelLvlbar.vue';
  import PanelPlayzone from '@/components/Game/Panel/PanelPlayzone.vue';
  import PanelOptions from '@/components/Game/Panel/PanelOptions.vue';
</script>

<style lang="scss">
  .app-game {
    width: 100vw;
    height: 100dvh;
  }
  .game {
    &__base {
      position: absolute;
      width: 100%;
      height: 100%;

      // background: red;
    }
    &__panel {
      position: relative;
    }
  }
</style>
