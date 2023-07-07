import React, { FC } from "react";
import { useWarcraftBuildOrderQuery } from "../../Api/Queries/BuildOrderQueries";
import LoadingModal from "../Modals/LoadingModal";
import { WarcraftBuildOrder } from "../../Types&Globals/BuildOrders";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../Types&Globals/Routes";
import { warcraftFactionsDisplay } from "../../Types&Globals/enums";
import NotFound from "../Errors/RouterError";
import WarcraftVersusDisplay from "../Collection/Warcraft/WarcraftVersusDisplay";
import background from "../../assets/warcraftbackground.png";

export const WarcraftBuildOrders: FC = () => {
  const { data: buildOrders, isFetching, isError, refetch } = useWarcraftBuildOrderQuery(false);

  if (buildOrders?.length === 0 && !isFetching && !isError) refetch();

  if ((!buildOrders || isError) && !isFetching) return <NotFound />;

  return (
    <div
      className="flex flex-grow"
      data-testid="warcraft-build-orders"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div
        className="flex flex-grow bg-gray-900 bg-opacity-0 text-white p-4" // bg-opacity-50 sets the background opacity to 50%
      >
        <WarcraftBuildOrderList buildOrders={buildOrders as WarcraftBuildOrder[]} isFetching={isFetching} />
      </div>
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
    <div className="flex flex-col space-y-4 text-yellow-200 p-4 font-fantasy" data-testid="warcraft-build-order-list">
      {buildOrders.map((buildOrder) => (
        <div
          data-testid={`warcraft-build-order-item-${buildOrder.id}`}
          onClick={() => handleBuildOrderClick(buildOrder.id)}
          key={buildOrder.id}
          className="p-4 border bg-gray-800 hover:bg-green-800 border-gray-700 rounded shadow-lg cursor-pointer transition ease-in duration-200 transform hover:scale-105"
        >
          <div className="flex justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold">{buildOrder.name} </h2>
              <p className="text-l  text-gray-300">
                {warcraftFactionsDisplay[buildOrder.faction]} vs {warcraftFactionsDisplay[buildOrder.opponentFaction]}
              </p>
            </div>
            <WarcraftVersusDisplay factionNumber={buildOrder.faction} opponentFactionNumber={buildOrder.opponentFaction} imgSize="14" />
          </div>

          <p className="text-sm text-gray-400">Created by: {buildOrder.createdBy}</p>
        </div>
      ))}
      <LoadingModal open={isFetching} />
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
