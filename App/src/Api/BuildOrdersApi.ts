import axios from "axios";
import {
  WarcraftBuildOrder,
  BuildOrderSearchFilters,
  StarcraftBuildOrder,
  StormgateBuildOrder,
  CreateBuildOrderData,
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
      getStarcraftBuildOrders: this.apiUrl + "/StarcraftBuildOrders?",
      getStarcraftBuildOrderById: this.apiUrl + "/StarcraftBuildOrders/detail?id={id}",
      getStormgateBuildOrders: this.apiUrl + "/StormgateBuildOrders?",
      getStormgateBuildOrderById: this.apiUrl + "/StormgateBuildOrders/detail?id={id}",
      createWarcraftBuildOrder: this.apiUrl + "/WarcraftBuildOrders/create",
    };
  }

  async getWarcraftBuildOrders(searchFilters: BuildOrderSearchFilters, page = 1): Promise<WarcraftBuildOrder[]> {
    const queryParams = createBuildOrdersFiltersString(searchFilters, page);
    const response = await axios.get(this.endpoints.getWarcraftBuildOrders + queryParams);
    return response.data;
  }

  async getWarcraftBuildOrderById(id: string): Promise<WarcraftBuildOrder> {
    const response = await axios.get(this.endpoints.getWarcraftBuildOrderById.replace("{id}", id));
    return response.data;
  }

  async createWarcraftBuildOrder(buildOrder: CreateBuildOrderData): Promise<string> {
    const response = await axios.post(this.endpoints.createWarcraftBuildOrder, buildOrder);
    return response.data;
  }

  async getStarcraftBuildOrders(searchFilters: BuildOrderSearchFilters, page = 1): Promise<StarcraftBuildOrder[]> {
    const queryParams = createBuildOrdersFiltersString(searchFilters, page);
    const response = await axios.get(this.endpoints.getStarcraftBuildOrders + queryParams);
    return response.data;
  }

  async getStarcraftBuildOrderById(id: string): Promise<StarcraftBuildOrder> {
    const response = await axios.get(this.endpoints.getStarcraftBuildOrderById.replace("{id}", id));
    return response.data;
  }

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
