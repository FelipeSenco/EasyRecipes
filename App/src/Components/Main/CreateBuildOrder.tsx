import React, { FC, useEffect, useMemo, useState } from "react";
import { useUserQuery } from "../../Api/Queries/UserQueries";
import { BuildOrderAction, ApiBuildOrderData, WarcraftBuildOrder, StarcraftBuildOrder, StormgateBuildOrder } from "../../Types&Globals/BuildOrders";
import { FactionSelection } from "../Collection/FactionSelection";
import { BuildOrderActionsInput, clockRegex, initialState } from "../Collection/BuildOrderActionsInput";
import { GameModeSelection } from "../Collection/GameModeSelection";
import { Games } from "../../Types&Globals/enums";
import { RichTextEditor, useRichEditor } from "../Collection/RichEditor/RichEditor";
import { BuildOrderDetailSkeleton } from "../Collection/BuildOrdersSkeleton";
import { useNavigate } from "react-router-dom";

type CreateBuildOrderProps = {
  onSubmit: (buildOrderData: ApiBuildOrderData) => Promise<string>;
  isSubmitting: boolean;
  apiError: boolean;
  gameFactions: { [key: number]: string };
  gameModes: { [key: number]: string };
  gameName: string;
  initialBuildOrder?: WarcraftBuildOrder | StarcraftBuildOrder | StormgateBuildOrder;
};

export const CreateBuildOrder: FC<CreateBuildOrderProps> = ({
  onSubmit,
  gameName,
  gameFactions,
  gameModes,
  isSubmitting,
  apiError,
  initialBuildOrder,
}) => {
  console.log(initialBuildOrder);
  const { data: user } = useUserQuery();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [faction, setFaction] = useState("");
  const [opponentFaction, setOpponentFaction] = useState("");
  const [gameMode, setGameMode] = useState("");
  const [actions, setActions] = useState<BuildOrderAction[]>(initialState);
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const descriptionEditor = useRichEditor(2000);
  const conclusionEditor = useRichEditor(2000);
  const maxSupply = gameName === Games.Warcraft_III ? 100 : 200;
  const anyInvalidAction = actions.some(
    (action) => !action?.instruction || action?.supply < 0 || action?.supply > maxSupply || (action.clock && !clockRegex.test(action?.clock))
  );

  useEffect(() => {
    setName(initialBuildOrder?.name || "");
    setFaction(initialBuildOrder?.faction.toString() || "");
    setOpponentFaction(initialBuildOrder?.opponentFaction.toString() || "");
    setGameMode(initialBuildOrder?.gameMode.toString() || "");
    setActions(initialBuildOrder?.actions || initialState);
  }, [initialBuildOrder]);
  //data is not valid if there is no name, faction, opponentFaction,, or description, or if there are action with invalid data
  const isValidData = name && faction && !anyInvalidAction && descriptionEditor?.editorData?.text?.length > 0;

  const onChangeFaction = (faction: string) => {
    setFaction(faction);
  };

  const onChangeOpponentFaction = (faction: string) => {
    setOpponentFaction(faction);
  };

  const onChangeGameMode = (faction: string) => {
    setGameMode(faction);
  };

  const onClickSubmit = async () => {
    setShowValidationErrors(true);

    if (isValidData) {
      const buildOrderData: ApiBuildOrderData = {
        id: initialBuildOrder?.id || undefined,
        name,
        faction: Number(faction),
        opponentFaction: Number(opponentFaction),
        gameMode: Number(gameMode),
        description: JSON.stringify(descriptionEditor?.editorData),
        actions,
        conclusion: conclusionEditor?.editorData?.text ? JSON.stringify(conclusionEditor?.editorData) : "",
        userId: initialBuildOrder?.userId || user?.id || "",
        createdBy: user?.userName || "",
      };
      await onSubmit(buildOrderData);
    }
  };

  if (!user) return null;

  if (isSubmitting) return <BuildOrderDetailSkeleton />;
  return (
    <div className="bg-gray-900 text-white p-6 max-h-full overflow-y-auto rounded shadow-md flex flex-col flex-grow gap-3">
      <h1 className="text-xl font-bold">Create Warcraft Build Order</h1>
      {apiError && <p className="text-red-400 font-bold text-l italic">There was an error submitting the build order. Please try again later.</p>}
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
          <RichTextEditor editor={descriptionEditor?.editor} initialContent={initialBuildOrder?.description} />
          {showValidationErrors && descriptionEditor?.editorData?.text.length === 0 && (
            <p className="text-red-400 text-sm italic">Please add a description.</p>
          )}
        </div>
        <div>
          <BuildOrderActionsInput actions={actions} setActions={setActions} maxSupply={maxSupply} showValidationErrors={showValidationErrors} />
        </div>
        <div>
          <label className="text-lg font-semibold text-yellow-200">Conclusion: </label>
          <RichTextEditor editor={conclusionEditor?.editor} initialContent={initialBuildOrder?.conclusion} />
        </div>
      </div>

      <div className="flex justify-between">
        <button
          className="hover:bg-red-500 bg-red-600 w-1/6 flex items-center justify-center px-2 py-2 text-lg rounded mt-3 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
        <button
          className="hover:bg-indigo-800 bg-indigo-600 w-1/6 flex items-center justify-center px-2 py-2 text-lg rounded mt-3 cursor-pointer"
          onClick={onClickSubmit}
          disabled={showValidationErrors && !isValidData}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
