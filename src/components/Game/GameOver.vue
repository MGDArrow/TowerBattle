<template>
  <VPopup v-model="wantEndGame">
    <h1>Завершить игру?</h1>
    <div class="game__end-groupe">
      <VButton class="bg-bg bg-h-blue border-blue shadow-blue" @click="endGame()">Да</VButton>
      <VButton class="bg-bg bg-h-red border-red shadow-red" @click="wantEndGame = false">Нет</VButton>
    </div>
  </VPopup>
  <VPopup v-model="isEndGame" :haveClose="false">
    <h1>Игра завершена</h1>
    <div class="game__end-statistic">
      <div>
        <span class="color-blue">Уровень:</span><span>{{ Settings.lvl }}</span>
      </div>
      <div><span class="color-blue">Заходов:</span><span>—</span></div>
      <div>
        <span class="color-blue">Волны:</span><span>{{ Wave.wave }}</span>
      </div>
      <div><span class="color-blue">Луший результат:</span><span>—</span></div>
      <div>
        <span class="color-blue">Всего убито:</span><span>{{ Statistic.statistic.value.kill_enemies.count }}</span>
      </div>
      <div>
        <span class="color-blue">Полученно монет:</span
        ><span
          >{{ Statistic.statistic.value.coins_enemies.count }} / {{ Statistic.statistic.value.coins_waves.count }}</span
        >
      </div>
    </div>
    <div class="game__end-groupe">
      <VButton class="bg-bg bg-h-blue border-blue shadow-blue" @click="repeatGame()">Повторить попытку</VButton>
      <router-link :to="{ name: 'Home' }"
        ><VButton class="bg-bg bg-h-purple border-purple shadow-purple">В меню</VButton></router-link
      >
    </div>
  </VPopup>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  import Settings from '@/logic/settings';
  import Game from '@/logic/game';
  import Statistic from '@/services/statistic';
  import Wave from '@/entities/wave';

  const wantEndGame = defineModel<boolean>();
  const emit = defineEmits();

  const isEndGame = ref(false);

  const isTowerDied = computed(() => Settings.gameOver.value);

  watch(isTowerDied, (newVal) => {
    if (newVal) endGame();
  });

  function endGame() {
    wantEndGame.value = false;
    isEndGame.value = true;
    Settings.endGame();
  }

  function repeatGame() {
    isEndGame.value = false;
    Settings.gameOver.value = false;
    clearInterval(Game.fpsMetter);
    Game.initGame();
  }
</script>

<style lang="scss">
  .game__end {
    &-groupe {
      display: flex;
      gap: 2dvh;
      width: 100%;
      margin-top: 2dvh;
      & > * {
        width: 50%;
      }
    }
    &-statistic {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5dvh 2dvh;
      font-size: 1.3rem;
      & div {
        display: flex;
        justify-content: space-between;
        width: calc(50% - 1dvh);
      }
      & span {
        display: block;
        height: 100%;
      }
    }
  }
</style>
