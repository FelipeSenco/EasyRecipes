import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { BuildOrderSearchFilters } from "../../Types&Globals/BuildOrders";
import { useDebounce } from "../../CustomHooks/useDebouncer";
import { FactionSelection } from "./FactionSelection";
import { GameModeSelection } from "./GameModeSelection";

type BuildOrdersSearchFiltersProps = {
  gameFactions: { [key: number]: string };
  gameModes: { [key: number]: string };
  searchFilters: BuildOrderSearchFilters;
  setSearchFilters: React.Dispatch<<T>(prevState: T) => T>;
};

const debounceDelay = 500;

const BuildOrdersSearchFilters: FC<BuildOrdersSearchFiltersProps> = ({ gameFactions, gameModes, searchFilters, setSearchFilters }) => {
  const [title, setTitle] = useState(searchFilters.title);
  const debouncedTitle = useDebounce(title, 500);
  const [uploadedBy, setUploadedBy] = useState(searchFilters.uploadedBy);
  const debouncedUploadedBy = useDebounce(uploadedBy, debounceDelay);

  useEffect(() => {
    debouncedTitle !== searchFilters.title && OnChangeTitle(debouncedTitle);
  }, [debouncedTitle]);

  useEffect(() => {
    debouncedUploadedBy !== searchFilters.uploadedBy && OnChangeUploadedBy(debouncedUploadedBy);
  }, [debouncedUploadedBy]);

  const OnChangeTitle = (title?: string) => {
    setSearchFilters((prevState: any) => ({
      ...prevState,
      title,
    }));
  };

  const OnChangeUploadedBy = (uploadedBy?: string) => {
    setSearchFilters((prevState: any) => ({
      ...prevState,
      uploadedBy,
    }));
  };

  const onChangeFaction = (faction?: string) => {
    setSearchFilters((prevState) => ({
      ...prevState,
      faction: faction,
    }));
  };

  const onChangeOpponentaction = (opponentFaction?: string) => {
    setSearchFilters((prevState) => ({
      ...prevState,
      opponentFaction,
    }));
  };

  const onChangeGameMode = (gameMode?: string) => {
    setSearchFilters((prevState) => ({
      ...prevState,
      gameMode: gameMode,
    }));
  };

  return (
    <div className="flex flex-col space-y-2 justify-around">
      <div className="flex gap-5 items-center">
        <input
          data-testid="build-orders-title-filter"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 bg-gray-700 rounded-md w-1/2"
          placeholder="Title"
        />
        <FactionSelection
          placeholder="Player faction"
          onChange={onChangeFaction}
          gameFactions={gameFactions}
          selectedValue={searchFilters.faction}
          className="bg-gray-700 p-2 rounded-md w-1/4"
          testId="build-orders-faction-filter"
          includeAll={false}
        />
        <span className="font-bold">VS</span>
        <FactionSelection
          placeholder="Opponent faction"
          onChange={onChangeOpponentaction}
          gameFactions={gameFactions}
          selectedValue={searchFilters.opponentFaction}
          className="bg-gray-700 p-2 rounded-md w-1/4"
          testId="build-orders-opponent-faction-filter"
          includeAll={true}
        />
      </div>
      <div className="flex justify-left gap-5">
        <input
          data-testid="build-orders-uploaded-by-filter"
          type="text"
          value={uploadedBy}
          onChange={(e) => setUploadedBy(e.target.value)}
          className="bg-gray-700 p-2 rounded-md w-1/3"
          placeholder="Uploaded by"
        />
        <GameModeSelection
          placeholder="Game mode"
          onChange={onChangeGameMode}
          testId="build-orders-game-mode-filter"
          selectedValue={searchFilters.gameMode}
          className="bg-gray-700 p-2 rounded-md w-1/4"
          gameModes={gameModes}
        />
      </div>
    </div>
  );
};

export default BuildOrdersSearchFilters;
