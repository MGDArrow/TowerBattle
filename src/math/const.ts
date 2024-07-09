export default {
  SECOND: 1_000,
  MINUTE: 60 * 1_000,
  HOUR: 60 * 60 * 1_000,
  DAY: 24 * 60 * 60 * 1_000,
  GAME: {
    WAVE_INIT: 3_000,
    WAVE_LONG: 25_000,
    WAVE_DELAY: 5_000,
  },
  PERIMETER: {
    SIZE_BASE: 600,
  },
  TOWER: {
    SIZE: 50,
    COOLDOWN: 1_000,
    START_DOLLARS: 100,
  },
  BULLET: {
    SIZE: 7,
    SPEAD: 7,
  },
  SLUG: {
    SIZE: 6.5,
    SPEAD: 5,
  },
  BALL: {
    SIZE: 18,
    DISTANCE: 300,
  },
  WALL: {
    SIZE: 200,
    BUILDING_TIME: 1_000 * 60 * 8,
  },
  DISCARD_WAVE: {
    SIZE: 5,
    SPEAD: 4,
    COOLDOWN: 25_000,
  },
  MINE: {
    SIZE: 18,
    LIFETIME: 30_000,
  },
  PACK: {
    SIZE: 25,
    SPEAD: 2,
    DEPOSIT: {
      COOLDOWN: 50_000,
    },
  },
  ENEMY: {
    COOLDOWN: 1_000,
    SIZE: {
      COMMON: 15,
      TANK: 30,
      BOSS: 60,
    },
    SPEAD: {
      BASE: 3,
      COEF_QUICK: 2.5,
      COEF_TANK: 0.8,
      COEF_BOSS: 0.5,
    },
    HP: {
      COEF_TANK: 2,
      COEF_BOSS: 5,
    },
    DAMAGE: {
      COEF_TANK: 1,
      COEF_BOSS: 3,
    },
    VALUTE: {
      COEF_QUICK: 2,
      COEF_TANK: 2,
      COEF_BOSS: 5,
    },
  },
};
