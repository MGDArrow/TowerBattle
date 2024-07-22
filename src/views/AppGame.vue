<template>
  <div class="app-game">
    <GameBase />
    <GamePanel @endGame="wantEndGame = true" />
    <GameOver v-model="wantEndGame" />
    <GameCongratulation />
  </div>
</template>

<script setup lang="ts">
  import GameBase from '@/components/Game/GameBase.vue';
  import GameCongratulation from '@/components/Game/GameCongratulation.vue';
  import GameOver from '@/components/Game/GameOver.vue';
  import GamePanel from '@/components/Game/GamePanel.vue';
  import { ref } from 'vue';

  const wantEndGame = ref(false);
</script>

<style lang="scss">
  .app-game {
    width: 100vw;
    height: 100dvh;
  }
</style>
