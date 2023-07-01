import React, { ChangeEvent, ChangeEventHandler, FC, MouseEventHandler, useContext, useState } from "react";
import { Games } from "../../Types/enums";
import AppContext from "../../Contexts/AppContext";

const GameSelection: FC = () => {
  const { selectedGame, setSelectedGame } = useContext(AppContext);

  const onClick = (e: any) => {
    selectedGame !== e.target.value && setSelectedGame(e.target.value);
  };

  return (
    <div className="flex flex-row" data-testid="game-selection">
      <button
        data-testid="warcraft-button"
        className="text-green-300 hover:text-yellow-500 hover:bg-green-900 px-1 mr-5 rounded"
        style={{ background: selectedGame === Games.WARCRAFT_3 ? selectedBackground : "inherit" }}
        value={Games.WARCRAFT_3}
        onClick={onClick}
      >
        Warcraft III
      </button>

      <button
        data-testid="starcraft-button"
        className="text-green-300 hover:text-yellow-500 hover:bg-green-900 px-1 mr-5 rounded"
        value={Games.STARCRAFT_2}
        onClick={onClick}
        style={{ background: selectedGame === Games.STARCRAFT_2 ? selectedBackground : "inherit" }}
      >
        Starcraft II
      </button>

      <button
        data-testid="stormgate-button"
        className="text-green-300 hover:text-yellow-500 hover:bg-green-900 px-1 rounded"
        value={Games.STORMGATE}
        onClick={onClick}
        style={{ background: selectedGame === Games.STORMGATE ? selectedBackground : "inherit" }}
      >
        Stormgate
      </button>
    </div>
  );
};

export default GameSelection;

const selectedBackground = "#52525d";
