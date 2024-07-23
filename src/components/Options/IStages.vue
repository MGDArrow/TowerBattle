<template>
  <div class="options__stages frame-grey-l shadow-h-grey-l bg-bg">
    <h1 class="bg-grey-l">Уровни</h1>
    <div class="stages__title">Уровень 10</div>
    <div class="stages__count bg-blue shadow-blue">Волны 2000</div>
    <div class="options__stages-body stages scroll-grey-l">
      <div class="stages__point">
        <div class="bg-grey"></div>
        <div class="flex-center bg-grey border-grey-l">10</div>
        <div class="stages__award">
          <div><VIcon :name="'diamond'" /></div>
          <div>50 альмазов</div>
        </div>
        <div class="stages__award">
          <div><VIcon :name="'coins'" /></div>
          <div>50 монет</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Stages from '@/mechanics/stages';
  console.log(Stages.waves.value);
</script>

<style lang="scss">
  .options__stages {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    &-body {
      flex: 1;
      padding: 1dvh;
      padding-top: 0;
    }
  }
  .stages {
    &__title {
      padding: 1dvh 0;
      font-size: 2rem;
      text-align: center;
    }
    &__count {
      width: 70%;
      margin: 0 auto;
      padding: 2dvh;
      font-size: 2rem;
      text-align: center;
    }
    &__point {
      position: relative;
      width: 100%;
      height: 15dvh;
      & > div {
        &:nth-child(1) {
          position: absolute;
          left: 50%;
          width: 3.5%;
          height: calc(100% - 5dvh);
          transform: translateX(-50%);
        }
        &:nth-child(2) {
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 35%;
          height: 5dvh;
          transform: translateX(-50%);
        }
        &:nth-child(3) {
          position: absolute;
          bottom: 0;
        }
        &:nth-child(4) {
          position: absolute;
          right: 0;
          bottom: 0;
        }
      }
    }
    &__award {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: end;
      width: 30%;
      height: 10dvh;
      & > div {
        &:first-child {
          font-size: 2.2rem;
        }
        &:last-child {
          text-align: center;
        }
      }
    }
  }
</style>
