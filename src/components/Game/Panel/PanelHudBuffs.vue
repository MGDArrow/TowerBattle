<template>
  <div class="hud__top-buffs">
    <div
      v-if="depositBuff.isBuff"
      class="buff__deposit flex-center"
      :style="depositBuff.buffStyle"
      @mouseenter="setDescription(depositBuff.buffDesctiption)"
      @mouseleave="setDescription('')"
    >
      <div class="flex-center bg-bg">
        <VIcon :name="'deposit'" />{{ depositBuff.buffText }}<VIcon :name="'dollar'" />
      </div>
    </div>
    <div
      v-if="runawayBuff.isBuff"
      class="flex-center"
      :style="runawayBuff.buffStyle"
      @mouseenter="setDescription(runawayBuff.buffDesctiption)"
      @mouseleave="setDescription('')"
    >
      <div class="flex-center bg-bg"><VIcon :name="'runaway'" /></div>
    </div>
    <div
      v-if="revivalBuff.isBuff"
      class="flex-center"
      :style="revivalBuff.buffStyle"
      @mouseenter="setDescription(revivalBuff.buffDesctiption)"
      @mouseleave="setDescription('')"
    >
      <div class="flex-center bg-bg"><VIcon :name="'revival'" /></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, inject, ComputedRef } from 'vue';
  import Updates from '@/mechanics/updates';
  import Tower from '@/entities/tower';
  import Packs from '@/entities/packs';
  import { MyMath } from '@/math/math';

  const { setDescription } = inject('description', {
    setDescription: (_newDescriprion: string | ComputedRef<string>) => {},
  });

  const depositBuff = computed(() => {
    const isBuff = Updates.updates['money'].groups['deposit'].updates['cooldown'].lvl_max > 0;
    const buffProgress =
      Packs.u_deposit.value / (Updates.updates['money'].groups['deposit'].updates['cooldown'].count / 100);

    const buffStyle = {
      background: `conic-gradient(var(--col-green) ${buffProgress}%, var(--col-grey) 0%)`,
    };

    const depositCount = computed(() =>
      Math.min(
        Tower.dollars.value * Updates.updates['money'].groups['deposit'].updates['percent'].count,
        Updates.updates['money'].groups['deposit'].updates['max'].count,
      ),
    );
    const depositMax = computed(() => Updates.updates['money'].groups['deposit'].updates['max'].count);

    const buffText = `${MyMath.toText(depositCount.value)} / ${MyMath.toText(depositMax.value)}`;

    const depositTime = computed(() =>
      Math.min(Packs.u_deposit.value, Updates.updates['money'].groups['deposit'].updates['cooldown'].count),
    );
    const buffDesctiption = computed(
      () =>
        `Депозит: ${MyMath.toText(depositCount.value)}$ из доступных ${MyMath.toText(depositMax.value)}$ через ${MyMath.toTime(depositTime.value)}`,
    );
    return { isBuff, buffStyle, buffText, buffDesctiption };
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

    const runawayTime = computed(() => Tower.u_runaway.value);
    const buffDesctiption = computed(() => `Беглый огонь: ${MyMath.toTime(runawayTime.value)}`);
    return { isBuff, buffStyle, buffDesctiption };
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

    const revivalTime = computed(() => Tower.u_revival.value);
    const buffDesctiption = computed(() => `Защита возрождения: ${MyMath.toTime(revivalTime.value)}`);
    return { isBuff, buffStyle, buffDesctiption };
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
    padding: 0 !important;
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
