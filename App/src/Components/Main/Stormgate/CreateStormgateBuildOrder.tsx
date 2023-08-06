import React from "react";
import { Games, Roles, stormgateFactionsDisplay, stormgateGameModesDisplay } from "../../../Types&Globals/enums";
import { CreateBuildOrder } from "../CreateBuildOrder";
import { useCreateStormgateBuildOrderMutation, useStormgateBuildOrderByIdQuery } from "../../../Api/Queries/BuildOrderQueries";
import { useQueryClient } from "react-query";
import { useUserQuery } from "../../../Api/Queries/UserQueries";
import { useParams } from "react-router-dom";
import { queryKeys } from "../../../Types&Globals/queryKeys";
import NotFound from "../../Errors/RouterError";
import { StormgateBuildOrder } from "../../../Types&Globals/BuildOrders";

export const CreateStormgateBuildOrder: React.FC = () => {
  const { mutateAsync, isError, isLoading } = useCreateStormgateBuildOrderMutation();
  return (
    <CreateBuildOrder
      gameName={Games.Stormgate}
      gameFactions={stormgateFactionsDisplay}
      gameModes={stormgateGameModesDisplay}
      onSubmit={mutateAsync}
      apiError={isError}
      isSubmitting={isLoading}
      initialBuildOrder={undefined}
    />
  );
};

export const EditStormgateBuildOrder: React.FC = () => {
  const { mutateAsync, isError, isLoading } = useCreateStormgateBuildOrderMutation();
  const queryClient = useQueryClient();
  const { data: user } = useUserQuery();
  const { id } = useParams();
  const shouldLoadBuildOrder = id ? !queryClient.getQueryData<StormgateBuildOrder>([queryKeys.stormgateBuildOrder, id])?.id : false;
  const { data: initialBuildOrder, isError: isEditError } = useStormgateBuildOrderByIdQuery(id || "", shouldLoadBuildOrder);
  if (isEditError || (user?.role !== Roles.ADMIN && initialBuildOrder?.id && user?.id !== initialBuildOrder?.userId)) return <NotFound />;
  return (
    <CreateBuildOrder
      gameName={Games.Stormgate}
      gameFactions={stormgateFactionsDisplay}
      gameModes={stormgateGameModesDisplay}
      onSubmit={mutateAsync}
      apiError={isError}
      isSubmitting={isLoading}
      initialBuildOrder={initialBuildOrder}
    />
  );
};
