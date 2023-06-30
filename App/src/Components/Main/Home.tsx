import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../Contexts/AppContext";
import { Games } from "../../Types/enums";
import { StarcraftBuildOrders, StormgateBuildOrders, WarcraftBuildOrders } from "./BuildOrders";
import Footer from "../Footer";

const Home: React.FC = () => {
  const { selectedGame } = useContext(AppContext);
  return (
    <>
      <div className="flex flex-grow bg-gray-900 text-white p-4">
        {selectedGame === Games.WARCRAFT_3 && <WarcraftBuildOrders />}
        {selectedGame === Games.STARCRAFT_2 && <StarcraftBuildOrders />}
        {selectedGame === Games.STORMGATE && <StormgateBuildOrders />}
      </div>
    </>
  );
};

export default Home;
