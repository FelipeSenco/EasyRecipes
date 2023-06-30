import React, { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BuildOrderItem, WarcraftBuildOrder } from "../../Types/BuildOrders";
import { useWarcraftBuildOrderByIdQuery } from "../../Api/Queries/BuildOrderQueries";
import NotFound from "../Errors/RouterError";
import LoadingModal from "../Modals/LoadingModal";

const WarcraftBuildOrderDetail: FC = () => {
  const id = useParams().id || "";
  const navigate = useNavigate();
  const { data: buildOrder, isFetching, isError, refetch } = useWarcraftBuildOrderByIdQuery(id, false);

  if (!buildOrder?.id) refetch();

  if (isError || !buildOrder) return <NotFound />;

  return (
    <>
      <div className="bg-gray-900 text-white p-4 rounded shadow-md flex-grow flex flex-col justify-between">
        <div className="">
          <h2 className="text-xl font-bold">{buildOrder.name}</h2>
          <p>{buildOrder.description}</p>
          <div className="mt-2">
            <p>
              {buildOrder.faction} vs {buildOrder.opponentFaction}
            </p>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Steps:</h3>
            <ul className="list-disc pl-5">
              {buildOrder.steps.map((step: BuildOrderItem, index: number) => (
                <li key={index} className="flex justify-left gap-2 mb-1">
                  <span className="font-medium">{step.time}</span>
                  <span className="font-medium">{step.supply}</span>
                  <span>{step.instruction}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-4 text-sm text-gray-400">Created By: {buildOrder.createdBy}</p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="w-1/4 flex items-center self-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
        >
          Go back home
        </button>
      </div>

      <LoadingModal open={isFetching} />
    </>
  );
};

export default WarcraftBuildOrderDetail;
