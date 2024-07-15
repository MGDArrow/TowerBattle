<template>
  <transition name="app-loading--transition">
    <div class="app-loading" v-show="percent < 100">
      <div class="app-loading__background bg-black"></div>
      <div class="app-loading__base">
        <div
          class="app-loading__perimeter position-center border-blue shadow-blue bg-bg"
          :style="{ width: perimeterSize, height: perimeterSize }"
        />
        <div
          class="app-loading__particle bg-bg shadow-blue border-blue"
          v-for="(particle, index) in Loading.particles.value"
          :key="index"
          :style="{
            top: `${particle.y}px`,
            left: `${particle.x}px`,
          }"
        />

        <div class="app-loading__tower position-center bg-blue shadow-blue" />
        <div class="app-loading__tower-hole position-center bg-black">{{ percent }}%</div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import Loading from '@/logic/loading';

  const percent = computed(() => Loading.percent.value);
  const perimeterSize = computed(() => {
    const size = ((percent.value + 10) / 100) * 65;
    return `${size}dvh`;
  });
</script>

<style lang="scss">
  .app-loading {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100vw;
    height: 100dvh;
    &__background {
      width: 100%;
      height: 100%;
    }
    &__perimeter {
      border-radius: 50%;
    }
    &__particle {
      position: absolute;
      width: 1.7dvh;
      height: 1.7dvh;
      border-radius: 50%;
      transform: translate(-50%, -50%);
    }
    &__tower {
      width: 8dvh;
      height: 8dvh;
      border-radius: 50%;
      &-hole {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 6dvh;
        height: 6dvh;
        border-radius: 50%;
      }
    }
  }
  .app-loading--transition {
    &-enter-active,
    &-leave-active {
      transition: opacity 0.7s ease;
    }
    &-enter-from,
    &-leave-to {
      opacity: 0;
    }
  }
</style>
