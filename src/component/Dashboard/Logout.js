import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RiLogoutCircleLine } from "react-icons/ri";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from local storage or any other storage
    localStorage.removeItem('userToken');
    // Redirect to login page
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <RiLogoutCircleLine 
          onClick={handleLogout}
          className="text-red-500 text-6xl mx-auto cursor-pointer hover:text-red-600 transition-all"
        />
        <h2 className="text-xl font-semibold text-gray-800 mt-4">
          Are you sure you want to log out?
        </h2>
        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 text-white px-6 py-2 rounded-lg shadow hover:bg-red-600 transition-all"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;
