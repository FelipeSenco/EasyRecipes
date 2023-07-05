import { wc3BuildOrderMocks } from "./buildOrderMocks";

export const mockBuildOrdersApi = {
  getWarcraftBuildOrders: jest.fn().mockResolvedValue(wc3BuildOrderMocks),
  getWarcraftBuildOrderById: jest.fn().mockResolvedValue(wc3BuildOrderMocks[0]),
} as any;
