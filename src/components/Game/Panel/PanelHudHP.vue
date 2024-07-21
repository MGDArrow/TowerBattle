<template>
  <div class="bg-bg border-grey border-h-blue shadow-h-blue">
    <div class="hud__top-stat flex-center" :style="guardBar">{{ guardCount.guardText }}</div>
    <div class="hud__top-bar" :class="`border-${hpBarColor}`">
      <div class="flex-center" :style="hpBar">{{ hpCount.hpText }}</div>
    </div>
    <div class="hud__top-stat flex-center" v-if="kitCount.isKits" :style="KitBar">
      {{ kitCount.kitText }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { MyMath } from '@/math/math';
  import Wall from '@/entities/wall';
  import Tower from '@/entities/tower';
  import Updates from '@/mechanics/updates';
  import Wave from '@/entities/wave';

  const hpCount = computed(() => {
    const isWall = Wall.status.value === 'ready';
    let hpNow = isWall ? Wall.s_hp.value : Tower.s_hp.value;
    if (hpNow < 0) hpNow = 0;
    const hpMax = isWall ? Wall.s_hp_max.value : Tower.s_hp_max.value;
    const hpPercent = (hpNow / hpMax) * 100;
    const hpText = `${MyMath.toText(hpNow)} / ${MyMath.toText(hpMax)}`;
    return { isWall, hpNow, hpMax, hpPercent, hpText };
  });

  const hpBarColor = computed(() => {
    return hpCount.value.isWall
      ? 'turq'
      : hpCount.value.hpPercent < 25
        ? 'red'
        : hpCount.value.hpPercent < 50
          ? 'orange'
          : hpCount.value.hpPercent < 75
            ? 'yellow'
            : 'green';
  });

  const hpBar = computed(() => {
    return {
      background: `linear-gradient(to right, var(--col-${hpBarColor.value}) ${hpCount.value.hpPercent}%, var(--col-bg) 0%)`,
    };
  });

  const guardCount = computed(() => {
    const isGuard = Updates.updates['defence'].groups['guard'].updates['percent'].lvl_max > 0;
    const guardAbsolut = Updates.updates['defence'].groups['guard'].updates['count'].count;
    const enemiesDamage = Wave.enemiesParams.value !== null ? Wave.enemiesParams.value.common.damage : 0;
    const guardAbsolutPercent = (guardAbsolut / enemiesDamage) * 100;
    const guardPercent = Updates.updates['defence'].groups['guard'].updates['percent'].count * 100;

    let endDamage = enemiesDamage - guardAbsolut;
    endDamage *= 1 - Updates.updates['defence'].groups['guard'].updates['percent'].count;
    if (endDamage < 0) endDamage = 0;

    let guardText = `${Updates.updates['defence'].groups['guard'].updates['count'].text} / ${Updates.updates['defence'].groups['guard'].updates['percent'].text} = ${MyMath.toText(endDamage)}`;
    if (!isGuard) guardText = `Защита откроется на ${Updates.updates['defence'].groups['guard'].lvl_access} уровне`;
    return { isGuard, guardPercent, guardAbsolutPercent, guardText };
  });

  const guardBar = computed(() => {
    const guardAbsolut = guardCount.value.guardAbsolutPercent;
    let guardPercent = guardCount.value.guardPercent / 100;
    guardPercent *= 100 - guardAbsolut;
    return guardCount.value.isGuard
      ? {
          background: `linear-gradient(to right, var(--col-blue) ${guardAbsolut}%, var(--col-black) ${guardAbsolut}%, var(--col-turq) ${guardAbsolut + 0.2}%, var(--col-turq) ${guardAbsolut + 0.2 + guardPercent}%, var(--col-bg) 0%)`,
        }
      : { background: `var(--col-bg)` };
  });

  const kitColors = ['purple', 'blue', 'turq', 'green', 'yellow', 'orange', 'red'];

  const kitCount = computed(() => {
    const isKits = Updates.updates['defence'].groups['kit'].updates['percent'].lvl_max > 0;
    const seporatorsCount = Math.ceil(Updates.updates['defence'].groups['kit'].updates['max'].count - 1);
    const kitHP = Tower.s_hp.value - Tower.s_hp_max.value;
    let kitTextCount = (kitHP / Tower.s_hp_max.value) * 100;
    if (kitTextCount < 0) kitTextCount = 0;
    kitTextCount = MyMath.round(kitTextCount, 0);
    const kitText = `${kitTextCount}%`;
    return { isKits, seporatorsCount, kitHP, kitText };
  });

  const KitBar = computed(() => {
    if (kitCount.value.kitHP <= 0)
      return {
        background: `var(--col-bg)`,
      };
    return {
      background: styleKitGenerator(kitCount.value.kitHP, kitCount.value.seporatorsCount),
    };
  });

  function styleKitGenerator(hp: number, seporators: number): string {
    let endStyle = 'linear-gradient(to right, ';
    const percentMax = 100 / seporators;
    let addPercent = 0;
    for (let c = 0; c < seporators; c++) {
      const kitPointHP = Tower.s_hp_max.value < hp ? Tower.s_hp_max.value : hp;
      hp = hp - Tower.s_hp_max.value;
      let kitPointPercent = (kitPointHP / Tower.s_hp_max.value) * percentMax + addPercent;
      addPercent += percentMax;
      if (kitPointPercent < 0) kitPointPercent = 0;
      kitPointPercent = MyMath.round(kitPointPercent);
      const color =
        c >= kitColors.length * 2 ? c - kitColors.length * 2 : c >= kitColors.length ? c - kitColors.length : c;
      const colorNext =
        c + 1 >= kitColors.length * 2
          ? c + 1 - kitColors.length * 2
          : c + 1 >= kitColors.length
            ? c + 1 - kitColors.length
            : c + 1;
      if (c === seporators - 1) {
        endStyle += `var(--col-${kitColors[color]}) ${kitPointPercent}%, var(--col-bg) 0%)`;
      } else {
        endStyle += `var(--col-${kitColors[color]}) ${kitPointPercent - 0.2}%, var(--col-bg) ${kitPointPercent - 0.2}%, var(--col-bg) ${kitPointPercent}%,  var(--col-${kitColors[colorNext]}) ${kitPointPercent}%, `;
      }
    }
    return endStyle;
  }
</script>
