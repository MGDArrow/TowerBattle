<template>
  <div class="home-background">
    <div class="home-background__perimeter bg-bg border-grey"></div>
    <div class="home-background__tower position-center bg-black shadow-blue"></div>
    <div class="home-background__title color-blue">Tower Battle</div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
  .home-background {
    position: absolute;
    top: 20dvh;
    left: 50%;
    width: 100%;
    text-align: center;
    transform: translateX(-50%);
    &__perimeter {
      position: absolute;
      left: 50%;
      width: 40vw;
      height: 40vw;
      border-radius: 50%;
      transform: translate(-50%, -50%);
    }
    &__tower {
      width: 7dvh;
      height: 7dvh;
      border: 0.9dvh solid $col-blue;
      border-radius: 100%;
    }
    &__title {
      position: absolute;
      top: -8dvh;
      left: 50%;
      font-size: 6vw;
      text-transform: uppercase;
      text-shadow: 0 0 1.2dvh $col-blue;
      transform: translate(-50%, -50%);
    }
  }
</style>
