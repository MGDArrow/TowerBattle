<template>
  <div class="options__shop frame-yellow shadow-h-yellow bg-bg">
    <h1 class="bg-yellow">Магазин</h1>
    <div class="options__shop-body shop scroll-yellow">
      <div class="shop__point border-yellow bg-bg bg-h-yellow shadow-h-yellow">
        <div class="shop__count">100</div>
        <div class="shop__icon flex-center"><VIcon :name="'diamond'" /></div>
        <div class="shop__price">200 рублей</div>
      </div>
      <div class="shop__point border-yellow bg-bg bg-h-yellow shadow-h-yellow">
        <div class="shop__count">250</div>
        <div class="shop__icon flex-center"><VIcon :name="'diamond'" /></div>
        <div class="shop__price">400 рублей</div>
      </div>
      <div class="shop__point border-yellow bg-bg bg-h-yellow shadow-h-yellow">
        <div class="shop__count">500</div>
        <div class="shop__icon flex-center"><VIcon :name="'diamond'" /></div>
        <div class="shop__price">700 рублей</div>
      </div>
      <div class="shop__point border-yellow bg-bg bg-h-yellow shadow-h-yellow">
        <div class="shop__count">1000</div>
        <div class="shop__icon flex-center"><VIcon :name="'diamond'" /></div>
        <div class="shop__price">1200 рублей</div>
      </div>
      <div class="shop__point border-yellow bg-bg bg-h-yellow shadow-h-yellow">
        <div class="shop__count">2500</div>
        <div class="shop__icon flex-center"><VIcon :name="'diamond'" /></div>
        <div class="shop__price">2700 рублей</div>
      </div>
      <div class="shop__point border-yellow bg-bg bg-h-yellow shadow-h-yellow">
        <div class="shop__count">5000</div>
        <div class="shop__icon flex-center"><VIcon :name="'diamond'" /></div>
        <div class="shop__price">5000 рублей</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
  .options__shop {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    &-body {
      flex: 1;
      padding: 1dvh;
    }
  }
  .shop {
    display: flex;
    flex-wrap: wrap;
    gap: 1dvh;
    align-content: start;
    &__point {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: calc(100% / 3 - (2dvh / 3));
      height: 35dvh;
      padding: 0.5dvh;
      cursor: pointer;
    }
    &__count {
      font-size: 4rem;
      text-align: center;
    }
    &__icon {
      font-size: 8rem;
      text-align: center;
    }
    &__price {
      font-size: 1.5rem;
      text-align: center;
    }
  }
</style>
