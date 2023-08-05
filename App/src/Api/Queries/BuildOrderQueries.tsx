import { InfiniteData, useInfiniteQuery, useMutation, useQuery, useQueryClient } from "react-query";
import BuildOrdersContext from "../../Contexts/BuildOrdersContext";
import { useContext } from "react";
import { emptyStarcraftBuildOrder, emptyWarcrafBuildOrder } from "../../__mocks__/buildOrderMocks";
import { queryKeys } from "../../Types&Globals/queryKeys";
import { BuildOrderSearchFilters } from "../../Types&Globals/BuildOrders";
import { AppRoutes } from "../../Types&Globals/Routes";
import { useNavigate } from "react-router-dom";

//Warcraft
export const useWarcraftBuildOrdersQuery = (enabled = false, searchFilters: BuildOrderSearchFilters) => {
  const { getWarcraftBuildOrders } = useContext(BuildOrdersContext);

  const { data, isError, isFetching, isFetchingNextPage, refetch, fetchNextPage } = useInfiniteQuery(
    [queryKeys.warcraftBuildOrders, JSON.stringify(searchFilters)],
    async ({ pageParam }) => getWarcraftBuildOrders(searchFilters, pageParam),
    {
      getNextPageParam: (lastPage, pages) => pages.length + 1,
      enabled,
      onError: (error: Error) => console.log(error),
    }
  );

  const buildOrders = data?.pages.flat() || [];
  const hasNextPage = data?.pages[data?.pages.length - 1]?.length === 10;

  return { buildOrders, data, isError, isFetching, isFetchingNextPage, hasNextPage, refetch, fetchNextPage };
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

export const useCreateWarcraftBuildOrderMutation = () => {
  const { createWarcraftBuildOrder } = useContext(BuildOrdersContext);
  const navigate = useNavigate();

  return useMutation(createWarcraftBuildOrder, {
    onError: (error: Error) => {
      console.log(error);
    },
    onSuccess: (data, variables, context) => {
      navigate(AppRoutes.WarcraftBuildOrder.replace(":id", data));
    },
  });
};

export const useDeleteWarcraftBuildOrderMutation = (routeBack = true) => {
  const { deleteWarcraftBuildOrder } = useContext(BuildOrdersContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(deleteWarcraftBuildOrder, {
    onError: (error: Error) => {
      console.log(error);
    },
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData([queryKeys.warcraftBuildOrder, data], null);
      routeBack && navigate(AppRoutes.WarcraftBuildOrders);
    },
  });
};

//Starcraft
export const useStarcraftBuildOrdersQuery = (enabled = false, searchFilters: BuildOrderSearchFilters) => {
  const { getStarcraftBuildOrders } = useContext(BuildOrdersContext);

  const { data, isError, isFetching, isFetchingNextPage, refetch, fetchNextPage } = useInfiniteQuery(
    [queryKeys.starcraftBuildOrders, JSON.stringify(searchFilters)],
    async ({ pageParam }) => getStarcraftBuildOrders(searchFilters, pageParam),
    {
      getNextPageParam: (lastPage, pages) => pages.length + 1,
      enabled,
      onError: (error: Error) => console.log(error),
    }
  );
  const buildOrders = data?.pages.flat() || [];
  const hasNextPage = data?.pages[data?.pages.length - 1]?.length === 10;

  return { buildOrders, isError, isFetching, isFetchingNextPage, hasNextPage, refetch, fetchNextPage };
};

export const useStarcraftBuildOrderByIdQuery = (id: string, enabled: boolean) => {
  const { getStarcraftBuildOrderById } = useContext(BuildOrdersContext);

  return useQuery([queryKeys.starcraftBuildOrder, id], {
    queryFn: async () => await getStarcraftBuildOrderById(id),
    enabled,
    initialData: emptyStarcraftBuildOrder,
    onError: (error: Error) => console.log(error),
  });
};

export const useCreateStarcraftBuildOrderMutation = () => {
  const { createStarcraftBuildOrder } = useContext(BuildOrdersContext);
  const navigate = useNavigate();

  return useMutation(createStarcraftBuildOrder, {
    onError: (error: Error) => {
      console.log(error);
    },
    onSuccess: (data, variables, context) => {
      navigate(AppRoutes.StarcraftBuildOrder.replace(":id", data));
    },
  });
};

export const useDeleteStarcraftBuildOrderMutation = (routeBack = true) => {
  const { deleteStarcraftBuildOrder } = useContext(BuildOrdersContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(deleteStarcraftBuildOrder, {
    onError: (error: Error) => {
      console.log(error);
    },
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData([queryKeys.starcraftBuildOrder, data], null);
      routeBack && navigate(AppRoutes.StarcraftBuildOrders);
    },
  });
};

//Stormgate
export const useStormgateBuildOrdersQuery = (enabled = false, searchFilters: BuildOrderSearchFilters) => {
  const { getStormgateBuildOrders } = useContext(BuildOrdersContext);

  const { data, isError, isFetching, isFetchingNextPage, refetch, fetchNextPage } = useInfiniteQuery(
    [queryKeys.stormgateBuildOrders, JSON.stringify(searchFilters)],
    async ({ pageParam }) => getStormgateBuildOrders(searchFilters, pageParam),
    {
      getNextPageParam: (lastPage, pages) => pages.length + 1,
      enabled,
      onError: (error: Error) => console.log(error),
    }
  );
  const buildOrders = data?.pages.flat() || [];
  const hasNextPage = data?.pages[data?.pages.length - 1]?.length === 10;

  return { buildOrders, isError, isFetching, isFetchingNextPage, hasNextPage, refetch, fetchNextPage };
};

export const useStormgateBuildOrderByIdQuery = (id: string, enabled: boolean) => {
  const { getStormgateBuildOrderById } = useContext(BuildOrdersContext);

  return useQuery([queryKeys.stormgateBuildOrder, id], {
    queryFn: async () => await getStormgateBuildOrderById(id),
    enabled,
    initialData: emptyStarcraftBuildOrder,
    onError: (error: Error) => console.log(error),
  });
};
