export interface Game {
  name: string;
  launchDate: string;
  genre: string;
  platform: string;
  publisher: string;
  id: number;
  description: string;
  factions: Faction[];
}

export interface Faction {
  name: string;
  description: string;
  shortName: string;
  id: number;
  units: Unit[];
  structures: Structure[];
}

export interface Unit {
  name: string;
  description: string;
  id: number;
  factionId: number;
  gameId: number;
  damage: number[];
  hitPoints: number;
  energyPool: number;
  amorType: string;
}

export interface Structure {
  name: string;
  description: string;
  id: number;
  factionId: number;
  gameId: number;
  damage: number[];
  hitPoints: number;
  energyPool: number;
  amorType: string;
}
