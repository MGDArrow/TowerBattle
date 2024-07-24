export type TStageAwardType = 'coins' | 'diamond' | 'ultimate';
export interface IStageAwardPoint {
  count: number;
  type: TStageAwardType;
}
export interface IStageAwardWave {
  left: IStageAwardPoint;
  right: IStageAwardPoint;
}
export interface IStageAwardLvl {
  10: IStageAwardWave;
  20: IStageAwardWave;
  30: IStageAwardWave;
  40: IStageAwardWave;
  50: IStageAwardWave;
  60: IStageAwardWave;
  70: IStageAwardWave;
  80: IStageAwardWave;
  90: IStageAwardWave;
  100: IStageAwardWave;
  150: IStageAwardWave;
  200: IStageAwardWave;
  250: IStageAwardWave;
  300: IStageAwardWave;
  400: IStageAwardWave;
  500: IStageAwardWave;
  750: IStageAwardWave;
  1000: IStageAwardWave;
  1250: IStageAwardWave;
  1500: IStageAwardWave;
  2000: IStageAwardWave;
  2500: IStageAwardWave;
  3000: IStageAwardWave;
  4000: IStageAwardWave;
  5000: IStageAwardWave;
}
export interface IStageAwar {
  1: IStageAwardLvl;
  2: IStageAwardLvl;
  3: IStageAwardLvl;
  4: IStageAwardLvl;
  5: IStageAwardLvl;
  6: IStageAwardLvl;
  7: IStageAwardLvl;
  8: IStageAwardLvl;
  9: IStageAwardLvl;
}

export interface IStageUserAwardLvl {
  10: [boolean, boolean];
  20: [boolean, boolean];
  30: [boolean, boolean];
  40: [boolean, boolean];
  50: [boolean, boolean];
  60: [boolean, boolean];
  70: [boolean, boolean];
  80: [boolean, boolean];
  90: [boolean, boolean];
  100: [boolean, boolean];
  150: [boolean, boolean];
  200: [boolean, boolean];
  250: [boolean, boolean];
  300: [boolean, boolean];
  400: [boolean, boolean];
  500: [boolean, boolean];
  750: [boolean, boolean];
  1000: [boolean, boolean];
  1250: [boolean, boolean];
  1500: [boolean, boolean];
  2000: [boolean, boolean];
  2500: [boolean, boolean];
  3000: [boolean, boolean];
  4000: [boolean, boolean];
  5000: [boolean, boolean];
}

export type TStageLvlWaves = keyof IStageUserAwardLvl;
export interface IStageUser {
  1: {
    max: number;
    entries: number;
    awards: IStageUserAwardLvl;
  };
  2: {
    max: number;
    entries: number;
    awards: IStageUserAwardLvl;
  };
  3: {
    max: number;
    entries: number;
    awards: IStageUserAwardLvl;
  };
  4: {
    max: number;
    entries: number;
    awards: IStageUserAwardLvl;
  };
  5: {
    max: number;
    entries: number;
    awards: IStageUserAwardLvl;
  };
  6: {
    max: number;
    entries: number;
    awards: IStageUserAwardLvl;
  };
  7: {
    max: number;
    entries: number;
    awards: IStageUserAwardLvl;
  };
  8: {
    max: number;
    entries: number;
    awards: IStageUserAwardLvl;
  };
  9: {
    max: number;
    entries: number;
    awards: IStageUserAwardLvl;
  };
}
