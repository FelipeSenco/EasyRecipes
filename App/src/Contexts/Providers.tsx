import React, { FC } from "react";
import { UserApi } from "../Api/UserApi";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppProvider } from "./AppContext";
import { UserProvider } from "./UserContext";
import { BuildOrdersProvider } from "./BuildOrdersContext";
import { BuildOrdersApi } from "../Api/BuildOrdersApi";

interface ProvidersProps {
  children: React.ReactNode;
  userApi: UserApi;
  buildOrdersApi: BuildOrdersApi;
  queryClient: QueryClient;
}

const Providers: FC<ProvidersProps> = ({ children, userApi, buildOrdersApi, queryClient }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <UserProvider api={userApi}>
          <BuildOrdersProvider api={buildOrdersApi}>{children}</BuildOrdersProvider>
        </UserProvider>
      </AppProvider>
    </QueryClientProvider>
  );
};

export default Providers;
