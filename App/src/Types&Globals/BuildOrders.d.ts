export interface WarcraftBuildOrder {
  id: string;
  name: string;
  description: string;
  faction: number;
  opponentFaction: number;
  gameMode: number;
  actions: BuildOrderAction[];
  createdBy: string;
  userId: string;
  conclusion?: string;
}

export interface StarcraftBuildOrder {
  id: string;
  name: string;
  description: string;
  faction: number;
  opponentFaction: number;
  gameMode: number;
  actions: BuildOrderAction[];
  createdBy: string;
  conclusion?: string;
  userId: string;
}

export interface StormgateBuildOrder {
  id: string;
  name: string;
  description: string;
  faction: number;
  opponentFaction: number;
  gameMode: number;
  actions: BuildOrderAction[];
  createdBy: string;
  conclusion?: string;
  userId: string;
}

export interface ApiBuildOrderData {
  id?: string;
  name: string;
  description: string;
  faction: number;
  opponentFaction: number;
  gameMode: number;
  actions: BuildOrderAction[];
  createdBy: string;
  userId: string;
  conclusion?: string;
}

export interface BuildOrderAction {
  supply: number;
  clock: string;
  instruction: string;
}

export interface BuildOrderSearchFilters {
  title?: string;
  faction?: string;
  opponentFaction?: string;
  uploadedBy?: string;
  gameMode?: string;
}
