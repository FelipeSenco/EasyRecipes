import { Sc2BuildOrderMocks, StgBuildOrderMocks, wc3BuildOrderMocks } from "./buildOrderMocks";

export const mockBuildOrdersApi = {
  getWarcraftBuildOrders: jest.fn().mockResolvedValue(wc3BuildOrderMocks),
  getWarcraftBuildOrderById: jest.fn().mockResolvedValue(wc3BuildOrderMocks[0]),
  getStarcraftBuildOrders: jest.fn().mockResolvedValue(Sc2BuildOrderMocks),
  getStarcraftBuildOrderById: jest.fn().mockResolvedValue(Sc2BuildOrderMocks[0]),
  getStormgateBuildOrders: jest.fn().mockResolvedValue(StgBuildOrderMocks),
  getStormgateBuildOrderById: jest.fn().mockResolvedValue(StgBuildOrderMocks[0]),
} as any;
