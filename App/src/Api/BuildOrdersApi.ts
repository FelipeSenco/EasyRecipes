import axios from "axios";
import {
  WarcraftBuildOrder,
  BuildOrderSearchFilters,
  StarcraftBuildOrder,
  StormgateBuildOrder,
  ApiBuildOrderData,
} from "../Types&Globals/BuildOrders";
import { createBuildOrdersFiltersString } from "../utils";

export class BuildOrdersApi {
  private apiUrl?: string;
  private endpoints;

  constructor() {
    this.apiUrl = process.env.API_URL;
    this.endpoints = {
      getWarcraftBuildOrders: this.apiUrl + "/WarcraftBuildOrders?",
      getWarcraftBuildOrderById: this.apiUrl + "/WarcraftBuildOrders/detail?id={id}",
      createWarcraftBuildOrder: this.apiUrl + "/WarcraftBuildOrders/create",
      deleteWarcraftBuildOrder: this.apiUrl + "/WarcraftBuildOrders/delete?id={id}",
      getStarcraftBuildOrders: this.apiUrl + "/StarcraftBuildOrders?",
      getStarcraftBuildOrderById: this.apiUrl + "/StarcraftBuildOrders/detail?id={id}",
      createStarcraftBuildOrder: this.apiUrl + "/StarcraftBuildOrders/create",
      deleteStarcraftBuildOrder: this.apiUrl + "/StarcraftBuildOrders/delete?id={id}",
      getStormgateBuildOrders: this.apiUrl + "/StormgateBuildOrders?",
      getStormgateBuildOrderById: this.apiUrl + "/StormgateBuildOrders/detail?id={id}",
    };
  }

  //Warcraft api
  async getWarcraftBuildOrders(searchFilters: BuildOrderSearchFilters, page = 1): Promise<WarcraftBuildOrder[]> {
    const queryParams = createBuildOrdersFiltersString(searchFilters, page);
    const response = await axios.get(this.endpoints.getWarcraftBuildOrders + queryParams);
    return response.data;
  }

  async getWarcraftBuildOrderById(id: string): Promise<WarcraftBuildOrder> {
    const response = await axios.get(this.endpoints.getWarcraftBuildOrderById.replace("{id}", id));
    return response.data;
  }

  async createWarcraftBuildOrder(buildOrder: ApiBuildOrderData): Promise<string> {
    const response = await axios.post(this.endpoints.createWarcraftBuildOrder, buildOrder);
    return response.data;
  }

  async deleteWarcraftBuildOrder(id: string): Promise<string> {
    await axios.delete(this.endpoints.deleteWarcraftBuildOrder.replace("{id}", id));
    return id;
  }

  //Starcraft api
  async getStarcraftBuildOrders(searchFilters: BuildOrderSearchFilters, page = 1): Promise<StarcraftBuildOrder[]> {
    const queryParams = createBuildOrdersFiltersString(searchFilters, page);
    const response = await axios.get(this.endpoints.getStarcraftBuildOrders + queryParams);
    return response.data;
  }

  async getStarcraftBuildOrderById(id: string): Promise<StarcraftBuildOrder> {
    const response = await axios.get(this.endpoints.getStarcraftBuildOrderById.replace("{id}", id));
    return response.data;
  }

  async createStarcraftBuildOrder(buildOrder: ApiBuildOrderData): Promise<string> {
    const response = await axios.post(this.endpoints.createStarcraftBuildOrder, buildOrder);
    return response.data;
  }

  async deleteStarcraftBuildOrder(id: string): Promise<string> {
    await axios.delete(this.endpoints.deleteStarcraftBuildOrder.replace("{id}", id));
    return id;
  }

  //Stormgate api
  async getStormgateBuildOrders(searchFilters: BuildOrderSearchFilters, page = 1): Promise<StormgateBuildOrder[]> {
    const queryParams = createBuildOrdersFiltersString(searchFilters, page);
    const response = await axios.get(this.endpoints.getStormgateBuildOrders + queryParams);
    return response.data;
  }

  async getStormgateBuildOrderById(id: string): Promise<StormgateBuildOrder> {
    const response = await axios.get(this.endpoints.getStormgateBuildOrderById.replace("{id}", id));
    return response.data;
  }
}
