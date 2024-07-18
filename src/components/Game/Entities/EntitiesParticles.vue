<template>
  <div
    class="particle"
    :class="{
      particle__tower: particle.name === 'Башня',
      particle__kit: particle.name === 'Аптечка',
      particle__deposit: particle.name === 'Депозит',
      particle__mine: particle.name === 'Мина',
      particle__common: particle.name === 'Обычный',
      particle__quick: particle.name === 'Быстрый',
      particle__shooter: particle.name === 'Стрелок',
      particle__tank: particle.name === 'Танк',
      particle__boss: particle.name === 'Босс',
    }"
    :style="{ top: `${particle.y}px`, left: `${particle.x}px`, opacity: particle.o }"
  >
    <div v-for="pc in particle.p" :key="pc.id" class="particle-item" :style="{ top: `${pc.y}%`, left: `${pc.x}%` }" />
  </div>
</template>

<script setup>
  // eslint-disable-next-line no-unused-vars
  const props = defineProps(['particle']);
</script>

<style lang="scss">
  .particle {
    position: absolute;
    z-index: 4;
    width: 2.5dvh;
    height: 2.5dvh;
    transform: translate(-50%, -50%);
    &-item {
      position: absolute;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      content: ' ';
    }
    &__tower {
      & .particle-item {
        width: 1.2dvh;
        height: 1.2dvh;
        border: 0.3dvh solid $col-blue;
        box-shadow: 0 0 1dvh 0 $col-blue;
      }
    }
    &__kit {
      & .particle-item {
        width: 1dvh;
        height: 1dvh;
        border: 0.3dvh solid $col-blue;
      }
    }
    &__deposit {
      & .particle-item {
        width: 1dvh;
        height: 1dvh;
        border: 0.3dvh solid $col-green;
      }
    }
    &__mine {
      & .particle-item {
        width: 0.8dvh;
        height: 0.8dvh;
        border: 0.3dvh solid $col-purple;
      }
    }
    &__common {
      & .particle-item {
        width: 0.8dvh;
        height: 0.8dvh;
        border: 0.3dvh solid $col-orange;
      }
    }
    &__quick {
      & .particle-item {
        width: 0.8dvh;
        height: 0.8dvh;
        border: 0.3dvh solid $col-turq;
      }
    }
    &__shooter {
      & .particle-item {
        width: 0.8dvh;
        height: 0.8dvh;
        border: 0.3dvh solid $col-white;
      }
    }
    &__tank {
      & .particle-item {
        width: 1.2dvh;
        height: 1.2dvh;
        border: 0.3dvh solid $col-yellow;
      }
    }
    &__boss {
      & .particle-item {
        width: 1.4dvh;
        height: 1.4dvh;
        border: 0.3dvh solid $col-purple;
      }
    }
  }
</style>
