import React, { FC } from "react";
import { useWarcraftBuildOrderQuery } from "../../Api/Queries/BuildOrderQueries";
import LoadingModal from "../Modals/LoadingModal";
import { WarcraftBuildOrder } from "../../Types/BuildOrders";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../Types/Routes";
import { Games } from "../../Types/enums";

interface BuildOrderPageProps {
  selectedGame: Games;
}

export const BuildOrderPage: FC<BuildOrderPageProps> = ({ selectedGame }) => {
  if (selectedGame === Games.STARCRAFT_2) return <StarcraftBuildOrders />;
  if (selectedGame === Games.STORMGATE) return <StormgateBuildOrders />;
  return <WarcraftBuildOrders />;
};

export const WarcraftBuildOrders: FC = () => {
  const { data: buildOrders, isFetching, isError, refetch } = useWarcraftBuildOrderQuery(false);

  if (buildOrders?.length === 0) refetch();

  if (isError) return <div>Something went wrong...</div>;

  return (
    <div className="flex flex-col" data-testid="warcraft-build-orders">
      <WarcraftBuildOrderList buildOrders={buildOrders} />
      <LoadingModal open={isFetching} />
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
  buildOrders?: WarcraftBuildOrder[];
};

const WarcraftBuildOrderList: FC<WarcraftBuildOrderListProps> = ({ buildOrders }) => {
  const navigate = useNavigate();
  const handleBuildOrderClick = (id: string) => {
    navigate(Routes.WarcraftBuildOrders.replace("{id}", id));
  };

  if (!buildOrders) return <div>No build orders found</div>;

  return (
    <div className="flex flex-col space-y-4 text-white p-4">
      {buildOrders.map((order) => (
        <div
          onClick={() => handleBuildOrderClick(order.id)}
          key={order.id}
          className="p-4 border bg-gray-800 border-gray-700 rounded shadow-lg cursor-pointer"
        >
          <h2 className="text-xl font-bold">
            {order.name}{" "}
            <p className="text-sm text-gray-300">
              {order.faction} vs {order.opponentFaction}
            </p>
          </h2>
          <p className="text-sm text-gray-400">Created by: {order.createdBy}</p>
        </div>
      ))}
    </div>
  );
};
