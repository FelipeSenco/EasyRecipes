import { FC, useContext } from "react";
import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import UserContext from "../Contexts/UserContext";

const App: FC = () => {
  const { setRegisterModalOpen } = useContext(UserContext);

  const onRegisterClick = () => {
    setRegisterModalOpen(true);
  };

  const onLoginClick = () => {
    null;
  };

  return (
    <div className="flex flex-col h-screen w-screen" data-testid="app-container">
      <div className="w-auto" data-testid="header-container">
        <Header onRegisterClick={onRegisterClick} onLoginClick={onLoginClick} />
      </div>

      <div className="flex h-full flex-grow" data-testid="main-container">
        <aside className="w-1/5 bg-red-100" data-testid="add-left-container">
          Ad Space
        </aside>

        <main className="flex-grow flex-col flex">
          <Outlet />
        </main>

        <aside className="w-1/5 bg-red-100" data-testid="add-right-container">
          Ad Space
        </aside>
      </div>
      <Footer />
    </div>
  );
};

export default App;
