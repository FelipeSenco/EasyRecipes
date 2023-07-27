import { FC, useContext, useEffect } from "react";
import React from "react";
import Header from "./Header";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import UserContext from "../Contexts/UserContext";
import { useLoginUserMutation, useUserQuery } from "../Api/Queries/UserQueries";
import AppContext from "../Contexts/AppContext";
import { AppRoutes } from "../Types&Globals/Routes";

const App: FC = () => {
  const { setRegisterModalOpen } = useContext(UserContext);
  const { mutate: login } = useLoginUserMutation();
  const { data: user } = useUserQuery();
  const { updateSelectedGame, forbiddenGuestPaths } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && forbiddenGuestPaths.includes(location.pathname)) {
      navigate(AppRoutes.Home);
    }
    updateSelectedGame(location.pathname);
  }, [location, user]);

  const onRegisterClick = () => {
    setRegisterModalOpen(true);
  };

  return (
    <div className="flex flex-col h-screen w-screen" data-testid="app-container">
      <div className="w-auto" data-testid="header-container">
        <Header onRegisterClick={onRegisterClick} onLoginClick={login} />
      </div>

      <div className="flex flex-col h-full overflow-y-auto" data-testid="main-container">
        <div className="flex flex-row flex-grow">
          <aside className="w-1/5 bg-black" data-testid="add-left-container">
            Ad Space
          </aside>
          <main className="flex-grow flex-col flex w-3/5">
            <Outlet />
          </main>
          <aside className="w-1/5 bg-black" data-testid="add-right-container">
            Ad Space
          </aside>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
