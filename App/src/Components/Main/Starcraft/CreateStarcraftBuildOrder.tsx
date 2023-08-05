import React from "react";
import { Games, Roles, starcraftFactionsDisplay, starcraftGameModesDisplay } from "../../../Types&Globals/enums";
import { CreateBuildOrder } from "../CreateBuildOrder";
import { useCreateStarcraftBuildOrderMutation, useStarcraftBuildOrderByIdQuery } from "../../../Api/Queries/BuildOrderQueries";
import { useParams } from "react-router-dom";
import NotFound from "../../Errors/RouterError";
import { useUserQuery } from "../../../Api/Queries/UserQueries";
import { useQueryClient } from "react-query";
import { StarcraftBuildOrder } from "../../../Types&Globals/BuildOrders";
import { queryKeys } from "../../../Types&Globals/queryKeys";

export const CreateStarcraftBuildOrder: React.FC = () => {
  const { mutateAsync, isError, isLoading } = useCreateStarcraftBuildOrderMutation();
  const queryClient = useQueryClient();
  const { data: user } = useUserQuery();
  const { id } = useParams();
  //check if build order exists so we can edit it
  const shouldLoadBuildOrder = id ? !queryClient.getQueryData<StarcraftBuildOrder>([queryKeys.starcraftBuildOrder, id])?.id : false;
  const { data: initialBuildOrder, isError: isEditError } = useStarcraftBuildOrderByIdQuery(id || "", shouldLoadBuildOrder);
  if (isEditError || (user?.role !== Roles.ADMIN && initialBuildOrder?.id && user?.id !== initialBuildOrder?.userId)) return <NotFound />;
  return (
    <CreateBuildOrder
      gameName={Games.Starcraft_II}
      gameFactions={starcraftFactionsDisplay}
      gameModes={starcraftGameModesDisplay}
      onSubmit={mutateAsync}
      apiError={isError}
      isSubmitting={isLoading}
      initialBuildOrder={initialBuildOrder?.id ? initialBuildOrder : undefined}
    />
  );
};
