<template>
  <div class="game__valuta">
    <div class="flex-center bg-bg border-green bg-h-green shadow-h-green">100 <VIcon :name="'dollar'" /></div>
    <div class="flex-center bg-bg border-yellow bg-h-yellow shadow-h-yellow">100 <VIcon :name="'coins'" /></div>
    <div class="flex-center bg-bg border-turq bg-h-turq shadow-h-turq">100 <VIcon :name="'diamond'" /></div>
    <div class="flex-center bg-bg border-purple bg-h-purple shadow-h-purple">100 <VIcon :name="'ultimate'" /></div>
    <div class="flex-center bg-bg border-blue bg-h-blue shadow-h-blue">100 <VIcon :name="'ticket'" /></div>
    <div class="flex-center bg-bg border-orange bg-h-orange shadow-h-orange">100 <VIcon :name="'award'" /></div>
    <div class="flex-center bg-red border-red shadow-h-red" style="cursor: pointer"><VIcon :name="'door'" /></div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
  .game__valuta {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    gap: 1dvh;
    width: 100vw;
    height: 5dvh;
    padding: 0.5dvh 1dvh;
    background: $col-black;
    & > div {
      flex: 1;
      font-size: 1.5rem;
      & > svg {
        margin-left: 1dvh;
      }
    }
  }
</style>
