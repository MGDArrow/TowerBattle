<template>
  <div class="home-play">
    <div class="home-play__info border-orange shadow-orange bg-bg">
      <div class="home-play__arrow flex-center bg-h-grey"><VIcon :name="'angle-left'" /></div>
      <div class="home-play__lvl bg-h-grey">
        <div class="home-play__lvl-current">Уровень: 30 | Этап: 10</div>
        <div class="home-play__lvl-info lvlinfo">
          <div class="lvlinfo__max">
            Максимум: <br />
            2000 волн
          </div>
          <div class="lvlinfo__entry">Заходы: <br />100 заходов</div>
        </div>
      </div>
      <div class="home-play__arrow flex-center bg-h-grey"><VIcon :name="'angle-right'" /></div>
    </div>
    <div class="home-play__btn border-blue shadow-blue bg-bg bg-h-blue flex-center">Начать игру</div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
  .home-play {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 3rem;
    transform: translate(-50%, -50%);
    & > div {
      width: 28vw;
      height: 10dvh;
      margin-bottom: 1dvh;
      cursor: pointer;
    }
    &__info {
      display: flex;
    }
    &__btn {
      text-align: center;
      text-transform: uppercase;
    }
    &__arrow {
      width: calc(25% / 2);
    }
    &__lvl {
      width: 75%;
      &-current {
        margin-bottom: 1dvh;
        font-size: 1.8rem;
        text-align: center;
      }
    }
  }
  .lvlinfo {
    display: flex;
    font-size: 1.1rem;
    & > div {
      width: 50%;
      text-align: center;
    }
  }
</style>
