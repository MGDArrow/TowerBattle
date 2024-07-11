<template>
  <div class="v-checkbox">
    <div class="v-checkbox__label" :style="{ color: labelColor }" @click="$emit('update:modelValue', !modelValue)">
      <slot />
    </div>
    <div class="v-checkbox__box" :class="boxClasses" @click="$emit('update:modelValue', !modelValue)">
      <VIcon v-if="modelValue" :name="'check'" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  const modelValue = defineModel();
  interface Props {
    color: string;
  }
  const props = defineProps<Props>();

  const labelColor = computed<string>(() => (modelValue.value ? 'var(--col-white)' : 'var(--col-grey-l)'));
  const boxClasses = computed<string>(() =>
    modelValue.value ? `border-${props.color} bg-${props.color} shadow-${props.color}` : 'border-grey',
  );
</script>

<style lang="scss">
  .v-checkbox {
    display: flex;
    flex-direction: row-reverse;
    gap: 1dvh;
    justify-content: left;
    height: 1em;
    font-size: 1rem;
    line-height: 1rem;
    &__label {
      width: max-content;
      cursor: pointer;
      transition: $transition-main;
    }
    &__box {
      display: flex;
      height: 100%;
      font-size: 1.1em;
      cursor: pointer;
      transition: $transition-main;
      aspect-ratio: 1 / 1;
    }
  }
</style>
