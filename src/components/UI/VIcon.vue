<template>
  <Icomoon :iconSet="iconSet" v-bind="props" :size="'1em'" :color="color ? `var(--col-${color})` : ''" />
</template>

<script setup lang="ts">
  import { Icomoon } from 'vue-icomoon';
  import iconSet from '@/assets/selection.json';
  interface Props {
    name: string;
    color?: string;
  }
  const props = defineProps<Props>();
</script>
