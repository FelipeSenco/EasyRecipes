export enum Roles {
  USER = 0,
  ADMIN = 1,
}

export enum Games {
  Warcraft_III = "warcraft",
  Starcraft_II = "starcraft",
  Stormgate = "stormgate",
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

export enum StormgateFactions {
  HUMAN_RESISTANCE = "Human Resistance",
  INFERNAL_HOST = "Infernal Host",
  ALL = "All",
}

export const warcraftFactionsDisplay: { [key: number]: string } = {
  0: "Human",
  1: "Orc",
  2: "Undead",
  3: "Night Elf",
  4: "All",
};

export const warcraftGameModesDisplay: { [key: number]: string } = {
  0: "1v1",
  1: "2v2",
  2: "3v3",
  3: "4v4",
  4: "FFA",
};

export const starcraftFactionsDisplay: { [key: number]: string } = {
  0: "Terran",
  1: "Zerg",
  2: "Protoss",
  3: "All",
};

export const starcraftGameModesDisplay: { [key: number]: string } = {
  0: "1v1",
  1: "2v2",
  2: "3v3",
  3: "4v4",
  4: "FFA",
  5: "COOP",
};

export const stormgateFactionsDisplay: { [key: number]: string } = {
  0: "Human Resistance",
  1: "Infernal Host",
  2: "All",
};

export const stormgateGameModesDisplay: { [key: number]: string } = {
  0: "1v1",
  1: "3v3",
  2: "COOP",
};
