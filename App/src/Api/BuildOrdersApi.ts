import { WarcraftBuildOrder } from "../Types/BuildOrders";
import { wc3BuildOrderMocks } from "../__mocks__/buildOrderMocks";

export class BuildOrdersApi {
  private apiUrl?: string;
  private endpoints;

  constructor() {
    this.apiUrl = process.env.API_URL;
    this.endpoints = {
      getWarcraftBuildOrders: this.apiUrl + "/api/buildOrders/getBuildOrders",
    };
  }

  async getWarcraftBuildOrders(buildOrders: WarcraftBuildOrder[]): Promise<WarcraftBuildOrder[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(buildOrders);
      }, 1500);
    });
  }

  async getWarcraftBuildOrderById(id: string): Promise<WarcraftBuildOrder> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(wc3BuildOrderMocks.find((build) => build.id === id) as WarcraftBuildOrder);
      }, 1000);
    });
  }
}
