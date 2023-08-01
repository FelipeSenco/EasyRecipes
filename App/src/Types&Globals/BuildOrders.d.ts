export interface WarcraftBuildOrder {
  id: string;
  name: string;
  description: string;
  faction: number;
  opponentFaction: number;
  gameMode: number;
  actions: BuildOrderAction[];
  createdBy: string;
  patch?: string;
  videoUrl?: string;
  considerations?: string;
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
  patch?: string;
  videoUrl?: string;
  considerations?: string;
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
  patch?: string;
  videoUrl?: string;
  considerations?: string;
}

export interface CreateBuildOrderData {
  id?: string;
  name: string;
  description: string;
  faction: number;
  opponentFaction: number;
  gameMode: number;
  actions: BuildOrderAction[];
  createdBy: string;
  userId: string;
  patch?: string;
  videoUrl?: string;
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
