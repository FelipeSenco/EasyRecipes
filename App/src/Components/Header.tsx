import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import GameSelection from "./Collection/GameSelection";
import AppContext from "../Contexts/AppContext";
import { useBackgroundColor } from "../CustomHooks/useBackgroundColor";
import { useUserQuery } from "../Api/Queries/UserQueries";
import UserProfileButton from "./Main/User/UserProfileButton";

interface HeaderProps {
  onRegisterClick: () => void;
  onLoginClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onRegisterClick, onLoginClick }) => {
  const { selectedGame } = useContext(AppContext);
  const backgroundColor = useBackgroundColor();
  const { data: user } = useUserQuery();

  return (
    <header style={{ backgroundColor: backgroundColor }} className="shadow-md" data-testid="header">
      <nav className="flex items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        <Link to="/" className="text-2xl font-medium text-white" data-testid="home-link-logo">
          Build Order Builder
        </Link>
        <div className="flex items-center space-x-4 gap-4">
          <Link to={`/${selectedGame}`} className="text-gray-300 hover:text-white" data-testid="home-link">
            Build Orders
          </Link>
          {user && (
            <Link to={`/${selectedGame}/create`} className="text-gray-300 hover:text-white" data-testid="create-link">
              Create
            </Link>
          )}
        </div>
        <div className="flex gap-3">
          {user ? (
            <UserProfileButton />
          ) : (
            <>
              <button
                onClick={onRegisterClick}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-1 rounded"
                data-testid="register-button"
              >
                Register
              </button>
              <button
                onClick={onLoginClick}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-1 rounded"
                data-testid="login-button"
              >
                Login
              </button>
            </>
          )}
        </div>
      </nav>
      <nav className="flex items-center justify-center pb-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4"></div>
        <GameSelection />
      </nav>
    </header>
  );
};

export default Header;
