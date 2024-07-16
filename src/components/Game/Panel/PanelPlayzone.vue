<template>
  <div class="game__playzone">
    <div class="game__playzone-option frame-orange"></div>
    <div class="game__playzone-center frame-blue"></div>
    <div class="game__playzone-option frame-turq"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
  .game__playzone {
    position: absolute;
    top: 9dvh;
    left: 0;
    display: flex;
    gap: 1dvh;
    width: 100vw;
    height: 86dvh;
    padding: 0.5dvh 1dvh;
    & > div {
      outline: 1dvh solid $col-black;
    }
    &-option {
      width: 30%;
      height: 100%;
    }
    &-center {
      flex: 1;
      height: 100%;
    }
  }
</style>
