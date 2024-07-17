<template>
  <div class="updates__tabs">
    <div
      v-for="(upd, index) in updates"
      :key="upd.color"
      :class="[`flex-center bg-${upd.color} shadow-${upd.color}`]"
      @click.stop="emit('setTab', index.toString())"
    >
      <VIcon :name="upd.icon" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import Updates from '@/mechanics/updates';

  const emit = defineEmits<{
    setTab: [value: string];
  }>();

  const updates = computed(() => Updates.updates);
</script>

<style lang="scss">
  .updates__tabs {
    display: flex;
    flex-direction: column;
    gap: 1dvh;
    width: 3dvh;
    margin-right: 1dvh;
    cursor: pointer;
    & > div {
      flex: 1;
      font-size: 1.3rem;
    }
  }
</style>
