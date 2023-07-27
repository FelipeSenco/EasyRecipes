import React, { createContext, useEffect, useState } from "react";
import RegisterModal from "../Components/Modals/UserRegisterModal";
import { Games } from "../Types&Globals/enums";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserQuery } from "../Api/Queries/UserQueries";
import { AppRoutes } from "../Types&Globals/Routes";

interface AppContextType {
  selectedGame: Games;
  setSelectedGame: React.Dispatch<React.SetStateAction<Games>>;
  updateSelectedGame: (currentPath: string) => void;
  forbiddenGuestPaths: string[];
}

const AppContext = createContext<AppContextType>({
  selectedGame: Games.Warcraft_III,
  setSelectedGame: () => {},
  updateSelectedGame: () => {},
  forbiddenGuestPaths: [],
});

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [selectedGame, setSelectedGame] = useState<Games>(Games.Warcraft_III);
  const forbiddenGuestPaths = [AppRoutes.WarcraftCreate, AppRoutes.StarcraftCreate, AppRoutes.StormgateCreate, AppRoutes.UserProfile];

  const updateSelectedGame = (currentPath: string) => {
    if (currentPath.includes("starcraft")) setSelectedGame(Games.Starcraft_II);
    else if (currentPath.includes("stormgate")) setSelectedGame(Games.Stormgate);
    else setSelectedGame(Games.Warcraft_III);
  };

  return (
    <AppContext.Provider
      value={{
        selectedGame,
        setSelectedGame,
        updateSelectedGame,
        forbiddenGuestPaths,
      }}
    >
      {children}

      <RegisterModal />
    </AppContext.Provider>
  );
};

export default AppContext;
