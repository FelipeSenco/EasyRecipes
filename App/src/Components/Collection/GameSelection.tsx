import React, { FC, useContext } from "react";
import { Games } from "../../Types&Globals/enums";
import AppContext from "../../Contexts/AppContext";
import { useNavigate } from "react-router-dom";

const GameSelection: FC = () => {
  const { selectedGame, setSelectedGame } = useContext(AppContext);
  const navigate = useNavigate();

  const onClick = (e: any) => {
    navigate("/" + e.target.value);
  };

  return (
    <div className="flex flex-row" data-testid="game-selection">
      <button
        data-testid="warcraft-button"
        className="text-green-300 hover:text-yellow-500 hover:bg-green-900 px-1 mr-5 rounded"
        style={{ background: selectedGame === Games.Warcraft_III ? selectedBackground : "inherit" }}
        value={Games.Warcraft_III}
        onClick={onClick}
      >
        Warcraft III
      </button>

      <button
        data-testid="starcraft-button"
        className="text-green-300 hover:text-yellow-500 hover:bg-green-900 px-1 mr-5 rounded"
        value={Games.Starcraft_II}
        onClick={onClick}
        style={{ background: selectedGame === Games.Starcraft_II ? selectedBackground : "inherit" }}
      >
        Starcraft II
      </button>

      <button
        data-testid="stormgate-button"
        className="text-green-300 hover:text-yellow-500 hover:bg-green-900 px-1 rounded"
        value={Games.Stormgate}
        onClick={onClick}
        style={{ background: selectedGame === Games.Stormgate ? selectedBackground : "inherit" }}
      >
        Stormgate
      </button>
    </div>
  );
};

export default GameSelection;

const selectedBackground = "#52525d";
