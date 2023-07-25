import React, { useRef, useState } from "react";
import { useLogoutUserMutation, useUserQuery } from "../../../Api/Queries/UserQueries";
import useClickOutside from "../../../CustomHooks/useClickOutside";
import { AppRoutes } from "../../../Types&Globals/Routes";
import { useNavigate } from "react-router-dom";

const UserProfileButton: React.FC = () => {
  const { data: user } = useUserQuery();
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: logout } = useLogoutUserMutation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const onLogoutClick = () => {
    logout();
    setIsOpen(false);
  };

  const onProfileClick = () => {
    navigate(AppRoutes.UserProfile);
    setIsOpen(false);
  };

  useClickOutside(dropdownRef, () => dropdownRef?.current && setIsOpen(false));
  return (
    <div ref={dropdownRef} className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-1 rounded relative">
      <button onClick={() => setIsOpen(!isOpen)} className="text-white" data-testid="user-profile-button">
        {user?.userName}
      </button>

      {isOpen && (
        <ul className="absolute top-full mt-1 bg-white text-black p-2 rounded shadow">
          <li className="py-1 px-2 hover:bg-blue-200 cursor-pointer" onClick={onProfileClick} data-testid="user-profile-dropdown-button">
            Profile
          </li>
          <li className="py-1 px-2 hover:bg-blue-200 cursor-pointer" onClick={onLogoutClick} data-testid="user-profile-logout-button">
            Logout
          </li>
        </ul>
      )}
    </div>
  );
};

export default UserProfileButton;
