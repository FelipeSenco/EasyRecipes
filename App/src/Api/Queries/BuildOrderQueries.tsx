import { useQuery } from "react-query";
import BuildOrdersContext from "../../Contexts/BuildOrdersContext";
import { useContext } from "react";
import { emptyWarcrafBuildOrder } from "../../__mocks__/buildOrderMocks";
import { queryKeys } from "../../Types&Globals/queryKeys";

export const useWarcraftBuildOrderQuery = (enabled: boolean) => {
  const { getWarcraftBuildOrders } = useContext(BuildOrdersContext);

  return useQuery([queryKeys.warcraftBuildOrders], {
    queryFn: getWarcraftBuildOrders,
    enabled,
    initialData: [],
    onError: (error: Error) => console.log(error),
  });
};

export const useWarcraftBuildOrderByIdQuery = (id: string, enabled: boolean) => {
  const { getWarcraftBuildOrderById } = useContext(BuildOrdersContext);

  return useQuery([queryKeys.warcraftBuildOrder, id], {
    queryFn: async () => await getWarcraftBuildOrderById(id),
    enabled,
    initialData: emptyWarcrafBuildOrder,
    onError: (error: Error) => console.log(error),
  });
};
