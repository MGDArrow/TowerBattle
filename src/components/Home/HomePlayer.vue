<template>
  <div class="menu-player">
    <div class="menu-player__info">
      <div class="menu-player__info-ava"></div>
      <div class="menu-player__info-user">
        <div class="menu-player__info-username">MGDArrow</div>
        <div class="menu-player__info-userlvl">Уровень 8</div>
        <div class="menu-player__info-userexp">10/15</div>
      </div>
    </div>
    <div class="menu-player__valuta">
      <span class="color-yellow">20 <VIcon :name="'coins'" /></span>
      <span class="color-turq">0 <VIcon :name="'diamond'" /></span>
      <span class="color-purple">0 <VIcon :name="'ultimate'" /></span>
      <span class="color-blue">0 <VIcon :name="'ticket'" /></span>
      <span class="color-orange">0 <VIcon :name="'award'" /></span>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

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
        background: $col-purple;
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
