import React, { FC } from "react";
import { useWarcraftBuildOrderQuery } from "../../Api/Queries/BuildOrderQueries";
import LoadingModal from "../Modals/LoadingModal";
import { WarcraftBuildOrder } from "../../Types&Globals/BuildOrders";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../Types&Globals/Routes";
import { warcraftFactionsDisplay } from "../../Types&Globals/enums";
import NotFound from "../Errors/RouterError";

export const WarcraftBuildOrders: FC = () => {
  const { data: buildOrders, isFetching, isError, refetch } = useWarcraftBuildOrderQuery(false);

  if (buildOrders?.length === 0 && !isFetching && !isError) refetch();

  if ((!buildOrders || isError) && !isFetching) return <NotFound />;

  return (
    <div className="flex flex-grow bg-gray-900 text-white p-4" data-testid="warcraft-build-orders">
      <WarcraftBuildOrderList buildOrders={buildOrders as WarcraftBuildOrder[]} isFetching={isFetching} />
    </div>
  );
};

export const StarcraftBuildOrders: FC = () => {
  return (
    <div className="flex flex-grow bg-gray-900 text-white p-4" data-testid="starcraft-build-orders">
      Starcraft build orders
    </div>
  );
};

export const StormgateBuildOrders: FC = () => {
  return (
    <div className="flex flex-grow bg-gray-900 text-white p-4" data-testid="stormgate-build-orders">
      Stormgate build orders
    </div>
  );
};

type WarcraftBuildOrderListProps = {
  buildOrders: WarcraftBuildOrder[];
  isFetching: boolean;
};

export const WarcraftBuildOrderList: FC<WarcraftBuildOrderListProps> = ({ buildOrders, isFetching }) => {
  const navigate = useNavigate();
  const handleBuildOrderClick = (id: string) => {
    navigate(AppRoutes.WarcraftBuildOrder.replace(":id", id));
  };

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
