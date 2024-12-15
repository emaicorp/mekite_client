import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { FaBars } from "react-icons/fa";

// Wallet Form Component
const WalletForm = ({ wallets, handleChange, handleUpdate }) => (
  <div className="w-full mx-auto max-w-3xl bg-white shadow-md rounded-lg p-4 sm:p-6">
    <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-gray-800">
      Update Your Wallet Details
    </h1>
    <p className="text-center text-gray-600 mb-6 text-sm sm:text-base">
      Provide updated wallet addresses for smooth transactions.
    </p>

    {/* Input Fields */}
    {["bitcoin", "ethereum", "usdt"].map((wallet) => (
      <div key={wallet} className="mb-4">
        <label className="block text-gray-700 mb-1 capitalize font-semibold">
          {wallet} Wallet
        </label>
        <input
          type="text"
          name={wallet}
          value={wallets[wallet]}
          onChange={handleChange}
          placeholder={`Enter ${wallet} address`}
          className="border p-3 w-full rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
    ))}

    {/* Update Button */}
    <button
      onClick={handleUpdate}
      className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
    >
      Update Profile
    </button>
  </div>
);

// Success and Error Messages
const MessageBox = ({ message, isError }) => (
  <p
    className={`mt-4 text-center font-semibold text-lg ${
      isError ? "text-red-500" : "text-green-500"
    }`}
  >
    {message}
  </p>
);

// User Details Display
const UserDetails = ({ userDetails }) => (
  <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-sm">
    <h2 className="text-xl font-semibold mb-2 text-gray-700">
      Updated User Details
    </h2>
    <pre className="whitespace-pre-wrap text-sm bg-gray-100 p-3 rounded-lg overflow-x-auto">
      {JSON.stringify(userDetails, null, 2)}
    </pre>
  </div>
);

const Profile = () => {
  const [wallets, setWallets] = useState({ bitcoin: "", ethereum: "", usdt: "" });
  const [userDetails, setUserDetails] = useState(null);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sidebar toggle
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setWallets({ ...wallets, [name]: value });
  };

  // Update Profile
  const handleUpdate = async () => {
    setMessage("");
    setUserDetails(null);
    setIsError(false);

    try {
      const response = await fetch(
        "https://mekite-crypto.onrender.com/api/users/update-profile",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(wallets),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile");
      }

      const data = await response.json();
      setUserDetails(data.user);
      setMessage("Profile updated successfully!");
    } catch (err) {
      console.error("Error:", err.message);
      setIsError(true);
      setMessage(err.message);
    }
  };

  return (
    <section className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div
        className={`flex-1 p-4 md:p-6 transition-all duration-300 ${
          isSidebarOpen ? "md:ml-64" : "ml-0"
        }`}
      >
        {/* Mobile Hamburger */}
        <div className="md:hidden flex justify-end mb-4">
          <FaBars
            className="text-gray-800 text-2xl cursor-pointer"
            onClick={toggleSidebar}
          />
        </div>

        {/* Centered Content */}
        <div className="flex flex-col items-center justify-center w-full">
          {/* Banner */}
          <div className="relative w-full mb-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src="https://i.pinimg.com/236x/71/c5/10/71c510ab8fd009a209aef7061b754095.jpg"
              alt="Profile Update Banner"
              className="w-full h-[200px] object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xl sm:text-2xl font-bold">
              Update Your Profile
            </div>
          </div>

          {/* Wallet Form */}
          <WalletForm
            wallets={wallets}
            handleChange={handleChange}
            handleUpdate={handleUpdate}
          />

          {/* Display Message */}
          {message && <MessageBox message={message} isError={isError} />}

          {/* Updated User Details */}
          {userDetails && <UserDetails userDetails={userDetails} />}
        </div>
      </div>
    </section>
  );
};

export default Profile;
