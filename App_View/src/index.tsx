import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./input.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Index: React.FC = () => {
  return <App />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById("root")
);
