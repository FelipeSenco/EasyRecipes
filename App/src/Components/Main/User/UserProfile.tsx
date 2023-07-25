import React, { FC, useEffect } from "react";
import { useUserQuery } from "../../../Api/Queries/UserQueries";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../Types&Globals/Routes";

const UserProfile: React.FC = () => {
  const { data: user } = useUserQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(AppRoutes.Home);
    }
  }, [user]);

  if (!user) return null;

  return (
    <div
      className="bg-gray-900 text-white p-4 max-h-full overflow-y-auto rounded shadow-md flex-grow flex flex-col justify-between gap-5"
      data-testid="user-profile-page"
    >
      <div className="flex flex-col gap-4">
        <div className="flex pb-5 bg-gray-900 rounded p-4" data-testid="user-profile-header">
          <div className="self-center w-1/2">
            <h2 className="text-xl text-yellow-300 font-bold pb-3">User Profile</h2>
            <p>Username: {user?.userName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
