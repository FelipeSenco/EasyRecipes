export interface WarcraftBuildOrder {
  id: string;
  name: string;
  description: string;
  game: number;
  faction: number;
  opponentFaction: number;
  actions: BuildOrderAction[];
  createdBy: string;
  patch?: string;
  videoUrl?: string;
  considerations?: string;
}

export interface StarcraftBuildOrder {
  id: number;
  name: string;
  description: string;
  game: number;
  faction: number;
  opponentFaction: number;
  actions: BuildOrderAction[];
  createdBy: string;
  patch?: string;
  videoUrl?: string;
  consideartions?: string;
}

export interface BuildOrderAction {
  supply: number;
  clock: string;
  instruction: string;
}

export interface WarcraftBuildOrderSearchFilters {
  title?: string;
  faction?: string;
  opponentFaction?: string;
  uploadedBy?: string;
  gameMode?: string;
}
