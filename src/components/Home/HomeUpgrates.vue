<template>
  <div class="home-upgrates">
    <div class="border-orange bg-bg bg-h-orange shadow-orange flex-center" @click="updateOptionalPanel('Updates')">
      <VIcon :name="'tools'" />
    </div>
    <div class="border-turq bg-bg bg-h-turq shadow-turq flex-center" @click="updateOptionalPanel('Cards')">
      <VIcon :name="'cards'" />
    </div>
    <div class="border-red bg-bg bg-h-red shadow-red flex-center" @click="updateOptionalPanel('Mods')">
      <VIcon :name="'mod'" />
    </div>
    <div class="border-purple bg-bg bg-h-purple shadow-purple flex-center" @click="updateOptionalPanel('Ultimates')">
      <VIcon :name="'ultimate'" />
    </div>
    <div class="border-blue bg-bg bg-h-blue shadow-blue flex-center" @click="updateOptionalPanel('Lab')">
      <VIcon :name="'lab'" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { inject } from 'vue';
  import { TOptionalPanel } from '@/types/optional';
  const { updateOptionalPanel } = inject('optionalPanel', { updateOptionalPanel: (_newOption: TOptionalPanel) => {} });
</script>

<style lang="scss">
  .home-upgrates {
    position: absolute;
    bottom: 1dvh;
    left: 50%;
    display: flex;
    gap: 2dvh;
    justify-content: space-around;
    width: 50vw;
    transform: translateX(-50%);
    & > div {
      flex: 1;
      height: 32dvh;
      font-size: 9rem;
      cursor: pointer;
    }
  }
</style>
