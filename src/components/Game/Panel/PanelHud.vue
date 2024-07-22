<template>
  <div class="game__hud position-center">
    <div class="hud__top">
      <PanelHudHP />
      <PanelHudBoss />
      <PanelHudBuffs />
    </div>
    <div class="hud__left">
      <PanelHudConnect />
      <PanelHudMessages />
    </div>
    <!-- <div class="hud__right color-grey-l"></div> -->
    <div class="hud__bottom">
      <PanelHudTower />
      <PanelHudEnemies />
    </div>
  </div>
</template>

<script setup lang="ts">
  import PanelHudTower from '@/components/Game/Panel/PanelHudTower.vue';
  import PanelHudEnemies from '@/components/Game/Panel/PanelHudEnemies.vue';
  import PanelHudHP from '@/components/Game/Panel/PanelHudHP.vue';
  import PanelHudBoss from '@/components/Game/Panel/PanelHudBoss.vue';
  import PanelHudConnect from '@/components/Game/Panel/PanelHudConnect.vue';
  import PanelHudMessages from '@/components/Game/Panel/PanelHudMessages.vue';
  import PanelHudBuffs from '@/components/Game/Panel/PanelHudBuffs.vue';
</script>

<style lang="scss">
  .game__hud {
    top: 50%;
    width: calc(50% - 5.5dvh);
    height: calc(88.5dvh);
  }
  .hud {
    &__top {
      position: absolute;
      top: 0;
      display: flex;
      flex-wrap: wrap;
      gap: 0.5dvh;
      width: 100%;
      font-weight: 800;
      text-transform: uppercase;
      & > div {
        display: flex;
        flex-grow: 1;
        flex-wrap: wrap;
        justify-content: space-around;
        width: 0;
        height: max-content;
        max-height: 10dvh;
        padding: 0.5dvh;
        cursor: pointer;
      }
      &-bar {
        width: 100%;
        height: 4dvh;
        margin: 0.5dvh 0;
        padding: 0.3dvh;
        font-size: 1.3rem;
        & > div {
          height: 100%;
        }
      }
      &-stat {
        justify-content: space-around;
        width: 100%;
        height: calc(25% - 0.25dvh);
        font-size: 0.7rem;
      }
    }
    &__left {
      position: absolute;
      top: 50%;
      left: 0;
      width: 10vw;
      height: 50%;
      text-transform: uppercase;
      transform: translateY(-50%);
      &-connect {
        font-size: 0.9rem;
      }
      &-messages {
        & > div {
          width: 100%;
          transition: all 0.3s;
        }
      }
    }
    &__right {
      position: absolute;
      top: 50%;
      right: 0;
      width: 10vw;
      height: 50%;
      transform: translateY(-50%);
    }
    &__bottom {
      position: absolute;
      bottom: 0;
      display: flex;
      gap: 0.5dvh;
      width: 100%;
      font-weight: 800;
      text-transform: uppercase;
      & > div {
        display: flex;
        flex: 1;
        flex-wrap: wrap;
        justify-content: space-around;
        height: 10dvh;
        padding: 0.5dvh;
        cursor: pointer;
      }
      &-stat {
        height: 30%;
        font-size: 0.8rem;
        & > svg {
          margin-right: 0.2dvh;
        }
      }
      &-bar {
        width: 100%;
        padding: 0.2dvh;
        & > div {
          height: 100%;
        }
      }
    }
  }
</style>
