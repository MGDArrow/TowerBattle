<template>
  <div class="tower-battle">
    <RouterView />
    <AppLoading />
  </div>
</template>

<script setup lang="ts">
  import AppLoading from '@/views/AppLoading.vue';
</script>
