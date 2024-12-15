import React from "react";
import { FaTimes, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

function Sidebar({ isSidebarOpen, toggleSidebar }) {
  return (
    <header className="bg-gray-800 text-white fixed top-0 left-0 right-0 z-50">
      {/* Desktop Header */}
      <nav className="hidden md:flex justify-between items-center px-6 py-3">
        <h3 className="text-lg font-semibold">Your Dashboard</h3>
        <div className="flex space-x-8">
          <Link
            to="/dashboard"
            className="text-gray-300 font-bold uppercase hover:text-white"
          >
            Dashboard
          </Link>
          <Link
            to="/profile"
            className="text-gray-300 font-bold uppercase hover:text-white"
          >
            Profile
          </Link>
          <Link to="/settings" className="text-gray-300 hover:text-white">
            Settings
          </Link>
          <Link to="/transactions" className="text-gray-300 hover:text-white">
            Transactions
          </Link>
          <Link to="/support" className="text-gray-300 hover:text-white">
            Support
          </Link>
          <Link to="/logout" className="text-gray-300 hover:text-white">
            Logout
          </Link>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className="flex md:hidden justify-between items-center p-4">
        <h3 className="text-lg font-semibold">Your Dashboard</h3>
        {isSidebarOpen ? (
          <FaTimes
            className="text-white text-2xl cursor-pointer"
            onClick={toggleSidebar}
          />
        ) : (
          <FaBars
            className="text-white text-2xl cursor-pointer"
            onClick={toggleSidebar}
          />
        )}
      </div>

      {/* Sidebar for Mobile */}
      <div
        className={`fixed inset-0 bg-gray-800 text-white transform transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="flex flex-col space-y-12 p-6">
          <Link
            to="/dashboard"
            onClick={toggleSidebar}
            className="block text-gray-300 font-bold uppercase hover:text-white"
          >
            Dashboard
          </Link>
          <Link
            to="/profile"
            onClick={toggleSidebar}
            className="block text-gray-300 font-bold uppercase hover:text-white"
          >
            Profile
          </Link>
          <Link
            to="/settings"
            onClick={toggleSidebar}
            className="block text-gray-300 hover:text-white"
          >
            Settings
          </Link>
          <Link
            to="/transactions"
            onClick={toggleSidebar}
            className="block text-gray-300 hover:text-white"
          >
            Transactions
          </Link>
          <Link
            to="/support"
            onClick={toggleSidebar}
            className="block text-gray-300 hover:text-white"
          >
            Support
          </Link>
          <Link
            to="/logout"
            onClick={toggleSidebar}
            className="block text-gray-300 hover:text-white"
          >
            Logout
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Sidebar;
