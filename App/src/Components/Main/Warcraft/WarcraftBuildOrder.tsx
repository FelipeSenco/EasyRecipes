import React, { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { WarcraftBuildOrder } from "../../../Types&Globals/BuildOrders";
import { useDeleteWarcraftBuildOrderMutation, useWarcraftBuildOrderByIdQuery } from "../../../Api/Queries/BuildOrderQueries";
import NotFound from "../../Errors/RouterError";
import { Games, warcraftFactionsDisplay } from "../../../Types&Globals/enums";
import background from "../../../assets/warcraftbackground.png";

import BuildOrderDetail from "../BuildOrderDetails";
import { AppRoutes } from "../../../Types&Globals/Routes";

export const WarcraftBuildOrderPage: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const onEditClick = (id: string) => {
    navigate(AppRoutes.WarcraftEdit.replace(":id", id));
  };
  const { data: buildOrder, isFetching, isError } = useWarcraftBuildOrderByIdQuery(id as string, true);
  const { mutateAsync: onConfirmDelete, isError: deleteError, isLoading: deleteLoading } = useDeleteWarcraftBuildOrderMutation();

  if (isError && !isFetching && !buildOrder?.id) return <NotFound />;

  return (
    <div className="flex flex-grow" data-testid="warcraft-build-order-page">
      <BuildOrderDetail
        buildOrder={buildOrder as WarcraftBuildOrder}
        game={Games.Warcraft_III}
        isFetching={isFetching}
        onConfirmDelete={onConfirmDelete}
        deleteError={deleteError}
        deleteLoading={deleteLoading}
        factionDisplay={warcraftFactionsDisplay}
        background={background}
        onEditClick={onEditClick}
      />
    </div>
  );
};
