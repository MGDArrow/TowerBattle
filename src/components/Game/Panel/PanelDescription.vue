<template>
  <div
    class="game__description bg-bg border-turq flex-center"
    v-if="isDescription"
    :style="{ height: descriptionHeight }"
  >
    {{ description }}
  </div>
</template>

<script setup lang="ts">
  import { computed, ComputedRef } from 'vue';
  import Updates from '@/mechanics/updates';

  interface Props {
    description: string | ComputedRef<string>;
  }
  const props = defineProps<Props>();

  const isDescription = computed(() => props.description !== '');
  const descriptionHeight = computed(() =>
    Updates.updates['defence'].groups['kit'].updates['percent'].lvl_max > 0 ? '9.3dvh' : '7.9dvh',
  );
</script>

<style lang="scss">
  .game__description {
    position: fixed;
    top: 5.7dvh;
    left: 50%;
    width: calc(50% - 5.5dvh);
    height: 9.3dvh;
    padding: 0 5dvh;
    text-align: center;
    transform: translateX(-50%);
  }
</style>
