<template>
  <div class="options__settings frame-blue shadow-h-blue bg-bg">
    <h1 class="bg-blue">Настройки</h1>
    <div class="options__settings-body settings">
      <div class="settings__point">
        <div class="settings__name color-blue">FPS:</div>
        <div class="settings__set">
          <span class="border-blue" :class="{ setting__act: Settings.fps.value === 30 }" @click.stop="setNewFPS(30)"
            >30</span
          >
          <span class="border-blue" :class="{ setting__act: Settings.fps.value === 60 }" @click.stop="setNewFPS(60)"
            >60</span
          >
          <span class="border-blue" :class="{ setting__act: Settings.fps.value === 120 }" @click.stop="setNewFPS(120)"
            >120</span
          >
          <span class="border-blue" :class="{ setting__act: Settings.fps.value === 144 }" @click.stop="setNewFPS(144)"
            >144</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Settings from '@/logic/settings';

  function setNewFPS(newFPS: number): void {
    Settings.fps.value = newFPS;
  }
</script>

<style lang="scss">
  .options__settings {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    &-body {
      flex: 1;
      padding: 1dvh;
    }
  }
  .settings {
    &__point {
      display: flex;
      width: 100%;
      margin: 0.8dvh 0;
      font-size: 1.5rem;
    }
    &__name {
      width: 30%;
      text-align: right;
    }
    &__set {
      display: flex;
      gap: 1dvh;
      justify-content: space-between;
      width: 70%;
      padding: 0 1dvh;
      cursor: pointer;
      & span {
        flex: 1;
        text-align: center;
        transition: $transition-main;
        &:hover,
        &.setting__act {
          background: $col-blue;
          box-shadow: $size-shadow $col-blue;
        }
      }
    }
  }
</style>
