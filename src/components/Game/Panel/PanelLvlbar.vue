<template>
  <div class="game__lvlbar">
    <div class="game__lvlbar-bar flex-center bg-green">MGDArrow, уровень 8 (5876.08 / 7480 — 79.19%)</div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
  .game__lvlbar {
    position: absolute;
    top: 5dvh;
    left: 0;
    width: 100vw;
    height: 4dvh;
    padding: 1dvh 1.5dvh;
    background: $col-black;
    &-bar {
      height: 100%;
      font-size: 0.8rem;
      outline: 0.4dvh solid $col-green;
      outline-offset: 0.4dvh;
    }
  }
</style>
