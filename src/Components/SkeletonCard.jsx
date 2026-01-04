import React from "react";

const SkeletonCard = () => {
  return (
    <div className="card bg-base-100 shadow-xl h-[420px] w-full animate-pulse">
      {/* Image skeleton */}
      <figure className="h-48 bg-gray-300 dark:bg-gray-700"></figure>
      
      <div className="card-body">
        {/* Title skeleton */}
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
        
        {/* Badge skeleton */}
        <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-20 mb-3"></div>
        
        {/* Description skeleton */}
        <div className="space-y-2 mb-3">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
        </div>
        
        {/* Meta info skeleton */}
        <div className="space-y-2 mb-3">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
        
        {/* Button skeleton */}
        <div className="card-actions justify-end mt-auto">
          <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-32"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
