<template>
  <div
    v-for="enemy in Enemies.enemies.value"
    :key="enemy.id"
    class="enemy"
    :class="{
      enemy__normal: enemy.name === 'Обычный',
      enemy__quick: enemy.name === 'Быстрый',
      enemy__tank: enemy.name === 'Танк',
      enemy__shooter: enemy.name === 'Стрелок',
      enemy__boss: enemy.name === 'Босс',
    }"
    :style="{
      width: `${enemy.size}px`,
      height: `${enemy.size}px`,
      top: `${enemy.y}px`,
      left: `${enemy.x}px`,
      transform: `translate(-50%, -50%) rotate(${enemy.rotate}deg)`,
    }"
  />
</template>

<script setup lang="ts">
  import Enemies from '@/entities/enemies';
</script>

<style lang="scss">
  .enemy {
    position: absolute;
    z-index: 1;
    border-radius: 35%;
    transition: 0.05s ease-in-out;
    &__normal {
      border: 0.3dvh solid $col-orange;
    }
    &__quick {
      border: 0.3dvh solid $col-turq;
    }
    &__tank {
      border: 0.4dvh solid $col-yellow;
    }
    &__shooter {
      border: 0.3dvh solid $col-white;
      &::after,
      &::before {
        position: absolute;
        bottom: -1dvh;
        width: 50%;
        height: 50%;
        background: $col-white;
        border-radius: 35%;
        content: ' ';
      }
      &::after {
        left: -0.5dvh;
      }
      &::before {
        right: -0.5dvh;
      }
    }
    &__boss {
      border: 0.5dvh solid $col-purple;
      border-radius: 35%;
    }
  }
</style>
