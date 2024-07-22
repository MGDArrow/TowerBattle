<template>
  <div class="hud__top-buffs">
    <div v-if="depositBuff.isBuff" class="buff__deposit flex-center" :style="depositBuff.buffStyle">
      <div class="flex-center bg-bg">
        <VIcon :name="'deposit'" />{{ depositBuff.buffText }}<VIcon :name="'dollar'" />
      </div>
    </div>
    <div v-if="runawayBuff.isBuff" class="flex-center" :style="runawayBuff.buffStyle">
      <div class="flex-center bg-bg"><VIcon :name="'runaway'" /></div>
    </div>
    <div v-if="revivalBuff.isBuff" class="flex-center" :style="revivalBuff.buffStyle">
      <div class="flex-center bg-bg"><VIcon :name="'revival'" /></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import Updates from '@/mechanics/updates';
  import Tower from '@/entities/tower';
  import Packs from '@/entities/packs';
  import { MyMath } from '@/math/math';

  const depositBuff = computed(() => {
    const isBuff = Updates.updates['money'].groups['deposit'].updates['cooldown'].lvl_max > 0;
    const buffProgress =
      Packs.u_deposit.value / (Updates.updates['money'].groups['deposit'].updates['cooldown'].count / 100);
    const buffStyle = {
      background: `conic-gradient(var(--col-green) ${buffProgress}%, var(--col-grey) 0%)`,
    };
    const depositCount = Math.min(
      Tower.dollars.value * Updates.updates['money'].groups['deposit'].updates['percent'].count,
      Updates.updates['money'].groups['deposit'].updates['max'].count,
    );
    const depositMax = Updates.updates['money'].groups['deposit'].updates['max'].count;
    const buffText = `${MyMath.toText(depositCount)} / ${MyMath.toText(depositMax)}`;
    return { isBuff, buffStyle, buffText };
  });

  const runawayBuff = computed(() => {
    const buffProgress = Math.max(
      Tower.u_runaway.value / (Updates.updates['attack'].groups['runaway'].updates['duration'].count / 100),
      0,
    );
    const isBuff = buffProgress > 0;
    const buffStyle = {
      background: `conic-gradient(var(--col-red) ${buffProgress}%, var(--col-grey) 0%)`,
    };
    return { isBuff, buffStyle };
  });

  const revivalBuff = computed(() => {
    const buffProgress = Math.max(
      Tower.u_revival.value / (Updates.updates['defence'].groups['revival'].updates['duration'].count / 100),
      0,
    );
    const isBuff = buffProgress > 0;
    const buffStyle = {
      background: `conic-gradient(var(--col-blue) ${buffProgress}%, var(--col-grey) 0%)`,
    };
    return { isBuff, buffStyle };
  });
</script>

<style lang="scss">
  .hud__top-buffs {
    display: flex;
    flex-basis: 100%;
    gap: 0.5dvh;
    justify-content: start !important;
    width: 0;
    height: 3dvh;
    & > div {
      position: relative;
      width: 3dvh;
      height: 3dvh;
      font-size: 0.9rem;
      & > div {
        width: calc(100% - 0.4dvh);
        height: calc(100% - 0.4dvh);
      }
      &.buff__deposit {
        width: 20dvh;
        font-size: 0.8rem;
        & svg {
          margin-right: 0.5dvh;
        }
      }
    }
  }
</style>
