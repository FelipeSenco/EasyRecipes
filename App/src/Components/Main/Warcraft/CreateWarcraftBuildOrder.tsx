import React, { useContext } from "react";
import { Games, warcraftFactionsDisplay, warcraftGameModesDisplay } from "../../../Types&Globals/enums";
import { CreateBuildOrder } from "../CreateBuildOrder";
import BuildOrdersContext from "../../../Contexts/BuildOrdersContext";
import { CreateBuildOrderData } from "../../../Types&Globals/BuildOrders";

export const CreateWarcraftBuildOrder: React.FC = () => {
  const { createWarcraftBuildOrder } = useContext(BuildOrdersContext);
  const onSubmit = async (buildOrderData: CreateBuildOrderData) => {
    return await createWarcraftBuildOrder(buildOrderData);
  };
  return (
    <CreateBuildOrder gameName={Games.Warcraft_III} gameFactions={warcraftFactionsDisplay} gameModes={warcraftGameModesDisplay} onSubmit={onSubmit} />
  );
};
