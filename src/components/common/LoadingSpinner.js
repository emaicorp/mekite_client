import React from 'react';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen bg-[#111827]">
  <div className="w-16 h-16 relative">
    <div className="w-16 h-16 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
    <div className="w-12 h-12 absolute top-2 left-2 rounded-full border-4 border-purple-500 border-t-transparent animate-spin-slow"></div>
  </div>
</div>
);

export default LoadingSpinner; 