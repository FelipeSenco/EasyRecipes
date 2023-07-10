import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { WarcraftBuildOrderSearchFilters } from "../../Types&Globals/BuildOrders";
import { useDebounce } from "../../CustomHooks/useDebouncer";

type BuildOrdersSearchFiltersProps = {
  gameFactions: { [key: number]: string };
  gameModes: { [key: number]: string };
  searchFilters: WarcraftBuildOrderSearchFilters;
  setSearchFilters: React.Dispatch<<T>(prevState: T) => T>;
};

const debounceDelay = 500;

const BuildOrdersSearchFilters: FC<BuildOrdersSearchFiltersProps> = ({ gameFactions, gameModes, searchFilters, setSearchFilters }) => {
  const [title, setTitle] = useState(searchFilters.title);
  const debouncedTitle = useDebounce(title, 500);
  const [uploadedBy, setUploadedBy] = useState(searchFilters.uploadedBy);
  const debouncedUploadedBy = useDebounce(uploadedBy, 500);

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
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 bg-gray-700 rounded-md w-1/2"
          placeholder="Title"
        />
        <select
          value={searchFilters.faction}
          onChange={(e) => onChangeFaction(e.target.value)}
          placeholder="Player Faction"
          className="bg-gray-700 p-2 rounded-md w-1/4"
        >
          <option key={"a"} value={""}>
            Player
          </option>
          {Object.entries(gameFactions)
            .filter(([key, value]) => value !== "All")
            .map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
        </select>
        VS
        <select
          placeholder="Opponent Faction"
          value={searchFilters.opponentFaction}
          onChange={(e) => onChangeOpponentaction(e.target.value)}
          className="bg-gray-700 p-2 rounded-md w-1/4"
        >
          <option key={"a"} value={""}>
            Opponent
          </option>
          {Object.entries(gameFactions).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-left gap-5">
        <input
          type="text"
          value={uploadedBy}
          onChange={(e) => setUploadedBy(e.target.value)}
          className="bg-gray-700 p-2 rounded-md w-1/3"
          placeholder="Uploaded by"
        />
        <select value={searchFilters.gameMode} onChange={(e) => onChangeGameMode(e.target.value)} className="bg-gray-700 p-2 rounded-md w-1/4">
          <option key={"a"} value={""}>
            Any mode
          </option>
          {Object.entries(gameModes).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default BuildOrdersSearchFilters;
