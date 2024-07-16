import Bullets from '@/entities/bullets';
import Enemies from '@/entities/enemies';
import Particles from '@/entities/particles';
import Perimeter from '@/entities/perimeter';
import Sluges from '@/entities/sluges';
import Tower from '@/entities/tower';
import Wave from '@/entities/wave';
import Balls from '@/entities/balls';
import DiscardWaves from '@/entities/discardWaves';
import Mines from '@/entities/mines';
import Packs from '@/entities/packs';
import Wall from '@/entities/wall';
import Messages from '@/services/message';
import Statistic from '@/services/statistic';
import Settings from '@/logic/settings';
import Updates from '@/mechanics/updates';
import { ref } from 'vue';

class Game {
  static #onlyInstance = null;
  constructor() {
    if (Game.#onlyInstance) return Game.#onlyInstance;
    Game.#onlyInstance = this;
  }

  initGame = () => {
    this.id = Date.now().toString(36) + Math.random().toString(36).substr(2);

    Settings.newGame();
    Updates.resetUpdates();
    Wave.init();
    this.initEntities();

    const fps_temp = ref(0);
    const sceneTimer = getSceneTimer(this.repeatFunction, fps_temp);
    this.fpsMetter = setInterval(() => {
      Settings.fps_now.value = fps_temp.value;
      fps_temp.value = 0;
    }, 1000);
    sceneTimer();
  };

  initEntities = () => {
    Statistic.init();
    Messages.init();
    Particles.init();

    Tower.init();
    Bullets.init();

    Enemies.init();
    Sluges.init();

    Perimeter.init();
    Wall.init();
    Balls.init();
    Packs.init();
    DiscardWaves.init();
    Mines.init();
  };

  repeatFunction = (dt) => {
    //**! Шаг игры !**//
    Wave.tick(dt);
    Wave.spawnEnemies();
    Enemies.move(dt);

    //**! Механики игрока !**//
    Perimeter.tick(dt);
    DiscardWaves.tick();
    Mines.tick(dt);
    Balls.tick();
    Wall.tick(dt);

    //**! Механики башни !**//
    Tower.tick(dt);
    Bullets.moveAttackRemove();

    //**! Ответ игры !**//
    Enemies.death();
    Enemies.attack(dt);
    Sluges.moveAttackRemove();

    //**! Служебные механики !**//
    Packs.tick(dt);
    Messages.tick(dt);
    Particles.tick(dt);

    if (Tower.s_hp.value <= 0) Settings.gameOver.value = true;
  };
}

function getSceneTimer(repeatFunction, fps_temp) {
  let startTime = 0;
  function sceneTimer(timeStamp = 0) {
    let deltaTime = Math.ceil(timeStamp - startTime);
    const interval = Math.floor(1000 / Settings.fps);
    if (deltaTime >= 1000) deltaTime = interval;

    if (deltaTime >= interval) {
      startTime = timeStamp;
      fps_temp.value += 1;
      for (let i = 0; i < Settings.game_spead.value; i++) repeatFunction(deltaTime);
    }

    const sceneId = window.requestAnimationFrame(sceneTimer);
    if (Settings.gameOver.value) {
      window.cancelAnimationFrame(sceneId);
    }
  }
  return sceneTimer;
}

export default new Game();
