<template>
  <div class="home-chat">
    <div class="home-chat__body">
      <div class="home-chat__history bg-bg border-purple">
        <div class="chat__point chat__point--my border-purple shadow-h-purple">
          <div class="chat__point-username">MGDArrow</div>
          <div class="chat__point-message">Привет, не подскажите, как играть в эту игрушку??</div>
        </div>
        <div class="chat__point border-purple shadow-h-purple">
          <div class="chat__point-username">Vadim228</div>
          <div class="chat__point-message">
            <span class="chat__point-addressee">@MGDArrow</span>Да без проблем, сначала правила прочитай
          </div>
        </div>
        <div class="chat__point chat__point--continue border-purple shadow-h-purple">
          <div class="chat__point-username">Vadim228</div>
          <div class="chat__point-message">После этого просто начинай игру и делай упор на уровень</div>
        </div>
        <div class="chat__point chat__point--continue border-purple shadow-h-purple">
          <div class="chat__point-username">Vadim228</div>
          <div class="chat__point-message">Ну и набирай монеты, не забывай апать башню</div>
        </div>
        <div class="chat__point chat__point--continue border-purple shadow-h-purple">
          <div class="chat__point-username">Vadim228</div>
          <div class="chat__point-message">Карточки когда откроются, набирай как можно больше</div>
        </div>
        <div class="chat__point chat__point--continue border-purple shadow-h-purple">
          <div class="chat__point-username">Vadim228</div>
          <div class="chat__point-message">А еще, чтобы лаборатория не простаивала</div>
        </div>
        <div class="chat__point chat__point border-purple shadow-h-purple">
          <div class="chat__point-username">IgorAKNagibator</div>
          <div class="chat__point-message">
            <span class="chat__point-addressee">@Vadim228</span>Да, уровень очень важен в игре!!
          </div>
        </div>
        <div class="chat__point chat__point--my border-purple shadow-h-purple">
          <div class="chat__point-username">MGDArrow</div>
          <div class="chat__point-message">Спасибо, ребят, помогли</div>
        </div>
      </div>
      <div class="home-chat__message">
        <div class="home-chat__to bg-purple shadow-h-purple">@Vadim228</div>
        <VInput class="bg-bg border-purple shadow-h-purple" v-model="message" :placeholder="'Введите сообщение'" />
        <span class="bg-purple flex-center shadow-h-purple">
          <VIcon :name="'send'" />
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const message = ref('');
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
      overflow: auto;
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
  .chat__point {
    position: relative;
    width: 75%;
    margin-top: 1dvh;
    padding: 1dvh;
    font-size: 0.9rem;
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
        content: ' ';
      }
      &::after {
        left: 85%;
      }
    }
  }
</style>
