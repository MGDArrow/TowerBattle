<template>
  <div class="game__description bg-bg border-turq flex-center" v-if="isDescription">
    {{ descriptionText }}
  </div>
</template>

<script setup lang="ts">
  import { computed, ComputedRef } from 'vue';
  import { IUpdate } from '@/types/updates';

  interface Props {
    description: string | ComputedRef<string> | IUpdate;
  }
  const props = defineProps<Props>();

  const isDescription = computed(() => props.description !== '');

  const descriptionText = computed(() => {
    if (props.description?.description) return props.description?.description;
    return props.description;
  });
</script>

<style lang="scss">
  .game__description {
    position: fixed;
    bottom: 16dvh;
    left: 50%;
    max-width: calc(50% - 5.5dvh);
    min-height: 7.9dvh;
    max-height: 9.3dvh;
    padding: 0 5dvh;
    text-align: center;
    transform: translateX(-50%);
  }
</style>
