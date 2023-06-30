import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../Contexts/UserContext";
import GameSelection from "./Collection/GameSelection";

const Header: React.FC = () => {
  const { setRegisterModalOpen } = useContext(UserContext);

  const onRegisterClick = () => {
    setRegisterModalOpen(true);
  };

  return (
    <header className="bg-gray-800 shadow-md">
      <nav className="flex items-center justify-between max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Link to="/" className="text-2xl font-medium text-white">
          Build Order Builder
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white">
            Build Orders
          </Link>
        </div>
        <div className="flex gap-3">
          <button onClick={() => console.log("Login")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-1 rounded">
            Login
          </button>
          <button onClick={onRegisterClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-1 rounded">
            Register
          </button>
        </div>
      </nav>
      <nav className="flex items-center justify-center max-w-7xl pb-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4"></div>
        <GameSelection />
      </nav>
    </header>
  );
};

export default Header;
