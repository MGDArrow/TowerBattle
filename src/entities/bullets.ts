/* eslint-disable no-mixed-operators */
import Enemies from '@/entities/enemies';
import Perimeter from '@/entities/perimeter';
import Tower from '@/entities/tower';
import Updates from '@/mechanics/updates';
import CONST from '@/math/const';
import { Rotate, Vector } from '@/math/math';
import Settings from '@/logic/settings';
import { computed, ref } from 'vue';

class Bullets {
  static #onlyInstance = null;
  constructor() {
    if (Bullets.#onlyInstance) return Bullets.#onlyInstance;
    Bullets.#onlyInstance = this;
    this.bullets = ref([]);
  }

  init() {
    this.bullets.value = [];
  }

  newBullet(target, damage) {
    this.bullets.value.push(new BulletBuilder(target, damage));
  }

  moveAttackRemove() {
    this.bullets.value = this.bullets.value.filter((bullet) => {
      bullet.move();
      if (!bullet.collision) return true;
      bullet.attack();
      //** Удаление всех, кто не пошёл на отскок **//
      return !bullet.collision;
    });
  }
}

export default new Bullets();

class BulletBuilder {
  constructor(target, damage) {
    this.target = target;
    this.x = ref(Settings.sceneWidth / 2);
    this.y = ref(Settings.sceneHeight / 2);
    this.size = CONST.BULLET.SIZE * Settings.scaleSize;
    this.r = this.size / 2;
    this.rotate = ref(0);

    this.collision = false;
    this.bounce = 0;

    this.s_damage = damage;
    this.s_spead = computed(() => CONST.BULLET.SPEAD * Settings.scaleSpead.value);
  }

  getDirection = (enemy) => {
    const [ABx, ABy] = Vector.getVector(this.x.value, this.y.value, enemy.x, enemy.y);
    const distance = Vector.getLength(ABx, ABy);
    [this.coefX, this.coefY] = Vector.getNormalize(ABx, ABy, distance);
    this.rotate.value = Rotate.rotateReverse(ABx, ABy, distance);
  };

  move = () => {
    const enemy = Enemies.enemies.value.find((enemy) => enemy.id === this.target);
    if (!enemy) return (this.collision = true);
    this.getDirection(enemy);

    this.x.value += this.coefX * this.s_spead.value;
    this.y.value += this.coefY * this.s_spead.value;
    this.collision = Vector.isCollisionFast(this.x.value, this.y.value, this.r, enemy.x, enemy.y, enemy.r);
  };

  attack = () => {
    const target = Enemies.enemies.value.findIndex((enemy) => enemy.id === this.target);
    if (target === -1) return false;

    Enemies.enemies.value[target].getDamage(this.s_damage);
    Tower.regenVampitic(this.s_damage);
    this.discardEnemy(Enemies.enemies.value[target]);
    this.getBounce();
  };

  discardEnemy = (enemy) => {
    if (enemy.s_hp <= 0) return;
    const isDiscard = Math.random() <= Updates.updates['defence'].groups['discard'].updates['percent'].count;
    if (!isDiscard) return;

    const bulletTowerDistance = Vector.getVectorLength(this.x.value, this.y.value, Tower.x, Tower.y);
    if (bulletTowerDistance > Perimeter.r.value) return;

    enemy.getDiscard(Updates.updates['defence'].groups['discard'].updates['count'].count, this.s_spead.value);
  };

  getBounce = () => {
    //** Отсев пули, отскочившей максимальное количество раз **//
    if (this.bounce === Updates.updates['attack'].groups['bounce'].updates['number'].count) return;

    const newBounce = Math.random() <= Updates.updates['attack'].groups['bounce'].updates['percent'].count;
    if (!newBounce) return;

    const newTargets = getTargetsForBounce(this);
    if (!newTargets) return;

    this.bounce += 1;
    this.collision = false;
    this.target = newTargets.id;
  };
}

function getTargetsForBounce(bullet) {
  const bounceRadius = getBounceRadius();

  const targetsInRadius = filterTargetsInRadius(bullet, bounceRadius);
  if (targetsInRadius.length === 0) return false;

  const targetsWithoutOverdamage = filterTargetsWithoutOverdamage(targetsInRadius);

  sortTargetsByDistance(targetsWithoutOverdamage, bullet);

  return targetsWithoutOverdamage[0];
}

function getBounceRadius() {
  return Updates.updates['attack'].groups['bounce'].updates['range'].count;
}

function filterTargetsInRadius(bullet, radius) {
  return Enemies.enemies.value.filter((enemy) => {
    if (enemy.id === bullet.target) return false;
    return Vector.getVectorLength(bullet.x.value, bullet.y.value, enemy.x, enemy.y) <= radius;
  });
}

function filterTargetsWithoutOverdamage(targets) {
  return targets.filter((target) => {
    if (target.s_hp <= 0) return false;
    return (
      target.s_hp >
      new Bullets().bullets.value.reduce(
        (acc, bullet) => (bullet.target !== target.id ? acc : acc + bullet.s_damage),
        0,
      )
    );
  });
}

function sortTargetsByDistance(targets, bullet) {
  targets.sort(
    (a, b) =>
      (bullet.x.value - a.x) ** 2 +
      (bullet.y.value - a.y) ** 2 -
      (bullet.x.value - b.x) ** 2 -
      (bullet.y.value - b.y) ** 2,
  );
}
