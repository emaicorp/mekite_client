import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import { FaTimes, FaCopy } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { RiExpandUpDownFill } from "react-icons/ri";
import CryptoDashboard from "./CryptoDash";

function Dashboard() {
  const location = useLocation();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const user = location.state?.user || storedUser;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Copy State for Visual Feedback
  const [copiedField, setCopiedField] = useState(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // Function to Copy Text to Clipboard
  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000); // Reset after 2 seconds
    });
  };

  return (
    <>
      {/* Header Section */}
      <header className="flex items-center justify-between p-4 bg-blue-600 text-white">
        <div className="flex items-center space-x-2">
          <IoMdPerson className="text-3xl" />
          <h1 className="text-xl font-bold">Welcome, {user?.username}</h1>
        </div>
        <button
          onClick={toggleSidebar}
          className="text-white bg-blue-800 px-3 py-1 rounded md:hidden"
        >
          Menu
        </button>
      </header>

      {/* Sidebar and Content */}
      <div className="flex">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <main className="flex-1 bg-gray-50 p-4 md:p-8 transition-all duration-300">
          {/* User Overview */}
          <section className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {user?.username} 
                </h2>
                {/* <p className="text-gray-600">
                  Email: {user?.email}{" "}
                  {user?.emailVerified && (
                    <FaCheckCircle className="inline-block text-green-500 ml-2" />
                  )}
                </p> */}
              </div>
              <button onClick={toggleModal}>
                <RiExpandUpDownFill className="text-3xl text-gray-600 cursor-pointer" />
              </button>
            </div>
          </section>

          {/* User Details Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:max-w-lg">
                <div className="flex justify-between items-center border-b pb-2">
                  <h3 className="text-xl font-bold text-gray-800">
                    User Information
                  </h3>
                  <FaTimes
                    className="text-2xl cursor-pointer text-gray-600"
                    onClick={toggleModal}
                  />
                </div>
                <div className="mt-4 space-y-4 text-gray-700">
                  {/* Referral Link with Copy */}
                  <div className="flex items-center space-x-2">
                    <p className="font-semibold">Referral Link:</p>
                    <a
                      href={user?.referralLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline break-all"
                    >
                      {user?.referralLink}
                    </a>
                    <FaCopy
                      className="text-gray-500 cursor-pointer hover:text-blue-600"
                      onClick={() =>
                        handleCopy(user?.referralLink, "referralLink")
                      }
                    />
                    {copiedField === "referralLink" && (
                      <span className="text-green-500 text-sm">Copied!</span>
                    )}
                  </div>

                  {/* Wallet Address with Copy */}
                  {/* <div className="flex items-center space-x-2">
                    <p className="font-semibold">Wallet Address:</p>
                    <span className="break-all">{user?.walletAddress}</span>
                    <FaCopy
                      className="text-gray-500 cursor-pointer hover:text-blue-600"
                      onClick={() =>
                        handleCopy(user?.walletAddress, "walletAddress")
                      }
                    />
                    {copiedField === "walletAddress" && (
                      <span className="text-green-500 text-sm">Copied!</span>
                    )}
                  </div> */}
                </div>
              </div>
            </div>
          )}

          {/* Referral Section */}
          <section className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">
              Referral Details
            </h3>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 break-all">{user?.referralLink}</span>
              <FaCopy
                className="text-gray-500 cursor-pointer hover:text-blue-600"
                onClick={() => handleCopy(user?.referralLink, "referralLink")}
              />
              {copiedField === "referralLink" && (
                <span className="text-green-500 text-sm">Copied!</span>
              )}
            </div>
          </section>

          {/* User Dashboard Welcome */}
          <section className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-md shadow-sm">
            <h4 className="text-lg font-semibold text-blue-600">
              Welcome to Your Dashboard!
            </h4>
            <p className="text-gray-600">
              Manage your account, view referral progress, and more.
            </p>
          </section>
        </main>
      </div>

      <CryptoDashboard />
    </>
  );
}

export default Dashboard;
