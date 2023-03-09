import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import "./input.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RouterError from "./Components/Components/Errors/RouterError";
import About from "./Components/Components/About";
import Recipes from "./Components/Components/Main/Recipes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <RouterError />,
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
    ],
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById("root")
);
