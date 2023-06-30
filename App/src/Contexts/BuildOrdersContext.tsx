import React, { createContext } from "react";
import { wc3BuildOrderMocks } from "../__tests__/__mocks__/buildOrderMocks";
import { WarcraftBuildOrder } from "../Types/BuildOrders";

interface BuildOrdersContextType {
  getWarcraftBuildOrders: () => Promise<WarcraftBuildOrder[]>;
  getWarcraftBuildOrderById: (id: string) => Promise<WarcraftBuildOrder>;
}

const BuildOrdersContext = createContext<BuildOrdersContextType>({
  getWarcraftBuildOrders: () => Promise.resolve([]),
  getWarcraftBuildOrderById: () => Promise.resolve({} as WarcraftBuildOrder),
});

interface BuildOrdersProviderProps {
  children: React.ReactNode;
}

export const BuildOrdersProvider: React.FC<BuildOrdersProviderProps> = ({ children }) => {
  const getWarcraftBuildOrders = async (): Promise<WarcraftBuildOrder[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(wc3BuildOrderMocks);
      }, 1000);
    });
  };

  const getWarcraftBuildOrderById = async (id: string): Promise<WarcraftBuildOrder> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(wc3BuildOrderMocks.find((build) => build.id === id) as WarcraftBuildOrder);
      }, 1000);
    });
  };

  return <BuildOrdersContext.Provider value={{ getWarcraftBuildOrders, getWarcraftBuildOrderById }}>{children}</BuildOrdersContext.Provider>;
};

export default BuildOrdersContext;
