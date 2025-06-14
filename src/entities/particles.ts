import Updates from '@/mechanics/updates';
import CONST from '@/math/const';
import Settings from '@/logic/settings';
import { Ref, ref } from 'vue';

class ParticleFactory {
  p;
  constructor(
    public name: string,
    public x: number,
    public y: number,
    public time: number,
    fn: () => { x: number; y: number; x_way?: number; y_way?: number }[],
    public o: number = 1,
  ) {
    this.p = fn();
    return this;
  }
}

class PiecesFactory {
  getBasicPieces() {
    let particles = [];
    for (let index = 0; index < 9; index++) {
      particles.push({
        x: 50,
        y: 50,
        x_way: (Math.random() - 0.5) * 8,
        y_way: (Math.random() - 0.5) * 8,
      });
    }
    return particles;
  }

  getMinePieces() {
    const size = Updates.updates['perimeter'].groups['mines'].updates['radius'].count;
    // eslint-disable-next-line no-mixed-operators
    let maxWay = (size / CONST.MINE.SIZE - 1) * 100 + 50;
    maxWay /= 100;
    //** Math.SQRT2 — придать кругообразную форму **//
    const particles = [
      {
        x: 50,
        y: 50,
        x_way: maxWay / Math.SQRT2,
        y_way: maxWay / Math.SQRT2,
      },
      {
        x: 50,
        y: 50,
        x_way: -maxWay / Math.SQRT2,
        y_way: -maxWay / Math.SQRT2,
      },
      {
        x: 50,
        y: 50,
        x_way: maxWay / Math.SQRT2,
        y_way: -maxWay / Math.SQRT2,
      },
      {
        x: 50,
        y: 50,
        x_way: -maxWay / Math.SQRT2,
        y_way: maxWay / Math.SQRT2,
      },
      {
        x: 50,
        y: 50,
        x_way: 0,
        y_way: maxWay,
      },
      {
        x: 50,
        y: 50,
        x_way: maxWay,
        y_way: 0,
      },
      {
        x: 50,
        y: 50,
        x_way: 0,
        y_way: -maxWay,
      },
      {
        x: 50,
        y: 50,
        x_way: -maxWay,
        y_way: 0,
      },
    ];

    return particles;
  }

  getTowerPieces() {
    let particles = [];
    for (let index = 0; index < 50; index++) {
      const x = (Math.random() - 0.5) * 100 * 100;
      const y = (Math.random() - 0.5) * 100 * 100;
      particles.push({ x, y });
    }
    return particles;
  }
}

class Particles {
  static #onlyInstance: Particles | null = null;

  public particles: Ref<Array<ParticleFactory>> = ref([]);
  public piecesFactory: PiecesFactory = new PiecesFactory();
  constructor() {
    if (Particles.#onlyInstance) return Particles.#onlyInstance;
    Particles.#onlyInstance = this;
  }

  init() {
    this.particles.value = [];
    this.piecesFactory = new PiecesFactory();
    this.newParticles('Башня');
  }

  newParticles = (name: string, x?: number, y?: number, time: number = 1000) => {
    if (name === 'Башня') {
      const initTowerParticle: [number, number, number, () => { x: number; y: number }[]] = [
        Settings.sceneWidth / 2,
        Settings.sceneHeight / 2,
        Settings.waveInit,
        this.piecesFactory.getTowerPieces,
      ];
      this.particles.value.push(new ParticleFactory(name, ...initTowerParticle));
      return;
    }
    if (name === 'Мина') {
      if (typeof x === 'number' && typeof y === 'number')
        this.particles.value.push(new ParticleFactory(name, x, y, time, this.piecesFactory.getMinePieces));
      return;
    }

    if (typeof x === 'number' && typeof y === 'number')
      this.particles.value.push(new ParticleFactory(name, x, y, time, this.piecesFactory.getBasicPieces));
  };

  tick = (dt: number) => {
    this.particles.value = this.particles.value.filter((particle) => {
      particle.time -= dt;
      if (particle.time <= 0) return false;

      particle.o = particle.time / 1000;

      if (particle.name !== 'Башня') {
        particle.p.forEach((p) => {
          if (typeof p.x_way === 'number' && typeof p.y_way === 'number') {
            p.x += p.x_way;
            p.y += p.y_way;
          }
        });
      } else {
        particle.p.forEach((p) => {
          const coefDistance = (dt / Settings.waveInit) * 5;
          p.x -= (p.x - 50) * coefDistance;
          p.y -= (p.y - 50) * coefDistance;
        });
      }

      return true;
    });
  };
}

export default new Particles();
