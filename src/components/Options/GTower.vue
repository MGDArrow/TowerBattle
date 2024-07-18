<template>
  <div class="options__tower frame-blue shadow-h-blue bg-bg">
    <h1 class="bg-blue">Башня</h1>
    <div class="options__tower-body scroll-blue">Башня</div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
  .options__tower {
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
