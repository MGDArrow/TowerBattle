<template>
  <div class="updates__coef">
    <div
      v-for="(coefText, i) in coef.variables"
      :key="i"
      :class="['bg-bg border-grey-l flex-center', { 'bg-orange border-orange shadow-orange': i === coef.now }]"
      @click.stop="coef.now = i"
    >
      {{ coefText }}
    </div>

    <div class="bg-yellow shadow-yellow flex-center" @click.stop="emit('setTab', 'favorite')">
      <VIcon :name="'star'" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import Updates from '@/mechanics/updates';

  const coef = computed(() => Updates.coef.value);
  const emit = defineEmits<{
    setTab: [value: string];
  }>();
</script>

<style lang="scss">
  .updates__coef {
    display: flex;
    gap: 1dvh;
    height: 3dvh;
    margin-bottom: 1dvh;
    font-size: 1.3rem;
    & > div {
      flex: 1;
      cursor: pointer;
    }
  }
</style>
