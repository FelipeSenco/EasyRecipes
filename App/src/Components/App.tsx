import { FC } from "react";
import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const App: FC = () => {
  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="w-auto">
        <Header />
      </div>
      <main className="flex-grow">
        <Outlet />
      </main>
      <div className="w-auto">
        <Footer />
      </div>
    </div>
  );
};

export default App;
