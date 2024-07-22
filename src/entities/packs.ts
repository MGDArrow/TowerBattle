/* eslint-disable no-mixed-operators */
import Particles from '@/entities/particles';
import Tower from '@/entities/tower';
import Updates from '@/mechanics/updates';
import CONST from '@/math/const';
import { MyMath, Rotate, Vector } from '@/math/math';
import Messages from '@/services/message';
import Statistic from '@/services/statistic';
import Settings from '@/logic/settings';
import { computed, Ref, ref } from 'vue';

type TPacksName = 'Kit' | 'Deposit';
type TPacksClasses = Kit | Deposit;

class FactoryPack {
  newPack(type: TPacksName) {
    if (type === 'Kit') return new Kit();
    if (type === 'Deposit') return new Deposit();
    return new Deposit();
  }
}
class Packs {
  static #onlyInstance: Packs | null = null;

  public packs: Ref<Array<TPacksClasses>> = ref([]);
  public u_deposit = ref(0);
  public factory = new FactoryPack();

  constructor() {
    if (Packs.#onlyInstance) return Packs.#onlyInstance;
    Packs.#onlyInstance = this;
  }

  init() {
    this.packs.value = [];
    this.factory = new FactoryPack();

    this.u_deposit.value = Updates.updates['money'].groups['deposit'].updates['cooldown'].count + Settings.waveInit;
  }

  newPack(type: TPacksName) {
    this.packs.value.push(this.factory.newPack(type));
  }

  tick(dt: number) {
    if (Updates.updates['money'].groups['deposit'].updates['cooldown'].lvl_max > 0) this.u_deposit.value -= dt;
    if (this.u_deposit.value <= 0) {
      this.newPack('Deposit');
      this.u_deposit.value = Updates.updates['money'].groups['deposit'].updates['cooldown'].count;
    }

    this.packs.value = this.packs.value.filter((pack) => {
      pack.move();
      if (!pack.collision) return true;
      pack.activated();
      return false;
    });
  }
}

export default new Packs();

class BasePack {
  public size = CONST.PACK.SIZE * Settings.scaleSize;
  public r = this.size / 2;
  public x: number;
  public y: number;
  public coefX: number = 0;
  public coefY: number = 0;

  public s_spead = computed(() => CONST.PACK.SPEAD * Settings.scaleSpead.value);
  public collision = false;
  public rotate = 0;
  constructor() {
    [this.x, this.y] = MyMath.getStartPositionClear(this.size);

    this.getDirection();
  }

  getDirection = () => {
    const [ABx, ABy] = Vector.getVector(this.x, this.y, Tower.x, Tower.y);
    const distance = Vector.getLength(ABx, ABy);
    [this.coefX, this.coefY] = Vector.getNormalize(ABx, ABy, distance);
    this.rotate = Rotate.rotate(ABx, ABy, distance);
  };

  move = () => {
    this.x += this.coefX * this.s_spead.value;
    this.y += this.coefY * this.s_spead.value;
    this.collision = Vector.isCollisionFast(this.x, this.y, this.r, Tower.x, Tower.y, Tower.r);
  };
}

class Kit extends BasePack {
  public type = 'Kit';
  public s_heal = Tower.s_hp_max.value * Updates.updates['defence'].groups['kit'].updates['heal'].count;
  constructor() {
    super();
  }

  activated = () => {
    Tower.addHP(this.s_heal);
    Particles.newParticles('Аптечка', this.x, this.y);
  };
}

class Deposit extends BasePack {
  public type = 'Deposit';
  public addDollars = Math.min(
    Tower.dollars.value * Updates.updates['money'].groups['deposit'].updates['percent'].count,
    Updates.updates['money'].groups['deposit'].updates['max'].count,
  );
  constructor() {
    super();
  }

  activated = () => {
    Tower.dollars.value += this.addDollars;
    Messages.add(`+${MyMath.toText(this.addDollars, 3)}`);
    Particles.newParticles('Депозит', this.x, this.y);
    Statistic.inc('dollars_deposit', this.addDollars);
    Statistic.inc('dollars_all', this.addDollars);
  };
}
