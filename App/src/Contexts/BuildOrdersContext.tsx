import React, { createContext } from "react";
import {
  StarcraftBuildOrder,
  WarcraftBuildOrder,
  BuildOrderSearchFilters,
  StormgateBuildOrder,
  ApiBuildOrderData,
} from "../Types&Globals/BuildOrders";
import { BuildOrdersApi } from "../Api/BuildOrdersApi";

interface BuildOrdersContextType {
  getWarcraftBuildOrders: (searchFilters: BuildOrderSearchFilters, page?: number) => Promise<WarcraftBuildOrder[]>;
  getWarcraftBuildOrderById: (id: string) => Promise<WarcraftBuildOrder>;
  getStarcraftBuildOrders: (searchFilters: BuildOrderSearchFilters, page?: number) => Promise<StarcraftBuildOrder[]>;
  getStarcraftBuildOrderById: (id: string) => Promise<StarcraftBuildOrder>;
  getStormgateBuildOrders: (searchFilters: BuildOrderSearchFilters, page?: number) => Promise<StormgateBuildOrder[]>;
  getStormgateBuildOrderById: (id: string) => Promise<StormgateBuildOrder>;
  createWarcraftBuildOrder: (buildOrder: ApiBuildOrderData) => Promise<string>;
  deleteWarcraftBuildOrder: (id: string) => Promise<string>;
  createStarcraftBuildOrder: (buildOrder: ApiBuildOrderData) => Promise<string>;
  deleteStarcraftBuildOrder: (id: string) => Promise<string>;
}

const BuildOrdersContext = createContext<BuildOrdersContextType>({
  getWarcraftBuildOrders: () => Promise.resolve([]),
  getWarcraftBuildOrderById: () => Promise.resolve({} as WarcraftBuildOrder),
  getStarcraftBuildOrders: () => Promise.resolve([]),
  getStarcraftBuildOrderById: () => Promise.resolve({} as StarcraftBuildOrder),
  getStormgateBuildOrders: () => Promise.resolve([]),
  getStormgateBuildOrderById: () => Promise.resolve({} as StormgateBuildOrder),
  createWarcraftBuildOrder: () => Promise.resolve(""),
  deleteWarcraftBuildOrder: () => Promise.resolve(""),
  createStarcraftBuildOrder: () => Promise.resolve(""),
  deleteStarcraftBuildOrder: () => Promise.resolve(""),
});

interface BuildOrdersProviderProps {
  children: React.ReactNode;
  api: BuildOrdersApi;
}

export const BuildOrdersProvider: React.FC<BuildOrdersProviderProps> = ({ children, api }) => {
  const getWarcraftBuildOrders = async (searchFilters: BuildOrderSearchFilters, page = 1): Promise<WarcraftBuildOrder[]> => {
    const res = await api.getWarcraftBuildOrders(searchFilters, page);
    return res;
  };

  //Warcraft
  const getWarcraftBuildOrderById = async (id: string): Promise<WarcraftBuildOrder> => {
    const res = await api.getWarcraftBuildOrderById(id);
    return res;
  };

  const createWarcraftBuildOrder = async (buildOrder: ApiBuildOrderData): Promise<string> => {
    const res = await api.createWarcraftBuildOrder(buildOrder);
    return res;
  };

  const deleteWarcraftBuildOrder = async (id: string): Promise<string> => {
    const res = await api.deleteWarcraftBuildOrder(id);
    return res;
  };

  //Starcraft
  const getStarcraftBuildOrders = async (searchFilters: BuildOrderSearchFilters, page = 1): Promise<StarcraftBuildOrder[]> => {
    const res = await api.getStarcraftBuildOrders(searchFilters, page);
    return res;
  };

  const getStarcraftBuildOrderById = async (id: string): Promise<StarcraftBuildOrder> => {
    const res = await api.getStarcraftBuildOrderById(id);
    return res;
  };

  const createStarcraftBuildOrder = async (buildOrder: ApiBuildOrderData): Promise<string> => {
    const res = await api.createStarcraftBuildOrder(buildOrder);
    return res;
  };

  const deleteStarcraftBuildOrder = async (id: string): Promise<string> => {
    const res = await api.deleteStarcraftBuildOrder(id);
    return res;
  };

  //Stormgate

  const getStormgateBuildOrders = async (searchFilters: BuildOrderSearchFilters, page = 1): Promise<StormgateBuildOrder[]> => {
    const res = await api.getStormgateBuildOrders(searchFilters, page);
    return res;
  };

  const getStormgateBuildOrderById = async (id: string): Promise<StormgateBuildOrder> => {
    const res = await api.getStormgateBuildOrderById(id);
    return res;
  };

  return (
    <BuildOrdersContext.Provider
      value={{
        getWarcraftBuildOrders,
        getWarcraftBuildOrderById,
        getStarcraftBuildOrders,
        getStarcraftBuildOrderById,
        getStormgateBuildOrders,
        getStormgateBuildOrderById,
        createWarcraftBuildOrder,
        deleteWarcraftBuildOrder,
        createStarcraftBuildOrder,
        deleteStarcraftBuildOrder,
      }}
    >
      {children}
    </BuildOrdersContext.Provider>
  );
};

export default BuildOrdersContext;
