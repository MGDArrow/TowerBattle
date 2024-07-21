<template>
  <div class="game__valuta">
    <div class="flex-center bg-bg border-green bg-h-green shadow-h-green">
      {{ MyMath.toText(Tower.dollars.value) }} <VIcon :name="'dollar'" />
    </div>
    <div class="flex-center bg-bg border-yellow bg-h-yellow shadow-h-yellow">
      {{ MyMath.toText(valuta.coins) }} <VIcon :name="'coins'" />
    </div>
    <div class="flex-center bg-bg border-turq bg-h-turq shadow-h-turq">
      {{ valuta.diamonds }} <VIcon :name="'diamond'" />
    </div>
    <div class="flex-center bg-bg border-purple bg-h-purple shadow-h-purple">
      {{ valuta.ultimates }} <VIcon :name="'ultimate'" />
    </div>
    <div class="flex-center bg-bg border-blue bg-h-blue shadow-h-blue">
      {{ valuta.tickets }} <VIcon :name="'ticket'" />
    </div>
    <div class="flex-center bg-bg border-orange bg-h-orange shadow-h-orange">
      {{ valuta.awards }} <VIcon :name="'award'" />
    </div>
    <div class="game__lvlbar bg-bg border-green shadow-h-green" @click="emit('setOptions', 'Player')">
      <div class="flex-center" :style="lvlbarBar">{{ lvlbarText }}</div>
    </div>

    <div class="flex-center bg-red border-red shadow-h-red" style="cursor: pointer"><VIcon :name="'door'" /></div>
  </div>
</template>

<script setup lang="ts">
  import User from '@/logic/user';
  import { computed } from 'vue';
  import { MyMath } from '@/math/math';
  import Tower from '@/entities/tower';
  import { TOptionalPanelGame } from '@/types/optional';

  const valuta = computed(() => User.valuta.value);

  const emit = defineEmits<{
    setOptions: [value: TOptionalPanelGame];
  }>();

  const lvlbarText = computed(() => {
    return `${User.username}, уровень ${User.lvl.value.lvl} (${MyMath.toText(User.lvl.value.exp_lvl)} / ${MyMath.toText(User.lvl.value.exp_next)} — ${MyMath.toText(User.lvl.value.percent)}%)`;
  });
  const lvlbarBar = computed(() => {
    return {
      background: `linear-gradient(to right, var(--col-green) ${User.lvl.value.percent}%, var(--col-bg) 0%)`,
    };
  });
</script>

<style lang="scss">
  .game__valuta {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    gap: 1dvh;
    width: 100vw;
    height: 4dvh;
    padding: 0.5dvh 1dvh;
    background: $col-black;
    & > div {
      width: 8%;
      height: 3dvh;
      font-size: 1.2rem;
      &.game__lvlbar {
        flex: 1;
        height: 3dvh;
        padding: 0.3dvh;
        font-size: 0.75rem;
        cursor: pointer;
        & > div {
          height: 1.8dvh;
        }
      }
      & > svg {
        margin-left: 1dvh;
      }
    }
  }
</style>
