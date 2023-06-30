import React, { FC } from "react";
import { useWarcraftBuildOrderQuery } from "../../Api/Queries/BuildOrderQueries";
import LoadingModal from "../Modals/LoadingModal";

export const WarcraftBuildOrders: FC = () => {
  const { data: buildOrders, isLoading, isError } = useWarcraftBuildOrderQuery(true);

  if (isError) return <div>Something went wrong...</div>;

  if (isLoading) return <LoadingModal open={isLoading} />;

  return (
    <div className="flex flex-col">
      {buildOrders?.map((build) => {
        return <div>{build.name}</div>;
      })}
    </div>
  );
};

export const StarcraftBuildOrders: FC = () => {
  return <div>Starcraft build orders</div>;
};
