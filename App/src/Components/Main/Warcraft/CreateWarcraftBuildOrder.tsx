import React from "react";
import { Games, warcraftFactionsDisplay, warcraftGameModesDisplay } from "../../../Types&Globals/enums";
import { CreateBuildOrder } from "../CreateBuildOrder";

import { useCreateWarcraftBuildOrderMutation } from "../../../Api/Queries/BuildOrderQueries";

export const CreateWarcraftBuildOrder: React.FC = () => {
  const { mutateAsync, isError, isLoading } = useCreateWarcraftBuildOrderMutation();
  return (
    <CreateBuildOrder
      gameName={Games.Warcraft_III}
      gameFactions={warcraftFactionsDisplay}
      gameModes={warcraftGameModesDisplay}
      onSubmit={mutateAsync}
      apiError={isError}
      isSubmitting={isLoading}
    />
  );
};
