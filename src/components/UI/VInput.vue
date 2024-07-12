<template>
  <input :type="type" :placeholder="placeholder" v-model="modelValue" />
</template>

<script setup lang="ts">
  interface Props {
    type?: string;
    placeholder: string;
  }

  const modelValue = defineModel<string>();
  withDefaults(defineProps<Props>(), { type: 'text' });
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
