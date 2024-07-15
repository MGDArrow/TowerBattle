<template>
  <div class="menu-player">
    <div class="menu-player__info">
      <div class="menu-player__info-ava"></div>
      <div class="menu-player__info-user">
        <div class="menu-player__info-username">{{ User.username }}</div>
        <div class="menu-player__info-userlvl">Уровень {{ userLvl.lvl }}</div>
        <div class="menu-player__info-userexp" :style="{ background: expBar }">{{ userExp }}</div>
      </div>
    </div>
    <div class="menu-player__valuta">
      <span class="color-yellow">{{ MyMath.toText(User.valuta.value.coins) }} <VIcon :name="'coins'" /></span>
      <span class="color-turq">{{ User.valuta.value.diamonds }} <VIcon :name="'diamond'" /></span>
      <span class="color-purple">{{ User.valuta.value.ultimates }} <VIcon :name="'ultimate'" /></span>
      <span class="color-blue">{{ User.valuta.value.tickets }} <VIcon :name="'ticket'" /></span>
      <span class="color-orange">{{ User.valuta.value.awards }} <VIcon :name="'award'" /></span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import User from '@/logic/user';
  import { MyMath } from '@/math/math';
  import { computed } from 'vue';

  const userLvl = computed(() => User.lvl.value);
  const userExp = computed(() => {
    return `${MyMath.toText(userLvl.value.exp_lvl)} / ${MyMath.toText(userLvl.value.exp_next)} (${MyMath.round(userLvl.value.percent)}%)`;
  });
  const expBar = computed(
    () => `linear-gradient(to right, var(--col-purple) ${userLvl.value.percent}%, var(--col-bg) 0%)`,
  );
</script>

<style lang="scss">
  .menu-player {
    &__info {
      display: flex;
      margin-bottom: 1dvh;
      font-size: 1.2rem;
      &-ava {
        width: 10dvh;
        height: 10dvh;
        background: $col-purple;
      }
      &-user {
        flex-grow: 1;
        margin-left: 1dvh;
      }
      &-username {
        font-size: 1.5em;
      }
      &-userlvl {
        font-size: 1rem;
      }
      &-userexp {
        margin-top: 1dvh;
        font-size: 1rem;
        text-align: center;
        outline: 0.3dvh solid $col-purple;
        outline-offset: 0.3dvh;
      }
    }
    &__valuta {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      font-size: 1.2rem;
      & > span {
        display: block;
        width: calc(100% / 3);
        text-align: center;
      }
    }
  }
</style>
