<template>
  <TransitionGroup name="messages" tag="div" class="hud__left-messages">
    <div v-for="message in Messages.messages.value" :key="message.id" :class="`color-${message.color}`">
      {{ message.text }} <VIcon :name="message?.icon" />
    </div>
  </TransitionGroup>
</template>

<script setup lang="ts">
  import Messages from '@/services/message';
</script>

<style lang="scss">
  .messages {
    &-move,
    &-enter-active,
    &-leave-active {
      transition: all 0.3s;
    }
    &-enter-from {
      transform: translateY(5dvh);
      opacity: 0;
    }
    &-leave-to {
      transform: translateX(-2dvh);
      opacity: 0;
    }
    &-leave-active {
      position: absolute;
    }
  }
</style>
