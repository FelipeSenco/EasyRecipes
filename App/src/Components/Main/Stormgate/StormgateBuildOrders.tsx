import React, { FC, useState } from "react";
import background from "../../../assets/stormgatebackground.png";
import BuildOrdersSearchFilters from "../../Collection/BuildOrdersSearchFilters";
import { Games, Roles, stormgateFactionsDisplay, stormgateGameModesDisplay } from "../../../Types&Globals/enums";
import { useDeleteStormgateBuildOrderMutation, useStormgateBuildOrdersQuery } from "../../../Api/Queries/BuildOrderQueries";
import { StormgateBuildOrder } from "../../../Types&Globals/BuildOrders";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../Types&Globals/Routes";
import NotFound from "../../Errors/RouterError";
import { BuildOrdersSkeleton } from "../../Collection/BuildOrdersSkeleton";
import IntersectionObserverContainer from "../../Collection/IntersectionObserver";
import { VersusDisplay } from "../../Collection/VersusDisplays";
import DeleteModal from "../../Modals/DeleteModal";
import EditDeleteMenu from "../../Collection/EditDeleteMenu";
import { useUserQuery } from "../../../Api/Queries/UserQueries";

export const StormgateBuildOrders: FC = () => {
  const [searchFilters, setSearchFilters] = useState({
    title: "",
    faction: "",
    opponentFaction: "",
    uploadedBy: "",
    gameMode: "",
  });
  const { buildOrders, isFetching, isError, refetch, hasNextPage, fetchNextPage } = useStormgateBuildOrdersQuery(true, searchFilters);

  return (
    <div
      className="flex flex-grow"
      data-testid="stormgate-build-orders"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div
        className="flex flex-grow flex-col bg-gray-900 bg-opacity-0 text-white p-4" // bg-opacity-50 sets the background opacity to 50%
      >
        <BuildOrdersSearchFilters
          gameFactions={stormgateFactionsDisplay}
          gameModes={stormgateGameModesDisplay}
          searchFilters={searchFilters}
          setSearchFilters={setSearchFilters}
        />
        <StormgateBuildOrderList
          buildOrders={buildOrders as StormgateBuildOrder[]}
          isFetching={isFetching}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isError={isError}
          refetch={refetch}
        />
      </div>
    </div>
  );
};

type StormgateBuildOrderListProps = {
  buildOrders: StormgateBuildOrder[];
  isFetching: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isError: boolean;
  refetch: () => void;
};

export const StormgateBuildOrderList: FC<StormgateBuildOrderListProps> = ({
  buildOrders,
  isFetching,
  hasNextPage,
  fetchNextPage,
  isError,
  refetch,
}) => {
  const navigate = useNavigate();
  const { data: user } = useUserQuery();
  const [deleteModalopen, setDeleteModalOpen] = useState(false);
  const [deleteBuildOrder, setDeleteBuildOrder] = useState<StormgateBuildOrder | null>(null);
  const { mutateAsync: onConfirmDelete, isError: isDeleteError, isLoading: isDeleteLoading } = useDeleteStormgateBuildOrderMutation(false);

  const handleBuildOrderClick = (id: string) => {
    navigate(AppRoutes.StormgateBuildOrder.replace(":id", id));
  };

  const onDeleteClick = (buildOrder: StormgateBuildOrder) => {
    setDeleteBuildOrder(buildOrder);
    setDeleteModalOpen(true);
  };

  const onEditClick = (id: string) => {
    navigate(AppRoutes.StormgateEdit.replace(":id", id));
  };

  if ((!buildOrders || isError) && !isFetching) return <NotFound />;

  return (
    <div className="flex flex-col space-y-4 text-yellow-200 p-4 font-fantasy w-full" data-testid="stormgate-build-order-list">
      {buildOrders.map((buildOrder) => (
        <div
          data-testid={`stormgate-build-order-item-${buildOrder.id}`}
          onClick={() => handleBuildOrderClick(buildOrder.id)}
          key={buildOrder.id}
          className="p-4 border bg-gray-800 hover:bg-green-800 border-gray-700 rounded shadow-lg cursor-pointer transition ease-in duration-200 transform hover:scale-105"
        >
          <div className="flex justify-between gap-2 flex-wrap">
            <div className="w-4/6">
              <h2 className="text-xl font-bold max-w-3xl">{buildOrder.name} </h2>
              <p className="text-l  text-gray-300">
                {stormgateFactionsDisplay[buildOrder.faction]} vs {stormgateFactionsDisplay[buildOrder.opponentFaction]}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <EditDeleteMenu
                onEditClick={() => onEditClick(buildOrder.id)}
                onDeleteClick={() => {
                  onDeleteClick(buildOrder);
                }}
                show={user?.role === Roles.ADMIN || user?.id === buildOrder.userId}
              />
              <VersusDisplay
                factionNumber={buildOrder.faction}
                opponentFactionNumber={buildOrder.opponentFaction}
                imgSize="14"
                game={Games.Warcraft_III}
              />
            </div>
          </div>

          <p className="text-sm text-gray-400">Created by: {buildOrder.createdBy}</p>
        </div>
      ))}
      {isFetching && <BuildOrdersSkeleton />}
      {hasNextPage && <IntersectionObserverContainer handleIntersection={fetchNextPage} />}
      {deleteModalopen && deleteBuildOrder && (
        <DeleteModal
          open={deleteModalopen}
          onCancel={() => setDeleteModalOpen(false)}
          onConfirm={async () => {
            await onConfirmDelete(deleteBuildOrder?.id || "");
            if (!isDeleteError) {
              setDeleteModalOpen(false);
              refetch();
            }
          }}
          isError={isDeleteError}
          isLoading={isDeleteLoading}
        />
      )}
    </div>
  );
};
