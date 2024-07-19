import Updates from '@/mechanics/updates';
import CONST from '@/math/const';
import Settings from '@/logic/settings';
import { computed, ref } from 'vue';

class Wall {
  static #onlyInstance: Wall | null = null;
  public status = ref('build');
  public s_hp = ref(0);
  public s_hp_max = ref(0);
  public u_building_now = ref(0);
  public u_building_time = computed(() => Updates.updates['perimeter'].groups['wall'].updates['building'].count);

  public x = 0;
  public y = 0;
  public size = 0;
  public r = 0;
  constructor() {
    if (Wall.#onlyInstance) return Wall.#onlyInstance;
    Wall.#onlyInstance = this;
  }

  init = () => {
    this.x = Settings.sceneWidth / 2;
    this.y = Settings.sceneHeight / 2;
    this.size = CONST.WALL.SIZE * Settings.scaleSize;
    this.r = this.size / 2;

    this.status.value = 'build';
    this.s_hp.value = 0;
    this.s_hp_max.value = 0;

    this.u_building_now.value = 0;
  };

  tick = (dt: number) => {
    if (Updates.updates['perimeter'].groups['wall'].updates['building'].lvl_max <= 0) return;
    if (this.status.value === 'build') {
      this.u_building_now.value += dt;
      if (this.u_building_now.value >= this.u_building_time.value) {
        this.status.value = 'ready';
        this.u_building_now.value = 0;
        this.s_hp.value =
          Updates.updates['defence'].groups['basic'].updates['hp'].count *
          Updates.updates['perimeter'].groups['wall'].updates['percent'].count;
        this.s_hp_max.value = this.s_hp.value;
      }
      return;
    }
    if (this.s_hp.value <= 0) this.status.value = 'build';
  };

  getDamage = (damage: number) => {
    if (damage < 0) return;
    this.s_hp.value -= damage;
  };
}
export default new Wall();
