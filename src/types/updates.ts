export interface IUpdate {
  name: string;
  icon: string;
  get description(): string;
  favorite: boolean;
  lvl: number;
  lvl_const: number;
  get lvl_max(): number;
  get count(): number;
  get text(): string;
  getPrice(inc?: number): number;
  getPriceConst(inc?: number): number;
}
export interface IUpdatesGroupes {
  name: string;
  lvl_access: number;
  updates: {
    [key: string]: IUpdate;
  };
}

export interface IUpdatesDirection {
  [key: string]: IUpdatesGroupes;
}

export interface IUpdatesFull {
  [key: string]: {
    name: string;
    color: string;
    icon: string;
    groups: IUpdatesDirection;
  };
}
