/* eslint-disable no-mixed-operators */
import Tower from '@/entities/tower';
import Wall from '@/entities/wall';
import CONST from '@/math/const';
import { Rotate, Vector } from '@/math/math';
import Settings from '@/logic/settings';
import { computed, Ref, ref, toValue } from 'vue';
import { TEnemiesClasses } from '@/entities/enemies';

class Sluges {
  static #onlyInstance: Sluges | null = null;
  public sluges: Ref<Array<SlugBuilder>> = ref([]);
  constructor() {
    if (Sluges.#onlyInstance) return Sluges.#onlyInstance;
    Sluges.#onlyInstance = this;
  }

  init() {
    this.sluges.value = [];
  }

  newSlug(enemy: TEnemiesClasses) {
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
  public enemy: TEnemiesClasses;
  public x: Ref<number> = ref(0);
  public y: Ref<number> = ref(0);
  public size = CONST.SLUG.SIZE * Settings.scaleSize;
  public r = this.size / 2;
  public rotate = ref(0);

  public coefX: number = 0;
  public coefY: number = 0;

  public collision = false;
  public target = 'Tower';

  public s_damage: number = 0;
  public s_spead = computed(() => CONST.SLUG.SPEAD * Settings.scaleSpead.value);
  constructor(enemy: TEnemiesClasses) {
    this.enemy = enemy;
    this.x.value = toValue(enemy.x);
    this.y.value = toValue(enemy.y);
    this.s_damage = enemy.s_damage;

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
