import React, { createContext } from "react";
import { wc3BuildOrderMocks } from "../__tests__/__mocks__/buildOrderMocks";
import { WarcraftBuildOrder } from "../Types/BuildOrders";

interface BuildOrdersContextType {
  getWarcraftBuildorders: () => Promise<WarcraftBuildOrder[]>;
}

const BuildOrdersContext = createContext<BuildOrdersContextType>({
  getWarcraftBuildorders: () => Promise.resolve([]),
});

interface BuildOrdersProviderProps {
  children: React.ReactNode;
}

export const BuildOrdersProvider: React.FC<BuildOrdersProviderProps> = ({ children }) => {
  const getWarcraftBuildorders = async (): Promise<WarcraftBuildOrder[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(wc3BuildOrderMocks);
      }, 1000);
    });
  };

  return <BuildOrdersContext.Provider value={{ getWarcraftBuildorders }}>{children}</BuildOrdersContext.Provider>;
};

export default BuildOrdersContext;
