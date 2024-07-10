<template>
  <form class="auth-login">
    <h1 class="bg-blue shadow-blue">Авторизация</h1>
    <VInput class="border-blue shadow-h-blue" v-model="login_email" :placeholder="'E-mail'" />
    <VInput class="border-blue shadow-h-blue" v-model="login_password" :placeholder="'Пароль'" />
    <VButton class="bg-bg bg-h-blue border-blue shadow-blue">Войти</VButton>
  </form>
</template>

<script setup lang="ts">
  import { Ref, ref } from 'vue';

  const login_email: Ref<string> = ref('');
  const login_password: Ref<string> = ref('');
</script>
