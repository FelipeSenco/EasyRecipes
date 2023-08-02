import React, { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BuildOrderAction, WarcraftBuildOrder } from "../../../Types&Globals/BuildOrders";
import { useWarcraftBuildOrderByIdQuery } from "../../../Api/Queries/BuildOrderQueries";
import NotFound from "../../Errors/RouterError";
import { warcraftFactionsDisplay } from "../../../Types&Globals/enums";
import background from "../../../assets/warcraftbackground.png";
import { BuildOrderDetailSkeleton } from "../../Collection/BuildOrdersSkeleton";
import { WarcraftVersusDisplay } from "../../Collection/VersusDisplays";
import { AppRoutes } from "../../../Types&Globals/Routes";
import { RichTextEditor, useRichEditor } from "../../Collection/RichEditor/RichEditor";

export const WarcraftBuildOrderPage: FC = () => {
  const { id } = useParams();

  const { data: buildOrder, isFetching, isError, refetch } = useWarcraftBuildOrderByIdQuery(id as string, true);

  if (isError && !isFetching) return <NotFound />;

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
  const { editor: descriptionEditor } = useRichEditor(2000, buildOrder.description);
  const { editor: conclusionEditor } = useRichEditor(2000, buildOrder?.conclusion);

  if (isFetching) return <BuildOrderDetailSkeleton />;

  return (
    <>
      <div
        className="bg-gray-900 text-white p-4 max-h-full overflow-y-auto rounded shadow-md flex-grow flex flex-col justify-between gap-5"
        data-testid={"warcraft-build-order" + buildOrder.id}
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col gap-4">
          <div className="flex pb-5 bg-gray-900 rounded p-4" data-testid="warcraft-build-order-header">
            <div className="self-center w-1/2">
              <h2 className="text-xl text-yellow-300 font-bold pb-3">{buildOrder.name}</h2>
              <p>
                {warcraftFactionsDisplay[buildOrder.faction]} vs {warcraftFactionsDisplay[buildOrder.opponentFaction]}
              </p>
              <p className="text-sm text-gray-400">Uploaded By: {buildOrder.createdBy}</p>
            </div>
            <WarcraftVersusDisplay factionNumber={buildOrder.faction} opponentFactionNumber={buildOrder.opponentFaction} />
          </div>
          <div className="bg-gray-900 rounded p-4" data-testid="warcraft-build-order-description">
            <h2 className="text-xl pb-3 text-yellow-200 font-semibold">Description</h2>
            <RichTextEditor editor={descriptionEditor} editable={false} editorContentClassName="flex flex-col w-full rounded-md" />
          </div>
          <div data-testid="warcraft-build-order-actions" className="bg-gray-900 rounded p-4">
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
            <div className="bg-gray-900 rounded p-4" data-testid="warcraft-build-order-considerations">
              <h2 className="text-xl pb-3 font-semibold text-yellow-200">Conclusion</h2>
              <RichTextEditor editor={conclusionEditor} editable={false} editorContentClassName="flex flex-col w-full rounded-md" />
            </div>
          )}
        </div>
        <button
          onClick={() => navigate(AppRoutes.WarcraftBuildOrders)}
          data-testid="go-back-button"
          className="w-auto flex items-center self-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-900 md:py-4 md:text-lg md:px-10"
        >
          Back to build orders
        </button>
      </div>
    </>
  );
};

export default WarcraftBuildOrderDetail;
