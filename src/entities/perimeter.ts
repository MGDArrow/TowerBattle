import DiscardWaves from '@/entities/discardWaves';
import Updates from '@/mechanics/updates';
import Settings from '@/logic/settings';
import { computed } from 'vue';

class Perimeter {
  static #onlyInstance = null;
  constructor() {
    if (Perimeter.#onlyInstance) return Perimeter.#onlyInstance;
    Perimeter.#onlyInstance = this;
  }

  init() {
    this.x = Settings.sceneWidth / 2;
    this.y = Settings.sceneHeight / 2;
    this.size = computed(
      () => Updates.updates['perimeter'].groups['basic'].updates['radius'].count * Settings.scaleSize,
    );
    this.r = computed(() => this.size.value / 2);

    this.u_discardWave = Updates.updates['perimeter'].groups['discard'].updates['cooldown'].count;
  }

  tick(dt) {
    this.u_discardWave -= dt;
    if (this.u_discardWave <= 0) this.makeDiscardWave();
  }

  makeDiscardWave() {
    this.u_discardWave = Updates.updates['perimeter'].groups['discard'].updates['cooldown'].count;
    DiscardWaves.newWave();
  }
}
export default new Perimeter();
