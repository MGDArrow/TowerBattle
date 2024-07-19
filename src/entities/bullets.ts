/* eslint-disable no-mixed-operators */
import Enemies, { TEnemiesClasses } from '@/entities/enemies';
import Perimeter from '@/entities/perimeter';
import Tower from '@/entities/tower';
import Updates from '@/mechanics/updates';
import CONST from '@/math/const';
import { Rotate, Vector } from '@/math/math';
import Settings from '@/logic/settings';
import { computed, Ref, ref } from 'vue';

class Bullets {
  static #onlyInstance: Bullets | null = null;
  public bullets: Ref<Array<BulletBuilder>> = ref([]);
  constructor() {
    if (Bullets.#onlyInstance) return Bullets.#onlyInstance;
    Bullets.#onlyInstance = this;
  }

  init() {
    this.bullets.value = [];
  }

  newBullet(target: string, damage: number) {
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
  public target: string;
  public x = Settings.sceneWidth / 2;
  public y = Settings.sceneHeight / 2;
  public size = CONST.BULLET.SIZE * Settings.scaleSize;
  public r = this.size / 2;
  public rotate = 0;
  public coefX: number = 0;
  public coefY: number = 0;

  public collision = false;
  public bounce = 0;

  public s_damage: number;
  public s_spead = computed(() => CONST.BULLET.SPEAD * Settings.scaleSpead.value);
  constructor(target: string, damage: number) {
    this.target = target;
    this.s_damage = damage;
  }

  getDirection = (enemy: TEnemiesClasses) => {
    const [ABx, ABy] = Vector.getVector(this.x, this.y, enemy.x, enemy.y);
    const distance = Vector.getLength(ABx, ABy);
    [this.coefX, this.coefY] = Vector.getNormalize(ABx, ABy, distance);
    this.rotate = Rotate.rotateReverse(ABx, ABy, distance);
  };

  move = () => {
    const enemy = Enemies.enemies.value.find((enemy) => enemy.id === this.target);
    if (!enemy) return (this.collision = true);
    this.getDirection(enemy);

    this.x += this.coefX * this.s_spead.value;
    this.y += this.coefY * this.s_spead.value;
    this.collision = Vector.isCollisionFast(this.x, this.y, this.r, enemy.x, enemy.y, enemy.r);
  };

  attack = () => {
    const target = Enemies.enemies.value.findIndex((enemy) => enemy.id === this.target);
    if (target === -1) return false;

    Enemies.enemies.value[target].getDamage(this.s_damage);
    Tower.regenVampitic(this.s_damage);
    this.discardEnemy(Enemies.enemies.value[target]);
    this.getBounce();
  };

  discardEnemy = (enemy: TEnemiesClasses) => {
    if (enemy.s_hp <= 0) return;
    const isDiscard = Math.random() <= Updates.updates['defence'].groups['discard'].updates['percent'].count;
    if (!isDiscard) return;

    const bulletTowerDistance = Vector.getVectorLength(this.x, this.y, Tower.x, Tower.y);
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

function getTargetsForBounce(bullet: BulletBuilder): TEnemiesClasses | false {
  const bounceRadius = getBounceRadius();

  const targetsInRadius: Array<TEnemiesClasses> = filterTargetsInRadius(bullet, bounceRadius);
  if (targetsInRadius.length === 0) return false;

  const targetsWithoutOverdamage: Array<TEnemiesClasses> = filterTargetsWithoutOverdamage(targetsInRadius);

  sortTargetsByDistance(targetsWithoutOverdamage, bullet);

  return targetsWithoutOverdamage[0];
}

function getBounceRadius() {
  return Updates.updates['attack'].groups['bounce'].updates['range'].count;
}

function filterTargetsInRadius(bullet: BulletBuilder, radius: number): Array<TEnemiesClasses> {
  return Enemies.enemies.value.filter((enemy) => {
    if (enemy.id === bullet.target) return false;
    return Vector.getVectorLength(bullet.x, bullet.y, enemy.x, enemy.y) <= radius;
  });
}

function filterTargetsWithoutOverdamage(targets: Array<TEnemiesClasses>): Array<TEnemiesClasses> {
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

function sortTargetsByDistance(targets: Array<TEnemiesClasses>, bullet: BulletBuilder) {
  targets.sort((a, b) => (bullet.x - a.x) ** 2 + (bullet.y - a.y) ** 2 - (bullet.x - b.x) ** 2 - (bullet.y - b.y) ** 2);
}
