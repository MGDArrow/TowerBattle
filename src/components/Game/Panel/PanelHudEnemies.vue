<template>
  <div class="bg-bg border-grey border-h-red shadow-h-red">
    <div class="hud__bottom-stat flex-center"><VIcon :name="'wave'" /> Уровень: {{ Stages.lvl }}</div>
    <div class="hud__bottom-stat flex-center"><VIcon :name="'time'" /> Волна: {{ Wave.wave }}</div>
    <div class="hud__bottom-bar" :class="`border-${wavesBorder}`">
      <div class="flex-center" :style="wavesTimer">
        {{ wavesEnemiesCount }}
      </div>
    </div>
    <div class="hud__bottom-stat flex-center color-red"><VIcon :name="'hp'" /> HP: {{ wavesEnemiesParams.hp }}</div>
    <div class="hud__bottom-stat flex-center color-red">
      <VIcon :name="'axe'" /> Урон: {{ wavesEnemiesParams.damage }}
    </div>
    <div class="hud__bottom-stat flex-center color-red">
      <VIcon :name="'spead'" /> Скорость: {{ MyMath.round(wavesEnemiesParams.spead * 60, 1) }} м/с
    </div>
  </div>
</template>

<script setup lang="ts">
  import Settings from '@/logic/settings';
  import Wave from '@/entities/wave';
  import Stages from '@/mechanics/stages';
  import { MyMath } from '@/math/math';
  import { computed } from 'vue';

  const wavesBorder = computed(() => {
    if (Wave.inite.value > 0) return 'blue';
    if (Wave.long.value > 0) return 'red';
    return 'grey-l';
  });

  const wavesTimer = computed(() => {
    if (Wave.inite.value > 0) {
      return {
        background: `linear-gradient(to right, var(--col-blue) ${100 - (Wave.inite.value / Settings.waveInit) * 100}%, var(--col-bg) 0%)`,
      };
    }
    if (Wave.long.value > 0) {
      return {
        background: `linear-gradient(to right, var(--col-red) ${(Wave.long.value / Settings.waveLong) * 100}%, var(--col-bg) 0%)`,
      };
    } else {
      return {
        background: `linear-gradient(to right, var(--col-grey-l) ${100 - (Wave.delay.value / Settings.waveDelay) * 100}%, var(--col-bg) 0%)`,
      };
    }
  });

  const wavesEnemiesCount = computed(() => {
    return Wave.inite.value >= 0
      ? 'Начало игры'
      : Wave.long.value > 0
        ? `${Wave.enemiesCount.value} / ${Wave.enemiesAll.value}`
        : `Перезарядка волны`;
  });

  const wavesEnemiesParams = computed(() => {
    if (Wave.enemiesParams.value !== null) return Wave.enemiesParams.value.common;
    return { hp: 0, damage: 0, spead: 0 };
  });
</script>
