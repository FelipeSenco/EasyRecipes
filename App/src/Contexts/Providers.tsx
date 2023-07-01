import React, { FC } from "react";
import { UserApi } from "../Api/UserApi";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppProvider } from "./AppContext";
import { UserProvider } from "./UserContext";
import { BuildOrdersProvider } from "./BuildOrdersContext";

interface ProvidersProps {
  children: React.ReactNode;
  userApi: UserApi;
}

const Providers: FC<ProvidersProps> = ({ children, userApi }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <UserProvider api={userApi}>
          <BuildOrdersProvider>{children}</BuildOrdersProvider>
        </UserProvider>
      </AppProvider>
    </QueryClientProvider>
  );
};

export default Providers;
