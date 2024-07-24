/* eslint-disable no-mixed-operators */
import Enemies from '@/entities/enemies';
import Tower from '@/entities/tower';
import Packs from '@/entities/packs';
import Updates from '@/mechanics/updates';
import { MyMath } from '@/math/math';
import Messages from '@/services/message';
import Statistic from '@/services/statistic';
import Settings from '@/logic/settings';
import Stages from '@/mechanics/stages';
import User from '@/logic/user';
import { Ref, ref } from 'vue';
import { IEnemiesParams } from '@/types/enemies';

class Waves {
  static #onlyInstance: Waves | null = null;
  public wave = ref(0);
  public inite = ref(0);
  public long = ref(0);
  public delay = ref(0);

  public enemiesCount = ref(0);
  public enemiesAll = ref(0);
  public enemiesParams: Ref<IEnemiesParams | null> = ref(null);
  public enemyBossPercent = ref(0);

  public lvl = 1;
  private enemiesInterval = 0;
  constructor() {
    if (Waves.#onlyInstance) return Waves.#onlyInstance;
    Waves.#onlyInstance = this;
  }

  init() {
    this.lvl = Stages.lvl.value;
    this.wave.value = 0;
    this.inite.value = Settings.waveInit;
    this.long.value = Settings.waveLong;
    this.delay.value = Settings.waveDelay;

    this.enemiesCount.value = 0;
    this.enemiesAll.value = 0;
    this.enemiesParams.value = null;
    this.enemyBossPercent.value = 0;
    this.enemiesInterval = 0;

    this.startNewWave();
  }

  startNewWave = () => {
    this.wave.value += 1;
    this.long.value = Settings.waveLong;
    this.delay.value = Settings.waveDelay;
    // * Количетсво врагов
    this.enemiesCount.value = 10 + 2 * Math.floor(this.wave.value / 20);
    this.enemiesAll.value = this.enemiesCount.value;
    this.enemiesInterval = Math.floor(this.long.value / this.enemiesCount.value);
    // * Враги на эту волну
    this.enemiesParams.value = Enemies.getEnemiesParams(this.lvl, this.wave.value);
    this.enemyBossPercent.value = this.enemiesParams.value.boss.percent;
    User.setStageWave(this.wave.value);
  };

  tick = (dt: number) => {
    if (this.inite.value > 0) return (this.inite.value -= dt);
    Statistic.inc('game_time', dt);
    if (this.long.value > 0) return (this.long.value -= dt);
    if (this.delay.value >= 0) return (this.delay.value -= dt);
    this.startNewWave();
    this.getValutaAfterWave();
    this.towerAddKit();
    this.getFreeUpdate();
  };

  getValutaAfterWave = () => {
    const addDollars = Updates.updates['money'].groups['basic'].updates['dollars'].count;
    const addCoins = Updates.updates['money'].groups['basic'].updates['coins'].count;
    const addExp = Updates.updates['money'].groups['basic'].updates['exp'].count;

    Tower.dollars.value += addDollars;
    User.updateCoins(addCoins);
    User.addExp(addExp);

    Statistic.inc('dollars_waves', addDollars);
    Statistic.inc('dollars_all', addDollars);
    Statistic.inc('coins_waves', addCoins);
    Statistic.inc('coins_all', addCoins);
    Statistic.inc('exp_waves', addExp);
    Statistic.inc('exp_all', addExp);

    Messages.add(`+${MyMath.toText(addDollars, 3)}`);
    Messages.add(`+${MyMath.toText(addCoins, 3)}`, 'yellow', 'coins');
    Messages.add(`+${MyMath.toText(addExp, 3)}`, 'turq', 'exp');
  };

  spawnEnemies = () => {
    if (this.long.value <= 0) return;
    if (this.enemiesInterval * this.enemiesCount.value <= this.long.value) return;

    this.enemiesCount.value -= 1;
    if (this.enemiesParams.value !== null) Enemies.newEnemy(this.enemiesParams.value, 'random');

    if (!this.enemyBossPercent.value) return;
    if (this.enemiesParams.value !== null) Enemies.newEnemy(this.enemiesParams.value, 'boss');
    this.enemyBossPercent.value = 0;
  };

  towerAddKit = () => {
    const isAddKit = Math.random() <= Updates.updates['defence'].groups['kit'].updates['percent'].count;
    if (!isAddKit) return;
    Packs.newPack('Kit');
    Statistic.inc('updates_kits', 1);
  };

  getFreeUpdate() {
    const isFreeAttack = Math.random() <= Updates.updates['money'].groups['free'].updates['attack'].count;
    if (isFreeAttack) Updates.upFreeAttack();
    const isFreeDefence = Math.random() <= Updates.updates['money'].groups['free'].updates['defence'].count;
    if (isFreeDefence) Updates.upFreeDefence();
    const isFreePerimeter = Math.random() <= Updates.updates['money'].groups['free'].updates['perimeter'].count;
    if (isFreePerimeter) Updates.upFreePerimeter();
    const isFreeMoney = Math.random() <= Updates.updates['money'].groups['free'].updates['money'].count;
    if (isFreeMoney) Updates.upFreeMoney();
  }
}

export default new Waves();
