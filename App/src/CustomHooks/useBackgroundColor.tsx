import { useContext } from "react";
import { Games } from "../Types&Globals/enums";
import AppContext from "../Contexts/AppContext";

export const useBackgroundColor = () => {
  const { selectedGame } = useContext(AppContext);
  switch (selectedGame) {
    case Games.Warcraft_III:
      return "#0b120e";
    case Games.Starcraft_II:
      return "#0a111e";
    default:
      return "#0b031c";
  }
};
