import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">404</h1>
          <p className="mt-2 text-base text-gray-300">Sorry, we couldn't find this page.</p>
        </div>
        <div className="mt-6">
          <div className="rounded-md shadow">
            <button
              onClick={() => navigate("/")}
              className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
            >
              Go back home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
