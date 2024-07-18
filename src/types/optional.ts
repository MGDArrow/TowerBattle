export type TOptionalPanel =
  | ''
  | 'Updates'
  | 'Cards'
  | 'Mods'
  | 'Ultimates'
  | 'Lab'
  | 'Player'
  | 'Community'
  | 'Shop'
  | 'Events'
  | 'Rules'
  | 'Settings'
  | 'Stages';

export type TOptionalPanelGame =
  | ''
  | 'Updates'
  | 'Cards'
  | 'Mods'
  | 'Ultimates'
  | 'Lab'
  | 'Player'
  | 'Community'
  | 'Shop'
  | 'Events'
  | 'Rules'
  | 'Settings'
  | 'Stages'
  | 'Statistic'
  | 'Enemies'
  | 'Tower';

export type TOptionalGame = [TOptionalPanelGame, TOptionalPanelGame];
