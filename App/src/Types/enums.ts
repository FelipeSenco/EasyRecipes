export enum Games {
  Warcraft_III = "Warcraft III",
  Starcraft_II = "Starcraft II",
  Stormgate = "Stormgate",
}

export enum HumanUnits {
  PEASANT = "Peasant",
  FOOTMAN = "Footman",
  RIFLEMAN = "Rifleman",
}

export enum HumanStructures {
  TOWN_HALL = "Town Hall",
  FARM = "Farm",
  BARRACKS = "Barracks",
}

export enum WarcraftFactions {
  HUMAN = "Human",
  ORC = "Orc",
  UNDEAD = "Undead",
  NIGHT_ELf = "Night Elf",
  ALL = "All",
}

export enum StarcraftFactions {
  TERRANS = "Terran",
  ZERGS = "Zerg",
  PROTOSS = "Protoss",
}

export const warcraftFactionsDisplay: { [key: number]: string } = {
  0: "Human",
  1: "Orc",
  2: "Undead",
  3: "Night Elf",
  4: "All",
};
