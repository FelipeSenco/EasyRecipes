import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../Contexts/AppContext";
import { Games } from "../../Types/enums";
import { StarcraftBuildOrders, WarcraftBuildOrders } from "./BuildOrders";

const Home: React.FC = () => {
  const { selectedGame } = useContext(AppContext);
  return (
    <div className="flex">
      {selectedGame === Games.WARCRAFT_3 && <WarcraftBuildOrders />}
      {selectedGame === Games.STARCRAFT_2 && <StarcraftBuildOrders />}
    </div>
  );
};

export default Home;
