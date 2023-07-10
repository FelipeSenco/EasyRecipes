import { useInfiniteQuery, useQuery } from "react-query";
import BuildOrdersContext from "../../Contexts/BuildOrdersContext";
import { useContext } from "react";
import { emptyWarcrafBuildOrder } from "../../__mocks__/buildOrderMocks";
import { queryKeys } from "../../Types&Globals/queryKeys";

export const useWarcraftBuildOrdersQuery = (enabled = false) => {
  const { getWarcraftBuildOrders } = useContext(BuildOrdersContext);

  const { data, isError, isFetching, isFetchingNextPage, refetch, fetchNextPage } = useInfiniteQuery(
    [queryKeys.warcraftBuildOrders],
    async ({ pageParam }) => getWarcraftBuildOrders(pageParam),
    {
      getNextPageParam: (lastPage, pages) => pages.length + 1,
      enabled,
      onError: (error: Error) => console.log(error),
    }
  );

  const buildOrders = data?.pages.flat() || [];
  const hasNextPage = data?.pages[data?.pages.length - 1]?.length === 10;
  console.log(buildOrders);

  return { buildOrders, isError, isFetching, isFetchingNextPage, hasNextPage, refetch, fetchNextPage };
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
