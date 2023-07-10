import { WarcraftBuildOrderSearchFilters } from "./Types&Globals/BuildOrders";

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function createWarcraftBuildOrdersFiltersString(searchFilters: WarcraftBuildOrderSearchFilters, page: number): string {
  const params = [];

  if (searchFilters.title) {
    params.push(`title=${encodeURIComponent(searchFilters.title)}`);
  }

  if (searchFilters.faction) {
    params.push(`faction=${encodeURIComponent(searchFilters.faction)}`);
  }

  if (searchFilters.opponentFaction) {
    params.push(`opponentFaction=${encodeURIComponent(searchFilters.opponentFaction)}`);
  }

  if (searchFilters.uploadedBy) {
    params.push(`uploadedBy=${encodeURIComponent(searchFilters.uploadedBy)}`);
  }

  if (searchFilters.gameMode) {
    params.push(`gameMode=${encodeURIComponent(searchFilters.gameMode)}`);
  }

  if (page) {
    params.push(`page=${encodeURIComponent(page)}`);
  }

  return params.length > 0 ? params.join("&") : "";
}
