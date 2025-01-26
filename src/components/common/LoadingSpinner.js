import React from 'react';

const LoadingSpinner = () => (
  <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
    <div className="animate-spin text-yellow-400 text-4xl">💰</div>
  </div>
);

export default LoadingSpinner; 