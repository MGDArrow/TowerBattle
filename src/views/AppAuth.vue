<template>
  <div class="app-auth" :class="{ 'border-orange shadow-orange': block, 'border-blue shadow-blue': !block }">
    <AuthReg />
    <AuthLogin />

    <div class="auth-block bg-bg" :style="{ left: blockPosition }" @click="block = !block">
      <VButton v-if="block" class="bg-orange border-orange shadow-orange">Войти</VButton>
      <VButton v-else class="bg-blue border-blue shadow-blue">Зарегестрироваться</VButton>
    </div>
  </div>
</template>

<script setup lang="ts">
  import AuthReg from '@/components/forms/AuthReg.vue';
  import AuthLogin from '@/components/forms/AuthLogin.vue';

  import { computed, ComputedRef, Ref, ref } from 'vue';

  const block: Ref<boolean> = ref(false);
  const blockPosition: ComputedRef<string> = computed(() => (block.value ? '75%' : '25%'));
</script>

<style lang="scss">
  .app-auth {
    position: fixed;
    top: 50%;
    left: 50%;
    display: flex;
    gap: 2dvh;
    width: 50vw;
    height: 50dvh;
    padding: 1dvh;
    background: linear-gradient(to right, $col-bg 49.9%, $col-grey 49.9%, $col-grey 50.1%, $col-bg 0%);
    transform: translate(-50%, -50%);
    transition: $transition-main;
  }
  .auth-login,
  .auth-reg {
    width: 50%;
    & * {
      margin-bottom: 1.5dvh;
    }
  }
  .auth-block {
    position: absolute;
    top: 50%;
    left: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc((50vw - $size-border * 2) / 2);
    height: calc(50dvh - $size-border * 2);
    transform: translate(-50%, -50%);
    cursor: pointer;
    transition: $transition-main;
    & button {
      width: 90%;
    }
  }
</style>
