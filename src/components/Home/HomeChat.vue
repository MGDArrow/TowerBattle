<template>
  <div class="home-chat">
    <div class="home-chat__body">
      <div class="home-chat__history bg-bg border-purple" ref="chatHistory">
        <HomeChatPoint @getTo="(e) => getTo(e)" />
      </div>
      <div class="home-chat__message">
        <div class="home-chat__to bg-purple shadow-h-purple" v-if="to !== ''" @click="to = ''">@{{ to }}</div>
        <VInput
          class="bg-bg border-purple shadow-h-purple"
          v-model.trim="message"
          :placeholder="'Введите сообщение'"
          ref="chatInput"
        />
        <span class="bg-purple flex-center shadow-h-purple" @click="sendMessage()">
          <VIcon :name="'send'" />
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue';
  import Chat from '@/logic/chat';
  import HomeChatPoint from '@/components/Home/HomeChatPoint.vue';
  import VInput from '@/components/UI/VInput.vue';

  const message = ref('');
  const to = ref('');

  const chatHistory = ref<HTMLInputElement | null>(null);
  const chatInput = ref<InstanceType<typeof VInput> | null>(null);

  function getTo(from: string) {
    to.value = from;
    chatInput.value?.focus();
  }

  function sendMessage(): void {
    if (message.value === '') return;
    Chat.sendMessage(message.value, to.value);
    message.value = '';
    to.value = '';
    setTimeout(() => {
      if (chatHistory.value) chatHistory.value.scrollTop = 1e9;
    }, 10);
  }

  function sendMessageEnter({ key }: KeyboardEvent) {
    if (message.value !== '' && key === 'Enter') sendMessage();
  }

  onMounted(() => {
    document.addEventListener('keydown', sendMessageEnter);
    setTimeout(() => {
      if (chatHistory.value) chatHistory.value.scrollTop = 1e9;
    }, 10);
  });

  onUnmounted(() => {
    document.removeEventListener('keypress', sendMessageEnter);
  });
</script>

<style lang="scss">
  .home-chat {
    position: absolute;
    top: 0;
    right: 0;
    width: 20vw;
    height: 60dvh;
    padding: 1dvh;
    &__body {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    &__history {
      flex: 1;
      margin-bottom: 1dvh;
      padding: 1dvh;
      overflow: hidden auto;
      &::-webkit-scrollbar {
        width: 0.5dvh;
      }
      &::-webkit-scrollbar-track {
        background: $col-grey;
      }
      &::-webkit-scrollbar-thumb {
        background-color: $col-purple;
      }
    }
    &__message {
      position: relative;
      display: flex;
      height: 5dvh;
      & input {
        flex: 1;
        margin-right: 1dvh;
        font-weight: 300;
      }
      & > span {
        width: 5dvh;
        height: 5dvh;
        font-size: 1.5rem;
        cursor: pointer;
      }
    }
    &__to {
      position: absolute;
      top: -2dvh;
      left: 1dvh;
      padding: 0.5dvh 1dvh;
      font-size: 0.8rem;
      background: $col-purple;
      cursor: pointer;
    }
  }
</style>
