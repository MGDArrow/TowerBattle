/* eslint-disable no-mixed-operators */
import { computed, Ref, ref } from 'vue';
import { MyMath } from '@/math/math';
import { getStageUserDefault } from '@/upgrades/stages';
import { IStageUser, TStageAwardType, TStageLvlWaves } from '@/types/stages';
import Stages from '@/mechanics/stages';

// 0.4*х**3 + 40.4*x**2 + 396*x
const lvlFn = (lvl: number): number => MyMath.roundTo(2 * lvl ** 3 + 50.5 * lvl ** 2 + 396 * lvl, 10);

const getLvl = (exp: number) => {
  let lvl = 0;
  let exp_lvl = exp;

  while (exp_lvl - lvlFn(lvl) >= 0) {
    exp_lvl -= lvlFn(lvl);
    lvl += 1;
  }

  const exp_next = lvlFn(lvl);
  const percent = (exp_lvl / exp_next) * 100;
  exp_lvl = MyMath.round(exp_lvl);

  return { lvl, exp_lvl, exp_next, percent };
};

class User {
  static #onlyInstance: User | null = null;

  public username: string = 'MGDArrow';
  public exp: Ref<number> = ref(1);
  public lvl = computed(() => getLvl(this.exp.value));
  public valuta = ref({
    coins: 50000000000,
    diamonds: 0,
    ultimates: 0,
    tickets: 0,
    awards: 0,
  });
  public stages: Ref<IStageUser> = ref(getStageUserDefault());

  constructor() {
    if (User.#onlyInstance) return User.#onlyInstance;
    User.#onlyInstance = this;
  }

  updateCoins = (coins: number): void => {
    this.valuta.value.coins += coins;
  };

  updateDiamonds = (diamonds: number): void => {
    this.valuta.value.diamonds += diamonds;
  };

  updateUltimates = (ultimates: number): void => {
    this.valuta.value.ultimates += ultimates;
  };

  addExp = (exp: number): void => {
    this.exp.value += exp;
  };

  getStagesAward(wave: TStageLvlWaves, count: number, type: TStageAwardType, side: 0 | 1) {
    const stageLvlCount = Stages.lvl.value;
    this.stages.value[stageLvlCount].awards[wave][side] = true;
    if (type === 'coins') this.updateCoins(count);
    if (type === 'diamond') this.updateDiamonds(count);
    if (type === 'ultimate') this.updateUltimates(count);
  }
}

export default new User();
