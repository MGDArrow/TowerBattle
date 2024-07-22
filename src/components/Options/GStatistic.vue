<template>
  <div class="options__statistic frame-turq shadow-h-turq bg-bg">
    <h1 class="bg-turq">Статистика</h1>
    <div class="options__statistic-body scroll-turq">
      <div v-for="(item, index) in statistica" :key="index">
        <h3>{{ index }}</h3>
        <div v-for="i in item" :key="i.id" class="game__statistic">
          <div class="color-turq">{{ i.description }}:</div>
          <div :class="[`color-${i.color}`]">
            <span v-if="i.groupe === 'Игра'">{{ MyMath.toTime(i._count) }}</span>
            <span v-else>{{ i.count }}</span>
            <VIcon v-if="i.icon !== ''" :name="i.icon" />
            <span v-if="i.perSec">/с</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import Statistic from '@/services/statistic';
  import { MyMath } from '@/math/math';

  const statistica = computed(() => {
    let stat = [];
    for (let key in Statistic.statistic.value) {
      stat.push(Statistic.statistic.value[key]);
    }

    return Object.groupBy(stat, ({ groupe }) => groupe);
  });
</script>

<style lang="scss">
  .options__statistic {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    &-body {
      flex: 1;
      padding: 1dvh;
    }
    & h3 {
      margin-top: 2dvh;
      font-size: 1.5rem;
      text-align: center;
      text-transform: uppercase;
    }
  }
  .game__statistic {
    display: flex;
    gap: 1dvh;
    align-items: center;
    font-size: 1.1rem;
    & > div {
      margin-top: 0.9dvh;
      &:first-child {
        width: 60%;

        // text-align: right;
      }
      &:last-child {
        width: 40%;
        font-weight: 400;
      }
      & svg {
        margin-left: 0.5dvh;
        font-size: 0.7em;
      }
    }
  }
</style>
