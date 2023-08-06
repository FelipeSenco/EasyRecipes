import React from "react";
import App from "./Components/App";
import "./input.css";
import "tailwindcss/tailwind.css";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./Components/Errors/RouterError";
import About from "./Components/About";
import { UserApi } from "./Api/UserApi";
import Providers from "./Contexts/Providers";
import Home from "./Components/Main/Home";
import { BuildOrdersApi } from "./Api/BuildOrdersApi";
import { WarcraftBuildOrderPage } from "./Components/Main/Warcraft/WarcraftBuildOrder";
import { QueryClient } from "react-query";
import { AppRoutes } from "./Types&Globals/Routes";
import { WarcraftBuildOrders } from "./Components/Main/Warcraft/WarcraftBuildOrders";
import { StarcraftBuildOrders } from "./Components/Main/Starcraft/StarcraftBuildOrders";
import { StarcraftBuildOrderPage } from "./Components/Main/Starcraft/StarcraftBuildOrder";
import { StormgateBuildOrders } from "./Components/Main/Stormgate/StormgateBuildOrders";
import { StormgateBuildOrderPage } from "./Components/Main/Stormgate/StormgateBuildOrder";
import UserProfile from "./Components/Main/User/UserProfile";
import { CreateStarcraftBuildOrder, EditStarcraftBuildOrder } from "./Components/Main/Starcraft/CreateStarcraftBuildOrder";
import { CreateStormgateBuildOrder, EditStormgateBuildOrder } from "./Components/Main/Stormgate/CreateStormgateBuildOrder";
import { CreateWarcraftBuildOrder, EditWarcraftBuildOrder } from "./Components/Main/Warcraft/CreateWarcraftBuildOrder";

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
        path: AppRoutes.Home,
        element: <Home />,
      },
      {
        path: AppRoutes.WarcraftCreate,
        element: <CreateWarcraftBuildOrder />,
      },
      {
        path: AppRoutes.WarcraftEdit,
        element: <EditWarcraftBuildOrder />,
      },
      {
        path: AppRoutes.StarcraftCreate,
        element: <CreateStarcraftBuildOrder />,
      },
      {
        path: AppRoutes.StarcraftEdit,
        element: <EditStarcraftBuildOrder />,
      },
      {
        path: AppRoutes.StormgateCreate,
        element: <CreateStormgateBuildOrder />,
      },
      {
        path: AppRoutes.StormgateEdit,
        element: <EditStormgateBuildOrder />,
      },
      { path: AppRoutes.About, element: <About /> },
      {
        path: AppRoutes.WarcraftBuildOrder,
        element: <WarcraftBuildOrderPage />,
      },
      {
        path: AppRoutes.WarcraftBuildOrders,
        element: <WarcraftBuildOrders />,
      },
      {
        path: AppRoutes.StarcraftBuildOrders,
        element: <StarcraftBuildOrders />,
      },
      {
        path: AppRoutes.StarcraftBuildOrder,
        element: <StarcraftBuildOrderPage />,
      },
      {
        path: AppRoutes.StormgateBuildOrders,
        element: <StormgateBuildOrders />,
      },
      {
        path: AppRoutes.StormgateBuildOrder,
        element: <StormgateBuildOrderPage />,
      },
      {
        path: AppRoutes.UserProfile,
        element: <UserProfile />,
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const userApi = new UserApi();
const buildOrdersApi = new BuildOrdersApi();
const queryClient = new QueryClient();

reactRoot.render(
  <React.StrictMode>
    <Providers userApi={userApi} buildOrdersApi={buildOrdersApi} queryClient={queryClient}>
      <RouterProvider router={router} />
    </Providers>
  </React.StrictMode>
);
