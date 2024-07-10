<template>
  <button><slot /></button>
</template>

<script setup lang="ts"></script>

<style lang="scss">
  button {
    width: 100%;
    height: 5dvh;
    color: $col-white;
    font-size: 1.2rem;
    text-transform: uppercase;
    cursor: pointer;
  }
</style>
