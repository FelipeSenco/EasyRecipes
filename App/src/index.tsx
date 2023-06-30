import React from "react";
import App from "./Components/App";
import "./input.css";
import "tailwindcss/tailwind.css";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./Components/Errors/RouterError";
import About from "./Components/About";
import Recipes from "./Components/Main/Home";
import { UserProvider } from "./Contexts/UserContext";
import { UserApi } from "./Api/UserApi";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppProvider } from "./Contexts/AppContext";
import { BuildOrdersProvider } from "./Contexts/BuildOrdersContext";
import WarcraftBuildOrderDetail from "./Components/Main/WarcraftBuildOrder";

const root = document.getElementById("root");
if (!root) throw new Error("No root element found");

const reactRoot = createRoot(root);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Recipes />,
      },
      {
        path: "/create",
        element: <h1>Create</h1>,
      },
      { path: "/about", element: <About /> },
      {
        path: "/warcraft-build-order/:id",
        element: <WarcraftBuildOrderDetail />,
      },
      // { path: "/games", element: <Games /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const userApi = new UserApi();
const queryClient = new QueryClient();

reactRoot.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <UserProvider api={userApi}>
          <BuildOrdersProvider>
            <RouterProvider router={router} />
          </BuildOrdersProvider>
        </UserProvider>
      </AppProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
