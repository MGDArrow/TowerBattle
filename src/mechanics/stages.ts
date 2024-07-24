import User from '@/logic/user';
import { IStageAwardLvl, IStageUser } from '@/types/stages';
import { STAGE_AWARDS } from '@/upgrades/stages';
import { computed, Ref, ref } from 'vue';

class Stages {
  static #onlyInstance: Stages | null = null;

  public lvl: Ref<keyof IStageUser> = ref(1);
  public stage = computed(() => Math.ceil(this.lvl.value / 3));
  public access = computed(() => (this.stage.value - 1) * 300);
  public maxWaves = computed(() => User.stages.value[this.lvl.value].max);
  public entries = computed(() => User.stages.value[this.lvl.value].entries);
  public user_access = computed(() => this.getAccessLvl());
  public isAccess = computed(() => this.user_access.value >= this.access.value);
  public awards = ref(STAGE_AWARDS);

  constructor() {
    if (Stages.#onlyInstance) return Stages.#onlyInstance;
    Stages.#onlyInstance = this;
  }

  changeLvl(inc: -1 | 1) {
    if (inc === -1 && this.lvl.value !== 1) this.lvl.value -= 1;
    if (inc === 1 && this.lvl.value !== 9) this.lvl.value += 1;
  }

  getAccessLvl(): number {
    let userAllStagesLvl = 0;
    for (let lvl = 1; lvl <= this.lvl.value; lvl++) {
      userAllStagesLvl += User.stages.value[lvl].max;
    }
    return userAllStagesLvl;
  }

  getAwardList(): IStageAwardLvl {
    return this.awards.value[this.lvl.value];
  }

  getUserAwards() {
    return User.stages.value[this.lvl.value].awards;
  }

  // Синхронизировать awards с игроком
}

export default new Stages();
