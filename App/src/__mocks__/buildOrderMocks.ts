import { WarcraftBuildOrder } from "../Types/BuildOrders";
import { Games, WarcraftFactions } from "../Types/enums";

export const wc3BuildOrderMocks: WarcraftBuildOrder[] = [
  {
    id: "1",
    name: "Early base building game",
    game: Games.Warcraft_III,
    faction: 0,
    opponentFaction: 3,
    createdBy: "John Doe",
    description:
      "The Humans are a great um dolor sit amet, consectetur adipiscing elit. Proin in quam finibus massa consequat feugiat. Ut velit urna, sagittis vel aliquam",
    actions: [
      { supply: 5, clock: "00:00", instruction: "Build a worker and send 4 to gold and 1 to build an altar" },
      { supply: 6, clock: "00:15", instruction: "Build a worker and send 1 to build a barracks" },
      { supply: 7, clock: "00:30", instruction: "Build a worker and send 1 to build a farm" },
      { supply: 8, clock: "00:45", instruction: "Build a worker and send 1 to build  farm" },
      {
        supply: 9,
        clock: "01:00",
        instruction:
          "The first worker to finish a building goes to gold to complete 5, all the rest goes to lumber. Build more workers until you have 8 on lumber",
      },
      {
        supply: 10,
        clock: "01:15",
        instruction:
          "Your altar should finish and you can make the ArchMage, keep producing footmen from the barracks until you have 4 and go tier 2 as soon as you have resources",
      },
    ],
  },
  {
    id: "2",
    name: "Give them a blast",
    game: Games.Warcraft_III,
    faction: 0,
    opponentFaction: 1,
    createdBy: "Alice is Pains",
    description:
      "The Humans are a great um dolor sit amet, consectetur adipiscing elit. Proin in quam finibus massa consequat feugiat. Ut velit urna, sagittis vel aliquam",
    actions: [
      { supply: 5, clock: "00:00", instruction: "Build a worker and send 4 to gold and 1 to build an altar" },
      { supply: 6, clock: "00:15", instruction: "Build a worker and send 1 to build a barracks" },
      { supply: 7, clock: "00:30", instruction: "Build a worker and send 1 to build a farm" },
      { supply: 8, clock: "00:45", instruction: "Build a worker and send 1 to build  farm" },
      {
        supply: 9,
        clock: "01:00",
        instruction:
          "The first worker to finish a building goes to gold to complete 5, all the rest goes to lumber. Build more workers until you have 8 on lumber",
      },
      {
        supply: 10,
        clock: "01:15",
        instruction:
          "Your altar should finish and you can make the ArchMage, keep producing footmen from the barracks until you have 4 and go tier 2 as soon as you have resources",
      },
    ],
  },
  {
    id: "3",
    name: "Crash them all with human",
    game: Games.Warcraft_III,
    faction: 0,
    opponentFaction: 4,
    createdBy: "HookShot HotShot",
    description:
      "The Humans are a great um dolor sit amet, consectetur adipiscing elit. Proin in quam finibus massa consequat feugiat. Ut velit urna, sagittis vel aliquam",
    actions: [
      { supply: 5, clock: "00:00", instruction: "Build a worker and send 4 to gold and 1 to build an altar" },
      { supply: 6, clock: "00:15", instruction: "Build a worker and send 1 to build a barracks" },
      { supply: 7, clock: "00:30", instruction: "Build a worker and send 1 to build a farm" },
      { supply: 8, clock: "00:45", instruction: "Build a worker and send 1 to build  farm" },
      {
        supply: 9,
        clock: "01:00",
        instruction:
          "The first worker to finish a building goes to gold to complete 5, all the rest goes to lumber. Build more workers until you have 8 on lumber",
      },
      {
        supply: 10,
        clock: "01:15",
        instruction:
          "Your altar should finish and you can make the ArchMage, keep producing footmen from the barracks until you have 4 and go tier 2 as soon as you have resources",
      },
    ],
  },
];
const Sc2BuildOrderMocks = [];

export const emptyWarcrafBuildOrder: WarcraftBuildOrder = {
  id: "",
  name: "",
  game: 0,
  faction: 0,
  opponentFaction: 0,
  createdBy: "",
  description: "",
  actions: [],
};
