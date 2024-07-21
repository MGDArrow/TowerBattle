<template>
  <div class="bg-bg border-grey border-h-blue shadow-h-blue">
    <div class="hud__bottom-stat flex-center color-blue">
      <VIcon :name="'sword'" /> Урон: {{ Updates.updates['attack'].groups['basic'].updates['damage'].text }}
    </div>
    <div class="hud__bottom-stat flex-center color-blue">
      <VIcon :name="'reload'" /> Скорость атаки:
      {{ Updates.updates['attack'].groups['basic'].updates['spead'].text }}
    </div>
    <div
      class="hud__bottom-stat flex-center color-blue"
      v-if="Updates.updates['attack'].groups['crit'].updates['percent'].lvl_max > 0"
    >
      <VIcon :name="'crit-proc'" /> Шанс крита:
      {{ Updates.updates['attack'].groups['crit'].updates['percent'].text }}
    </div>
    <div class="hud__bottom-bar border-purple">
      <div class="flex-center" style="background: linear-gradient(to right, var(--col-purple) 70%, var(--col-bg) 0%)">
        70/100
      </div>
    </div>
    <div
      class="hud__bottom-stat flex-center color-blue"
      v-if="Updates.updates['defence'].groups['guard'].updates['count'].lvl_max > 0"
    >
      <VIcon :name="'shield'" /> Защита:
      {{ Updates.updates['defence'].groups['guard'].updates['count'].text }}
    </div>
    <div class="hud__bottom-stat flex-center color-blue">
      <VIcon :name="'regen'" /> Реген HP: {{ Updates.updates['defence'].groups['basic'].updates['regen'].text }}
    </div>
    <div
      class="hud__bottom-stat flex-center color-blue"
      v-if="Updates.updates['defence'].groups['vampiric'].updates['count'].lvl_max > 0"
    >
      <VIcon :name="'bat'" /> Вампиризм: {{ Updates.updates['defence'].groups['vampiric'].updates['count'].text }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import Updates from '@/mechanics/updates';
</script>
