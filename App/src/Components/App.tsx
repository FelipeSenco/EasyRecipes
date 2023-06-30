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

      <div className="flex h-full flex-grow">
        <aside className="w-1/5 bg-red-100">Ad Space</aside>

        <main className="flex-grow flex-col flex">
          <Outlet />
        </main>

        <aside className="w-1/5 bg-red-100">Ad Space</aside>
      </div>
      <Footer />
    </div>
  );
};

export default App;
