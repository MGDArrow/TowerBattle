<template>
  <div class="app-home__main frame-purple">
    <HomeBackground />
    <HomeMenu />
    <HomePlay />
    <HomeUpgrates />
    <HomeChat />
  </div>
</template>

<script setup lang="ts">
  import HomeBackground from '@/components/Home/HomeBackground.vue';
  import HomeMenu from '@/components/Home/HomeMenu.vue';
  import HomePlay from '@/components/Home/HomePlay.vue';
  import HomeUpgrates from '@/components/Home/HomeUpgrates.vue';
  import HomeChat from '@/components/Home/HomeChat.vue';
</script>

<style lang="scss">
  .app-home__main {
    position: relative;
    flex-grow: 1;
    height: 100%;
  }
</style>
