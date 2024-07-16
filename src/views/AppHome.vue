<template>
  <div class="app-home position-center">
    <HomeMain :class="{ 'app-home__main--options': optionalPanel !== '' }" />
    <Transition name="fade">
      <div class="app-home__info" v-if="optionalPanel !== ''">
        <UUpdates v-if="optionalPanel === 'Updates'" @click="updateOptionalPanel('')" />
        <UCards v-if="optionalPanel === 'Cards'" @click="updateOptionalPanel('')" />
        <UMods v-if="optionalPanel === 'Mods'" @click="updateOptionalPanel('')" />
        <UUltimates v-if="optionalPanel === 'Ultimates'" @click="updateOptionalPanel('')" />
        <ULab v-if="optionalPanel === 'Lab'" @click="updateOptionalPanel('')" />
        <IPlayer v-if="optionalPanel === 'Player'" @click="updateOptionalPanel('')" />
        <ICommunity v-if="optionalPanel === 'Community'" @click="updateOptionalPanel('')" />
        <IShop v-if="optionalPanel === 'Shop'" @click="updateOptionalPanel('')" />
        <IEvents v-if="optionalPanel === 'Events'" @click="updateOptionalPanel('')" />
        <IRules v-if="optionalPanel === 'Rules'" @click="updateOptionalPanel('')" />
        <ISettings v-if="optionalPanel === 'Settings'" @click="updateOptionalPanel('')" />
        <IStages v-if="optionalPanel === 'Stages'" @click="updateOptionalPanel('')" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
  import HomeMain from '@/components/Home/HomeMain.vue';
  import UUpdates from '@/components/Options/UUpdates.vue';
  import UCards from '@/components/Options/UCards.vue';
  import UMods from '@/components/Options/UMods.vue';
  import UUltimates from '@/components/Options/UUltimates.vue';
  import ULab from '@/components/Options/ULab.vue';
  import IPlayer from '@/components/Options/IPlayer.vue';
  import ICommunity from '@/components/Options/ICommunity.vue';
  import IShop from '@/components/Options/IShop.vue';
  import IEvents from '@/components/Options/IEvents.vue';
  import IRules from '@/components/Options/IRules.vue';
  import ISettings from '@/components/Options/ISettings.vue';
  import IStages from '@/components/Options/IStages.vue';
  import { provide, Ref, ref } from 'vue';
  import { TOptionalPanel } from '@/types/optional';

  const optionalPanel: Ref<TOptionalPanel> = ref('');

  function updateOptionalPanel(newOption: TOptionalPanel): void {
    if (optionalPanel.value === newOption) optionalPanel.value = '';
    else optionalPanel.value = newOption;
  }

  provide('optionalPanel', { updateOptionalPanel });
</script>

<style lang="scss">
  .app-home {
    width: 100vw;
    height: 100dvh;
    padding: 1dvh;
    overflow: hidden;
    &__main--options {
      width: calc(70% - 1.5dvh);
    }
    &__info {
      position: absolute;
      top: 1dvh;
      right: 1dvh;
      width: 30%;
      height: 98dvh;
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    position: absolute;
    transition: $transition-main;
  }
  .fade-enter-from {
    right: calc(-30% + 1.3dvh);
  }
  .fade-leave-to {
    right: calc(-30% - 1.3dvh);
  }
</style>
