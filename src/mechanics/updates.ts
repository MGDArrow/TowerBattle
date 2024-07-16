/* eslint-disable no-mixed-operators */
import Tower from '@/entities/tower';
import Balls from '@/entities/balls';
import { MyMath } from '@/math/math';
import Messages from '@/services/message';
import Statistic from '@/services/statistic';
import User from '@/logic/user';
import UPDATES from '@/upgrades/updates';
import { ref } from 'vue';

class Updates {
  static #onlyInstance = 0;
  constructor() {
    if (Updates.#onlyInstance) return Updates.#onlyInstance;
    Updates.#onlyInstance = this;

    this._updates = ref(UPDATES);
    this.coef = ref({
      variables: ['x1', 'x5', 'x10', 'x100', 'Max'],
      now: 0,
    });

    this.prototypeLocal();
  }

  get updates() {
    return this._updates.value;
  }

  set updates(updates) {
    this._updates.value = updates;
  }

  prototypeLocal() {
    if (!localStorage.getItem('user_upd')) {
      const updates = [];
      for (let direction in this.updates) {
        for (let groupe in this.updates[direction].groups) {
          for (let upd in this.updates[direction].groups[groupe].updates) {
            updates.push([direction, groupe, upd, this.updates[direction].groups[groupe].updates[upd].lvl_const]);
          }
        }
      }
      localStorage.setItem('user_upd', JSON.stringify(updates));
    }
    const updates = JSON.parse(localStorage.getItem('user_upd'));
    updates.forEach(
      ([direction, groupe, upd, lvl]) => (this._updates.value[direction].groups[groupe].updates[upd].lvl_const = lvl),
    );
  }

  prototypeLocalSet(direction, groupe, upd, coef) {
    let updates = JSON.parse(localStorage.getItem('user_upd'));
    updates.forEach(([d, g, u], i) => {
      if (d === direction && g === groupe && u === upd) updates[i][3] += coef;
    });
    localStorage.setItem('user_upd', JSON.stringify(updates));
  }

  resetUpdates = () => {
    for (let keyDirection in this.updates) {
      for (let keyGroupe in this.updates[keyDirection].groups) {
        for (let keyUpdate in this.updates[keyDirection].groups[keyGroupe].updates) {
          this.updates[keyDirection].groups[keyGroupe].updates[keyUpdate].lvl = 0;
        }
      }
    }
  };

  gameLvlupUpdate = (direction, groupe, upd, coef) => {
    const update = this.updates[direction].groups[groupe].updates[upd];
    if (update.lvl + update.lvl_const >= update.lvl_max) return;

    const price = getCoefPrice(update, coef);
    if (price > Tower.dollars.value) return;

    Tower.dollars.value -= price;
    update.lvl += coef;
    Messages.add(`-${MyMath.toText(price)}`, 'red');
    Statistic.inc('dollars_buying', price);

    this.gameCorrectUpdate(direction, groupe, upd, update, coef);
  };

  gameCorrectUpdate = (direction, groupe, upd, update, coef = 1) => {
    //** Отмена избранного при максимальной прокачке **//
    if (update.lvl_const === update.lvl_max) this.getFavorite(direction, groupe, upd);
    // * Улучшение жизней башни
    if (direction === 'defence' && groupe === 'basic' && upd === 'hp') Tower.s_hp.value += coef * 25;
    // * Добавление шара
    if (direction === 'perimeter' && groupe === 'balls' && upd === 'number') Balls.newBall(coef);
  };

  constLvlupUpdate = (direction, groupe, upd, coef) => {
    const update = this.updates[direction].groups[groupe].updates[upd];
    if (update.lvl + update.lvl_const >= update.lvl_max) return;

    const price = getCoefPriceConst(update, coef);
    if (price > User.valuta.value.coins) return;

    User.updateCoins(-price);
    this.updates[direction].groups[groupe].updates[upd].lvl_const += coef;
    this.prototypeLocalSet(direction, groupe, upd, coef);

    //** Отмена избранного при максимальной прокачке **//
    if (update.lvl_const === update.lvl_max) this.getFavorite(direction, groupe, upd);
  };

  getFavorite = (direction, groupe, upd) => {
    const update = this.updates[direction].groups[groupe].updates[upd];
    update.favorite = !update.favorite;
  };

  upFreeAttack = () => {
    let updates = [];
    for (let groupe in this.updates.attack.groups) {
      for (let upd in this.updates.attack.groups[groupe].updates) {
        const update = this.updates.attack.groups[groupe].updates[upd];
        if (update.lvl + update.lvl_const < update.lvl_max && update.lvl_max > 0) updates.push([groupe, upd, update]);
      }
    }
    if (updates.length === 0) return;
    const freeUpdIndex = Math.floor(MyMath.random(0, updates.length - 1));
    const freeUpd = updates[freeUpdIndex];

    freeUpd[2].lvl += 1;
    Messages.add(`${freeUpd[2].name}`, 'orange', 'free');
    Statistic.inc('updates_free_attack', 1);
    this.gameCorrectUpdate('attack', freeUpd[0], freeUpd[1], freeUpd[2]);
  };

  upFreeDefence = () => {
    let updates = [];
    for (let groupe in this.updates.defence.groups) {
      for (let upd in this.updates.defence.groups[groupe].updates) {
        const update = this.updates.defence.groups[groupe].updates[upd];
        if (update.lvl + update.lvl_const < update.lvl_max && update.lvl_max > 0) updates.push([groupe, upd, update]);
      }
    }
    if (updates.length === 0) return;
    const freeUpdIndex = Math.floor(MyMath.random(0, updates.length - 1));
    const freeUpd = updates[freeUpdIndex];

    freeUpd[2].lvl += 1;
    Messages.add(`${freeUpd[2].name}`, 'orange', 'free');
    Statistic.inc('updates_free_defence', 1);
    this.gameCorrectUpdate('defence', freeUpd[0], freeUpd[1], freeUpd[2]);
  };

  upFreePerimeter = () => {
    let updates = [];
    for (let groupe in this.updates.perimeter.groups) {
      for (let upd in this.updates.perimeter.groups[groupe].updates) {
        const update = this.updates.perimeter.groups[groupe].updates[upd];
        if (update.lvl + update.lvl_const < update.lvl_max && update.lvl_max > 0) updates.push([groupe, upd, update]);
      }
    }
    if (updates.length === 0) return;
    const freeUpdIndex = Math.floor(MyMath.random(0, updates.length - 1));
    const freeUpd = updates[freeUpdIndex];

    freeUpd[2].lvl += 1;
    Messages.add(`${freeUpd[2].name}`, 'orange', 'free');
    Statistic.inc('updates_free_perimeter', 1);
    this.gameCorrectUpdate('perimeter', freeUpd[0], freeUpd[1], freeUpd[2]);
  };

  upFreeMoney = () => {
    let updates = [];
    for (let groupe in this.updates.money.groups) {
      for (let upd in this.updates.money.groups[groupe].updates) {
        const update = this.updates.money.groups[groupe].updates[upd];
        if (update.lvl + update.lvl_const < update.lvl_max && update.lvl_max > 0) updates.push([groupe, upd, update]);
      }
    }
    if (updates.length === 0) return;
    const freeUpdIndex = Math.floor(MyMath.random(0, updates.length - 1));
    const freeUpd = updates[freeUpdIndex];

    freeUpd[2].lvl += 1;
    Messages.add(`${freeUpd[2].name}`, 'orange', 'free');
    Statistic.inc('updates_free_money', 1);
    this.gameCorrectUpdate('money', freeUpd[0], freeUpd[1], freeUpd[2]);
  };
}

function getCoefPrice(update, coef) {
  let price = 0;
  for (let inc = 0; inc < coef; inc++) {
    price += update.getPrice(inc);
  }
  return price;
}
function getCoefPriceConst(update, coef) {
  let price = 0;
  for (let inc = 0; inc < coef; inc++) {
    price += update.getPriceConst(inc);
  }
  return price;
}

export default new Updates();
