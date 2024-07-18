<template>
  <div class="app-game">
    <div class="game__base"></div>
    <div class="game__panel">
      <PanelValuta />
      <PanelLvlbar />
      <PanelPlayzone />
      <PanelOptions />
    </div>
  </div>
</template>

<script setup lang="ts">
  import PanelValuta from '@/components/Game/Panel/PanelValuta.vue';
  import PanelLvlbar from '@/components/Game/Panel/PanelLvlbar.vue';
  import PanelPlayzone from '@/components/Game/Panel/PanelPlayzone.vue';
  import PanelOptions from '@/components/Game/Panel/PanelOptions.vue';

  import Settings from '@/logic/settings';
  import Game from '@/logic/game';
  import Updates from '@/mechanics/updates';

  import { onBeforeMount, onUnmounted } from 'vue';

  // const info = ref(false);
  // const description = ref(false);
  // const popup = ref(false);
  // const go = computed(() => Settings.gameOver.value);
  const game = Game;

  onBeforeMount(() => {
    game.initGame();
    document.addEventListener('visibilitychange', pauseDocumentHidden);
  });

  onUnmounted(() => {
    gameOver();
    Updates.resetUpdates();
    clearInterval(game.fpsMetter);
    document.removeEventListener('visibilitychange', pauseDocumentHidden);
  });

  function pauseDocumentHidden() {
    if (document.hidden && Settings.game_spead.value !== 0) {
      Settings.gameSpeadPause();
    }
  }

  function gameOver() {
    Settings.endGame();
  }

  // function repeatGame() {
  //   popup.value = false;
  //   Settings.gameOver.value = false;
  //   clearInterval(game.fpsMetter);
  //   game.initGame();
  // }
</script>

<style lang="scss">
  .app-game {
    width: 100vw;
    height: 100dvh;
  }
  .game {
    &__base {
      position: absolute;
      width: 100%;
      height: 100%;

      // background: red;
    }
    &__panel {
      position: relative;
    }
  }
</style>
