/* eslint-disable no-mixed-operators */
import Tower from '@/entities/tower';
import Wall from '@/entities/wall';
import CONST from '@/math/const';
import { Rotate, Vector } from '@/math/math';
import Settings from '@/logic/settings';
import { computed, ref } from 'vue';

class Sluges {
  static #onlyInstance = null;
  constructor() {
    if (Sluges.#onlyInstance) return Sluges.#onlyInstance;
    Sluges.#onlyInstance = this;
    this.sluges = ref([]);
  }

  init() {
    this.sluges.value = [];
  }

  newSlug(enemy) {
    this.sluges.value.push(new SlugBuilder(enemy));
  }

  moveAttackRemove() {
    this.sluges.value = this.sluges.value.filter((slug) => {
      slug.move();
      if (!slug.collision) return true;
      slug.attack();
      return false;
    });
  }
}

export default new Sluges();

class SlugBuilder {
  constructor(enemy) {
    this.enemy = enemy;
    this.x = ref(enemy.x);
    this.y = ref(enemy.y);
    this.size = CONST.SLUG.SIZE * Settings.scaleSize;
    this.r = this.size / 2;
    this.rotate = ref(0);

    this.collision = false;
    this.target = 'Tower';

    this.s_damage = enemy.s_damage;
    this.s_spead = computed(() => CONST.SLUG.SPEAD * Settings.scaleSpead.value);

    this.getDirection();
  }

  getDirection = () => {
    const [ABx, ABy] = Vector.getVector(this.x.value, this.y.value, Tower.x, Tower.y);
    const distance = Vector.getLength(ABx, ABy);
    [this.coefX, this.coefY] = Vector.getNormalize(ABx, ABy, distance);
    this.rotate.value = Rotate.rotateReverse(ABx, ABy, distance);
  };

  move = () => {
    this.x.value += this.coefX * this.s_spead.value;
    this.y.value += this.coefY * this.s_spead.value;

    const isWall = Wall.status.value === 'ready';

    if (isWall) {
      this.collision = Vector.isCollisionFast(this.x.value, this.y.value, this.r, Wall.x, Wall.y, Wall.r);
      this.target = 'Wall';
    } else {
      this.collision = Vector.isCollisionFast(this.x.value, this.y.value, this.r, Tower.x, Tower.y, Tower.r);
      this.target = 'Tower';
    }
  };

  attack = () => {
    if (this.target === 'Tower') {
      Tower.getDamage(this.s_damage);
      Tower.counterattackSpikes(this.enemy);
    } else {
      Wall.getDamage(this.s_damage);
    }
  };
}
