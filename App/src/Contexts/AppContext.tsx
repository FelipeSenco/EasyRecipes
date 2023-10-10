import React, { createContext, useState } from "react";
import RegisterModal from "../Components/Modals/UserRegisterModal";
import { Games } from "../Types&Globals/enums";
import { AppRoutes } from "../Types&Globals/Routes";

interface AppContextType {
  selectedGame: Games;
  setSelectedGame: React.Dispatch<React.SetStateAction<Games>>;
  updateSelectedGame: (currentPath: string) => void;
  forbiddenGuestPaths: string[];
  minBuildOrderActions: number;
}

const AppContext = createContext<AppContextType>({
  selectedGame: Games.Warcraft_III,
  setSelectedGame: () => {},
  updateSelectedGame: () => {},
  forbiddenGuestPaths: [],
  minBuildOrderActions: 3,
});

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [selectedGame, setSelectedGame] = useState<Games>(Games.Warcraft_III);
  const forbiddenGuestPaths = [
    AppRoutes.WarcraftCreate,
    AppRoutes.StarcraftCreate,
    AppRoutes.StormgateCreate,
    AppRoutes.UserProfile,
    AppRoutes.WarcraftEdit,
  ];
  const minBuildOrderActions = 3;

  const updateSelectedGame = (currentPath: string) => {
    if (currentPath.toLowerCase().includes(Games.Starcraft_II.toLowerCase())) {
      setSelectedGame(Games.Starcraft_II);
    } else if (currentPath.toLowerCase().includes(Games.Stormgate.toLowerCase())) {
      setSelectedGame(Games.Stormgate);
    } else setSelectedGame(Games.Warcraft_III);
  };

  return (
    <AppContext.Provider
      value={{
        selectedGame,
        setSelectedGame,
        updateSelectedGame,
        forbiddenGuestPaths,
        minBuildOrderActions,
      }}
    >
      {children}

      <RegisterModal />
    </AppContext.Provider>
  );
};

export default AppContext;
