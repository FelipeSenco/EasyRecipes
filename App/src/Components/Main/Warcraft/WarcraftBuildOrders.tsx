import React, { FC, useState } from "react";
import { useDeleteWarcraftBuildOrderMutation, useWarcraftBuildOrdersQuery } from "../../../Api/Queries/BuildOrderQueries";
import { WarcraftBuildOrder } from "../../../Types&Globals/BuildOrders";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../Types&Globals/Routes";
import { Games, Roles, warcraftFactionsDisplay, warcraftGameModesDisplay } from "../../../Types&Globals/enums";
import NotFound from "../../Errors/RouterError";
import background from "../../../assets/warcraftbackground.png";
import { BuildOrdersSkeleton } from "../../Collection/BuildOrdersSkeleton";
import IntersectionObserverContainer from "../../Collection/IntersectionObserver";
import BuildOrdersSearchFilters from "../../Collection/BuildOrdersSearchFilters";
import EditDeleteMenu from "../../Collection/EditDeleteMenu";
import DeleteModal from "../../Modals/DeleteModal";
import { useUserQuery } from "../../../Api/Queries/UserQueries";
import { VersusDisplay } from "../../Collection/VersusDisplays";

export const WarcraftBuildOrders: FC = () => {
  const [searchFilters, setSearchFilters] = useState({
    title: "",
    faction: "",
    opponentFaction: "",
    uploadedBy: "",
    gameMode: "",
  });
  const { buildOrders, isFetching, isError, refetch, hasNextPage, fetchNextPage } = useWarcraftBuildOrdersQuery(true, searchFilters);

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
        className="flex flex-grow flex-col bg-gray-900 bg-opacity-0 text-white p-4" // bg-opacity-50 sets the background opacity to 50%
      >
        <BuildOrdersSearchFilters
          gameFactions={warcraftFactionsDisplay}
          gameModes={warcraftGameModesDisplay}
          searchFilters={searchFilters}
          setSearchFilters={setSearchFilters}
        />
        <WarcraftBuildOrderList
          buildOrders={buildOrders as WarcraftBuildOrder[]}
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

type WarcraftBuildOrderListProps = {
  buildOrders: WarcraftBuildOrder[];
  isFetching: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isError: boolean;
  refetch: () => void;
};

export const WarcraftBuildOrderList: FC<WarcraftBuildOrderListProps> = ({
  buildOrders,
  isFetching,
  hasNextPage,
  fetchNextPage,
  isError,
  refetch,
}) => {
  const navigate = useNavigate();
  const [deleteModalopen, setDeleteModalOpen] = useState(false);
  const [deleteBuildOrder, setDeleteBuildOrder] = useState<WarcraftBuildOrder | null>(null);
  const { mutateAsync: onConfirmDelete, isError: isDeleteError, isLoading: isDeleteLoading } = useDeleteWarcraftBuildOrderMutation(false);

  const { data: user } = useUserQuery();

  const handleBuildOrderClick = (id: string) => {
    navigate(AppRoutes.WarcraftBuildOrder.replace(":id", id));
  };

  const onDeleteClick = (buildOrder: WarcraftBuildOrder) => {
    setDeleteBuildOrder(buildOrder);
    setDeleteModalOpen(true);
  };

  const onEditClick = (id: string) => {
    navigate(AppRoutes.WarcraftEdit.replace(":id", id));
  };

  if ((buildOrders.length === 0 || isError) && !isFetching) return <NotFound />;

  return (
    <div className="flex flex-col space-y-4 text-yellow-200 p-4 font-fantasy w-full" data-testid="warcraft-build-order-list">
      {buildOrders.map((buildOrder) => (
        <div
          key={buildOrder.id}
          data-testid={`warcraft-build-order-item-${buildOrder.id}`}
          onClick={() => handleBuildOrderClick(buildOrder.id)}
          className="p-4 border bg-gray-800 hover:bg-green-800 border-gray-700 rounded shadow-lg cursor-pointer transition ease-in duration-200 transform hover:scale-105"
        >
          <div className="flex justify-between gap-2 flex-wrap">
            <div className="w-4/6">
              <h2 className="text-xl font-bold max-w-3xl">{buildOrder.name} </h2>
              <p className="text-l  text-gray-300">
                {warcraftFactionsDisplay[buildOrder.faction]} vs {warcraftFactionsDisplay[buildOrder.opponentFaction]}
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
