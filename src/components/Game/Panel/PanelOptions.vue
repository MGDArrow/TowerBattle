<template>
  <div class="game__options">
    <div class="game__options-block flex-center">
      <div class="bg-bg border-orange bg-h-orange shadow-h-orange flex-center"><VIcon :name="'tools'" /></div>
      <div class="bg-bg border-turq bg-h-turq shadow-h-turq flex-center"><VIcon :name="'cards'" /></div>
      <div class="bg-bg border-red bg-h-red shadow-h-red flex-center"><VIcon :name="'mod'" /></div>
      <div class="bg-bg border-purple bg-h-purple shadow-h-purple flex-center"><VIcon :name="'ultimate'" /></div>
      <div class="bg-bg border-blue bg-h-blue shadow-h-blue flex-center"><VIcon :name="'lab'" /></div>
    </div>
    <div class="game__options-block flex-center">
      <div class="bg-bg border-blue bg-h-blue shadow-h-blue flex-center"><VIcon :name="'play'" /></div>
      <div class="bg-bg border-blue bg-h-blue shadow-h-blue flex-center"><VIcon :name="'minus'" /></div>
      <div class="bg-bg border-blue bg-h-blue shadow-h-blue flex-center">x5</div>
      <div class="bg-bg border-blue bg-h-blue shadow-h-blue flex-center"><VIcon :name="'plus'" /></div>
      <div class="bg-bg border-blue bg-h-blue shadow-h-blue flex-center"><VIcon :name="'gear'" /></div>
    </div>
    <div class="game__options-block flex-center">
      <div class="bg-bg border-grey-l bg-h-grey-l shadow-h-grey-l flex-center"><VIcon :name="'wave'" /></div>
      <div class="bg-bg border-yellow bg-h-yellow shadow-h-yellow flex-center"><VIcon :name="'shop'" /></div>
      <div class="bg-bg border-turq bg-h-turq shadow-h-turq flex-center"><VIcon :name="'statistic'" /></div>
      <div class="bg-bg border-orange bg-h-orange shadow-h-orange flex-center"><VIcon :name="'book'" /></div>
      <div class="bg-bg border-green bg-h-green shadow-h-green flex-center"><VIcon :name="'medal'" /></div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
  .game__options {
    position: absolute;
    top: 95dvh;
    left: 0;
    display: flex;
    gap: 1dvh;
    width: 100vw;
    height: 5dvh;
    padding: 0.5dvh 1dvh;
    background: $col-black;
    &-block {
      &:nth-child(2) {
        flex: 1;
        height: 100%;
      }
      &:first-child,
      &:last-child {
        width: 30%;
        height: 100%;
      }

      gap: 1dvh;
      font-size: 1.3rem;
      & > div {
        flex: 1;
        height: 100%;
        cursor: pointer;
      }
    }
  }
</style>
