<template>
  <div class="app-home position-center">
    <HomeMain />
    <div class="app-home__info frame-orange">2</div>
  </div>
</template>

<script setup lang="ts">
  import HomeMain from '@/components/Home/HomeMain.vue';
</script>

<style lang="scss">
  .app-home {
    display: flex;
    gap: 1dvh;
    width: calc(100% - 2dvh);
    height: calc(100% - 2dvh);
    &__info {
      width: 30%;
      height: 100%;
    }
  }
</style>
