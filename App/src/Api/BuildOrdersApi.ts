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
      getWarcraftBuildOrderById: this.apiUrl + "/BuildOrders/warcraft/detail?id={id}",
    };
  }

  async getWarcraftBuildOrders(): Promise<WarcraftBuildOrder[]> {
    const response = await axios.get(this.endpoints.getWarcraftBuildOrders);
    return response.data;
  }

  async getWarcraftBuildOrderById(id: string): Promise<WarcraftBuildOrder> {
    const response = await axios.get(this.endpoints.getWarcraftBuildOrderById.replace("{id}", id));
    return response.data;
  }
}
