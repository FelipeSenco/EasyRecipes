import React, { createContext, useState } from "react";
import { UserApi } from "../Api/UserApi";
import { ApplicationUser } from "../Types/User";
import RegisterModal from "../Components/Modals/UserRegisterModal";

interface UserContextType {
  loginModalOpen: boolean;
  setLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  registerModalOpen: boolean;
  setRegisterModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  createUser: (user: ApplicationUser) => Promise<unknown>;
}

const UserContext = createContext<UserContextType>({
  loginModalOpen: false,
  setLoginModalOpen: () => {},
  registerModalOpen: false,
  setRegisterModalOpen: () => {},
  createUser: () => Promise.resolve(),
});

interface UserProviderProps {
  api: UserApi;
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children, api }) => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  const createUser = async (user: ApplicationUser) => {
    const res = await api.createUser(user);
    return res;
  };

  return (
    <UserContext.Provider
      value={{
        loginModalOpen,
        setLoginModalOpen,
        registerModalOpen,
        setRegisterModalOpen,
        createUser,
      }}
    >
      {children}

      <RegisterModal />
    </UserContext.Provider>
  );
};

export default UserContext;
