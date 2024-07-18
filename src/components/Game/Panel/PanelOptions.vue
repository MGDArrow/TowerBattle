<template>
  <div class="game__options">
    <div class="game__options-block flex-center">
      <div
        class="bg-bg border-orange bg-h-orange shadow-h-orange flex-center"
        :class="{ 'bg-orange': isOptionActive('Updates') }"
        @click="emit('setOptions', 'Updates')"
      >
        <VIcon :name="'tools'" />
      </div>
      <div
        class="bg-bg border-turq bg-h-turq shadow-h-turq flex-center"
        :class="{ 'bg-turq': isOptionActive('Cards') }"
        @click="emit('setOptions', 'Cards')"
      >
        <VIcon :name="'cards'" />
      </div>
      <div
        class="bg-bg border-red bg-h-red shadow-h-red flex-center"
        :class="{ 'bg-red': isOptionActive('Mods') }"
        @click="emit('setOptions', 'Mods')"
      >
        <VIcon :name="'mod'" />
      </div>
      <div
        class="bg-bg border-purple bg-h-purple shadow-h-purple flex-center"
        :class="{ 'bg-purple': isOptionActive('Ultimates') }"
        @click="emit('setOptions', 'Ultimates')"
      >
        <VIcon :name="'ultimate'" />
      </div>
      <div
        class="bg-bg border-blue bg-h-blue shadow-h-blue flex-center"
        :class="{ 'bg-blue': isOptionActive('Lab') }"
        @click="emit('setOptions', 'Lab')"
      >
        <VIcon :name="'lab'" />
      </div>
    </div>
    <div class="game__options-block flex-center">
      <div class="bg-bg border-blue bg-h-blue shadow-h-blue flex-center" @click="Settings.gameSpeadPause()">
        <VIcon v-if="isPause" :name="'pause'" />
        <VIcon v-else :name="'play'" />
      </div>
      <div class="bg-grey border-blue bg-h-blue shadow-h-blue flex-center" @click="Settings.gameSpeadMinus()">
        <VIcon :name="'minus'" />
      </div>
      <div class="bg-grey border-blue bg-h-blue shadow-h-blue flex-center">x{{ Settings.game_spead.value }}</div>
      <div class="bg-grey border-blue bg-h-blue shadow-h-blue flex-center" @click="Settings.gameSpeadPlus()">
        <VIcon :name="'plus'" />
      </div>
      <div
        class="bg-bg border-blue bg-h-blue shadow-h-blue flex-center"
        :class="{ 'bg-blue': isOptionActive('Settings') }"
        @click="emit('setOptions', 'Settings')"
      >
        <VIcon :name="'gear'" />
      </div>
    </div>
    <div class="game__options-block flex-center">
      <div
        class="bg-bg border-grey-l bg-h-grey-l shadow-h-grey-l flex-center"
        :class="{ 'bg-grey-l': isOptionActive('Stages') }"
        @click="emit('setOptions', 'Stages')"
      >
        <VIcon :name="'wave'" />
      </div>
      <div
        class="bg-bg border-yellow bg-h-yellow shadow-h-yellow flex-center"
        :class="{ 'bg-yellow': isOptionActive('Shop') }"
        @click="emit('setOptions', 'Shop')"
      >
        <VIcon :name="'shop'" />
      </div>
      <div
        class="bg-bg border-turq bg-h-turq shadow-h-turq flex-center"
        :class="{ 'bg-turq': isOptionActive('Statistic') }"
        @click="emit('setOptions', 'Statistic')"
      >
        <VIcon :name="'statistic'" />
      </div>
      <div
        class="bg-bg border-orange bg-h-orange shadow-h-orange flex-center"
        :class="{ 'bg-orange': isOptionActive('Rules') }"
        @click="emit('setOptions', 'Rules')"
      >
        <VIcon :name="'book'" />
      </div>
      <div
        class="bg-bg border-green bg-h-green shadow-h-green flex-center"
        :class="{ 'bg-green': isOptionActive('Events') }"
        @click="emit('setOptions', 'Events')"
      >
        <VIcon :name="'medal'" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Settings from '@/logic/settings';
  import { TOptionalGame, TOptionalPanelGame } from '@/types/optional';
  import { computed, onMounted } from 'vue';

  const emit = defineEmits<{
    setOptions: [value: TOptionalPanelGame];
  }>();

  interface Props {
    options: TOptionalGame;
  }
  const props = defineProps<Props>();

  function isOptionActive(nameOption: TOptionalPanelGame): boolean {
    if (props.options[0] === nameOption || props.options[1] === nameOption) return true;
    return false;
  }

  const isPause = computed(() => Settings.game_spead.value > 0);

  onMounted(() => {
    document.onkeydown = function (evt) {
      evt = evt || window.event;
      if (evt.keyCode == 27) Settings.gameSpeadPause();
    };
  });
  // TODO сделать удаление прослушивания
</script>

<style lang="scss">
  .game__options {
    position: absolute;
    top: 96dvh;
    left: 0;
    display: flex;
    gap: 1dvh;
    width: 100vw;
    height: 4dvh;
    padding: 0.5dvh 1dvh;
    background: $col-black;
    &-block {
      &:nth-child(2) {
        flex: 1;
        height: 100%;
      }
      &:first-child,
      &:last-child {
        width: 30%;
        height: 100%;
      }

      gap: 1dvh;
      font-size: 1.2rem;
      & > div {
        flex: 1;
        height: 100%;
        cursor: pointer;
      }
    }
  }
</style>
