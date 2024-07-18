<template>
  <div class="game__panel">
    <PanelValuta />
    <PanelLvlbar />
    <PanelPlayzone />
    <PanelOptions />
  </div>
</template>

<script setup lang="ts">
  import PanelValuta from '@/components/Game/Panel/PanelValuta.vue';
  import PanelLvlbar from '@/components/Game/Panel/PanelLvlbar.vue';
  import PanelPlayzone from '@/components/Game/Panel/PanelPlayzone.vue';
  import PanelOptions from '@/components/Game/Panel/PanelOptions.vue';
</script>

<style lang="scss">
  .game__panel {
    position: absolute;
    z-index: 98;
  }
</style>
