<template>
  <div class="options__stages frame-grey-l shadow-h-grey-l bg-bg">
    <h1 class="bg-grey-l">Уровни</h1>
    <div class="stages__title">Уровень {{ Stages.lvl.value }}</div>
    <div v-if="Stages.isAccess.value" class="stages__count bg-blue border-white shadow-blue">
      Волны {{ Stages.maxWaves.value }}
      <span>{{ Stages.entries.value }} заходов</span>
    </div>
    <div v-else class="stages__count bg-red shadow-red">Волны 0</div>
    <div v-if="Stages.isAccess.value" class="options__stages-body stages scroll-grey-l">
      <div class="stages__point" v-for="(point, wave, index) in awards" :key="wave">
        <div :style="getAwardLineStyle(wave, Stages.maxWaves.value, index)"></div>
        <div
          class="flex-center bg-grey border-grey-l"
          :class="{ 'bg-blue border-white shadow-blue': wave <= Stages.maxWaves.value }"
        >
          {{ wave }}
        </div>
        <div
          class="stages__award"
          @click.stop="
            getAward(wave, Stages.maxWaves.value, point.left.count, point.left.type, userStagesAwards[wave][0], 0)
          "
        >
          <div :style="getColorAward(wave, Stages.maxWaves.value, point.left.type, userStagesAwards[wave][0])">
            <div><VIcon :name="point.left.type" /></div>
            <div>{{ point.left.count }} {{ pointAwardText(point.left.type) }}</div>
          </div>
          <div v-if="userStagesAwards[wave][0]"><VIcon :name="'check-award'" /></div>
        </div>
        <div
          class="stages__award"
          @click.stop="
            getAward(wave, Stages.maxWaves.value, point.right.count, point.right.type, userStagesAwards[wave][1], 1)
          "
        >
          <div :style="getColorAward(wave, Stages.maxWaves.value, point.right.type, userStagesAwards[wave][1])">
            <div><VIcon :name="point.right.type" /></div>
            <div>{{ point.right.count }} {{ pointAwardText(point.right.type) }}</div>
          </div>
          <div v-if="userStagesAwards[wave][1]"><VIcon :name="'check-award'" /></div>
        </div>
      </div>
    </div>
    <div v-else class="stages__access color-red">
      Для открытия этого этапа необходимо в сумме пройти:<span>{{ Stages.access.value }} волн</span> Текущее значение:
      <span>{{ Stages.user_access.value }} волн</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Stages from '@/mechanics/stages';
  import User from '@/logic/user';
  import { TStageAwardType, TStageLvlWaves } from '@/types/stages';
  import { computed } from 'vue';

  const awards = computed(() => Stages.getAwardList());
  const userStagesAwards = computed(() => Stages.getUserAwards());

  function pointAwardText(type: TStageAwardType) {
    if (type === 'coins') return 'монет';
    if (type === 'diamond') return 'алмазов';
    if (type === 'ultimate') return 'ультимейтов';
  }

  function getAwardLineStyle(wave: number, max: number, index: number) {
    if (+wave <= max) return { background: 'var(--col-blue)' };
    if (index === 0) {
      return {
        background: `linear-gradient(to bottom, var(--col-blue) ${(max / +Object.entries(awards.value)[index][0]) * 100}%, var(--col-grey) 0%)`,
      };
    }
    if (max < +Object.entries(awards.value)[index - 1][0]) return { background: 'var(--col-grey)' };

    const lastWave = +Object.entries(awards.value)[index - 1][0];
    const needWave = wave - lastWave;
    const isWave = max - lastWave;

    return {
      background: `linear-gradient(to bottom, var(--col-blue) ${(isWave / needWave) * 100}%, var(--col-grey) 0%)`,
    };
  }

  function getColorAward(wave: number, max: number, type: TStageAwardType, received: boolean) {
    let baseStyle = { color: 'var(--col-grey-l)', filter: 'none', opacity: 1, cursor: 'auto' };
    if (+wave > max) return baseStyle;
    const color = type === 'coins' ? 'yellow' : type === 'diamond' ? 'turq' : type === 'ultimate' ? 'purple' : 'white';
    baseStyle = {
      color: `var(--col-${color})`,
      filter: `drop-shadow(0 0 1.2dvh var(--col-${color}))`,
      opacity: 1,
      cursor: 'pointer',
    };
    if (received) {
      baseStyle.opacity = 0.6;
      baseStyle.cursor = 'auto';
    }
    return baseStyle;
  }

  function getAward(
    wave: TStageLvlWaves,
    max: number,
    count: number,
    type: TStageAwardType,
    received: boolean,
    side: 0 | 1,
  ) {
    if (received || max < wave) return;
    User.getStagesAward(wave, count, type, side);
  }
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
    &__access {
      padding: 1dvh;
      font-size: 1.5rem;
      text-align: center;
      & > span {
        display: block;
        margin: 1dvh;
        font-size: 2rem;
      }
    }
    &__count {
      width: 70%;
      margin: 0 auto;
      padding: 2dvh;
      font-size: 2rem;
      text-align: center;
      & > span {
        display: block;
        font-size: 1.2rem;
      }
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
          font-size: 1.2rem;
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
        & > div {
          text-align: center;
          &:first-child {
            font-size: 2.2rem;
          }
          &:nth-child(2) {
            text-align: center;
          }
        }
        &:nth-child(2) {
          position: absolute;
          top: 0.3dvh;
          right: 0.3dvh;
          color: $col-green;
          font-size: 1.7rem;
        }
      }
    }
  }
</style>
