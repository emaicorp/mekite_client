import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes, FaCheckCircle } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { RiExpandUpDownFill } from "react-icons/ri";

function Dashboard() {
  const location = useLocation();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const user = location.state?.user || storedUser;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Component */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 p-8 ml-0 md:ml-64 transition-all duration-300 ease-in-out">
        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden flex justify-end">
          <FaBars
            className="text-gray-800 text-2xl cursor-pointer"
            onClick={toggleSidebar}
          />
        </div>

        {/* Profile Section */}
        <div className="flex justify-between mt-4">
          <div className="flex items-center space-x-4 mb-6">
            <IoMdPerson className="text-4xl text-gray-600" />
            <div>
              <h2 className="text-2xl font-semibold">{user?.username}</h2>
              <div className="flex items-center space-x-2">
                <p className="text-gray-500">{user?.email}</p>
                {user?.emailVerified && (
                  <FaCheckCircle className="text-green-500" />
                )}
              </div>
            </div>
          </div>
          <RiExpandUpDownFill
            className="text-gray-600 text-3xl cursor-pointer"
            onClick={toggleModal}
          />
        </div>

        {/* Modal for User Info */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Little Information</h3>
                <FaTimes
                  className="text-gray-600 text-2xl cursor-pointer"
                  onClick={toggleModal}
                />
              </div>
              <div className="mt-4 space-y-4">
                <p>
                  <strong>Referral:</strong>{" "}
                  <a
                    href={user?.referralLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {user?.referralLink}
                  </a>
                </p>
                <p>
                  <strong>Wallet:</strong> {user?.walletAddress}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
