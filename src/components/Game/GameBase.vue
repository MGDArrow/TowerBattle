<template>
  <div class="game__base">
    <EntitiesPerimeter />
    <EntitiesWall />
    <EntitiesMine />
    <EntitiesBall />
    <EntitiesBullet />
    <EntitiesSlug />
    <EntitiesTower />
    <EntitiesEnemy />
    <EntitiesPack />
    <EntitiesParticles v-for="(particle, index) in Particles.particles.value" :key="index" :particle="particle" />
    <EntitiesDiscard />
  </div>
</template>

<script setup lang="ts">
  import EntitiesPerimeter from '@/components/Game/Entities/EntitiesPerimeter.vue';
  import EntitiesWall from '@/components/Game/Entities/EntitiesWall.vue';
  import EntitiesMine from '@/components/Game/Entities/EntitiesMine.vue';
  import EntitiesBall from '@/components/Game/Entities/EntitiesBall.vue';
  import EntitiesBullet from '@/components/Game/Entities/EntitiesBullet.vue';
  import EntitiesSlug from '@/components/Game/Entities/EntitiesSlug.vue';
  import EntitiesTower from '@/components/Game/Entities/EntitiesTower.vue';
  import EntitiesEnemy from '@/components/Game/Entities/EntitiesEnemy.vue';
  import EntitiesPack from '@/components/Game/Entities/EntitiesPack.vue';
  import EntitiesParticles from '@/components/Game/Entities/EntitiesParticles.vue';
  import EntitiesDiscard from '@/components/Game/Entities/EntitiesDiscard.vue';

  import Particles from '@/entities/particles';
  import Settings from '@/logic/settings';
  import Game from '@/logic/game';
  import Updates from '@/mechanics/updates';

  import { onBeforeMount, onUnmounted } from 'vue';

  onBeforeMount(() => {
    Game.initGame();
    document.addEventListener('visibilitychange', pauseDocumentHidden);
  });

  onUnmounted(() => {
    gameOver();
    Updates.resetUpdates();
    clearInterval(Game.fpsMetter);
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
</script>

<style lang="scss">
  .game__base {
    position: absolute;
    width: 100vw;
    height: 100dvh;
    overflow: hidden;
  }
</style>
