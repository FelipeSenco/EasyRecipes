import { useNavigate } from "react-router-dom";
import { BuildOrderAction, StarcraftBuildOrder, StormgateBuildOrder, WarcraftBuildOrder } from "../../Types&Globals/BuildOrders";
import React, { FC, useState } from "react";
import { useUserQuery } from "../../Api/Queries/UserQueries";
import EditDeleteMenu from "../Collection/EditDeleteMenu";
import { RichTextEditor, useRichEditor } from "../Collection/RichEditor/RichEditor";
import { Games, Roles } from "../../Types&Globals/enums";
import { AppRoutes } from "../../Types&Globals/Routes";
import DeleteModal from "../Modals/DeleteModal";
import { BuildOrderDetailSkeleton } from "../Collection/BuildOrdersSkeleton";
import { VersusDisplay } from "../Collection/VersusDisplays";

interface BuildOrderDetailProps {
  buildOrder: WarcraftBuildOrder | StarcraftBuildOrder | StormgateBuildOrder;
  game: Games;
  isFetching: boolean;
  background: string;
  factionDisplay: { [key: number]: string };
  deleteError: boolean;
  deleteLoading: boolean;
  onConfirmDelete: (id: string) => Promise<string>;
  onEditClick: (id: string) => void;
}
const BuildOrderDetail: FC<BuildOrderDetailProps> = ({
  buildOrder,
  game,
  isFetching,
  background,
  factionDisplay,
  deleteError,
  deleteLoading,
  onConfirmDelete,
  onEditClick,
}) => {
  const navigate = useNavigate();
  const { data: user } = useUserQuery();
  const [deleteModalopen, setDeleteModalOpen] = useState(false);
  const { editor: descriptionEditor } = useRichEditor(2000);
  const { editor: conclusionEditor } = useRichEditor(2000);

  const onDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  if (isFetching) return <BuildOrderDetailSkeleton />;

  return (
    <>
      <div
        className="bg-gray-900 text-white p-4 max-h-full overflow-y-auto rounded shadow-md flex-grow flex flex-col justify-between gap-5"
        data-testid={"build-order" + buildOrder.id}
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col gap-4">
          <div className="flex justify-between pb-5 bg-gray-900 rounded p-4" data-testid="build-order-header">
            <div className="self-center w-1/2">
              <h2 className="text-xl text-yellow-300 font-bold pb-3">{buildOrder.name}</h2>
              <p>
                {factionDisplay[buildOrder.faction]} vs {factionDisplay[buildOrder.opponentFaction]}
              </p>
              <p className="text-sm text-gray-400">Uploaded By: {buildOrder.createdBy}</p>
            </div>
            <div className="flex flex-col gap-2">
              <EditDeleteMenu
                onEditClick={() => onEditClick(buildOrder.id)}
                onDeleteClick={onDeleteClick}
                show={user?.role === Roles.ADMIN || user?.id === buildOrder.userId}
              />
              <VersusDisplay factionNumber={buildOrder.faction} opponentFactionNumber={buildOrder.opponentFaction} imgSize="14" game={game} />
            </div>
          </div>
          <div className="bg-gray-900 rounded p-4" data-testid="build-order-description">
            <h2 className="text-xl pb-3 text-yellow-200 font-semibold">Description</h2>
            <RichTextEditor
              editor={descriptionEditor}
              editable={false}
              editorContentClassName="flex flex-col w-full rounded-md"
              initialContent={buildOrder?.description}
            />
          </div>
          <div data-testid="build-order-actions" className="bg-gray-900 rounded p-4">
            <h3 className="text-lg font-semibold text-yellow-200">Build Order:</h3>
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
          {buildOrder?.conclusion && (
            <div className="bg-gray-900 rounded p-4" data-testid="build-order-considerations">
              <h2 className="text-xl pb-3 font-semibold text-yellow-200">Conclusion</h2>
              <RichTextEditor
                editor={conclusionEditor}
                editable={false}
                editorContentClassName="flex flex-col w-full rounded-md"
                initialContent={buildOrder?.conclusion}
              />
            </div>
          )}
        </div>
        <button
          onClick={() => navigate(`/${game}`)}
          data-testid="go-back-button"
          className="w-auto flex items-center self-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-900 md:py-4 md:text-lg md:px-10"
        >
          Back to build orders
        </button>
      </div>
      {deleteModalopen && (
        <DeleteModal
          open={deleteModalopen}
          onCancel={() => setDeleteModalOpen(false)}
          onConfirm={() => onConfirmDelete(buildOrder.id)}
          isError={deleteError}
          isLoading={deleteLoading}
        />
      )}
    </>
  );
};

export default BuildOrderDetail;
