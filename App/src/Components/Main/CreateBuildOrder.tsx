import React, { FC, useMemo, useState } from "react";
import { useUserQuery } from "../../Api/Queries/UserQueries";
import { BuildOrderAction, CreateBuildOrderData } from "../../Types&Globals/BuildOrders";
import { FactionSelection } from "../Collection/FactionSelection";
import { BuildOrderActionsInput, clockRegex } from "../Collection/BuildOrderActionsInput";
import { GameModeSelection } from "../Collection/GameModeSelection";
import { Games } from "../../Types&Globals/enums";
import { RichTextEditor, useRichEditor } from "../Collection/RichEditor/RichEditor";

type CreateBuildOrderProps = {
  onSubmit: (buildOrderData: CreateBuildOrderData) => void;
  gameFactions: { [key: number]: string };
  gameModes: { [key: number]: string };
  gameName: string;
};

export const CreateBuildOrder: FC<CreateBuildOrderProps> = ({ onSubmit, gameName, gameFactions, gameModes }) => {
  const { data: user } = useUserQuery();

  const [name, setName] = useState("");
  const [faction, setFaction] = useState("");
  const [opponentFaction, setOpponentFaction] = useState("");
  const [gameMode, setGameMode] = useState("");
  const [actions, setActions] = useState<BuildOrderAction[]>([]);
  const [showValidationErrors, setShowValidationErrors] = useState(false);

  const descriptionEditor = useRichEditor();
  const descriptionText = useMemo(() => descriptionEditor?.getText() as string, [descriptionEditor?.state]);
  const conclusionEditor = useRichEditor();
  const conclusionText = useMemo(() => conclusionEditor?.getText(), [conclusionEditor?.state]);

  const maxSupply = gameName === Games.Warcraft_III ? 100 : 200;
  const anyInvalidAction = actions.some(
    (action) => !action?.instruction || action?.supply < 0 || action?.supply > maxSupply || (action.clock && !clockRegex.test(action?.clock))
  );
  //data is not valid if there is no name, faction, opponentFaction,, or description, or if there are action with invalid data
  const isValidData = name && faction && !anyInvalidAction && descriptionText?.length > 0;

  const onChangeFaction = (faction: string) => {
    setFaction(faction);
  };

  const onChangeOpponentFaction = (faction: string) => {
    setOpponentFaction(faction);
  };

  const onChangeGameMode = (faction: string) => {
    setGameMode(faction);
  };

  const onClickSubmit = () => {
    setShowValidationErrors(true);

    if (isValidData) {
      const buildOrderData = {
        name,
        faction: Number(faction),
        opponentFaction: Number(opponentFaction),
        gameMode: Number(gameMode),
        description: JSON.stringify(descriptionEditor?.getJSON()),
        actions,
        conclusion: JSON.stringify(conclusionEditor?.getJSON()),
        userId: user?.id || "",
        createdBy: user?.userName || "",
      };
      onSubmit(buildOrderData);
    }
  };

  if (!user) return null;
  return (
    <div className="bg-gray-900 text-white p-6 max-h-full overflow-y-auto rounded shadow-md flex flex-col flex-grow gap-3">
      <h1 className="text-xl font-bold">Create Warcraft Build Order</h1>

      <div className="flex flex-col gap-2">
        <div>
          <label className="text-lg font-semibold text-yellow-200">Build Order Name: </label>
          <input
            maxLength={100}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block mt-1 py-1 w-full rounded-md bg-gray-800 text-white pl-1 overflow-auto"
          />
          {showValidationErrors && !name && <p className="text-red-400 text-sm italic">Please enter a name.</p>}
        </div>
        <div className="flex justify-between gap-5">
          <div className="w-full flex flex-col">
            <label className="text-lg font-semibold text-yellow-200">Faction: </label>
            <FactionSelection
              placeholder="Choose faction"
              gameFactions={gameFactions}
              onChange={onChangeFaction}
              selectedValue={faction}
              testId={gameName + "-create-faction-select"}
              className="w-full bg-gray-800 text-white rounded-md py-1"
              includeAll={false}
            />
            {showValidationErrors && !faction && <p className="text-red-400 text-sm italic">Please select a faction.</p>}
          </div>
          <div className="w-full flex flex-col">
            <label className="text-lg font-semibold text-yellow-200 w-full ">Opponent Faction: </label>
            <FactionSelection
              placeholder="Choose opponent faction"
              gameFactions={gameFactions}
              onChange={onChangeOpponentFaction}
              selectedValue={opponentFaction}
              testId={gameName + "-create-opponent-faction-select"}
              className="w-full bg-gray-800 text-white rounded-md py-1"
              includeAll={true}
            />
            {showValidationErrors && !opponentFaction && <p className="text-red-400 text-sm italic">Please select a faction.</p>}
          </div>
          <div className="w-full flex flex-col">
            <label className="text-lg font-semibold text-yellow-200 w-full ">Game Mode: </label>
            <GameModeSelection
              gameModes={gameModes}
              onChange={onChangeGameMode}
              selectedValue={gameMode}
              testId={gameName + "-create-game-mode-select"}
              className="w-full bg-gray-800 text-white rounded-md py-1"
            />
          </div>
        </div>
        <div>
          <label className="text-lg font-semibold text-yellow-200">Description: </label>
          <RichTextEditor editor={descriptionEditor} />
          {showValidationErrors && descriptionText?.length === 0 && <p className="text-red-400 text-sm italic">Please add a description.</p>}
        </div>
        <div>
          <BuildOrderActionsInput actions={actions} setActions={setActions} maxSupply={maxSupply} showValidationErrors={showValidationErrors} />
        </div>
        <div>
          <label className="text-lg font-semibold text-yellow-200">Conclusion: </label>
          <RichTextEditor editor={conclusionEditor} />
        </div>
      </div>

      <button
        className="hover:bg-indigo-800 bg-indigo-600 w-1/6 flex items-center self-center justify-center px-2 py-2 text-lg rounded mt-3 cursor-pointer"
        onClick={onClickSubmit}
        disabled={showValidationErrors && !isValidData}
      >
        Submit
      </button>
    </div>
  );
};
