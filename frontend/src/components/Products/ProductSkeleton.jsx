import React from "react";

const ProductSkeleton = () => {
  return (
    <div className="p-4 w-full border border-gray-300 rounded-lg shadow-md animate-pulse bg-gray-100">
      <div className="h-40 w-full bg-gray-300 rounded-md"></div>

      <div className="mt-4 space-y-2">
        <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
        <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
      </div>

      <div className="mt-4 h-8 w-full bg-gray-300 rounded"></div>
    </div>
  );
};

export default ProductSkeleton;
