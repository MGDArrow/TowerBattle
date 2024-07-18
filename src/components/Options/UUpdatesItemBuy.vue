<template>
  <div class="item__buy">
    <div class="item__count" :style="countStyle">
      {{ update.text }}
    </div>
    <div v-if="isNotMaxLvlUpdate" class="item__price" :style="priceStyle">
      <div v-if="finalCoefUpd > 1 && maxCoefUpd > 0" class="item__price-coef">x{{ finalCoefUpd }}</div>
      {{ MyMath.toText(priceUpdate) }}
      <VIcon v-if="mode === 'Меню'" :name="'coins'" />
      <VIcon v-else :name="'dollar'" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { MyMath } from '@/math/math';
  import { IUpdate } from '@/types/updates';
  import { computed } from 'vue';

  interface Props {
    update: IUpdate;
    isNotMaxLvlUpdate: boolean;
    colorUpdate: string;
    finalCoefUpd: number;
    maxCoefUpd: number;
    priceUpdate: number;
    mode: string;
  }
  const props = defineProps<Props>();

  const countStyle = computed(() => {
    if (props.isNotMaxLvlUpdate) {
      return {
        background: `var(--col-${props.colorUpdate})`,
      };
    }
    return {
      background: `var(--col-${props.colorUpdate})`,
      height: '100%',
      lineHeight: '10dvh',
    };
  });

  const priceStyle = computed(() => {
    return {
      borderLeft: `0.3dvh solid var(--col-${props.colorUpdate})`,
    };
  });
</script>

<style lang="scss">
  .item {
    &__buy {
      flex: 1;
      font-size: 1.2rem;
    }
    &__count {
      height: 50%;
      font-size: 1.2em;
      line-height: 5dvh;
    }
    &__price {
      position: relative;
      height: 50%;
      font-weight: 400;
      font-size: 0.9em;
      line-height: 5dvh;
      &-coef {
        position: absolute;
        top: 0.3dvh;
        right: 0.3dvh;
        height: 1.2dvh;
        font-size: 0.7em;
        line-height: 1.2dvh;
      }
    }
  }
</style>
