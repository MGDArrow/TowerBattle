<template>
  <div class="game__valuta">
    <div class="flex-center bg-bg border-green bg-h-green shadow-h-green">
      {{ MyMath.toText(Tower.dollars.value) }} <VIcon :name="'dollar'" />
    </div>
    <div class="flex-center bg-bg border-yellow bg-h-yellow shadow-h-yellow">
      {{ MyMath.toText(valuta.coins) }} <VIcon :name="'coins'" />
    </div>
    <div class="flex-center bg-bg border-turq bg-h-turq shadow-h-turq">
      {{ valuta.diamonds }} <VIcon :name="'diamond'" />
    </div>
    <div class="flex-center bg-bg border-purple bg-h-purple shadow-h-purple">
      {{ valuta.ultimates }} <VIcon :name="'ultimate'" />
    </div>
    <div class="flex-center bg-bg border-blue bg-h-blue shadow-h-blue">
      {{ valuta.tickets }} <VIcon :name="'ticket'" />
    </div>
    <div class="flex-center bg-bg border-orange bg-h-orange shadow-h-orange">
      {{ valuta.awards }} <VIcon :name="'award'" />
    </div>
    <div class="flex-center bg-red border-red shadow-h-red" style="cursor: pointer"><VIcon :name="'door'" /></div>
  </div>
</template>

<script setup lang="ts">
  import User from '@/logic/user';
  import { computed } from 'vue';
  import { MyMath } from '@/math/math';
  import Tower from '@/entities/tower';

  const valuta = computed(() => User.valuta.value);
</script>

<style lang="scss">
  .game__valuta {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    gap: 1dvh;
    width: 100vw;
    height: 5dvh;
    padding: 0.5dvh 1dvh;
    background: $col-black;
    & > div {
      flex: 1;
      font-size: 1.5rem;
      & > svg {
        margin-left: 1dvh;
      }
    }
  }
</style>
