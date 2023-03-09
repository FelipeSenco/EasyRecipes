import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-sm">
          &copy; 2023 Easy Recipes. All rights reserved.
        </div>
        <div className="text-sm">
          Made with&nbsp;<span className="text-red-500">&hearts;</span>&nbsp;by
          Felipe de Senco
        </div>
      </div>
    </footer>
  );
};

export default Footer;
