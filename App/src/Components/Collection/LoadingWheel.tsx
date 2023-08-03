import React from "react";

const LoadingWheel = () => {
  return (
    <>
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
      <h2>Please wait...</h2>
      <style>
        {`
        .loader {
          border-top-color: #3498db;
          -webkit-animation: spinner 1s linear infinite;
          animation: spinner 1s linear infinite;
        }
  
        @-webkit-keyframes spinner {
          0% { -webkit-transform: rotate(0deg); }
          100% { -webkit-transform: rotate(360deg); }
        }
  
        @keyframes spinner {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
      </style>
    </>
  );
};

export default LoadingWheel;
