import React, { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StarcraftBuildOrder } from "../../../Types&Globals/BuildOrders";
import { useDeleteStarcraftBuildOrderMutation, useStarcraftBuildOrderByIdQuery } from "../../../Api/Queries/BuildOrderQueries";
import NotFound from "../../Errors/RouterError";
import { Games, starcraftFactionsDisplay } from "../../../Types&Globals/enums";
import background from "../../../assets/starcraftbackground.png";
import BuildOrderDetail from "../BuildOrderDetails";
import { AppRoutes } from "../../../Types&Globals/Routes";

export const StarcraftBuildOrderPage: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const onEditClick = (id: string) => {
    navigate(AppRoutes.StarcraftEdit.replace(":id", id));
  };

  const { data: buildOrder, isFetching, isError } = useStarcraftBuildOrderByIdQuery(id as string, true);
  const { mutateAsync: onConfirmDelete, isError: deleteError, isLoading: deleteLoading } = useDeleteStarcraftBuildOrderMutation();

  if (isError && !isFetching && !buildOrder?.id) return <NotFound />;

  return (
    <div className="flex flex-grow" data-testid="starcraft-build-order-page">
      <BuildOrderDetail
        buildOrder={buildOrder as StarcraftBuildOrder}
        game={Games.Starcraft_II}
        isFetching={isFetching}
        deleteError={deleteError}
        deleteLoading={deleteLoading}
        factionDisplay={starcraftFactionsDisplay}
        background={background}
        onConfirmDelete={onConfirmDelete}
        onEditClick={onEditClick}
      />
    </div>
  );
};

// const StarcraftBuildOrderDetail: FC<StarcraftBuildOrderDetailProps> = ({ buildOrder, isFetching }) => {
//   const navigate = useNavigate();

//   if (isFetching) return <BuildOrderDetailSkeleton />;

//   return (
//     <>
//       <div
//         className="bg-gray-900 text-white p-4 max-h-full overflow-y-auto rounded shadow-md flex-grow flex flex-col justify-between gap-5"
//         data-testid={"starcraft-build-order" + buildOrder.id}
//         style={{
//           backgroundImage: `url(${background})`,
//           backgroundSize: "cover",
//           backgroundRepeat: "no-repeat",
//           backgroundPosition: "center",
//         }}
//       >
//         <div className="flex flex-col gap-4">
//           <div className="flex pb-5 bg-gray-900 rounded p-4" data-testid="starcraft-build-order-header">
//             <div className="self-center w-1/2">
//               <h2 className="text-xl text-yellow-300 font-bold pb-3">{buildOrder.name}</h2>
//               <p>
//                 {starcraftFactionsDisplay[buildOrder.faction]} vs {starcraftFactionsDisplay[buildOrder.opponentFaction]}
//               </p>
//               <p className="text-sm text-gray-400">Uploaded By: {buildOrder.createdBy}</p>
//             </div>
//             <StarcraftVersusDisplay factionNumber={buildOrder.faction} opponentFactionNumber={buildOrder.opponentFaction} />
//           </div>
//           <div className="bg-gray-900 rounded p-4" data-testid="starcraft-build-order-description">
//             <h2 className="text-xl pb-3 text-yellow-200 font-semibold">Description</h2>
//             <p>{buildOrder.description}</p>
//           </div>
//           <div data-testid="starcraft-build-order-actions" className="bg-gray-900 rounded p-4">
//             <h3 className="text-lg font-semibold text-yellow-200">Build Order:</h3>
//             <ul className="list-disc pl-5">
//               {buildOrder.actions.map((action: BuildOrderAction, index: number) => (
//                 <li key={index} className="flex justify-left gap-2 mb-1">
//                   <span className="font-medium">{action.clock}</span>
//                   <span className="font-medium">{action.supply}</span>
//                   <span>{action.instruction}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div className="bg-gray-900 rounded p-4" data-testid="starcraft-build-order-considerations">
//             <h2 className="text-xl pb-3 font-semibold text-yellow-200">Considerations</h2>
//             <p>{buildOrder.conclusion}</p>
//           </div>
//         </div>
//         <button
//           onClick={() => navigate(-1)}
//           data-testid="go-back-button"
//           className="w-auto flex items-center self-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-900 md:py-4 md:text-lg md:px-10"
//         >
//           Back to build orders
//         </button>
//       </div>
//     </>
//   );
// };

// export default StarcraftBuildOrderDetail;
