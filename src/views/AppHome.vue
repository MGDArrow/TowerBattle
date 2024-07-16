<template>
  <div class="app-home position-center">
    <HomeMain />
    <div class="app-home__info">
      <UUpdates />
      <!-- <UCards /> -->
      <!-- <UMods /> -->
      <!-- <UUltimates /> -->
      <!-- <ULab /> -->
      <!-- <IPlayer /> -->
      <!-- <ICommunity /> -->
      <!-- <IShop /> -->
      <!-- <IEvents /> -->
      <!-- <IRules /> -->
      <!-- <ISettings /> -->
      <!-- <IStages /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
  import HomeMain from '@/components/Home/HomeMain.vue';
  import UUpdates from '@/components/Options/UUpdates.vue';
  // import UCards from '@/components/Options/UCards.vue';
  // import UMods from '@/components/Options/UMods.vue';
  // import UUltimates from '@/components/Options/UUltimates.vue';
  // import ULab from '@/components/Options/ULab.vue';
  // import IPlayer from '@/components/Options/IPlayer.vue';
  // import ICommunity from '@/components/Options/ICommunity.vue';
  // import IShop from '@/components/Options/IShop.vue';
  // import IEvents from '@/components/Options/IEvents.vue';
  // import IRules from '@/components/Options/IRules.vue';
  // import ISettings from '@/components/Options/ISettings.vue';
  // import IStages from '@/components/Options/IStages.vue';
</script>

<style lang="scss">
  .app-home {
    display: flex;
    gap: 1dvh;
    width: 100%;
    height: 100%;
    padding: 1dvh;
    &__info {
      width: 30%;
      height: 100%;
    }
  }
</style>
