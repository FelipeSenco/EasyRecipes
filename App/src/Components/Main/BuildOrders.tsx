import React, { FC } from "react";
import { useWarcraftBuildOrderQuery } from "../../Api/Queries/BuildOrderQueries";
import LoadingModal from "../Modals/LoadingModal";
import { WarcraftBuildOrder } from "../../Types/BuildOrders";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../Types/Routes";
import { Games, warcraftFactionsDisplay } from "../../Types/enums";
import NotFound from "../Errors/RouterError";
import { UseQueryResult } from "react-query";

interface BuildOrderPageProps {
  selectedGame: Games;
}

export const BuildOrderPage: FC<BuildOrderPageProps> = ({ selectedGame }) => {
  if (selectedGame === Games.Starcraft_II) return <StarcraftBuildOrders />;
  if (selectedGame === Games.Stormgate) return <StormgateBuildOrders />;
  return <WarcraftBuildOrders />;
};

export const WarcraftBuildOrders: FC = () => {
  const buildOrdersQuery = useWarcraftBuildOrderQuery(false);

  return (
    <div className="flex flex-col" data-testid="warcraft-build-orders">
      <WarcraftBuildOrderList buildOrdersQuery={buildOrdersQuery} />
    </div>
  );
};

export const StarcraftBuildOrders: FC = () => {
  return <div data-testid="starcraft-build-orders">Starcraft build orders</div>;
};

export const StormgateBuildOrders: FC = () => {
  return <div data-testid="stormgate-build-orders">Stormgate build orders</div>;
};

type WarcraftBuildOrderListProps = {
  buildOrdersQuery: UseQueryResult<WarcraftBuildOrder[], unknown>;
};

export const WarcraftBuildOrderList: FC<WarcraftBuildOrderListProps> = ({ buildOrdersQuery }) => {
  const { data: buildOrders, isFetching, isError, refetch } = buildOrdersQuery;
  const navigate = useNavigate();

  if (buildOrders?.length === 0) refetch();

  const handleBuildOrderClick = (id: string) => {
    navigate(Routes.WarcraftBuildOrders.replace("{id}", id));
  };

  if (!buildOrders || isError) return <NotFound />;

  return (
    <div className="flex flex-col space-y-4 text-white p-4" data-testid="warcraft-build-order-list">
      {buildOrders.map((order) => (
        <div
          data-testid={`warcraft-build-order-item-${order.id}`}
          onClick={() => handleBuildOrderClick(order.id)}
          key={order.id}
          className="p-4 border bg-gray-800 border-gray-700 rounded shadow-lg cursor-pointer"
        >
          <h2 className="text-xl font-bold">
            {order.name}
            <p className="text-sm text-gray-300">
              {warcraftFactionsDisplay[order.faction]} vs {warcraftFactionsDisplay[order.opponentFaction]}
            </p>
          </h2>
          <p className="text-sm text-gray-400">Created by: {order.createdBy}</p>
        </div>
      ))}
      <LoadingModal open={isFetching} />
    </div>
  );
};
