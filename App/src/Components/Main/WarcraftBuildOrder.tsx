import React, { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BuildOrderAction, WarcraftBuildOrder } from "../../Types/BuildOrders";
import { useWarcraftBuildOrderByIdQuery } from "../../Api/Queries/BuildOrderQueries";
import NotFound from "../Errors/RouterError";
import LoadingModal from "../Modals/LoadingModal";
import { UseQueryResult } from "react-query";
import { warcraftFactionsDisplay } from "../../Types/enums";

export const WarcraftBuildOrderPage: FC = () => {
  const { id } = useParams();

  const { data: buildOrder, isFetching, isError, refetch } = useWarcraftBuildOrderByIdQuery(id as string, false);

  if (!buildOrder?.id && !isFetching && !isError) refetch();

  if ((isError || !buildOrder) && !isFetching) return <NotFound />;

  return (
    <div className="flex flex-grow" data-testid="warcraft-build-order-page">
      <WarcraftBuildOrderDetail buildOrder={buildOrder as WarcraftBuildOrder} isFetching={isFetching} />
    </div>
  );
};

interface WarcraftBuildOrderDetailProps {
  buildOrder: WarcraftBuildOrder;
  isFetching: boolean;
}
const WarcraftBuildOrderDetail: FC<WarcraftBuildOrderDetailProps> = ({ buildOrder, isFetching }) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="bg-gray-900 text-white p-4 rounded shadow-md flex-grow flex flex-col justify-between"
        data-testid={"warcraft-build-order" + buildOrder.id}
      >
        <div className="">
          <h2 className="text-xl font-bold">{buildOrder.name}</h2>
          <p>{buildOrder.description}</p>
          <div className="mt-2">
            <p>
              {warcraftFactionsDisplay[buildOrder.faction]} vs {warcraftFactionsDisplay[buildOrder.opponentFaction]}
            </p>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Build Order:</h3>
            <ul className="list-disc pl-5">
              {buildOrder.actions.map((action: BuildOrderAction, index: number) => (
                <li key={index} className="flex justify-left gap-2 mb-1">
                  <span className="font-medium">{action.clock}</span>
                  <span className="font-medium">{action.supply}</span>
                  <span>{action.instruction}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-4 text-sm text-gray-400">Created By: {buildOrder.createdBy}</p>
        </div>
        <button
          onClick={() => navigate(-1)}
          data-testid="go-back-button"
          className="w-auto flex items-center self-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
        >
          Go back
        </button>
      </div>

      <LoadingModal open={isFetching} />
    </>
  );
};

export default WarcraftBuildOrderDetail;
