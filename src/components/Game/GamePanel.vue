<template>
  <div class="game__panel">
    <PanelValuta @setOptions="(e) => setOptions(e)" />
    <PanelPlayzone :options="options" />
    <PanelOptions @setOptions="(e) => setOptions(e)" :options="options" />
  </div>
</template>

<script setup lang="ts">
  import PanelValuta from '@/components/Game/Panel/PanelValuta.vue';
  import PanelPlayzone from '@/components/Game/Panel/PanelPlayzone.vue';
  import PanelOptions from '@/components/Game/Panel/PanelOptions.vue';

  import { TOptionalGame, TOptionalPanelGame } from '@/types/optional';
  import { Ref, ref } from 'vue';

  const options: Ref<TOptionalGame> = ref(['Updates', 'Statistic']);

  function setOptions(option: TOptionalPanelGame): void {
    //** Отмена **//
    if (options.value[0] === option || options.value[1] === option) {
      if (options.value[0] === option) options.value[0] = '';
      if (options.value[1] === option) options.value[1] = '';
      return;
    }
    //** Заполнение **//
    if (options.value[0] === '' && options.value[1] === '') {
      options.value[0] = option;
      return;
    }
    if (options.value[0] === '' || options.value[1] === '') {
      if (options.value[0] === '' && options.value[1] !== option) options.value[0] = option;
      if (options.value[1] === '' && options.value[0] !== option) options.value[1] = option;
      return;
    }
    if (options.value[0] !== option && options.value[1] !== option) options.value[1] = option;
  }
</script>

<style lang="scss">
  .game__panel {
    position: absolute;
    z-index: 98;
  }
</style>
