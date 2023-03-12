import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import "./input.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./Components/Errors/RouterError";
import About from "./Components/About";
import Recipes from "./Components/Main/Recipes";

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
      { path: "*", element: <NotFound /> },
    ],
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById("root")
);
