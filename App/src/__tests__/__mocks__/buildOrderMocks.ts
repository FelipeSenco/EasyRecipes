import { WarcraftBuildOrder } from "../../Types/BuildOrders";
import { Games, WarcraftFactions } from "../../Types/enums";

export const wc3BuildOrderMocks: WarcraftBuildOrder[] = [
  {
    id: "1",
    name: "Early base building game",
    game: Games.WARCRAFT_3,
    faction: WarcraftFactions.HUMANS,
    opponentFaction: WarcraftFactions.NIGHT_ELVES,
    createdBy: "John Doe",
    description:
      "The Humans are a great um dolor sit amet, consectetur adipiscing elit. Proin in quam finibus massa consequat feugiat. Ut velit urna, sagittis vel aliquam",
    steps: [
      { buildOrderId: 1, supply: 5, time: "00:00", instruction: "Build a worker and send 4 to gold and 1 to build an altar" },
      { buildOrderId: 1, supply: 6, time: "00:15", instruction: "Build a worker and send 1 to build a barracks" },
      { buildOrderId: 1, supply: 7, time: "00:30", instruction: "Build a worker and send 1 to build a farm" },
      { buildOrderId: 1, supply: 8, time: "00:45", instruction: "Build a worker and send 1 to build  farm" },
      {
        buildOrderId: 1,
        supply: 9,
        time: "01:00",
        instruction:
          "The first worker to finish a building goes to gold to complete 5, all the rest goes to lumber. Build more workers until you have 8 on lumber",
      },
      {
        buildOrderId: 1,
        supply: 10,
        time: "01:15",
        instruction:
          "Your altar should finish and you can make the ArchMage, keep producing footmen from the barracks until you have 4 and go tier 2 as soon as you have resources",
      },
    ],
  },
  {
    id: "2",
    name: "Give them a blast",
    game: Games.WARCRAFT_3,
    faction: WarcraftFactions.HUMANS,
    opponentFaction: WarcraftFactions.ORCS,
    createdBy: "Alice is Pains",
    description:
      "The Humans are a great um dolor sit amet, consectetur adipiscing elit. Proin in quam finibus massa consequat feugiat. Ut velit urna, sagittis vel aliquam",
    steps: [
      { buildOrderId: 2, supply: 5, time: "00:00", instruction: "Build a worker and send 4 to gold and 1 to build an altar" },
      { buildOrderId: 2, supply: 6, time: "00:15", instruction: "Build a worker and send 1 to build a barracks" },
      { buildOrderId: 2, supply: 7, time: "00:30", instruction: "Build a worker and send 1 to build a farm" },
      { buildOrderId: 2, supply: 8, time: "00:45", instruction: "Build a worker and send 1 to build  farm" },
      {
        buildOrderId: 2,
        supply: 9,
        time: "01:00",
        instruction:
          "The first worker to finish a building goes to gold to complete 5, all the rest goes to lumber. Build more workers until you have 8 on lumber",
      },
      {
        buildOrderId: 2,
        supply: 10,
        time: "01:15",
        instruction:
          "Your altar should finish and you can make the ArchMage, keep producing footmen from the barracks until you have 4 and go tier 2 as soon as you have resources",
      },
    ],
  },
  {
    id: "3",
    name: "Crash them all with human",
    game: Games.WARCRAFT_3,
    faction: WarcraftFactions.HUMANS,
    opponentFaction: WarcraftFactions.ALL,
    createdBy: "HookShot HotShot",
    description:
      "The Humans are a great um dolor sit amet, consectetur adipiscing elit. Proin in quam finibus massa consequat feugiat. Ut velit urna, sagittis vel aliquam",
    steps: [
      { buildOrderId: 3, supply: 5, time: "00:00", instruction: "Build a worker and send 4 to gold and 1 to build an altar" },
      { buildOrderId: 3, supply: 6, time: "00:15", instruction: "Build a worker and send 1 to build a barracks" },
      { buildOrderId: 3, supply: 7, time: "00:30", instruction: "Build a worker and send 1 to build a farm" },
      { buildOrderId: 3, supply: 8, time: "00:45", instruction: "Build a worker and send 1 to build  farm" },
      {
        buildOrderId: 3,
        supply: 9,
        time: "01:00",
        instruction:
          "The first worker to finish a building goes to gold to complete 5, all the rest goes to lumber. Build more workers until you have 8 on lumber",
      },
      {
        buildOrderId: 3,
        supply: 10,
        time: "01:15",
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
  game: "",
  faction: "",
  opponentFaction: "",
  createdBy: "",
  description: "",
  steps: [],
};
