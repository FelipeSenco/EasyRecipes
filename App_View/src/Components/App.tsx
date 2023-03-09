import { FC } from "react";
import React from "react";
import Header from "./Components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer";

const App: FC = () => {
  return (
    <div
    // style={{
    //   display: "flex",
    //   flexDirection: "column",
    //   justifyContent: "space-between",
    // }}
    >
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
