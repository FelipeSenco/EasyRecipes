import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <Link to="/" className="text-lg font-medium text-white">
          My App
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/recipes" className="text-gray-300 hover:text-white">
            Recipes
          </Link>
          <Link to="/create" className="text-gray-300 hover:text-white">
            Create
          </Link>
          <Link to="/about" className="text-gray-300 hover:text-white">
            About
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
