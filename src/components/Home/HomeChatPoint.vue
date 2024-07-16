<template>
  <div
    v-for="(poit, index) in Chat.chatHistory.value"
    :key="index"
    @click="getTo(poit.from)"
    class="chat__point border-purple shadow-h-purple"
    :class="{
      'chat__point--my': poit.from === User.username,
      'chat__point--continue': poit.from === Chat.chatHistory.value[index - 1]?.from,
    }"
  >
    <div class="chat__point-username">{{ poit.from }}</div>
    <div class="chat__point-message">
      <span v-if="poit.to" class="chat__point-addressee">@{{ poit.to }}</span
      >{{ poit.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import Chat from '@/logic/chat';
  import User from '@/logic/user';

  const emit = defineEmits<{
    getTo: [value: string];
  }>();

  function getTo(to: string): void {
    if (to !== User.username) emit('getTo', to);
  }
</script>

<style lang="scss">
  .chat__point {
    position: relative;
    width: 75%;
    margin-top: 1dvh;
    padding: 1dvh;
    font-size: 0.9rem;
    word-wrap: break-word;
    cursor: pointer;
    &:first-child {
      margin-top: 0;
    }
    &-username {
      margin-bottom: 0.5dvh;
      font-weight: 700;
    }
    &-message {
      font-weight: 300;
    }
    &-addressee {
      margin-right: 0.5dvh;
      color: $col-purple;
    }
    &--my {
      margin-left: 25%;
      background: $col-grey;
      cursor: auto;
    }
    &--continue {
      margin-top: 0.3dvh;
      & .chat__point-username {
        display: none;
      }
      &::before,
      &::after {
        position: absolute;
        top: -0.9dvh;
        left: 15%;
        width: 0.5dvh;
        height: 0.9dvh;
        background: $col-purple;
        content: ' ';
      }
      &::after {
        left: 85%;
      }
    }
  }
</style>
