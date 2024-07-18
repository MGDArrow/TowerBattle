<template>
  <UUpdates v-if="options === 'Updates'" :mode="'Игра'" />
  <UCards v-if="options === 'Cards'" />
  <UMods v-if="options === 'Mods'" />
  <UUltimates v-if="options === 'Ultimates'" />
  <ULab v-if="options === 'Lab'" />
  <IPlayer v-if="options === 'Player'" />
  <ICommunity v-if="options === 'Community'" />
  <IShop v-if="options === 'Shop'" />
  <IEvents v-if="options === 'Events'" />
  <IRules v-if="options === 'Rules'" />
  <ISettings v-if="options === 'Settings'" />
  <IStages v-if="options === 'Stages'" />
  <GStatistic v-if="options === 'Statistic'" />
  <GEnemies v-if="options === 'Enemies'" />
  <GTower v-if="options === 'Tower'" />
</template>

<script setup lang="ts">
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
  import GStatistic from '@/components/Options/GStatistic.vue';
  import GEnemies from '@/components/Options/GEnemies.vue';
  import GTower from '@/components/Options/GTower.vue';

  import { TOptionalPanelGame } from '@/types/optional';

  interface Props {
    options: TOptionalPanelGame;
  }
  defineProps<Props>();
</script>
