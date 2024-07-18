<template>
  <div class="options__updates frame-orange shadow-h-orange bg-bg">
    <h1 class="bg-orange">Улучшения</h1>
    <div class="updates">
      <UUpdatesCoef @setTab="(e) => setTab(e)" />
      <div class="updates__section" :style="{ height: heightSection }">
        <UUpdatesTabs @setTab="(e) => setTab(e)" />
        <UUpdatesBody :mode="mode" :tab="tab" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import UUpdatesCoef from '@/components/Options/UUpdatesCoef.vue';
  import { computed, ref } from 'vue';
  import UUpdatesTabs from './UUpdatesTabs.vue';
  import UUpdatesBody from './UUpdatesBody.vue';

  interface Props {
    mode?: string;
  }
  const props = withDefaults(defineProps<Props>(), { mode: 'Меню' });

  const tab = ref('attack');
  const heightSection = computed(() => (props.mode === 'Меню' ? '85dvh' : '74.5dvh'));

  function setTab(tabName: string | number) {
    if (typeof tabName === 'string') tab.value = tabName;
  }
</script>

<style lang="scss">
  .options__updates {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
  .updates {
    flex: 1;
    padding: 1dvh;
    &__section {
      display: flex;
      flex: 1;
    }
  }
</style>
