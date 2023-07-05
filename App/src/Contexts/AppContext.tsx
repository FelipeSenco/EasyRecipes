import React, { createContext, useState } from "react";
import RegisterModal from "../Components/Modals/UserRegisterModal";
import { Games } from "../Types/enums";

interface AppContextType {
  selectedGame: Games;
  setSelectedGame: React.Dispatch<React.SetStateAction<Games>>;
}

const AppContext = createContext<AppContextType>({
  selectedGame: Games.Warcraft_III,
  setSelectedGame: () => {},
});

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [selectedGame, setSelectedGame] = useState<Games>(Games.Warcraft_III);

  return (
    <AppContext.Provider
      value={{
        selectedGame,
        setSelectedGame,
      }}
    >
      {children}

      <RegisterModal />
    </AppContext.Provider>
  );
};

export default AppContext;
