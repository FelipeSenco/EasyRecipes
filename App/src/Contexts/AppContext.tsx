import React, { createContext, useEffect, useState } from "react";
import RegisterModal from "../Components/Modals/UserRegisterModal";
import { Games } from "../Types&Globals/enums";
import { useLocation } from "react-router-dom";

interface AppContextType {
  selectedGame: Games;
  setSelectedGame: React.Dispatch<React.SetStateAction<Games>>;
  updateSelectedGame: (currentPath: string) => void;
}

const AppContext = createContext<AppContextType>({
  selectedGame: Games.Warcraft_III,
  setSelectedGame: () => {},
  updateSelectedGame: () => {},
});

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [selectedGame, setSelectedGame] = useState<Games>(Games.Warcraft_III);

  const updateSelectedGame = (currentPath: string) => {
    if (currentPath.includes("starcraft")) setSelectedGame(Games.Starcraft_II);
    else if (currentPath.includes("warcraft")) setSelectedGame(Games.Warcraft_III);
    else if (currentPath.includes("stormgate")) setSelectedGame(Games.Stormgate);
  };

  return (
    <AppContext.Provider
      value={{
        selectedGame,
        setSelectedGame,
        updateSelectedGame,
      }}
    >
      {children}

      <RegisterModal />
    </AppContext.Provider>
  );
};

export default AppContext;
