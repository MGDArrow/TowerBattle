<template>
  <div :class="[`updates__body scroll-${color}`]">
    <template v-if="tab !== 'favorite'">
      <h3 :class="[`bg-${color} shadow-${color}`]"><VIcon :name="updates[tab].icon" /> {{ updates[tab].name }}</h3>
      <div v-for="(groupe, grIn) in updates[tab].groups" :key="groupe.name" class="updates__body-groupe">
        <div v-if="groupe.lvl_access <= User.lvl.value.lvl">
          <h4 :class="[`bg-${color}`]">{{ groupe.name }}</h4>
          <div v-for="(upd, uUpd) in groupe.updates" :key="upd.name">
            <UUpdatesItem
              :update="upd"
              :color="color"
              :mode="mode"
              @getLvlUp="(coef) => getUpdate(tab, grIn, uUpd, coef)"
              @getFavorite="getFavorite(tab, grIn, uUpd)"
            />
          </div>
        </div>
        <div v-else class="updates__body-groupe-access">
          "{{ groupe.name }}" откроется на — {{ groupe.lvl_access }} уровне
        </div>
      </div>
    </template>

    <template v-else>
      <h3 :class="[`bg-${color} shadow${color}`]"><VIcon :name="'star'" /> Избранное</h3>
      <div v-for="(update, uTab) in updates" :key="update.name">
        <div v-for="(groupe, grIn) in update.groups" :key="groupe.name" class="updates__body-groupe">
          <div v-for="(upd, uUpd) in groupe.updates" :key="upd.name">
            <UUpdatesItem
              v-if="upd.favorite && upd.lvl + upd.lvl_const !== upd.lvl_max"
              :update="upd"
              :color="update.color"
              :mode="mode"
              @getLvlUp="(coef) => getUpdate(uTab, grIn, uUpd, coef)"
              @getFavorite="getFavorite(uTab, grIn, uUpd)"
            />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import UUpdatesItem from '@/components/Options/UUpdatesItem.vue';
  import { computed, ComputedRef } from 'vue';
  import Updates from '@/mechanics/updates';
  import User from '@/logic/user';

  interface Props {
    mode: string;
    tab: string;
  }

  const props = withDefaults(defineProps<Props>(), { mode: 'Меню', tab: 'attack' });

  const updates = computed(() => Updates.updates);
  const color: ComputedRef<string> = computed(() =>
    props.tab === 'favorite' ? 'yellow' : updates.value[props.tab].color,
  );

  function getUpdate(uTab: string | number, uGroupe: string | number, uUpd: string | number, coef: number) {
    if (typeof uTab === 'string' && typeof uGroupe === 'string' && typeof uUpd === 'string') {
      if (props.mode === 'Меню') Updates.constLvlupUpdate(uTab, uGroupe, uUpd, coef);
      if (props.mode === 'Игра') Updates.gameLvlupUpdate(uTab, uGroupe, uUpd, coef);
    }
  }

  function getFavorite(uTab: string | number, uGroupe: string | number, uUpd: string | number) {
    if (typeof uTab === 'string' && typeof uGroupe === 'string' && typeof uUpd === 'string') {
      Updates.getFavorite(uTab, uGroupe, uUpd);
    }
  }
</script>

<style lang="scss">
  .updates__body {
    flex: 1;
    height: 100%;
    & h3 {
      padding: 0.8dvh;
      font-size: 1.5rem;
      text-align: center;
      text-transform: uppercase;
    }
    & h4 {
      padding: 0.4dvh;
      font-size: 1.2rem;
      text-align: center;
    }
    &-groupe {
      margin-top: 0.8dvh;
      &-access {
        margin-top: 0.8dvh;
        padding: 0.8dvh;
        text-align: center;
        border: 0.4dvh dashed $col-white;
        opacity: 0.1;
        transition: 0.3s ease-in-out;
        &:hover {
          opacity: 1;
        }
      }
    }
  }
</style>
