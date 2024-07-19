<template>
  <div class="game__playzone">
    <div class="game__playzone-option shadow-h-orange" v-if="options[0] !== ''">
      <PanelPlayzoneOptions :options="options[0]" />
    </div>
    <div class="game__playzone-center frame-blue shadow-h-blue"></div>
    <div class="game__playzone-option shadow-h-turq" v-if="options[1] !== ''">
      <PanelPlayzoneOptions :options="options[1]" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { TOptionalGame } from '@/types/optional';
  import PanelPlayzoneOptions from '@/components/Game/Panel/PanelPlayzoneOptions.vue';

  interface Props {
    options: TOptionalGame;
  }
  defineProps<Props>();
</script>

<style lang="scss">
  .game__playzone {
    position: absolute;
    top: 4dvh;
    left: 0;
    display: flex;
    gap: 1dvh;
    width: 100vw;
    height: 92dvh;
    padding: 0.5dvh 1dvh;
    & > div {
      outline: 1dvh solid $col-black;
    }
    &-option {
      width: 25%;
      height: 100%;
    }
    &-center {
      flex: 1;
      height: 100%;
    }
  }
</style>
