import React, { useContext } from "react";
import { warcraftFactionsDisplay, warcraftGameModesDisplay } from "../../../Types&Globals/enums";
import { CreateBuildOrder } from "../CreateBuildOrder";
import BuildOrdersContext from "../../../Contexts/BuildOrdersContext";
import { CreateBuildOrderData } from "../../../Types&Globals/BuildOrders";

export const CreateWarcraftBuildOrder: React.FC = () => {
  const { createWarcraftBuildOrder } = useContext(BuildOrdersContext);
  const onSubmit = (buildOrderData: CreateBuildOrderData) => {
    createWarcraftBuildOrder(buildOrderData);
  };
  return <CreateBuildOrder gameName="warcraft" gameFactions={warcraftFactionsDisplay} gameModes={warcraftGameModesDisplay} onSubmit={onSubmit} />;
};
