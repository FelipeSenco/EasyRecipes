import React, { useEffect, useState } from "react";
import { useUserQuery } from "../../../Api/Queries/UserQueries";
import { BuildOrderAction } from "../../../Types&Globals/BuildOrders";
import { FactionSelection } from "../../Collection/FactionSelection";
import { warcraftFactionsDisplay } from "../../../Types&Globals/enums";
import { BuildOrderActionsInput } from "../../Collection/BuildOrderActionsInput";

export const CreateWarcraftBuildOrder = () => {
  const { data: user } = useUserQuery();

  const [name, setName] = useState("");
  const [faction, setFaction] = useState("");
  const [opponentFaction, setOpponentFaction] = useState("");
  const [description, setDescription] = useState("");
  const [actions, setActions] = useState<BuildOrderAction[]>([]);
  const [createdBy, setCreatedBy] = useState("");
  const [considerations, setConsiderations] = useState("");

  const onChangeFaction = (faction: string) => {
    setFaction(faction);
  };

  const onChangeOpponentFaction = (faction: string) => {
    setOpponentFaction(faction);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(event);
  };

  if (!user) return null;
  return (
    <div className="bg-gray-900 text-white p-4 max-h-full overflow-y-auto rounded shadow-md flex flex-col flex-grow gap-3">
      <h1 className="text-xl font-bold">Create Warcraft Build Order</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold text-yellow-200">
            Build Order Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block mt-1 w-full rounded-md bg-gray-800 text-white"
            />
          </label>
          <div className="flex justify-between gap-5">
            <label className=" block text-lg font-semibold text-yellow-200 w-full">
              Faction:
              <FactionSelection
                gameFactions={warcraftFactionsDisplay}
                onChange={onChangeFaction}
                selectedValue={faction}
                testId="warcraft-create-faction-select"
                className=" block w-2/3 bg-gray-800 text-white rounded-md py-1"
              />
            </label>
            <label className="text-lg font-semibold text-yellow-200 w-full ">
              Opponent Faction:
              <FactionSelection
                gameFactions={warcraftFactionsDisplay}
                onChange={onChangeOpponentFaction}
                selectedValue={opponentFaction}
                testId="warcraft-create-opponent-faction-select"
                className="w-2/3 bg-gray-800 text-white rounded-md py-1"
              />
            </label>
          </div>
          <label className="text-lg font-semibold text-yellow-200">
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block mt-1 w-full rounded-md bg-gray-800 text-white"
            />
          </label>

          <BuildOrderActionsInput actions={actions} setActions={setActions} />

          <label className="text-lg font-semibold text-yellow-200">
            Considerations:
            <textarea
              value={considerations}
              onChange={(e) => setConsiderations(e.target.value)}
              className="block mt-1 w-full rounded-md bg-gray-800 text-white"
            />
          </label>
        </div>
        <div className="hover:bg-indigo-800 bg-indigo-600 w-1/6 flex items-center self-center justify-center px-2 py-2 text-lg rounded mt-3 cursor-pointer">
          <input type="submit" value="Submit" className="font-medium cursor-pointer" />
        </div>
      </form>
    </div>
  );
};
