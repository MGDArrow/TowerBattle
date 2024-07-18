<template>
  <div class="options__enemies frame-red shadow-h-red bg-bg">
    <h1 class="bg-red">Враги</h1>
    <div class="options__enemies-body scroll-red">Враги</div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
  .options__enemies {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    &-body {
      flex: 1;
      padding: 1dvh;
      font-size: 1.5rem;
    }
  }
</style>
