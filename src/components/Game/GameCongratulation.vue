<template>
  <VPopup v-model="congratulations_lvl">
    <h1>Поздравляем!</h1>
    <div class="congratulations__lvl color-orange">Вы получили {{ congratulations_lvl }}-й уровень!</div>
    <div class="congratulations__title color-blue">Ваша награда:</div>
    <div class="congratulations__awards">
      <div class="bg-bg border-yellow shadow-yellow bg-h-yellow flex-center">
        <VIcon :name="'coins'" /><span>{{ MyMath.toText(congratulations_lvl_coins) }}</span>
      </div>
      <div class="bg-bg border-turq shadow-turq bg-h-turq flex-center">
        <VIcon :name="'diamond'" /><span>{{ MyMath.toText(10 * congratulations_lvl) }}</span>
      </div>
      <div class="bg-bg border-purple shadow-purple bg-h-purple flex-center">
        <VIcon :name="'ultimate'" /><span>{{ MyMath.toText(5 * congratulations_lvl) }}</span>
      </div>
    </div>
    <h3 v-if="congratulations_lvl_updates" class="congratulations__title color-blue">
      Доступны новые улучшения в категории "{{ congratulations_lvl_updates.update.name }}":
    </h3>
    <div v-if="congratulations_lvl_updates" class="congratulations__updates">
      <div
        v-for="update in congratulations_lvl_updates.update.updates"
        :key="update.description"
        :class="`bg-bg border-${congratulations_lvl_updates.color} shadow-${congratulations_lvl_updates.color} bg-h-${congratulations_lvl_updates.color}`"
      >
        <VIcon :name="update.icon" /> {{ update.name }}
      </div>
    </div>
  </VPopup>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  import { MyMath } from '@/math/math';
  import Updates from '@/mechanics/updates';
  import User from '@/logic/user';
  import Settings from '@/logic/settings';

  const userLvl = computed(() => User.lvl.value.lvl);

  const congratulations_lvl = ref(0);

  const congratulations_lvl_coins = computed(() => 1000 * (5 * (congratulations_lvl.value - 1)));

  const congratulations_lvl_updates = computed(() => {
    if (!congratulations_lvl.value) return false;
    let update, color;
    for (let direction in Updates.updates) {
      for (let groupe in Updates.updates[direction].groups) {
        if (Updates.updates[direction].groups[groupe].lvl_access === congratulations_lvl.value) {
          update = Updates.updates[direction].groups[groupe];
          color = Updates.updates[direction].color;
          console.log(color);
          break;
        }
      }
    }
    if (!update) return false;
    return { update, color };
  });

  watch(userLvl, (newLvl) => {
    congratulations_lvl.value = newLvl;
    User.updateCoins(congratulations_lvl_coins.value);
    User.updateDiamonds(10 * newLvl);
    User.updateUltimates(5 * newLvl);
  });
  watch(congratulations_lvl, () => {
    Settings.gameSpeadPause();
  });
</script>

<style lang="scss">
  .congratulations {
    &__lvl {
      margin: 2dvh 0;
      font-size: 1.3rem;
      text-align: center;
      text-transform: uppercase;
    }
    &__title {
      font-size: 1.4rem;
      text-align: center;
    }
    &__awards {
      display: flex;
      justify-content: space-evenly;
      width: 100%;
      margin: 3dvh 0;
      & > div {
        flex-wrap: wrap;
        width: 20dvh;
        height: 30dvh;
        font-size: 2.7em;
        text-align: center;
        cursor: pointer;
        &:hover {
          width: 22dvh;
          font-size: 3.2em;
        }
        & svg {
          display: block;
          width: 100%;
          font-size: 2.5em;
        }
        & span {
          display: block;
          width: 100%;
        }
      }
    }
    &__updates {
      width: 100%;
      margin-top: 3dvh;
      & > div {
        width: 100%;
        margin-top: 1dvh;
        padding: 1dvh;
        font-size: 2em;
        text-align: center;
        cursor: pointer;
      }
    }
  }
</style>
