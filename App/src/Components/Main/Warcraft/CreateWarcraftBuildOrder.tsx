import React from "react";
import { Games, Roles, warcraftFactionsDisplay, warcraftGameModesDisplay } from "../../../Types&Globals/enums";
import { CreateBuildOrder } from "../CreateBuildOrder";
import { useCreateWarcraftBuildOrderMutation, useWarcraftBuildOrderByIdQuery } from "../../../Api/Queries/BuildOrderQueries";
import { useParams } from "react-router-dom";
import NotFound from "../../Errors/RouterError";
import { useUserQuery } from "../../../Api/Queries/UserQueries";
import { useQueryClient } from "react-query";
import { WarcraftBuildOrder } from "../../../Types&Globals/BuildOrders";
import { queryKeys } from "../../../Types&Globals/queryKeys";

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
      initialBuildOrder={undefined}
    />
  );
};

export const EditWarcraftBuildOrder: React.FC = () => {
  const { mutateAsync, isError, isLoading } = useCreateWarcraftBuildOrderMutation();
  const queryClient = useQueryClient();
  const { data: user } = useUserQuery();
  const { id } = useParams();
  //check if build order exists so we can edit it
  const shouldLoadBuildOrder = id ? !queryClient.getQueryData<WarcraftBuildOrder>([queryKeys.warcraftBuildOrder, id])?.id : false;
  const { data: initialBuildOrder, isError: isEditError } = useWarcraftBuildOrderByIdQuery(id || "", shouldLoadBuildOrder);
  if (isEditError || !initialBuildOrder || (user?.role !== Roles.ADMIN && initialBuildOrder?.id && user?.id !== initialBuildOrder?.userId))
    return <NotFound />;
  return (
    <CreateBuildOrder
      gameName={Games.Warcraft_III}
      gameFactions={warcraftFactionsDisplay}
      gameModes={warcraftGameModesDisplay}
      onSubmit={mutateAsync}
      apiError={isError}
      isSubmitting={isLoading}
      initialBuildOrder={initialBuildOrder}
    />
  );
};
