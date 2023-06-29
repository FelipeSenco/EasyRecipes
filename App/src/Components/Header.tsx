import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../Contexts/UserContext";

const Header: React.FC = () => {
  const { setRegisterModalOpen } = useContext(UserContext);

  const onRegisterClick = () => {
    setRegisterModalOpen(true);
  };

  return (
    <header className="bg-gray-900">
      <nav className="flex items-center justify-between max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Link to="/" className="text-2xl font-medium text-white">
          Build Order Builder
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white">
            Home
          </Link>
          <Link to="/create" className="text-gray-300 hover:text-white">
            Create
          </Link>
          <Link to="/about" className="text-gray-300 hover:text-white">
            About
          </Link>
          <button
            onClick={() => console.log("Login")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </button>
          <button
            onClick={onRegisterClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Register
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
