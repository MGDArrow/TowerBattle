import { MyMath } from '@/math/math';
import { computed, Ref, ref } from 'vue';

export default class Statistic {
  static statistic = ref({});

  static init() {
    this.statistic.value = {
      // * Игра
      game_time: new StatisticBuilder('Игра', 'Длительность игры', 'text'),
      // * Убийства
      kill_common: new StatisticBuilder('Убийства', 'Убито обычных', 'text'),
      kill_quick: new StatisticBuilder('Убийства', 'Убито быстрых', 'text'),
      kill_tank: new StatisticBuilder('Убийства', 'Убито танков', 'text'),
      kill_shooter: new StatisticBuilder('Убийства', 'Убито стрелков', 'text'),
      kill_boss: new StatisticBuilder('Убийства', 'Убито боссов', 'text'),
      kill_enemies: new StatisticBuilder('Убийства', 'Убито всего', 'text'),
      // * Урон
      damage_post: new StatisticBuilder('Урон', 'Урона нанесено', 'green', 'sword'),
      damage_spikes: new StatisticBuilder('Урон', 'Нанесено шипами', 'green', 'spikes-enemy'),
      damage_mines: new StatisticBuilder('Урон', 'Нанесено минами', 'green', 'mines-damage'),
      damage_balls: new StatisticBuilder('Урон', 'Нанесено шарами', 'green', 'balls'),
      damage_get: new StatisticBuilder('Урон', 'Урона получено', 'red', 'axe'),
      // * Здоровье
      hp_regen: new StatisticBuilder('Здоровье', 'Восстановлено регеном', 'green', 'regen'),
      hp_vampiric: new StatisticBuilder('Здоровье', 'Восстановлено вампиризмом', 'green', 'bat'),
      revival_hp: new StatisticBuilder('Здоровье', 'Восстановлено при возрождении', 'green', 'hp'),
      // kit_hp: new StatisticBuilder('Здоровье', 'Восстановлено аптечками', 'green', 'kit-heal'),
      // * Валюта
      dollars_enemies: new StatisticBuilder('Валюта', 'Получено за врагов', 'green', 'dollar'),
      dollars_waves: new StatisticBuilder('Валюта', 'Получено за волны', 'green', 'dollar'),
      dollars_deposit: new StatisticBuilder('Валюта', 'Получено с депозита', 'green', 'dollar'),
      dollars_buying: new StatisticBuilder('Валюта', 'Потрачено валюты', 'red', 'dollar'),
      // * Монеты
      coins_enemies: new StatisticBuilder('Монеты', 'Получено за врагов', 'green', 'coins'),
      coins_waves: new StatisticBuilder('Монеты', 'Получено за волны', 'green', 'coins'),
      // * Опыт
      exp_enemies: new StatisticBuilder('Опыт', 'Получено за врагов', 'green', 'exp'),
      exp_waves: new StatisticBuilder('Опыт', 'Получено за волны', 'green', 'exp'),
      // * Улучшения
      updates_crit: new StatisticBuilder('Улучшения', 'Критических атак', 'text', 'crit-proc'),
      updates_multicrit: new StatisticBuilder('Улучшения', 'Мультикритических атак', 'text', 'multicrit-percent'),
      updates_volley: new StatisticBuilder('Улучшения', 'Совершено залпов', 'text', 'volley'),
      updates_runaway: new StatisticBuilder('Улучшения', 'Беглых огней', 'text', 'runaway'),
      revival_count: new StatisticBuilder('Улучшения', 'Количество возрождений', 'text', 'skull'),
      updates_kits: new StatisticBuilder('Улучшения', 'Количество аптечек', 'text', 'kit-heal'),
      updates_free_attack: new StatisticBuilder('Улучшения', 'Бесплатных улучшений актаки', 'text', 'freeup-attack'),
      updates_free_defence: new StatisticBuilder('Улучшения', 'Бесплатных улучшений защиты', 'text', 'freeup-defence'),
      updates_free_perimeter: new StatisticBuilder(
        'Улучшения',
        'Бесплатных улучшений периметра',
        'text',
        'freeup-perimeter',
      ),
      updates_free_money: new StatisticBuilder('Улучшения', 'Бесплатных улучшений экономики', 'text', 'freeup-money'),
    };
  }

  static inc(point, inc = 1) {
    this.statistic.value[point].add(inc);
  }
}

class StatisticBuilder {
  private _count: Ref<number>;
  public groupe: string;
  public description: string;
  public color: string;
  public icon: string | boolean;
  constructor(groupe: string, description: string, color = 'green', icon = false) {
    this._count = ref(0);
    this.description = description;
    this.groupe = groupe;
    this.color = color;
    this.icon = icon;
  }

  add = (inc: number) => {
    this.count = inc;
  };

  get count(): string {
    return MyMath.toText(this._count);
  }

  set count(inc: number) {
    this._count.value += inc;
  }
}

Statistic.statistic.value.dollars_persec = StatisticPerSec(
  'Валюта',
  'Валюты в секунду',
  'text',
  'dollar',
  [Statistic.statistic.value.dollars_enemies, Statistic.statistic.value.dollars_waves],
  Statistic.statistic.value.game_time,
);

Statistic.statistic.value.coins_persec = StatisticPerSec(
  'Монеты',
  'Монет в секунду',
  'text',
  'coins',
  [Statistic.statistic.value.coins_enemies, Statistic.statistic.value.coins_waves],
  Statistic.statistic.value.game_time,
);

function StatisticPerSec(groupe, description, color = 'green', icon = false, val, time) {
  return {
    groupe,
    description,
    color,
    icon,
    perSec: true,
    _count: computed(() => {
      return MyMath.round((val[0].count + val[1].count) / (time._count / 1000), 1);
    }),
    get count() {
      return this._count;
    },
  };
}
