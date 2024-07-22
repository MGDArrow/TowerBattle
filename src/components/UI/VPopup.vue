<template>
  <transition name="popup">
    <div v-if="modelValue" class="popup">
      <div class="popup__bg bg-black" @click="closePopup()" />
      <div class="popup__content bg-bg border-blue shadow-blue position-center">
        <div
          v-if="haveClose"
          class="popup__close bg-grey color-white bg-h-blue shadow-h-blue flex-center"
          @click="closePopup()"
        >
          <VIcon :name="'xmark'" />
        </div>
        <div>
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
  interface Props {
    haveClose?: boolean;
  }
  const modelValue = defineModel<boolean>();
  const props = withDefaults(defineProps<Props>(), { haveClose: true });
  const emit = defineEmits<{
    'update:modelValue': [value: boolean];
  }>();

  function closePopup() {
    if (props.haveClose) emit('update:modelValue', false);
  }
</script>

<style lang="scss">
  .popup {
    position: fixed;
    z-index: 999;
    width: 100vw;
    height: 100dvh;
    &__bg {
      width: 100%;
      height: 100%;
      opacity: 0.9;
    }
    &__content {
      min-width: 50vw;
      max-width: 60vw;
      max-height: 90dvh;
      padding: 2dvh 3dvh;
      & h1 {
        font-size: 2.5rem;
      }
    }
    &__close {
      position: absolute;
      top: 0.5dvh;
      right: 0.5dvh;
      width: 1.5dvw;
      height: 1.5dvw;
      cursor: pointer;
    }
  }
  .popup-enter-active,
  .popup-leave-active {
    transition: opacity 0.2s ease-in-out;
  }
  .popup-enter-from,
  .popup-leave-to {
    opacity: 0;
  }
</style>
