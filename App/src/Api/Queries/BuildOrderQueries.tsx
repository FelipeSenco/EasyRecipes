import { useQuery } from "react-query";
import BuildOrdersContext from "../../Contexts/BuildOrdersContext";
import { useContext } from "react";

export const useWarcraftBuildOrderQuery = (enabled: boolean) => {
  const { getWarcraftBuildorders } = useContext(BuildOrdersContext);

  return useQuery("warcraft-build-orders", { queryFn: getWarcraftBuildorders, enabled });
};
