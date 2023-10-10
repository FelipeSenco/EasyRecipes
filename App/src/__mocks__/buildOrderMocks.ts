import { StarcraftBuildOrder, StormgateBuildOrder, WarcraftBuildOrder } from "../Types&Globals/BuildOrders";

export const wc3BuildOrderMocks: WarcraftBuildOrder[] = [
  {
    id: "1",
    name: "Early base building game",
    faction: 0,
    opponentFaction: 3,
    gameMode: 0,
    createdBy: "John Doe",
    userId: "1",
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
    faction: 0,
    opponentFaction: 1,
    gameMode: 0,
    userId: "1",
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
    faction: 0,
    opponentFaction: 4,
    gameMode: 0,
    userId: "1",
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
export const Sc2BuildOrderMocks: StarcraftBuildOrder[] = [
  {
    id: "1",
    name: "Early base building game",
    faction: 0,
    opponentFaction: 3,
    createdBy: "John Doe",
    gameMode: 0,
    userId: "1",
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
    faction: 0,
    opponentFaction: 1,
    gameMode: 0,
    userId: "1",
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
    faction: 0,
    opponentFaction: 2,
    gameMode: 0,
    userId: "1",
    createdBy: "HookShot HotShot",
    description:
      "The  sit amet, consectetur adip are a great um dolor sit amet, consectetur adipiscing elit. Proin in quam finibus massa consequat feugiat. Ut velit urna, sagittis vel aliquam",
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
          "Your  sit amet, consectetur adip should finish and you can make the ArchMage, keep producing footmen from the barracks until you have 4 and go tier 2 as soon as you have resources",
      },
    ],
  },
];

export const StgBuildOrderMocks: StormgateBuildOrder[] = [
  {
    id: "1",
    name: "Early base building game",
    faction: 0,
    opponentFaction: 2,
    gameMode: 0,
    userId: "1",
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
    faction: 0,
    opponentFaction: 1,
    gameMode: 0,
    userId: "1",
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
    faction: 1,
    opponentFaction: 0,
    gameMode: 0,
    userId: "1",
    createdBy: "HookShot HotShot",
    description:
      "The  sit amet, consectetur adip are a great um dolor sit amet, consectetur adipiscing elit. Proin in quam finibus massa consequat feugiat. Ut velit urna, sagittis vel aliquam",
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
          "Your  sit amet, consectetur adip should finish and you can make the ArchMage, keep producing footmen from the barracks until you have 4 and go tier 2 as soon as you have resources",
      },
    ],
  },
];

export const emptyWarcrafBuildOrder: WarcraftBuildOrder = {
  id: "",
  name: "",
  faction: 0,
  opponentFaction: 0,
  createdBy: "",
  description: "",
  actions: [],
  gameMode: 0,
  userId: "",
};

export const emptyStarcraftBuildOrder: StarcraftBuildOrder = {
  id: "",
  name: "",
  faction: 0,
  opponentFaction: 0,
  createdBy: "",
  description: "",
  actions: [],
  gameMode: 0,
  userId: "",
};

export const emptyStormgateBuildOrder: StormgateBuildOrder = {
  id: "",
  name: "",
  faction: 0,
  opponentFaction: 0,
  createdBy: "",
  description: "",
  actions: [],
  gameMode: 0,
  userId: "",
};
