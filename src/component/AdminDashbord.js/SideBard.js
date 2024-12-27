import React, { useState } from "react";
import { FaTimes, FaBars } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Retrieve admin data from state or localStorage
  const storedAdmin = JSON.parse(localStorage.getItem("adminData"));
  const admin = location.state?.admin || storedAdmin;

  // Toggle sidebar state
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <header className="bg-gray-800 text-white fixed top-0 left-0 right-0 z-50">
      {/* Desktop Header */}
      <nav className="hidden md:flex justify-between items-center px-6 py-3">
        <h3 className="text-lg font-semibold">
          {admin?.fullname || "Admin"}'s Dashboard
        </h3>
        <div className="flex space-x-8">
          <Link
            to="/admin-dashboard"
            className="text-gray-300 font-bold uppercase hover:text-white"
          >
            Clients
          </Link>
          <Link
            to="/fund"
            className="text-gray-300 font-bold uppercase hover:text-white"
          >
            Fund Clients
          </Link>
          <Link
            to="/deposit-approval"
            className="text-gray-300 font-bold uppercase hover:text-white"
          >
            Approve Deposit
          </Link>
          <Link
            to="/admin-login"
            className="text-gray-300 font-bold uppercase hover:text-white"
          >
            Management
          </Link>
          <Link
            to="/approve"
            className="text-gray-300 font-bold uppercase hover:text-white"
          >
            Withdrawal
          </Link>
          <Link
            to="/logout"
            className="text-gray-300 hover:text-white"
          >
            Logout
          </Link>
        </div>
      </nav>

      {/* Mobile Header */}
      <div className="flex md:hidden justify-between items-center p-4">
        <h3 className="text-lg font-semibold">
          {admin?.fullname || "Admin"}'s Dashboard
        </h3>
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

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 bg-gray-800 text-white transform transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="flex flex-col space-y-6 p-6">
          <Link
            to="/admin-dashboard"
            onClick={toggleSidebar}
            className="block text-gray-300 font-bold uppercase hover:text-white"
          >
            Clients
          </Link>
          <Link
            to="/fund"
            onClick={toggleSidebar}
            className="block text-gray-300 font-bold uppercase hover:text-white"
          >
            Fund Clients
          </Link>
          <Link
            to="/deposit-approval"
            onClick={toggleSidebar}
            className="block text-gray-300 font-bold uppercase hover:text-white"
          >
            Approve Deposit
          </Link>
          <Link
            to="/admin-login"
            onClick={toggleSidebar}
            className="block text-gray-300 font-bold uppercase hover:text-white"
          >
            Management
          </Link>
          <Link
            to="/approve"
            onClick={toggleSidebar}
            className="block text-gray-300 font-bold uppercase hover:text-white"
          >
            Withdrawal
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
};

export default Sidebar;
