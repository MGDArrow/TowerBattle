<template>
  <div class="game__panel">
    <PanelValuta @setOptions="(e) => setOptions(e)" @endGame="emit('endGame')" />
    <PanelPlayzone :options="options" />
    <PanelOptions @setOptions="(e) => setOptions(e)" :options="options" />
    <PanelHud @setOptions="(e) => setOptions(e)" />
    <PanelDescription :description="description" />
  </div>
</template>

<script setup lang="ts">
  import PanelValuta from '@/components/Game/Panel/PanelValuta.vue';
  import PanelPlayzone from '@/components/Game/Panel/PanelPlayzone.vue';
  import PanelOptions from '@/components/Game/Panel/PanelOptions.vue';
  import PanelHud from '@/components/Game/Panel/PanelHud.vue';
  import PanelDescription from '@/components/Game/Panel/PanelDescription.vue';

  import { TOptionalGame, TOptionalPanelGame } from '@/types/optional';
  import { ComputedRef, provide, Ref, ref } from 'vue';
  import { IUpdate } from '@/types/updates';

  const emit = defineEmits<{
    endGame: [];
  }>();

  const options: Ref<TOptionalGame> = ref(['Updates', 'Statistic']);

  let optionTemp: TOptionalGame = ['', ''];

  function setOptions(option: TOptionalPanelGame): void {
    //** Башня и враги **//
    if (option === 'Tower' || options.value[0] === 'Tower') {
      if (options.value[0] !== 'Tower') {
        optionTemp = options.value;
        options.value = ['Tower', 'Enemies'];
      } else {
        options.value = optionTemp;
        optionTemp = ['', ''];
      }
      return;
    }

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

  let description: Ref<string> | Ref<ComputedRef<string>> | Ref<IUpdate> = ref('');
  function setDescription(newDescriprion: string | ComputedRef<string> | IUpdate) {
    description.value = newDescriprion;
  }
  provide('description', { setDescription });
</script>

<style lang="scss">
  .game__panel {
    position: absolute;
    z-index: 98;
    width: 100%;
    height: 100%;
  }
</style>
