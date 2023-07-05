import React, { createContext } from "react";
import { WarcraftBuildOrder } from "../Types/BuildOrders";
import { BuildOrdersApi } from "../Api/BuildOrdersApi";

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
  api: BuildOrdersApi;
}

export const BuildOrdersProvider: React.FC<BuildOrdersProviderProps> = ({ children, api }) => {
  const getWarcraftBuildOrders = async (): Promise<WarcraftBuildOrder[]> => {
    const res = await api.getWarcraftBuildOrders();
    return res;
  };

  const getWarcraftBuildOrderById = async (id: string): Promise<WarcraftBuildOrder> => {
    const res = await api.getWarcraftBuildOrderById(id);
    return res;
  };

  return <BuildOrdersContext.Provider value={{ getWarcraftBuildOrders, getWarcraftBuildOrderById }}>{children}</BuildOrdersContext.Provider>;
};

export default BuildOrdersContext;
