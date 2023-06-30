import React, { createContext, useState } from "react";
import RegisterModal from "../Components/Modals/UserRegisterModal";
import { Games } from "../Types/enums";

interface AppContextType {
  selectedGame: Games;
  setSelectedGame: React.Dispatch<React.SetStateAction<Games>>;
}

const AppContext = createContext<AppContextType>({
  selectedGame: Games.WARCRAFT_3,
  setSelectedGame: () => {},
});

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [selectedGame, setSelectedGame] = useState<Games>(Games.WARCRAFT_3);

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
