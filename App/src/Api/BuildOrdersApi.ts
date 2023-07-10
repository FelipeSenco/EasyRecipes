import axios from "axios";
import { WarcraftBuildOrder } from "../Types&Globals/BuildOrders";
import { wc3BuildOrderMocks } from "../__mocks__/buildOrderMocks";

export class BuildOrdersApi {
  private apiUrl?: string;
  private endpoints;

  constructor() {
    this.apiUrl = process.env.API_URL;
    this.endpoints = {
      getWarcraftBuildOrders: this.apiUrl + "/WarcraftBuildOrders",
      getWarcraftBuildOrderById: this.apiUrl + "/WarcraftBuildOrders/detail?id={id}",
    };
  }

  async getWarcraftBuildOrders(page = 0): Promise<WarcraftBuildOrder[]> {
    const response = await axios.get(this.endpoints.getWarcraftBuildOrders + `?page=${page}`);
    return response.data;
  }

  async getWarcraftBuildOrderById(id: string): Promise<WarcraftBuildOrder> {
    const response = await axios.get(this.endpoints.getWarcraftBuildOrderById.replace("{id}", id));
    return response.data;
  }
}
