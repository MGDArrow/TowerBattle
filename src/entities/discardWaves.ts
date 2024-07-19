/* eslint-disable no-mixed-operators */
import Enemies from '@/entities/enemies';
import Perimeter from '@/entities/perimeter';
import Tower from '@/entities/tower';
import Updates from '@/mechanics/updates';
import CONST from '@/math/const';
import Settings from '@/logic/settings';
import { computed, Ref, ref } from 'vue';

class DiscardWaves {
  static #onlyInstance: DiscardWaves | null = null;

  discardWaves: Ref<Array<DiscardWaveBuilder>> = ref([]);

  constructor() {
    if (DiscardWaves.#onlyInstance) return DiscardWaves.#onlyInstance;
    DiscardWaves.#onlyInstance = this;
  }

  init() {
    this.discardWaves.value = [];
  }

  newWave() {
    this.discardWaves.value.push(new DiscardWaveBuilder());
  }

  tick() {
    if (Updates.updates['perimeter'].groups['discard'].updates['cooldown'].lvl_max <= 0) return;
    this.discardWaves.value = this.discardWaves.value.filter((discard) => {
      if (discard.end) return false;
      discard.move();
      discard.discard();
      return true;
    });
  }
}

export default new DiscardWaves();

class DiscardWaveBuilder {
  size = ref(Tower.size);
  x = Tower.x;
  y = Tower.y;

  r = computed(() => this.size.value / 2);
  rIn = computed(() => this.r.value - Settings.sceneHeight / 200);

  s_spead = CONST.DISCARD_WAVE.SPEAD * Settings.scaleSpead.value;

  end = false;

  move = () => {
    if (this.size.value > Perimeter.size.value) return (this.end = true);
    this.size.value = this.size.value + this.s_spead;
  };

  discard = () => {
    const enemiesToDiscard = Enemies.enemies.value.filter((enemy) => {
      const enemyDistance = enemy.distance + Tower.r;
      return this.r.value >= enemyDistance && this.rIn.value <= enemyDistance;
    });
    if (!enemiesToDiscard.length) return;

    enemiesToDiscard.forEach((enemy) => {
      enemy.getDiscard(Updates.updates['perimeter'].groups['discard'].updates['count'].count, CONST.DISCARD_WAVE.SPEAD);
    });
  };
}
