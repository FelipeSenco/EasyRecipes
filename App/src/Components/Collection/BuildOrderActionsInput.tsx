import React, { FC } from "react";
import { BuildOrderAction } from "../../Types&Globals/BuildOrders";

type BuildOrderActionsInputProps = {
  actions: BuildOrderAction[];
  setActions: React.Dispatch<React.SetStateAction<BuildOrderAction[]>>;
};

export const BuildOrderActionsInput: FC<BuildOrderActionsInputProps> = ({ actions, setActions }) => {
  return <div>need implementation</div>;
};
