export interface IEnemyParams {
  percent: number;
  hp: number;
  damage: number;
  spead: number;
  awardDollars: number;
  awardCoins: number;
  awardExp: number;
  size: number;
  heft: number;
}
export interface IEnemiesParams {
  common: IEnemyParams;
  quick: IEnemyParams;
  tank: IEnemyParams;
  shooter: IEnemyParams;
  boss: IEnemyParams;
}
