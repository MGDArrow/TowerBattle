<template>
  <div class="game__pause" v-if="Settings.game_spead.value === 0">
    <div class="game__pause-bg bg-black"></div>
    <div class="game__pause-text position-center">
      <VIcon :name="'pause'" />
      <span>Игра на паузе</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Settings from '@/logic/settings';
</script>

<style lang="scss">
  .game__pause {
    width: 100%;
    height: 100%;
    &-bg {
      width: 100%;
      height: 100%;
      opacity: 0.9;
    }
    &-text {
      font-size: 4rem;
      text-align: center;
      text-transform: uppercase;
      & > * {
        display: block;
      }
    }
  }
</style>
