import axios from "axios";
import { WarcraftBuildOrder, WarcraftBuildOrderSearchFilters } from "../Types&Globals/BuildOrders";
import { createWarcraftBuildOrdersFiltersString } from "../utils";
import BuildOrdersSearchFilters from "../Components/Collection/BuildOrdersSearchFilters";

export class BuildOrdersApi {
  private apiUrl?: string;
  private endpoints;

  constructor() {
    this.apiUrl = process.env.API_URL;
    this.endpoints = {
      getWarcraftBuildOrders: this.apiUrl + "/WarcraftBuildOrders?",
      getWarcraftBuildOrderById: this.apiUrl + "/WarcraftBuildOrders/detail?id={id}",
    };
  }

  async getWarcraftBuildOrders(searchFilters: WarcraftBuildOrderSearchFilters, page = 1): Promise<WarcraftBuildOrder[]> {
    const queryParams = createWarcraftBuildOrdersFiltersString(searchFilters, page);
    const response = await axios.get(this.endpoints.getWarcraftBuildOrders + queryParams);
    return response.data;
  }

  async getWarcraftBuildOrderById(id: string): Promise<WarcraftBuildOrder> {
    const response = await axios.get(this.endpoints.getWarcraftBuildOrderById.replace("{id}", id));
    return response.data;
  }
}
