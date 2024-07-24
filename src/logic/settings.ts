import CONST from '@/math/const';
import { computed, ComputedRef, Ref, ref } from 'vue';
import User from './user';

class Settings {
  static #onlyInstance: Settings | null = null;

  //** Video Settings **//
  public sceneHeight: number = window.innerHeight;
  public sceneWidth: number = window.innerWidth;

  public fps: Ref<number> = ref(60);
  public fps_now: Ref<number> = ref(60);
  private fps_temp: number = 0;

  public scaleSize: number = window.innerHeight / 1000;
  public scaleSpead: ComputedRef<number> = computed(() => this.scaleSize);

  //** Game Settings **//

  public waveInit: number = CONST.GAME.WAVE_INIT;
  public waveLong: number = CONST.GAME.WAVE_LONG;
  public waveDelay: number = CONST.GAME.WAVE_DELAY;

  public gameOver: Ref<boolean> = ref(false);
  public game_spead: Ref<number> = ref(1);
  private game_spead_temp: number = 0;

  constructor() {
    if (Settings.#onlyInstance) return Settings.#onlyInstance;
    Settings.#onlyInstance = this;
  }

  newGame = (): void => {
    this.gameOver.value = false;
    if (this.game_spead.value === 0) this.game_spead.value = 1;
    User.addStageEntries();
  };

  endGame = (): void => {
    this.gameOver.value = true;
  };

  gameSpeadMinus = (): void => {
    if (this.game_spead.value === 1) return this.gameSpeadPause();
    if (this.game_spead.value > 0) this.game_spead.value -= 1;
  };

  gameSpeadPlus = (): void => {
    if (this.game_spead.value < 5) this.game_spead.value += 1;
  };

  gameSpeadPause = (): void => {
    if (this.game_spead.value > 0) {
      this.fps_temp = this.fps_now.value;
      this.game_spead_temp = this.game_spead.value;
      this.game_spead.value = 0;
    } else {
      this.fps_now.value = this.fps_temp;
      this.game_spead.value = this.game_spead_temp;
    }
  };
}

export default new Settings();
