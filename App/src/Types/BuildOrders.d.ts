export interface WarcraftBuildOrder {
  id: number;
  name: string;
  description: string;
  game: Games;
  faction: WarcraftFactions;
  steps: BuildOrderItem[];
}

export interface StarcraftBuildOrder {
  id: number;
  name: string;
  description: string;
  game: Games;
  faction: StarcraftFactions;
  steps: BuildOrderItem[];
}

export interface BuildOrderItem {
  buildOrderId: number;
  supply: number;
  time: string;
  instruction: string;
}
