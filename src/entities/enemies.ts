/* eslint-disable no-mixed-operators */
import Particles from '@/entities/particles';
import Sluges from '@/entities/sluges';
import Tower from '@/entities/tower';
import Mines from '@/entities/mines';
import Wall from '@/entities/wall';
import Updates from '@/mechanics/updates';
import CONST from '@/math/const';
import { MyMath, Rotate, Vector } from '@/math/math';
import Messages from '@/services/message';
import Statistic from '@/services/statistic';
import Settings from '@/logic/settings';
import User from '@/logic/user';
import { Ref, ref } from 'vue';
import { IEnemiesParams, IEnemyParams } from '@/types/enemies';

export type TEnemiesClasses = Common | Quick | Tank | Shooter | Boss;
class FactoryEnemy {
  newEnemy(enemiesParams: IEnemiesParams, type: string) {
    if (type === 'random') {
      return this.getRandomEnemy(enemiesParams);
    }
    if (type === 'boss') {
      return new Boss(enemiesParams.boss);
    }
    return new Boss(enemiesParams.boss);
  }

  getRandomEnemy(enemiesParams: IEnemiesParams) {
    let typeEnemy = Math.random();

    if (typeEnemy < enemiesParams.common.percent) return new Common(enemiesParams.common);
    typeEnemy -= enemiesParams.common.percent;

    if (typeEnemy < enemiesParams.quick.percent) return new Quick(enemiesParams.quick);
    typeEnemy -= enemiesParams.quick.percent;

    if (typeEnemy < enemiesParams.tank.percent) return new Tank(enemiesParams.tank);

    return new Shooter(enemiesParams.shooter);
  }
}

class BaseEnemy {
  public name: string = 'BaseEnemy';
  public id: string;

  public size: number;
  public r: number;
  public x: number;
  public y: number;
  public rotate: number;
  public distance: number;
  public distance_wall: number;
  public target: string;

  public coefX: number = 0;
  public coefY: number = 0;

  public u_spikes: number;
  public u_balls: number;

  public s_hp: number;
  public s_hp_max: number;
  public s_cooldown: number;
  public s_damage: number;
  public s_spead: number;
  public s_heft: number;
  public s_awardDollars: number;
  public s_awardCoins: number;
  public s_awardExp: number;
  constructor(enemiesParams: IEnemyParams) {
    this.id = MyMath.randomID();

    this.size = enemiesParams.size * Settings.scaleSize;
    this.r = this.size / 2;
    [this.x, this.y] = MyMath.getStartPositionClear(this.size);
    this.rotate = 0;
    this.distance = 0;
    this.distance_wall = 0;

    this.target = 'Tower';

    this.u_spikes = 0;
    this.u_balls = 0;

    this.s_hp = enemiesParams.hp;
    this.s_hp_max = enemiesParams.hp;
    this.s_cooldown = 0;
    this.s_damage = enemiesParams.damage;
    this.s_spead = enemiesParams.spead * Settings.scaleSpead.value;
    this.s_heft = this.size ** 3 * this.s_spead;
    this.s_awardDollars = enemiesParams.awardDollars;
    this.s_awardCoins = enemiesParams.awardCoins;
    this.s_awardExp = enemiesParams.awardExp;
  }

  getDistanceToTower = () => {
    this.distance = Vector.getVectorLength(this.x, this.y, Tower.x, Tower.y) - this.r - Tower.r;
  };

  getDiscard = (heftDiscard: number, speadDiscard: number) => {
    let discardCoef = heftDiscard / this.s_heft;
    const discardPower = discardCoef * speadDiscard;
    this.x -= this.coefX * discardPower;
    this.y -= this.coefY * discardPower;
    this.getDistanceToTower();
  };

  getDamage = (damage: number) => {
    this.s_hp -= damage;
    Statistic.inc('damage_post', damage);
    Statistic.inc('damage_all', damage);
  };

  death() {
    //** Обновляем валюты **//
    const addDollars = this.s_awardDollars * Updates.updates['money'].groups['enemy'].updates['dollars'].count;
    const addCoins = this.s_awardCoins * Updates.updates['money'].groups['enemy'].updates['coins'].count;
    const addExp = this.s_awardExp * Updates.updates['money'].groups['enemy'].updates['exp'].count;

    Tower.dollars.value += addDollars;
    User.updateCoins(addCoins);
    User.addExp(addExp);

    //** Добавляем визуальные сообщения **//
    Messages.add(`+${MyMath.toText(addDollars, 3)}`);
    Messages.add(`+${MyMath.toText(addCoins, 3)}`, 'yellow', 'coins');
    Messages.add(`+${MyMath.toText(addExp, 3)}`, 'turq', 'exp');

    //** Вызываем партиклы на месте смерти **//
    Particles.newParticles(this.name, this.x, this.y);
    if (this.distance > 0) Mines.newMine(this.x, this.y);

    //** Обновляем статистику **//
    Statistic.inc('dollars_enemies', addDollars);
    Statistic.inc('dollars_all', addDollars);
    Statistic.inc('coins_enemies', addCoins);
    Statistic.inc('coins_all', addCoins);
    Statistic.inc('exp_enemies', addExp);
    Statistic.inc('exp_all', addExp);
    Statistic.inc('kill_enemies');
  }
}

class NearEnemy extends BaseEnemy {
  constructor(enemiesParams: IEnemyParams) {
    super(enemiesParams);
  }

  getMoveDirection = () => {
    [this.coefX, this.coefY] = Vector.getVectorNormalize(this.x, this.y, Tower.x, Tower.y);
  };

  getDistanceToWall = () => {
    this.distance_wall = Vector.getVectorLength(this.x, this.y, Wall.x, Wall.y) - this.r - Wall.r;
  };

  move = () => {
    this.getMoveDirection();

    const newX = this.x + this.coefX * this.s_spead;
    const newY = this.y + this.coefY * this.s_spead;

    const isWall = Wall.status.value === 'ready';
    let isCollision, ABx, ABy;

    if (isWall) {
      [ABx, ABy] = Vector.getVector(newX, newY, Wall.x, Wall.y);
      isCollision = Vector.isCollision(ABx, ABy, this.r, Wall.r);
      this.target = 'Wall';
    } else {
      [ABx, ABy] = Vector.getVector(newX, newY, Tower.x, Tower.y);
      isCollision = Vector.isCollision(ABx, ABy, this.r, Tower.r);
      this.target = 'Tower';
    }

    if (!isCollision) {
      this.x = newX;
      this.y = newY;
      this.rotate = 0;
      this.getDistanceToTower();
      return;
    }

    if (isWall) return this.collisionWithWall(newX, newY, ABx, ABy);
    this.collisionWithTower(newX, newY, ABx, ABy);
  };

  collisionWithTower = (newX: number, newY: number, ABx: number, ABy: number) => {
    const ABd = Vector.getLength(ABx, ABy);
    const [Cx, Cy] = Vector.getNormalize(ABx, ABy, ABd);
    const deepCollision = this.r + Tower.r - ABd;
    this.x = newX - Cx * deepCollision;
    this.y = newY - Cy * deepCollision;
    this.rotate = Rotate.rotatePrecise(ABx, ABy, ABd);
    Tower.counterattackSpikes(this);
    this.getDistanceToTower();
  };

  collisionWithWall = (newX: number, newY: number, ABx: number, ABy: number) => {
    const ABd = Vector.getLength(ABx, ABy);
    const [Cx, Cy] = Vector.getNormalize(ABx, ABy, ABd);
    const deepCollision = this.r + Wall.r - ABd;
    this.x = newX - Cx * deepCollision;
    this.y = newY - Cy * deepCollision;
    this.rotate = Rotate.rotatePrecise(ABx, ABy, ABd);
  };

  attack = (dt: number) => {
    if (this.s_cooldown > 0) this.s_cooldown -= dt;
    if (this.s_cooldown > 0) return;

    if (this.target === 'Tower') {
      if (this.distance > 0) return;
      this.s_cooldown = CONST.ENEMY.COOLDOWN;
      Tower.getDamage(this.s_damage);
      return;
    }

    if (this.target === 'Wall') {
      this.getDistanceToWall();
      if (this.distance_wall > 0) return;
      this.s_cooldown = CONST.ENEMY.COOLDOWN;
      Wall.getDamage(this.s_damage);
    }
  };
}

class FarEnemy extends BaseEnemy {
  constructor(enemiesParams: IEnemyParams) {
    super(enemiesParams);
  }

  move = () => {
    this.getMoveDirection();
    if (this.distance <= Tower.r * 5) return;
    this.x += this.coefX * this.s_spead;
    this.y += this.coefY * this.s_spead;
  };

  getMoveDirection = () => {
    const [ETx, ETy] = Vector.getVector(this.x, this.y, Tower.x, Tower.y);
    const distance = Vector.getLength(ETx, ETy);
    [this.coefX, this.coefY] = Vector.getNormalize(ETx, ETy, distance);
    this.distance = distance - this.r - Tower.r;
    this.rotate = Rotate.rotate(ETx, ETy, distance);
  };
}

class Common extends NearEnemy {
  constructor(enemiesParams: IEnemyParams) {
    super(enemiesParams);
    this.name = 'Обычный';
  }

  death() {
    super.death();
    Statistic.inc('kill_common');
  }
}

class Quick extends NearEnemy {
  constructor(enemiesParams: IEnemyParams) {
    super(enemiesParams);
    this.name = 'Быстрый';
  }

  death() {
    super.death();
    Statistic.inc('kill_quick');
  }
}

class Tank extends NearEnemy {
  constructor(enemiesParams: IEnemyParams) {
    super(enemiesParams);
    this.name = 'Танк';
  }

  death() {
    super.death();
    Statistic.inc('kill_tank');
  }
}

class Shooter extends FarEnemy {
  constructor(enemiesParams: IEnemyParams) {
    super(enemiesParams);
    this.name = 'Стрелок';
  }

  attack = (dt: number) => {
    if (this.s_cooldown > 0) this.s_cooldown -= dt;
    if (this.s_cooldown > 0) return;
    this.getDistanceToTower();
    if (this.distance > Tower.r * 5) return;
    this.s_cooldown = CONST.ENEMY.COOLDOWN;
    Sluges.newSlug(this);
  };

  death() {
    super.death();
    Statistic.inc('kill_shooter');
  }
}

class Boss extends NearEnemy {
  constructor(enemiesParams: IEnemyParams) {
    super(enemiesParams);
    this.name = 'Босс';
  }

  death() {
    super.death();
    Statistic.inc('kill_boss');
  }
}

class Enemies {
  static #onlyInstance: Enemies | null = null;
  public enemies: Ref<Array<TEnemiesClasses>> = ref([]);
  public factory = new FactoryEnemy();
  constructor() {
    if (Enemies.#onlyInstance) return Enemies.#onlyInstance;
    Enemies.#onlyInstance = this;
  }

  init() {
    this.enemies.value = [];
  }

  newEnemy(enemiesParams: IEnemiesParams, type: string) {
    this.enemies.value.push(this.factory.newEnemy(enemiesParams, type));
  }

  getEnemiesParams(gameLvl: number, waveCount: number): IEnemiesParams {
    const hp = Math.floor(Math.pow(waveCount, 1.9 + 0.1 * MyMath.round(waveCount / 100)));
    const damage = 1 + Math.floor(Math.pow(waveCount, 1.5 + 0.1 * MyMath.round(waveCount / 150)));
    const spead = MyMath.round(CONST.ENEMY.SPEAD.BASE + 0.1 * (waveCount / 70));
    const awardDollars = gameLvl * Math.ceil(waveCount / 10);
    const awardCoins = (gameLvl / 8) * Math.ceil(waveCount / 10);
    const awardExp = gameLvl * Math.ceil(waveCount / 100);

    return {
      common: {
        percent: 0.6,
        hp,
        damage,
        spead,
        awardDollars,
        awardCoins,
        awardExp,
        size: CONST.ENEMY.SIZE.COMMON,
        heft: MyMath.round((CONST.ENEMY.SIZE.COMMON ** 3 * spead) / 1000),
      },
      quick: {
        percent: 0.2,
        hp,
        damage,
        spead: MyMath.round(spead * CONST.ENEMY.SPEAD.COEF_QUICK),
        awardDollars: awardDollars * CONST.ENEMY.VALUTE.COEF_QUICK,
        awardCoins: awardCoins * CONST.ENEMY.VALUTE.COEF_QUICK,
        awardExp: awardExp * CONST.ENEMY.VALUTE.COEF_QUICK,
        size: CONST.ENEMY.SIZE.COMMON,
        heft: MyMath.round((CONST.ENEMY.SIZE.COMMON ** 3 * spead * CONST.ENEMY.SPEAD.COEF_QUICK) / 1000),
      },
      tank: {
        percent: 0.1,
        hp: hp * CONST.ENEMY.HP.COEF_TANK,
        damage: damage * CONST.ENEMY.DAMAGE.COEF_TANK,
        spead: MyMath.round(spead * CONST.ENEMY.SPEAD.COEF_TANK),
        awardDollars: awardDollars * CONST.ENEMY.VALUTE.COEF_TANK,
        awardCoins: awardCoins * CONST.ENEMY.VALUTE.COEF_TANK,
        awardExp: awardExp * CONST.ENEMY.VALUTE.COEF_TANK,
        size: CONST.ENEMY.SIZE.TANK,
        heft: MyMath.round((CONST.ENEMY.SIZE.TANK ** 3 * spead * CONST.ENEMY.SPEAD.COEF_TANK) / 1000),
      },
      shooter: {
        percent: 0.1,
        hp,
        damage,
        spead,
        awardDollars,
        awardCoins,
        awardExp,
        size: CONST.ENEMY.SIZE.COMMON,
        heft: MyMath.round((CONST.ENEMY.SIZE.COMMON ** 3 * spead) / 1000),
      },
      boss: {
        percent: waveCount % 10 === 0 ? 1 : 0,
        hp: hp * CONST.ENEMY.HP.COEF_BOSS,
        damage: damage * CONST.ENEMY.DAMAGE.COEF_BOSS,
        spead: MyMath.round(spead * CONST.ENEMY.SPEAD.COEF_BOSS),
        awardDollars: awardDollars * CONST.ENEMY.VALUTE.COEF_BOSS,
        awardCoins: awardCoins * CONST.ENEMY.VALUTE.COEF_BOSS,
        awardExp: awardExp * CONST.ENEMY.VALUTE.COEF_BOSS,
        size: CONST.ENEMY.SIZE.BOSS,
        heft: MyMath.round((CONST.ENEMY.SIZE.BOSS ** 3 * spead * CONST.ENEMY.SPEAD.COEF_BOSS) / 1000),
      },
    };
  }

  move(dt: number) {
    this.enemies.value.forEach((enemy) => {
      if (enemy.u_spikes > 0) enemy.u_spikes -= dt;
      if (enemy.u_balls > 0) enemy.u_balls -= dt;
      enemy.move();
      this.enemiesCollision(enemy);
    });
  }

  enemiesCollision(enemy: TEnemiesClasses) {
    // * Формируем дерево квадрантов
    let quadtree = new Map();
    this.enemies.value.forEach((enemy) => {
      const key = Math.floor(enemy.x / CONST.ENEMY.SIZE.TANK) + '_' + Math.floor(enemy.y / CONST.ENEMY.SIZE.TANK);
      if (!quadtree.has(key)) quadtree.set(key, []);
      quadtree.set(key, [...quadtree.get(key), enemy]);
    });
    let quadEnemies: Array<TEnemiesClasses> = [];
    // * Получаем текущий квадрант
    const key = Math.floor(enemy.x / CONST.ENEMY.SIZE.TANK) + '_' + Math.floor(enemy.y / CONST.ENEMY.SIZE.TANK);
    // * Получаем соседние квадранты
    const [quadW, quadH] = key.split('_');
    for (let w = -1; w <= 1; w++) {
      for (let h = -1; h <= 1; h++) {
        const key = `${+quadW + w}_${+quadH + h}`;
        if (quadtree.has(key)) quadEnemies.push(...quadtree.get(key));
      }
    }
    if (quadEnemies.length <= 1) return;

    quadEnemies.forEach((second) => {
      // console.log();
      if (second.id === enemy.id) return;
      const [ABx, ABy] = Vector.getVector(enemy.x, enemy.y, second.x, second.y);
      const isCollision = Vector.isCollision(ABx, ABy, enemy.r, second.r);
      if (!isCollision) return;
      const ABd = Vector.getLength(ABx, ABy);
      const [Cx, Cy] = Vector.getNormalize(ABx, ABy, ABd);
      if (second.s_heft === enemy.s_heft) {
        const deepCollision = enemy.r + second.r - ABd;
        enemy.x -= Cx * deepCollision;
        enemy.y -= Cy * deepCollision;
      } else {
        const deepCollision = (enemy.r + second.r - ABd) / 2;
        const heftEnemy = second.s_heft / enemy.s_heft;
        const heftSecond = 1 - heftEnemy;
        enemy.x -= Cx * deepCollision * heftEnemy;
        enemy.y -= Cy * deepCollision * heftEnemy;
        second.x -= Cx * deepCollision * heftSecond;
        second.y -= Cy * deepCollision * heftSecond;
      }
    });
  }

  attack(dt: number) {
    this.enemies.value.forEach((enemy) => enemy.attack(dt));
  }

  death() {
    this.enemies.value = this.enemies.value.filter((enemy) => {
      if (enemy.s_hp > 0) return true;
      enemy.death();
      return false;
    });
  }
}

export default new Enemies();
