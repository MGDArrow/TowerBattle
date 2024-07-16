/* eslint-disable no-mixed-operators */
import { MyMath } from '@/math/math';
import CONST from '@/math/const';
import Settings from '@/logic/settings';
import User from '@/logic/user';

const ATTACK_UPDATES = {
  basic: {
    name: 'Базовые улучшения',
    lvl_access: 1,
    updates: {
      damage: {
        name: 'Урон башни',
        icon: 'sword',
        get description() {
          return `Увеличивает базовый урон башни по врагам. Текущее значение — ${this.text}`;
        },
        favorite: true,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = User.lvl.value.lvl * 100;
          return Math.min(lvl_max, 5000);
        },
        get count() {
          return (this.lvl + this.lvl_const) * 2;
        },
        get text() {
          return MyMath.toText(this.count);
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
      spead: {
        name: 'Скорость атаки',
        icon: 'reload',
        get description() {
          return `Увеличивает базовую скорость атаки башни. Текущее значение — ${this.text}`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = User.lvl.value.lvl * 10;
          return Math.min(lvl_max, 100);
        },
        get count() {
          return 0.95 + (this.lvl + this.lvl_const) * 0.05;
        },
        get text() {
          return MyMath.round(this.count);
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
    },
  },
  crit: {
    name: 'Критический урон',
    lvl_access: 4,
    updates: {
      percent: {
        name: 'Шанс критического удара',
        icon: 'crit-proc',
        get description() {
          return `Шанс ${this.text} нанести критический удар по врагу`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = (User.lvl.value.lvl - 3) * 10;
          return Math.min(lvl_max, 100);
        },
        get count() {
          if (this.lvl_max <= 0) return 0;
          return (this.lvl + this.lvl_const) * 0.008;
        },
        get text() {
          return `${MyMath.round(this.count * 100, 1)}%`;
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
      coef: {
        name: 'Множитель критического удара',
        icon: 'crit-coeff',
        get description() {
          return `Умножает урон на ${this.text} при критической атаке по врагу`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = (User.lvl.value.lvl - 3) * 10;
          return Math.min(lvl_max, 150);
        },
        get count() {
          return 1 + (this.lvl + this.lvl_const) * 0.16;
        },
        get text() {
          return `x${MyMath.round(this.count)}`;
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
    },
  },
  volley: {
    name: 'Залп',
    lvl_access: 7,
    updates: {
      percent: {
        name: 'Шанс залпа',
        icon: 'volley-percent',
        get description() {
          return `Шанс ${this.text} совершить залп и ударить одновременно несколько целей`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = (User.lvl.value.lvl - 6) * 10;
          return Math.min(lvl_max, 100);
        },
        get count() {
          if (this.lvl_max <= 0) return 0;
          return (this.lvl + this.lvl_const) * 0.005;
        },
        get text() {
          return `${MyMath.round(this.count * 100, 1)}%`;
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
      number: {
        name: 'Количество целей залпа',
        icon: 'volley',
        get description() {
          return `Количество целей при ударе залпом. Текущее значение — ${this.text}`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = (User.lvl.value.lvl - 6) * 10;
          return Math.min(lvl_max, 100);
        },
        get count() {
          return 1 + (this.lvl + this.lvl_const) * 1;
        },
        get text() {
          return this.count;
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
    },
  },
  runaway: {
    name: 'Беглый огонь',
    lvl_access: 14,
    updates: {
      percent: {
        name: 'Шанс беглого огня',
        icon: 'runaway-percent',
        get description() {
          return `Шанс ${this.text} совершить серию выстрелов подряд с уменьшенной перезарядкой`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = (User.lvl.value.lvl - 13) * 10;
          return Math.min(lvl_max, 100);
        },
        get count() {
          if (this.lvl_max <= 0) return 0;
          return (this.lvl + this.lvl_const) * 0.0035;
        },
        get text() {
          return `${MyMath.round(this.count * 100, 2)}%`;
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
      spead: {
        name: 'Скорость беглого огня',
        icon: 'runaway-spead',
        get description() {
          return `Ускоряет перезарядку на ${this.text} при беглом огне (от базовой скорости атаки башни)`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = (User.lvl.value.lvl - 13) * 5;
          return Math.min(lvl_max, 50);
        },
        get count() {
          return 1 + (this.lvl + this.lvl_const) * 0.15;
        },
        get text() {
          return `x${MyMath.round(this.count)}`;
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
      duration: {
        name: 'Длительность беглого огня',
        icon: 'runaway-duration',
        get description() {
          return `Длительность действия эффекта беглого огня. Текущее значение — ${this.text}`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = (User.lvl.value.lvl - 13) * 4;
          return Math.min(lvl_max, 40);
        },
        get count() {
          return (this.lvl + this.lvl_const) * 200;
        },
        get text() {
          return `${MyMath.round(this.count / 1000, 2)}с.`;
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
    },
  },
  bounce: {
    name: 'Отскок снаряда',
    lvl_access: 18,
    updates: {
      percent: {
        name: 'Шанс отскока',
        icon: 'bounce-percent',
        get description() {
          return `Шанс ${this.text} отскока снаряда к другой цели`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = (User.lvl.value.lvl - 17) * 10;
          return Math.min(lvl_max, 100);
        },
        get count() {
          if (this.lvl_max <= 0) return 0;
          return (this.lvl + this.lvl_const) * 0.007;
        },
        get text() {
          return `${MyMath.round(this.count * 100, 2)}%`;
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
      number: {
        name: 'Количество отскоков',
        icon: 'bounce',
        get description() {
          return `Максимальное количество отскоков снаряда (шанс просчитывается для каждого отскока). Текущее значение — ${this.text}`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = User.lvl.value.lvl - 17;
          return Math.min(lvl_max, 5);
        },
        get count() {
          return 1 + (this.lvl + this.lvl_const) * 1;
        },
        get text() {
          return this.count;
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
      range: {
        name: 'Дальность отскока',
        icon: 'bounce-range',
        get description() {
          return `Максимальная дальность отскока снаряда. Текущее значение — ${this.text}`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = (User.lvl.value.lvl - 17) * 5;
          return Math.min(lvl_max, 50);
        },
        get count() {
          return 100 + (this.lvl + this.lvl_const) * 2;
        },
        get text() {
          return `${this.count}м.`;
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
    },
  },
  multicrit: {
    name: 'Мультикрит',
    lvl_access: 35,
    updates: {
      percent: {
        name: 'Шанс мультикрита',
        icon: 'multicrit-percent',
        get description() {
          return `Шанс ${this.text} умножить урон критического удара`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = (User.lvl.value.lvl - 34) * 10;
          return Math.min(lvl_max, 100);
        },
        get count() {
          if (this.lvl_max <= 0) return 0;
          return (this.lvl + this.lvl_const) * 0.002;
        },
        get text() {
          return `${MyMath.round(this.count * 100, 1)}%`;
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
      coef: {
        name: 'Множитель мультикрита',
        icon: 'multicrit-coef',
        get description() {
          return `Умножает урон на ${this.text} при мультикритической атаке по врагу`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = (User.lvl.value.lvl - 34) * 10;
          return Math.min(lvl_max, 100);
        },
        get count() {
          return 1 + (this.lvl + this.lvl_const) * 0.04;
        },
        get text() {
          return `x${MyMath.round(this.count)}`;
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
    },
  },
};

const DEFENCE_UPDATES = {
  basic: {
    name: 'Базовые улучшения',
    lvl_access: 1,
    updates: {
      hp: {
        name: 'Здоровье башни',
        icon: 'hp',
        get description() {
          return `Максимальное здоровье башни. Текущее значение — ${this.text}`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = User.lvl.value.lvl * 100;
          return Math.min(lvl_max, 5000);
        },
        get count() {
          return (this.lvl + this.lvl_const) * 25;
        },
        get text() {
          return MyMath.toText(this.count);
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
      regen: {
        name: 'Регенерация здоровья',
        icon: 'regen',
        get description() {
          return `Восстанавливает башне каждую секунду ${this.text} здоровья`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = User.lvl.value.lvl * 100;
          return Math.min(lvl_max, 5000);
        },
        get count() {
          return (this.lvl + this.lvl_const) * 1;
        },
        get text() {
          return MyMath.toText(this.count);
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
    },
  },
  guard: {
    name: 'Защита',
    lvl_access: 3,
    updates: {
      percent: {
        name: 'Защита',
        icon: 'shield-percent',
        get description() {
          return `Уменьшает весь получаемый урон на ${this.text}`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = (User.lvl.value.lvl - 2) * 10;
          return Math.min(lvl_max, 100);
        },
        get count() {
          if (this.lvl_max <= 0) return 0;
          return (this.lvl + this.lvl_const) * 0.005;
        },
        get text() {
          return `${MyMath.round(this.count * 100, 1)}%`;
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
      count: {
        name: 'Абсолютная защита',
        icon: 'shield',
        get description() {
          return `Уменьшает получаемый урон на ${this.text} (применяется после процентной защиты)`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = (User.lvl.value.lvl - 2) * 100;
          return Math.min(lvl_max, 5000);
        },
        get count() {
          if (this.lvl_max <= 0) return 0;
          return (this.lvl + this.lvl_const) * 2;
        },
        get text() {
          return MyMath.toText(this.count);
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
    },
  },
  vampiric: {
    name: 'Вампиризм',
    lvl_access: 8,
    updates: {
      percent: {
        name: 'Шанс вампиризма',
        icon: 'vampiric-percent',
        get description() {
          return `Шанс ${this.text} восстановить здоровье башни при атаке врагов`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = (User.lvl.value.lvl - 7) * 5;
          return Math.min(lvl_max, 45);
        },
        get count() {
          if (this.lvl_max <= 0) return 0;
          return 0.5 + (this.lvl + this.lvl_const) * 0.01;
        },
        get text() {
          return `${MyMath.round(this.count * 100, 1)}%`;
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
      count: {
        name: 'Вампиризм',
        icon: 'bat',
        get description() {
          return `Восстанавливает ${this.text} здоровья при ударе с вампиризмом`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = (User.lvl.value.lvl - 7) * 10;
          return Math.min(lvl_max, 150);
        },
        get count() {
          return (this.lvl + this.lvl_const) * 0.0003;
        },
        get text() {
          return `${MyMath.round(this.count * 100, 2)}%`;
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
    },
  },
  discard: {
    name: 'Отбрасывание',
    lvl_access: 10,
    updates: {
      percent: {
        name: 'Шанс отбрасывания',
        icon: 'discard-percent',
        get description() {
          return `Шанс ${this.text} отбросить врага при попадании снаряда`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = (User.lvl.value.lvl - 9) * 10;
          return Math.min(lvl_max, 100);
        },
        get count() {
          if (this.lvl_max <= 0) return 0;
          return (this.lvl + this.lvl_const) * 0.0095;
        },
        get text() {
          return `${MyMath.round(this.count * 100, 2)}%`;
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
      count: {
        name: 'Вес снаряда',
        icon: 'discard-heft',
        get description() {
          return `Вес удара снаряда для отбрасывания врага. Текущее значение — ${this.text}`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = (User.lvl.value.lvl - 9) * 20;
          return Math.min(lvl_max, 200);
        },
        get count() {
          const bulletSize = CONST.BULLET.SIZE * Settings.scaleSize;
          const bulletSpead = CONST.BULLET.SPEAD * Settings.scaleSpead.value;
          const bulletHeft = MyMath.round(bulletSize ** 3 * bulletSpead, 0);
          return (this.lvl + this.lvl_const) * 2 * bulletHeft;
        },
        get text() {
          const bulletHeft = MyMath.round((CONST.BULLET.SIZE ** 3 * CONST.BULLET.SPEAD) / 1000, 1);
          const bulletHeftText = (this.lvl + this.lvl_const) * 2 * bulletHeft;
          return `${MyMath.round(bulletHeftText)} кг`;
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
    },
  },
  revival: {
    name: 'Возрождение',
    lvl_access: 16,
    updates: {
      percent: {
        name: 'Шанс возрождения',
        icon: 'revival-percent',
        get description() {
          return `Шанс ${this.text} при получении смертельной атаки продолжить игру и восстановить жизни`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = (User.lvl.value.lvl - 15) * 100;
          return Math.min(lvl_max, 1000);
        },
        get count() {
          if (this.lvl_max <= 0) return 0;
          return 0.1 + (this.lvl + this.lvl_const) * 0.0004;
        },
        get text() {
          return `${MyMath.round(this.count * 100, 2)}%`;
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
      heal: {
        name: 'Восстановление здоровья',
        icon: 'revival-heal',
        get description() {
          return `Восстанавливает ${this.text} от максимального здоровья при возрождении`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = (User.lvl.value.lvl - 15) * 50;
          return Math.min(lvl_max, 500);
        },
        get count() {
          return 0.1 + (this.lvl + this.lvl_const) * 0.0006;
        },
        get text() {
          return `${MyMath.round(this.count * 100, 2)}%`;
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
      duration: {
        name: 'Защита возрождения',
        icon: 'revival-shield',
        get description() {
          return `В течении ${this.text} после возрождения башня не будет получать урон`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = (User.lvl.value.lvl - 15) * 10;
          return Math.min(lvl_max, 100);
        },
        get count() {
          return (this.lvl + this.lvl_const) * 20;
        },
        get text() {
          return `${MyMath.round(this.count / 1000, 2)}с.`;
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
    },
  },
  kit: {
    name: 'Пакет здоровья',
    lvl_access: 28,
    updates: {
      percent: {
        name: 'Шанс аптечки',
        icon: 'kit-percent',
        get description() {
          return `Шанс ${this.text} возникновения аптечки при окончании волны`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = (User.lvl.value.lvl - 27) * 20;
          return Math.min(lvl_max, 200);
        },
        get count() {
          if (this.lvl_max <= 0) return 0;
          return 0.1 + (this.lvl + this.lvl_const) * 0.002;
        },
        get text() {
          return `${MyMath.round(this.count * 100, 2)}%`;
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
      heal: {
        name: 'Восстановление аптечки',
        icon: 'kit-heal',
        get description() {
          return `Прибавляет ${this.text} от максимального здоровья`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = (User.lvl.value.lvl - 27) * 20;
          return Math.min(lvl_max, 200);
        },
        get count() {
          return 0.1 + (this.lvl + this.lvl_const) * 0.0025;
        },
        get text() {
          return `${MyMath.round(this.count * 100, 2)}%`;
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
      max: {
        name: 'Переполнение здоровья',
        icon: 'kit-shield',
        get description() {
          return `Добавляет переполнение максимального здоровья башни на ${this.text}, которое восполняется только аптечками (Множитель указывает максимальное здоровье с переполнением)`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = (User.lvl.value.lvl - 27) * 150;
          return Math.min(lvl_max, 1500);
        },
        get count() {
          return 1 + (this.lvl + this.lvl_const) * 0.01;
        },
        get text() {
          return `x${MyMath.round(this.count)}`;
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
    },
  },
};

const PERIMETER_UPDATES = {
  basic: {
    name: 'Базовые улучшения',
    lvl_access: 1,
    updates: {
      radius: {
        name: 'Радиус периметра',
        icon: 'perimeter',
        get description() {
          return `Длина радиуса периметра (влияет на дальность атаки башни). Текущее значение — ${this.text}`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = User.lvl.value.lvl * 10;
          return Math.min(lvl_max, 100);
        },
        //** По факту является SIZE круга, а не радиусом **//
        get count() {
          return CONST.PERIMETER.SIZE_BASE + (this.lvl + this.lvl_const) * 2;
        },
        get text() {
          return `${MyMath.round(this.count / 2, 0)}м.`;
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
    },
  },
  spikes: {
    name: 'Шипы',
    lvl_access: 5,
    updates: {
      cooldown: {
        name: 'Перезарядка шипов',
        icon: 'spikes-cooldown',
        get description() {
          return `Частота удара шипов (для каждого врага своя перезарядка удара). Текущее значение — ${this.text}`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = (User.lvl.value.lvl - 4) * 10;
          return Math.min(lvl_max, 100);
        },
        get count() {
          return 5000 - (this.lvl + this.lvl_const) * 40;
        },
        get text() {
          return `${MyMath.round(this.count / 1000, 2)}с.`;
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
      enemy: {
        name: 'Шипы по врагам',
        icon: 'spikes-enemy',
        get description() {
          return `Наносит ${this.text} от урона башни по врагам, при их прикосновении к башне (Стрелки получают урон при попадании их путь по башне)`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = (User.lvl.value.lvl - 4) * 10;
          return Math.min(lvl_max, 100);
        },
        get count() {
          if (this.lvl_max <= 0) return 0;
          return (this.lvl + this.lvl_const) * 0.01;
        },
        get text() {
          return `${MyMath.round(this.count * 100, 1)}%`;
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
      boss: {
        name: 'Шипы по боссу',
        icon: 'spikes-boss',
        get description() {
          return `Наносит ${this.text} от урона башни по боссу, при прикосновении к башне`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = (User.lvl.value.lvl - 4) * 10;
          return Math.min(lvl_max, 100);
        },
        get count() {
          if (this.lvl_max <= 0) return 0;
          return (this.lvl + this.lvl_const) * 0.002;
        },
        get text() {
          return `${MyMath.round(this.count * 100, 1)}%`;
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
    },
  },
  discard: {
    name: 'Волна отбрасывания',
    lvl_access: 9,
    updates: {
      cooldown: {
        name: 'Интервал волны',
        icon: 'discardwave-cooldown',
        get description() {
          return `С интервалом ${this.text} появляется волна, отбрасывающая врагов`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = (User.lvl.value.lvl - 8) * 20;
          return Math.min(lvl_max, 200);
        },
        get count() {
          return CONST.DISCARD_WAVE.COOLDOWN - (this.lvl + this.lvl_const) * 50;
        },
        get text() {
          return `${MyMath.round(this.count / 1000, 2)}с.`;
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
      count: {
        name: 'Сила отбрасывания',
        icon: 'discardwave-heft',
        get description() {
          return `Волна отбрасывает врагов с силой ${this.text}`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = (User.lvl.value.lvl - 8) * 20;
          return Math.min(lvl_max, 200);
        },
        get count() {
          const discardSize = CONST.DISCARD_WAVE.SIZE * Settings.scaleSize;
          const discardSpead = CONST.DISCARD_WAVE.SPEAD * Settings.scaleSpead.value;
          const discardHeft = MyMath.round(discardSize ** 3 * discardSpead, 0);
          return (this.lvl + this.lvl_const) * 2 * discardHeft;
        },
        get text() {
          const discardHeft = MyMath.round((CONST.DISCARD_WAVE.SIZE ** 3 * CONST.DISCARD_WAVE.SPEAD) / 1000, 1);
          const discardHeftText = (this.lvl + this.lvl_const) * 2 * discardHeft;
          return `${MyMath.round(discardHeftText)} кг`;
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
    },
  },
  mines: {
    name: 'Мины',
    lvl_access: 12,
    updates: {
      percent: {
        name: 'Шанс появления',
        icon: 'mines-percent',
        get description() {
          return `Шанс ${this.text} возникновения мины после смерти врага`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = (User.lvl.value.lvl - 11) * 20;
          return Math.min(lvl_max, 200);
        },
        get count() {
          if (this.lvl_max <= 0) return 0;
          return (this.lvl + this.lvl_const) * 0.001;
        },
        get text() {
          return `${MyMath.round(this.count * 100)}%`;
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
      damage: {
        name: 'Урон мины',
        icon: 'mines-damage',
        get description() {
          return `Урон мины ${this.text} от базовой атаки башни`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = (User.lvl.value.lvl - 11) * 100;
          return Math.min(lvl_max, 1000);
        },
        get count() {
          return 1 + (this.lvl + this.lvl_const) * 0.019;
        },
        get text() {
          return `${MyMath.round(this.count * 100)}%`;
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
      radius: {
        name: 'Радиус подрыва',
        icon: 'mines-radius',
        get description() {
          return `Радиуса подрыва мины. Текущее значение — ${this.text}`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = (User.lvl.value.lvl - 11) * 10;
          return Math.min(lvl_max, 100);
        },
        //** По факту является SIZE круга, а не радиусом **//
        get count() {
          return CONST.MINE.SIZE + (this.lvl + this.lvl_const) * 0.64;
        },
        get text() {
          return `${MyMath.round(this.count / 2, 1)}м.`;
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
    },
  },
  balls: {
    name: 'Шары',
    lvl_access: 20,
    updates: {
      number: {
        name: 'Количество шаров',
        icon: 'balls',
        get description() {
          return `Количетсво шаров, летающих вокруг башни и наносящих урон врагам. Текущее значение — ${this.text}`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = User.lvl.value.lvl - 19;
          return Math.min(lvl_max, 4);
        },
        get count() {
          if (this.lvl_max <= 0) return 0;
          return this.lvl + this.lvl_const;
        },
        get text() {
          return this.count;
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
      spead: {
        name: 'Скорость шаров',
        icon: 'balls-spead',
        get description() {
          return `Скорость движения шаров вокруг башни. Текущее значение — ${this.text}`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = (User.lvl.value.lvl - 19) * 25;
          return Math.min(lvl_max, 250);
        },
        get count() {
          const BALLS_SPEAD = 2.5;
          return BALLS_SPEAD + (this.lvl + this.lvl_const) * 0.01;
        },
        get text() {
          return `${MyMath.round(this.count * 60, 1)}м/с`;
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
      damage: {
        name: 'Урон шаров',
        icon: 'balls-damage',
        get description() {
          return `Наносит ${this.text} урона обыным врагам и ${MyMath.round(this.count * 5, 3)}% боссу от их максимального здоровья. (Урон наноситьяс не чаще, чем раз в секунду)`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = (User.lvl.value.lvl - 19) * 20;
          return Math.min(lvl_max, 200);
        },
        get count() {
          return (this.lvl + this.lvl_const) * 0.005;
        },
        get text() {
          return `${MyMath.round(this.count * 100)}%`;
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
    },
  },
  wall: {
    name: 'Стена',
    lvl_access: 30,
    updates: {
      building: {
        name: 'Длительность постройки',
        icon: 'wall-build',
        get description() {
          return `Длительность постройки стены. Текущее значение — ${this.text}`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = (User.lvl.value.lvl - 29) * 100;
          return Math.min(lvl_max, 1000);
        },
        get count() {
          return CONST.WALL.BUILDING_TIME - (this.lvl + this.lvl_const) * 299.2;
        },
        get text() {
          return `${MyMath.toTime(this.count)}`;
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
      percent: {
        name: 'Здоровье стены',
        icon: 'wall',
        get description() {
          return `Максимальное здоровье стены — ${this.text} от здоровья башни в момент постройки`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = (User.lvl.value.lvl - 29) * 120;
          return Math.min(lvl_max, 1200);
        },
        get count() {
          return 0.3 + (this.lvl + this.lvl_const) * 0.001;
        },
        get text() {
          return `${MyMath.round(this.count * 100)}%`;
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
    },
  },
};

const MONEY_UPDATES = {
  basic: {
    name: 'Базовые улучшения',
    lvl_access: 1,
    updates: {
      dollars: {
        name: 'Валюта за волну',
        icon: 'wave-dollars',
        get description() {
          return `Награда ${this.text} валюты за волну`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = User.lvl.value.lvl * 25;
          return Math.min(lvl_max, 500);
        },
        get count() {
          return 10 + (this.lvl + this.lvl_const) * 1.98;
        },
        get text() {
          return `${MyMath.round(this.count)}`;
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
      coins: {
        name: 'Монеты за волну',
        icon: 'wave-coins',
        get description() {
          return `Награда ${this.text} монет за волну`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = User.lvl.value.lvl * 25;
          return Math.min(lvl_max, 500);
        },
        get count() {
          return 1.25 + (this.lvl + this.lvl_const) * 0.2475;
        },
        get text() {
          return `${MyMath.round(this.count)}`;
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
      exp: {
        name: 'Опыт за волну',
        icon: 'wave-exp',
        get description() {
          return `Награда ${this.text} опыта за волну`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = User.lvl.value.lvl * 25;
          return Math.min(lvl_max, 500);
        },
        get count() {
          return 1.25 + (this.lvl + this.lvl_const) * 0.1575;
        },
        get text() {
          return `${MyMath.round(this.count)}`;
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
    },
  },
  enemy: {
    name: 'Награда за врага',
    lvl_access: 2,
    updates: {
      dollars: {
        name: 'Валюта за врага',
        icon: 'enemy-dollars',
        get description() {
          return `Умножает на ${this.text} получаемую валюту при убийстве врага`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = (User.lvl.value.lvl - 1) * 20;
          return Math.min(lvl_max, 200);
        },
        get count() {
          if (this.lvl_max <= 0) return 1;
          return 1 + (this.lvl + this.lvl_const) * 0.01;
        },
        get text() {
          return `x${MyMath.round(this.count)}`;
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
      coins: {
        name: 'Монеты за врага',
        icon: 'enemy-coins',
        get description() {
          return `Умножает на ${this.text} получаемые монеты при убийстве врага`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = (User.lvl.value.lvl - 1) * 20;
          return Math.min(lvl_max, 200);
        },
        get count() {
          if (this.lvl_max <= 0) return 1;
          return 1 + (this.lvl + this.lvl_const) * 0.01;
        },
        get text() {
          return `x${MyMath.round(this.count)}`;
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
      exp: {
        name: 'Опыт за врага',
        icon: 'enemy-exp',
        get description() {
          return `Умножает на ${this.text} получаемый опыт при убийстве врага`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = (User.lvl.value.lvl - 1) * 20;
          return Math.min(lvl_max, 200);
        },
        get count() {
          if (this.lvl_max <= 0) return 1;
          return 1 + (this.lvl + this.lvl_const) * 0.01;
        },
        get text() {
          return `x${MyMath.round(this.count)}`;
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
    },
  },
  deposit: {
    name: 'Депозит',
    lvl_access: 6,
    updates: {
      percent: {
        name: 'Проценты депозита',
        icon: 'deposit-percent',
        get description() {
          return `Депозит составляет ${this.text} от текущей валюты башни`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = (User.lvl.value.lvl - 5) * 25;
          return Math.min(lvl_max, 250);
        },
        get count() {
          return 0.01 + (this.lvl + this.lvl_const) * 0.00026;
        },
        get text() {
          return `${MyMath.round(this.count * 100)}%`;
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
      max: {
        name: 'Максимальный депозит',
        icon: 'deposit-dollars',
        get description() {
          return `Максимальная сумма депозита ${this.text} валюты`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = (User.lvl.value.lvl - 5) * 5;
          return Math.min(lvl_max, 25);
        },
        get count() {
          return 30 * 2 ** (this.lvl + this.lvl_const - 1);
        },
        get text() {
          return `${MyMath.toText(this.count)}`;
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
      cooldown: {
        name: 'Интервал депозита',
        icon: 'deposit-cooldown',
        get description() {
          return `С интервалом ${this.text} появляется волна, отбрасывающая врагов`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = (User.lvl.value.lvl - 5) * 25;
          return Math.min(lvl_max, 250);
        },
        get count() {
          return CONST.PACK.DEPOSIT.COOLDOWN - (this.lvl + this.lvl_const) * 100;
        },
        get text() {
          return `${MyMath.round(this.count / 1000)}с.`;
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
    },
  },
  free: {
    name: 'Бесплатные улучшения',
    lvl_access: 25,
    updates: {
      attack: {
        name: 'Улучшение атаки',
        icon: 'freeup-attack',
        get description() {
          return `Шанс ${this.text} бесплатно получить одно из улучшений из группы атаки в конце волны`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = (User.lvl.value.lvl - 24) * 50;
          return Math.min(lvl_max, 500);
        },
        get count() {
          if (this.lvl_max <= 0) return 0;
          return 0.05 + (this.lvl + this.lvl_const) * 0.0009;
        },
        get text() {
          return `${MyMath.round(this.count * 100, 2)}%`;
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
      defence: {
        name: 'Улучшение защиты',
        icon: 'freeup-defence',
        get description() {
          return `Шанс ${this.text} бесплатно получить одно из улучшений из группы защиты в конце волны`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = (User.lvl.value.lvl - 24) * 50;
          return Math.min(lvl_max, 500);
        },
        get count() {
          if (this.lvl_max <= 0) return 0;
          return 0.05 + (this.lvl + this.lvl_const) * 0.0009;
        },
        get text() {
          return `${MyMath.round(this.count * 100, 2)}%`;
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
      perimeter: {
        name: 'Улучшение периметра',
        icon: 'freeup-perimeter',
        get description() {
          return `Шанс ${this.text} бесплатно получить одно из улучшений из группы периметра в конце волны`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = (User.lvl.value.lvl - 24) * 50;
          return Math.min(lvl_max, 500);
        },
        get count() {
          if (this.lvl_max <= 0) return 0;
          return 0.05 + (this.lvl + this.lvl_const) * 0.0009;
        },
        get text() {
          return `${MyMath.round(this.count * 100, 2)}%`;
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
      money: {
        name: 'Улучшение экономики',
        icon: 'freeup-money',
        get description() {
          return `Шанс ${this.text} бесплатно получить одно из улучшений из группы экономики в конце волны`;
        },
        favorite: false,
        lvl: 0,
        lvl_const: 1,
        get lvl_max() {
          const lvl_max = (User.lvl.value.lvl - 24) * 50;
          return Math.min(lvl_max, 500);
        },
        get count() {
          if (this.lvl_max <= 0) return 0;
          return 0.05 + (this.lvl + this.lvl_const) * 0.0009;
        },
        get text() {
          return `${MyMath.round(this.count * 100, 2)}%`;
        },
        getPrice(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl + inc));
        },
        getPriceConst(inc = 0) {
          return Math.floor(2 * Math.pow(1.5, this.lvl_const + inc));
        },
      },
    },
  },
};

export default {
  attack: {
    name: 'Атака',
    color: 'red',
    icon: 'sword',
    groups: ATTACK_UPDATES,
  },
  defence: {
    name: 'Защита',
    color: 'basic',
    icon: 'shield',
    groups: DEFENCE_UPDATES,
  },
  perimeter: {
    name: 'Периметр',
    color: 'turq',
    icon: 'perimeter',
    groups: PERIMETER_UPDATES,
  },
  money: {
    name: 'Экономика',
    color: 'yellow',
    icon: 'coins',
    groups: MONEY_UPDATES,
  },
};
