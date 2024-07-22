<template>
  <div
    class="item"
    @click.stop="$emit('getLvlUp', finalCoefUpd)"
    @mouseenter="setDescription(update)"
    @mouseleave="setDescription('')"
  >
    <UUpdatesItemInfo
      :update="update"
      :сurrentLvlUpdate="сurrentLvlUpdate"
      :isNotMaxLvlUpdate="isNotMaxLvlUpdate"
      :colorUpdate="colorUpdate"
      @getFavorite="$emit('getFavorite')"
    />
    <UUpdatesItemBuy
      :update="update"
      :maxCoefUpd="maxCoefUpd"
      :finalCoefUpd="finalCoefUpd"
      :priceUpdate="priceUpdate"
      :isNotMaxLvlUpdate="isNotMaxLvlUpdate"
      :mode="mode"
      :colorUpdate="colorUpdate"
    />
  </div>
</template>

<script setup lang="ts">
  import { computed, inject, ref } from 'vue';
  import User from '@/logic/user';
  import Updates from '@/mechanics/updates';
  import Tower from '@/entities/tower';
  import UUpdatesItemInfo from '@/components/Options/UUpdatesItemInfo.vue';
  import UUpdatesItemBuy from '@/components/Options/UUpdatesItemBuy.vue';
  import { IUpdate } from '@/types/updates';

  interface Props {
    update: IUpdate;
    color: string;
    mode: string;
  }
  const props = defineProps<Props>();

  const emit = defineEmits<{
    getLvlUp: [value: number];
    getFavorite: [];
  }>();

  const { setDescription } = inject('description', {
    setDescription: (_newDescriprion: string | IUpdate) => {},
  });

  const isModeMenu = computed(() => props.mode === 'Меню');
  const valuta = computed(() => (isModeMenu.value ? User.valuta.value.coins : Tower.dollars.value));
  const сurrentLvlUpdate = computed(() =>
    isModeMenu.value ? props.update.lvl_const : props.update.lvl_const + props.update.lvl,
  );

  const isNotMaxLvlUpdate = computed(() => {
    return props.update.lvl + props.update.lvl_const < props.update.lvl_max;
  });

  const selectCoefUpd = computed(() => {
    const coef = Updates.coef.value;
    const textCoef = coef.variables[coef.now];
    if (textCoef === 'x1') return 1;
    if (textCoef === 'x5') return 5;
    if (textCoef === 'x10') return 10;
    if (textCoef === 'x100') return 100;
    return 100_000;
  });

  const maxCoefUpd = computed(() => {
    let maxLvl = props.update.lvl_max - props.update.lvl_const;
    if (!isModeMenu.value) maxLvl -= props.update.lvl;
    return Math.min(selectCoefUpd.value, maxLvl);
  });

  const finalCoefUpd = ref(1);

  const priceUpdate = computed(() => {
    if (maxCoefUpd.value === 0) return 0;
    return selectCoefUpd.value !== 100_000 ? getPriceDefaultMode() : getPriceWithMaxMode();
  });

  const colorUpdate = computed(() => {
    if (!isNotMaxLvlUpdate.value) return 'orange';
    if (priceUpdate.value > valuta.value) return 'grey-l';
    return props.color;
  });

  function getPriceDefaultMode(): number {
    finalCoefUpd.value = Math.min(selectCoefUpd.value, maxCoefUpd.value);
    const funcGetPrice = isModeMenu.value ? 'getPriceConst' : 'getPrice';
    let price = 0;
    for (let inc = 0; inc < finalCoefUpd.value; inc++) price += props.update[funcGetPrice](inc);
    return price;
  }
  function getPriceWithMaxMode(): number {
    let price = 0;
    let coefTemp = 0;
    for (let inc = 0; inc < maxCoefUpd.value; inc++) {
      const priceTemp = isModeMenu.value ? props.update.getPriceConst(inc) : props.update.getPrice(inc);
      if (price + priceTemp > valuta.value) break;
      price += priceTemp;
      coefTemp += 1;
    }
    if (coefTemp === 0) {
      price += isModeMenu.value ? props.update.getPriceConst() : props.update.getPrice();
      coefTemp = 1;
    }

    finalCoefUpd.value = coefTemp;
    return price;
  }
</script>

<style lang="scss">
  .item {
    display: flex;
    width: 100%;
    height: 10dvh;
    margin-top: 0.8dvh;
    text-align: center;
    border: 0.3dvh solid $col-white;
    cursor: pointer;
  }
</style>
