import React, { FC, useContext, useEffect, useState } from "react";
import AppContext from "../../Contexts/AppContext";
import { BuildOrderPage } from "./BuildOrders";

const Home: FC = () => {
  const { selectedGame } = useContext(AppContext);

  return (
    <>
      <div className="flex flex-grow bg-gray-900 text-white p-4">
        <BuildOrderPage selectedGame={selectedGame} />
      </div>
    </>
  );
};

export default Home;
