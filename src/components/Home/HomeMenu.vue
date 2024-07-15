<template>
  <div class="home-menu">
    <div class="home-menu__player bg-bg border-purple shadow-purple">
      <HomePlayer />
    </div>
    <div class="border-turq shadow-turq bg-bg bg-h-turq flex-center"><VIcon :name="'community'" />Сообщество</div>
    <div class="border-yellow shadow-yellow bg-bg bg-h-yellow flex-center"><VIcon :name="'shop'" />Магазин</div>
    <div class="border-green shadow-green bg-bg bg-h-green flex-center"><VIcon :name="'medal'" />События</div>
    <div class="border-orange shadow-orange bg-bg bg-h-orange flex-center"><VIcon :name="'book'" />Правила игры</div>
    <div class="border-blue shadow-blue bg-bg bg-h-blue flex-center"><VIcon :name="'gear'" />Настройки</div>
  </div>
</template>

<script setup lang="ts">
  import HomePlayer from '@/components/Home/HomePlayer.vue';
</script>

<style lang="scss">
  .home-menu {
    position: relative;
    z-index: 10;
    width: 20vw;
    padding: 1dvh;
    & > div {
      margin-bottom: 1dvh;
      padding: 1dvh;
      font-size: 1.8rem;
      cursor: pointer;
      & > svg {
        margin-right: 1dvh;
      }
    }
  }
</style>
