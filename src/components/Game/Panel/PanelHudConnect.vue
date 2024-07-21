<template>
  <div class="hud__left-connect color-grey-l">
    <div>FPS: {{ Settings.fps_now }}</div>
    <div>PING: -- ms</div>
    <div>enemies: {{ Enemies.enemies.value.length }}</div>
  </div>
</template>

<script setup lang="ts">
  import Settings from '@/logic/settings';
  import Enemies from '@/entities/enemies';
</script>
