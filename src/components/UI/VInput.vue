<template>
  <input :type="type" :placeholder="placeholder" v-model="modelValue" ref="input" />
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';

  interface Props {
    type?: string;
    placeholder: string;
  }

  const modelValue = defineModel<string>();
  withDefaults(defineProps<Props>(), { type: 'text' });

  const input = ref<HTMLInputElement | null>(null);

  function focus() {
    input.value?.focus();
  }

  defineExpose({ focus });

  function escapeInput({ key }: KeyboardEvent) {
    if (key === 'Escape') input.value?.blur();
  }

  onMounted(() => {
    input.value?.addEventListener('keydown', escapeInput);
  });

  onUnmounted(() => {
    input.value?.removeEventListener('keypress', escapeInput);
  });
</script>

<style lang="scss">
  input {
    width: 100%;
    height: 5dvh;
    padding: 1dvh;
    color: $col-white;
    background: transparent;
    border: none;
    outline: none;
    &::placeholder {
      color: $col-grey-l;
      opacity: 0.9;
    }
  }
</style>
