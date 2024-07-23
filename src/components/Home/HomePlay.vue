<template>
  <div class="home-play">
    <div class="home-play__info border-orange shadow-orange bg-bg">
      <div class="home-play__arrow flex-center bg-h-grey" @click="changeLvl(-1)"><VIcon :name="'angle-left'" /></div>
      <div class="home-play__lvl bg-h-grey" @click="updateOptionalPanel('Stages')">
        <div class="home-play__lvl-current">Уровень: {{ Stages.lvl.value }} | Этап: {{ Stages.stage.value }}</div>
        <div class="home-play__lvl-info lvlinfo">
          <div v-if="Stages.isAccess.value">Максимум: <br />{{ Stages.waves.value }} волн</div>
          <div v-else>Всего волн: <br />{{ Stages.user_access.value }} волн</div>
          <div v-if="Stages.isAccess.value">Заходы: <br />{{ Stages.entries.value }} заходов</div>
          <div v-else>Необходимо волн: <br />{{ Stages.access.value }} волн</div>
        </div>
      </div>
      <div class="home-play__arrow flex-center bg-h-grey" @click="changeLvl(1)"><VIcon :name="'angle-right'" /></div>
    </div>
    <router-link
      v-if="Stages.isAccess.value"
      :to="{ name: 'Game' }"
      class="home-play__btn border-blue shadow-blue bg-bg bg-h-blue flex-center"
    >
      Начать игру
    </router-link>
    <div v-else class="home-play__btn border-red shadow-red bg-bg bg-h-red flex-center">Нет доступа</div>
  </div>
</template>

<script setup lang="ts">
  import Stages from '@/mechanics/stages';

  function changeLvl(inc: -1 | 1): void {
    Stages.changeLvl(inc);
  }

  import { inject } from 'vue';
  import { TOptionalPanel } from '@/types/optional';
  const { updateOptionalPanel } = inject('optionalPanel', { updateOptionalPanel: (_newOption: TOptionalPanel) => {} });
</script>

<style lang="scss">
  .home-play {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 3rem;
    transform: translate(-50%, -50%);
    & > div,
    & > a {
      width: 28vw;
      height: 10dvh;
      margin-bottom: 1dvh;
      cursor: pointer;
    }
    &__info {
      display: flex;
    }
    &__btn {
      text-align: center;
      text-transform: uppercase;
    }
    &__arrow {
      width: calc(25% / 2);
    }
    &__lvl {
      width: 75%;
      &-current {
        margin-bottom: 1dvh;
        font-size: 1.8rem;
        text-align: center;
      }
    }
  }
  .lvlinfo {
    display: flex;
    font-size: 1.1rem;
    & > div {
      width: 50%;
      text-align: center;
    }
  }
</style>
