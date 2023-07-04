import axios from "axios";
import { WarcraftBuildOrder } from "../Types/BuildOrders";
import { wc3BuildOrderMocks } from "../__mocks__/buildOrderMocks";

export class BuildOrdersApi {
  private apiUrl?: string;
  private endpoints;

  constructor() {
    this.apiUrl = process.env.API_URL;
    this.endpoints = {
      getWarcraftBuildOrders: this.apiUrl + "/BuildOrders/warcraft",
    };
  }

  async getWarcraftBuildOrders(): Promise<WarcraftBuildOrder[]> {
    const response = await axios.get(this.endpoints.getWarcraftBuildOrders);
    return response.data;
  }

  async getWarcraftBuildOrderById(id: string): Promise<WarcraftBuildOrder> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(wc3BuildOrderMocks.find((build) => build.id === id) as WarcraftBuildOrder);
      }, 1000);
    });
  }
}
