<template>
  <div class="bg-bg border-grey border-h-purple shadow-h-purple" v-if="bossCount.isBoss">
    <div class="hud__top-stat flex-center bg-purple">Босс</div>
    <div class="hud__top-bar border-purple">
      <div class="flex-center bg-purple" :style="bossBar">{{ bossCount.bossText }}</div>
    </div>
    <div class="hud__top-stat flex-center" v-if="bossCount.isBossStat">
      <div class="flex-center color-purple"><VIcon :name="'hp'" /> HP: {{ wavesEnemiesParams.hp }}</div>
      <div class="flex-center color-purple"><VIcon :name="'axe'" /> Урон: {{ wavesEnemiesParams.damage }}</div>
      <div class="flex-center color-purple">
        <VIcon :name="'spead'" /> Скорость: {{ MyMath.round(wavesEnemiesParams.spead * 60, 1) }} м/с
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { MyMath } from '@/math/math';
  import Wave from '@/entities/wave';
  import Enemies from '@/entities/enemies';
  import Updates from '@/mechanics/updates';

  const wavesEnemiesParams = computed(() => {
    if (Wave.enemiesParams.value !== null) return Wave.enemiesParams.value.boss;
    return { hp: 0, damage: 0, spead: 0 };
  });

  const bossCount = computed(() => {
    const boss = Enemies.enemies.value.filter((enemy) => enemy.name === 'Босс')[0];
    const isBoss = !!boss;
    const bossText = `${MyMath.toText(isBoss ? boss?.s_hp : 0)} / ${MyMath.toText(isBoss ? boss?.s_hp_max : 0)}`;
    const bossPercent = (boss?.s_hp / boss?.s_hp_max) * 100;
    const isBossStat = Updates.updates['defence'].groups['kit'].updates['percent'].lvl_max > 0;
    return { isBoss, bossText, bossPercent, isBossStat };
  });

  const bossBar = computed(() => {
    return {
      background: `linear-gradient(to right, var(--col-purple) ${bossCount.value.bossPercent}%, var(--col-bg) 0%)`,
    };
  });
</script>
