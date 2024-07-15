import { Ref, ref } from 'vue';
import { Vector } from '@/math/math';

class Loading {
  static #onlyInstance: Loading | null = null;

  public particles: Ref<Array<Particle>> = ref([]);
  // Включить
  public percent: Ref<number> = ref(100);

  constructor() {
    if (Loading.#onlyInstance) return Loading.#onlyInstance;
    Loading.#onlyInstance = this;
  }

  init = (): void => {
    // Включить
    this.percent.value = 100;
    const particlesArray: Array<Particle> = [];
    for (let i = 0; i < 100; i++) particlesArray.push(new Particle());
    this.particles.value = particlesArray;
    this.timeout();
  };

  timeout = (): void => {
    const loadInterval = setInterval(() => {
      this.move();
      if (this.percent.value >= 100) clearInterval(loadInterval);
    }, 1000 / 60);
  };

  move = (): void => {
    const tower = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      r: ((window.innerHeight / 100) * 8) / 2,
    };

    this.particles.value = this.particles.value.filter((particle) => {
      particle.move(tower);
      if (!particle.collision) return true;
      this.percent.value += 1;
      return !particle.collision;
    });
  };
}

class Particle {
  public x: Ref<number> = ref(window.innerWidth / 2 + (Math.random() - 0.5) * 2500);
  public y: Ref<number> = ref(window.innerHeight / 2 + (Math.random() - 0.5) * 2500);
  private size: number = (window.innerHeight / 100) * 1.7; // 1.7dvh
  private r: number = this.size / 2;
  private spead: number = 15;
  public collision: boolean = false;

  move = (tower: { x: number; y: number; r: number }): void => {
    const [coefX, coefY] = Vector.getVectorNormalize(this.x.value, this.y.value, tower.x, tower.y);
    this.x.value += coefX * this.spead;
    this.y.value += coefY * this.spead;
    this.collision = Vector.isCollisionFast(this.x.value, this.y.value, this.r, tower.x, tower.y, tower.r);
  };
}

export default new Loading();
