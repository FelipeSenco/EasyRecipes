import React from "react";

export const BuildOrdersSkeleton = () => (
  <div className="flex flex-col space-y-4 bg-gray-800 p-4 w-full" data-testid="build-orders-skeleton">
    {Array.from({ length: 5 }).map((_, index) => (
      <div key={index} className="p-4 border bg-gray-600 border-gray-700 rounded shadow-lg animate-pulse">
        <div className="flex justify-between gap-2 flex-wrap">
          <div className="h-4 bg-gray-500 rounded w-3/4 mt-4"></div>
          <div className="h-14 w-14 bg-gray-500 rounded"></div>
        </div>
        <div className="h-3 bg-gray-500 rounded w-1/4 mt-4"></div>
      </div>
    ))}
  </div>
);

export const BuildOrderDetailSkeleton = () => (
  <div
    className="bg-gray-900 text-white p-4 max-h-full overflow-y-auto rounded shadow-md flex-grow flex flex-col justify-between gap-5 "
    style={{
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    }}
    data-testid="build-order-detail-skeleton"
  >
    <div className="flex flex-col gap-4">
      <div className="flex pb-5 bg-gray-600 rounded p-4 animate-pulse">
        <div className="self-center w-1/2">
          <div className="h-6 bg-gray-500 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-500 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-500 rounded w-3/4"></div>
        </div>
        <div className="h-20 w-20 bg-gray-500 rounded"></div>
      </div>
      <div className="bg-gray-600 rounded p-4 animate-pulse">
        <div className="h-6 bg-gray-500 rounded w-4/5 mb-4"></div>
        <div className="h-4 bg-gray-500 rounded w-4/5 mb-4"></div>
        <div className="h-4 bg-gray-500 rounded w-4/5 mb-4"></div>
        <div className="h-6 bg-gray-500 rounded w-4/5 mb-4"></div>
        <div className="h-4 bg-gray-500 rounded w-4/5 mb-4"></div>
        <div className="h-4 bg-gray-500 rounded w-4/5 mb-4"></div>
        <div className="h-6 bg-gray-500 rounded w-4/5 mb-4"></div>
        <div className="h-4 bg-gray-500 rounded w-4/5 mb-4"></div>
        <div className="h-4 bg-gray-500 rounded w-4/5 mb-4"></div>
      </div>
      <div className="bg-gray-600 rounded p-4 animate-pulse">
        <div className="h-6 bg-gray-500 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-500 rounded w-full mb-4"></div>
        <div className="h-4 bg-gray-500 rounded w-full"></div>
      </div>
      <div className="bg-gray-600 rounded p-4 animate-pulse">
        <div className="h-6 bg-gray-500 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-500 rounded w-full mb-4"></div>
        <div className="h-4 bg-gray-500 rounded w-full"></div>
      </div>
    </div>
  </div>
);
