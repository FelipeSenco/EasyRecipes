import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./input.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RouterError from "./Components/Components/Errors/RouterError";
import Recipes from "./Components/Components/Main/Recipes";
import About from "./Components/Components/Main/About";

const Index: React.FC = () => {
  return <App />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    errorElement: <RouterError />,
    children: [
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById("root")
);
