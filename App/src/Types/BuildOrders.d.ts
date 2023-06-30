export interface WarcraftBuildOrder {
  id: string;
  name: string;
  description: string;
  game: Games;
  faction: WarcraftFactions;
  opponentFaction: WarcraftFactions;
  steps: BuildOrderItem[];
  createdBy: string;
}

export interface StarcraftBuildOrder {
  id: number;
  name: string;
  description: string;
  game: Games;
  faction: StarcraftFactions;
  opponentFaction: StarcraftFactions;
  steps: BuildOrderItem[];
  createdBy: string;
}

export interface BuildOrderItem {
  buildOrderId: number;
  supply: number;
  time: string;
  instruction: string;
}
