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
import { WarcraftBuildOrderPage } from "./Components/Main/WarcraftBuildOrder";

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
        element: <Home />,
      },
      {
        path: "/create",
        element: <h1>Create</h1>,
      },
      { path: "/about", element: <About /> },
      {
        path: "/warcraft/build-order/:id",
        element: <WarcraftBuildOrderPage />,
      },
      // { path: "/games", element: <Games /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const userApi = new UserApi();
const buildOrdersApi = new BuildOrdersApi();

reactRoot.render(
  <React.StrictMode>
    <Providers userApi={userApi} buildOrdersApi={buildOrdersApi}>
      <RouterProvider router={router} />
    </Providers>
  </React.StrictMode>
);
