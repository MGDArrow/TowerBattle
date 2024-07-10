<template>
  <form class="auth-reg">
    <h1 class="bg-orange">Регистрация</h1>
    <VInput class="border-orange shadow-h-orange" v-model="reg_username" :placeholder="'Nickname'" />
    <VInput class="border-orange shadow-h-orange" v-model="reg_email" :placeholder="'E-mail'" />
    <VInput class="border-orange shadow-h-orange" v-model="reg_password" :placeholder="'Пароль'" />
    <VInput class="border-orange shadow-h-orange" v-model="reg_passwordConfirm" :placeholder="'Повторный пароль'" />
    <VCheckbox v-model="reg_rules" :color="'orange'">Подтверждаю согласие с правилами</VCheckbox>
    <VButton class="bg-bg bg-h-orange border-orange shadow-orange">Зарегестрироваться</VButton>
  </form>
</template>

<script setup lang="ts">
  import { Ref, ref } from 'vue';

  const reg_username: Ref<string> = ref('');
  const reg_email: Ref<string> = ref('');
  const reg_password: Ref<string> = ref('');
  const reg_passwordConfirm: Ref<string> = ref('');
  const reg_rules: Ref<boolean> = ref(false);
</script>
