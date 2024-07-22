/* eslint-disable no-mixed-operators */
import Enemies from '@/entities/enemies';
import Particles from '@/entities/particles';
import Statistic from '@/services/statistic';
import Updates from '@/mechanics/updates';
import CONST from '@/math/const';
import { MyMath, Vector } from '@/math/math';
import Settings from '@/logic/settings';
import { Ref, ref } from 'vue';

class Mines {
  static #onlyInstance: Mines | null = null;
  mines: Ref<Array<MineBuilder>> = ref([]);
  constructor() {
    if (Mines.#onlyInstance) return Mines.#onlyInstance;
    Mines.#onlyInstance = this;
  }

  init() {
    this.mines.value = [];
  }

  newMine(x: number, y: number) {
    const isNewMine = Math.random() <= Updates.updates['perimeter'].groups['mines'].updates['percent'].count;
    if (!isNewMine) return;
    this.mines.value.push(new MineBuilder(x, y));
  }

  tick = (dt: number) => {
    this.mines.value = this.mines.value.filter((mine) => {
      mine.tick(dt);
      if (mine.time <= 0) {
        mine.activated();
        return false;
      }

      mine.checkCollision();
      if (!mine.collision) return true;

      mine.activated();
      return false;
    });
  };
}

export default new Mines();

class MineBuilder {
  size = MyMath.round(CONST.MINE.SIZE * Settings.scaleSize);
  r = this.size / 2;
  x = 0;
  y = 0;

  time = CONST.MINE.LIFETIME;
  time_progress = (this.time / CONST.MINE.LIFETIME) * 100;

  s_radius = (Updates.updates['perimeter'].groups['mines'].updates['radius'].count * Settings.scaleSize) / 2;
  s_damage =
    Updates.updates['attack'].groups['basic'].updates['damage'].count *
    Updates.updates['perimeter'].groups['mines'].updates['damage'].count;

  collision = false;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  tick = (dt: number) => {
    this.time -= dt;
    this.time_progress = (this.time / CONST.MINE.LIFETIME) * 100;
  };

  checkCollision = () => {
    for (let i = 0; i < Enemies.enemies.value.length; i++) {
      const enemy = Enemies.enemies.value[i];
      if (enemy.s_hp <= 0) continue;
      const isCollision = Vector.isCollisionFast(this.x, this.y, this.r, enemy.x, enemy.y, enemy.r);
      if (!isCollision) continue;
      this.collision = true;
      break;
    }
  };

  activated = () => {
    this.boom();
    Particles.newParticles('Мина', this.x, this.y);
  };

  boom = () => {
    Enemies.enemies.value.forEach((enemy) => {
      if (enemy.s_hp <= 0) return;
      const isCollision = Vector.isCollisionFast(this.x, this.y, this.s_radius, enemy.x, enemy.y, enemy.r);
      if (!isCollision) return;
      enemy.getDamage(this.s_damage);
      Statistic.inc('damage_mines', this.s_damage);
      Statistic.inc('damage_all', this.s_damage);
    });
  };
}
