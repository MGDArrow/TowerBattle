/* eslint-disable no-mixed-operators */
import Bullets from '@/entities/bullets';
import Enemies from '@/entities/enemies';
import Perimeter from '@/entities/perimeter';
import Updates from '@/mechanics/updates';
import CONST from '@/math/const';
import Statistic from '@/services/statistic';
import Settings from '@/logic/settings';
import { computed, ref } from 'vue';

class Tower {
  static #onlyInstance = null;
  constructor() {
    if (Tower.#onlyInstance) return Tower.#onlyInstance;
    Tower.#onlyInstance = this;

    this.dollars = ref(0);
    this.s_hp = ref(0);
    this.s_cooldown = ref(0);
    this.u_runaway = ref(0);
    this.u_revival = ref(0);
  }

  init() {
    this.x = Settings.sceneWidth / 2;
    this.y = Settings.sceneHeight / 2;
    this.size = CONST.TOWER.SIZE * Settings.scaleSize;
    this.r = this.size / 2;

    this.dollars.value = CONST.TOWER.START_DOLLARS;

    this.s_hp.value = Updates.updates['defence'].groups['basic'].updates['hp'].count;
    this.s_hp_max = computed(() => Updates.updates['defence'].groups['basic'].updates['hp'].count);
    this.s_damage = computed(() => Updates.updates['attack'].groups['basic'].updates['damage'].count);
    this.s_cooldown.value = 0;

    this.u_runaway.value = 0;
    this.u_revival.value = 0;
  }

  tick = (dt) => {
    if (this.u_runaway.value > 0) this.u_runaway.value -= dt;
    if (this.u_revival.value > 0) this.u_revival.value -= dt;
    if (this.s_cooldown.value > 0) this.s_cooldown.value -= dt;
    if (this.s_hp.value < this.s_hp_max.value) this.regenHP(dt);

    if (this.s_cooldown.value > 0) return;
    const targetsForShot = getTargetsForShot(this.r);
    if (targetsForShot.length > 0) this.takeShot(targetsForShot);
  };

  regenHP = (dt) => {
    const maxRegen = this.s_hp_max.value - this.s_hp.value;
    let regenHP = Updates.updates['defence'].groups['basic'].updates['regen'].count * (dt / 1000);
    if (regenHP > maxRegen) regenHP = maxRegen;
    this.addHP(regenHP);
    Statistic.inc('hp_regen', regenHP);
  };

  takeShot = (targetsForShot) => {
    for (let i = 0; i < calculateNumberBulletsWithVolley(targetsForShot); i++)
      Bullets.newBullet(targetsForShot[i].id, calculateDamageWithCrit(this.s_damage.value));

    calculateStartRunaway(this.u_runaway);

    this.s_cooldown.value = CONST.TOWER.COOLDOWN / calculateAttackSpead(this.u_runaway);
  };

  regenVampitic = (damage) => {
    if (this.s_hp.value >= this.s_hp_max.value) return;
    const isVampiric = Math.random() <= Updates.updates['defence'].groups['vampiric'].updates['percent'].count;
    if (!isVampiric) return;

    const maxVampiric = this.s_hp_max.value - this.s_hp.value;
    let vampiricHP = damage * Updates.updates['defence'].groups['vampiric'].updates['count'].count;
    if (vampiricHP > maxVampiric) vampiricHP = maxVampiric;
    this.addHP(vampiricHP);
    Statistic.inc('hp_vampiric', vampiricHP);
  };

  getDamage = (damage) => {
    if (this.u_revival.value > 0) return;

    let getDamage = damage;
    getDamage *= 1 - Updates.updates['defence'].groups['guard'].updates['percent'].count;
    getDamage -= Updates.updates['defence'].groups['guard'].updates['count'].count;

    if (getDamage < 0) return;
    this.s_hp.value -= getDamage;
    Statistic.inc('damage_get', getDamage);
    calculateStartRevival(this.s_hp, this.s_hp_max, this.u_revival);
  };

  addHP = (hp) => {
    this.s_hp.value += hp;
    const kitMax = this.s_hp_max.value * Updates.updates['defence'].groups['kit'].updates['max'].count;
    if (this.s_hp.value > kitMax) this.s_hp.value = kitMax;
  };

  counterattackSpikes = (enemy) => {
    if (enemy.u_spikes > 0) return;

    enemy.u_spikes = Updates.updates['perimeter'].groups['spikes'].updates['cooldown'].count;
    let damage = this.s_damage.value;

    if (enemy.name === 'Босс') {
      damage *= Updates.updates['perimeter'].groups['spikes'].updates['boss'].count;
    } else {
      damage *= Updates.updates['perimeter'].groups['spikes'].updates['enemy'].count;
    }
    enemy.getDamage(damage);
    Statistic.inc('damage_spikes', damage);
  };
}

export default new Tower();

function getTargetsForShot(towerR) {
  //** Поиск целей внутри периметра **//
  let targets = Enemies.enemies.value.filter((enemy) => Perimeter.r.value >= enemy.distance + towerR);
  if (targets.length === 0) return [];

  //** Отмена удара по тем целям, к которым уже летит достаточное колличество пуль **//
  targets = targets.filter((target) => {
    if (target.s_hp <= 0) return false;
    let targetFutureDamage = 0;
    Bullets.bullets.value.forEach(
      (bullet) => (targetFutureDamage += bullet.target !== target.id ? 0 : bullet.s_damage),
    );
    return target.s_hp > targetFutureDamage;
  });

  //** Разделение целей на прилягающие и не прилягающие к башке **//
  let targetsNearTower = [];
  let targetsIsNotNearTower = [];
  targets.forEach((target) => {
    if (target.distance <= 0) targetsNearTower.push(target);
    else targetsIsNotNearTower.push(target);
  });

  //** Сортировка по хп для прилягающих и по дистанции для не прилягающих **//
  targetsNearTower.sort((a, b) => a.s_hp - b.s_hp);
  targetsIsNotNearTower.sort((a, b) => a.distance - b.distance);

  //** Добавление приоритета по прилягающему боссу **//
  const bossId = targetsNearTower.findIndex((enemy) => enemy.name === 'Босс');
  if (bossId !== -1) {
    const boss = targetsNearTower[bossId];
    targetsNearTower.splice(bossId, 1);
    targetsNearTower.unshift(boss);
  }

  return [...targetsNearTower, ...targetsIsNotNearTower];
}

function calculateNumberBulletsWithVolley(targetsForShot) {
  const isVolley = Math.random() <= Updates.updates['attack'].groups['volley'].updates['percent'].count;
  if (!isVolley) return 1;
  Statistic.inc('updates_volley', 1);
  return Math.min(Updates.updates['attack'].groups['volley'].updates['number'].count, targetsForShot.length);
}

function calculateDamageWithCrit(damage) {
  //** Просчет обычного крита **//
  const isCrit = Math.random() <= Updates.updates['attack'].groups['crit'].updates['percent'].count;
  if (!isCrit) return damage;
  Statistic.inc('updates_crit', 1);
  let critDamage = damage * Updates.updates['attack'].groups['crit'].updates['coef'].count;

  //** Просчет мультикрита **//
  const isMulticrit = Math.random() <= Updates.updates['attack'].groups['multicrit'].updates['percent'].count;
  if (!isMulticrit) return critDamage;
  Statistic.inc('updates_multicrit', 1);
  return critDamage * Updates.updates['attack'].groups['multicrit'].updates['coef'].count;
}

function calculateStartRunaway(runawayTime) {
  if (runawayTime.value > 0) return;
  const startRunaway = Math.random() <= Updates.updates['attack'].groups['runaway'].updates['percent'].count;
  if (!startRunaway) return;
  Statistic.inc('updates_runaway', 1);
  runawayTime.value = Updates.updates['attack'].groups['runaway'].updates['duration'].count;
}

function calculateAttackSpead(runawayTime) {
  let baseAttackSpead = Updates.updates['attack'].groups['basic'].updates['spead'].count;
  if (runawayTime.value > 0) baseAttackSpead *= Updates.updates['attack'].groups['runaway'].updates['spead'].count;
  return baseAttackSpead;
}

function calculateStartRevival(hp, hp_max, timer) {
  if (hp.value > 0) return;
  const isRevival = Math.random() <= Updates.updates['defence'].groups['revival'].updates['percent'].count;
  if (!isRevival) return;
  const revivalHeal = hp_max.value * Updates.updates['defence'].groups['revival'].updates['heal'].count;
  hp.value = revivalHeal;
  Statistic.inc('revival_count', 1);
  Statistic.inc('revival_hp', revivalHeal);
  timer.value = Updates.updates['defence'].groups['revival'].updates['duration'].count;
}
