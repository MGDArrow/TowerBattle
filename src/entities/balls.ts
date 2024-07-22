/* eslint-disable no-mixed-operators */
import Enemies, { TEnemiesClasses } from '@/entities/enemies';
import Perimeter from '@/entities/perimeter';
import Updates from '@/mechanics/updates';
import { Rotate, Vector } from '@/math/math';
import CONST from '@/math/const';
import Settings from '@/logic/settings';
import { computed, Ref, ref } from 'vue';
import Statistic from '@/services/statistic';

class Balls {
  static #onlyInstance: Balls | null = null;
  public balls: Ref<Array<BallBuilder>> = ref([]);
  constructor() {
    if (Balls.#onlyInstance) return Balls.#onlyInstance;
    Balls.#onlyInstance = this;
  }

  init() {
    this.balls.value = [];
    let ballsDeg: Array<number> = [];
    const update = Updates.updates['perimeter'].groups['balls'].updates['number'].count;
    if (update === 0) return;
    if (update === 1) ballsDeg = [0];
    if (update === 2) ballsDeg = [0, 180];
    if (update === 3) ballsDeg = [0, 120, 240];
    if (update === 4) ballsDeg = [0, 90, 180, 270];

    ballsDeg.forEach((deg) => this.balls.value.push(new BallBuilder(deg)));
  }

  newBall(number: number) {
    const allBalls = this.balls.value.length + number;
    const degAdd = 360 / allBalls;
    for (let ball = 0; ball < number; ball++) {
      this.balls.value.push(new BallBuilder(0));
    }

    this.balls.value.forEach((ball, i) => {
      if (i === 0) return;
      let deg = this.balls.value[0].getDeg() + degAdd * i;
      if (deg >= 360) deg -= 360;
      ball.setDeg(deg);
    });
  }

  tick() {
    this.balls.value.forEach((ball) => {
      ball.move();
      ball.checkCollision();
    });
  }
}

export default new Balls();

class BallBuilder {
  public size = CONST.BALL.SIZE * Settings.scaleSize;
  public r = this.size / 2;
  public deg = ref(0);

  public s_deg_spead = computed(() => {
    const lengthCircle = 2 * Math.PI * CONST.BALL.DISTANCE * Settings.scaleSize;
    const lengthArc = Updates.updates['perimeter'].groups['balls'].updates['spead'].count * Settings.scaleSpead.value;
    const degAdd = (360 * lengthArc) / lengthCircle;
    return degAdd;
  });

  public x = computed(() => {
    const deg = Rotate.getRadInDeg(this.deg.value);
    return Perimeter.x - Math.cos(deg) * CONST.BALL.DISTANCE * Settings.scaleSize;
  });

  public y = computed(() => {
    const deg = Rotate.getRadInDeg(this.deg.value);
    return Perimeter.y + Math.sin(deg) * CONST.BALL.DISTANCE * Settings.scaleSize;
  });
  constructor(deg: number) {
    this.deg.value = deg;
  }

  getDeg = () => this.deg.value;

  setDeg = (deg: number) => {
    this.deg.value = deg;
  };

  move = () => {
    this.deg.value += this.s_deg_spead.value;
    if (this.deg.value >= 360) this.deg.value -= 360;
  };

  checkCollision = () => {
    Enemies.enemies.value.forEach((enemy) => {
      if (enemy.u_balls > 0) return;
      const isCollision = Vector.isCollisionFast(this.x.value, this.y.value, this.r, enemy.x, enemy.y, enemy.r);
      if (!isCollision) return;
      this.attack(enemy);
    });
  };

  attack = (enemy: TEnemiesClasses) => {
    let damage = enemy.s_hp_max;
    let damagePercent = Updates.updates['perimeter'].groups['balls'].updates['damage'].count;
    if (enemy.name === 'Босс') damagePercent /= 20;
    damage *= damagePercent;
    enemy.u_balls = 1000;
    enemy.getDamage(damage);
    Statistic.inc('damage_balls', damage);
    Statistic.inc('damage_all', damage);
  };
}
