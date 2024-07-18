<template>
  <div class="game__lvlbar" @click="emit('setOptions', 'Player')">
    <div class="game__lvlbar-bar flex-center" :style="lvlbarBar">{{ lvlbarText }}</div>
  </div>
</template>

<script setup lang="ts">
  import User from '@/logic/user';
  import { computed } from 'vue';
  import { MyMath } from '@/math/math';
  import { TOptionalPanelGame } from '@/types/optional';

  const emit = defineEmits<{
    setOptions: [value: TOptionalPanelGame];
  }>();

  const lvlbarText = computed(() => {
    return `${User.username}, уровень ${User.lvl.value.lvl} (${User.lvl.value.exp_lvl} / ${User.lvl.value.exp_next} — ${MyMath.toText(User.lvl.value.percent)}%)`;
  });
  const lvlbarBar = computed(() => {
    return {
      background: `linear-gradient(to right, var(--col-green) ${User.lvl.value.percent}%, var(--col-bg) 0%)`,
    };
  });
</script>

<style lang="scss">
  .game__lvlbar {
    position: absolute;
    top: 4dvh;
    left: 0;
    width: 100vw;
    height: 3.5dvh;
    padding: 1dvh 1.5dvh;
    background: $col-black;
    cursor: pointer;
    &-bar {
      height: 100%;
      font-size: 0.75rem;
      outline: 0.4dvh solid $col-green;
      outline-offset: 0.4dvh;
    }
  }
</style>
