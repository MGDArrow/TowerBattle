<template>
  <input :type="type" :placeholder="placeholder" v-model="modelValue" />
</template>

<script setup lang="ts">
  import { ModelRef } from 'vue';

  const modelValue: ModelRef<unknown, string> = defineModel();
  defineProps({
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
    },
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
