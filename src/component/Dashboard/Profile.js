import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [bitcoinAddress, setBitcoinAddress] = useState("");
  const [ethereumAddress, setEthereumAddress] = useState("");
  const [usdtAddress, setUsdtAddress] = useState("");
  const [walletDetails, setWalletDetails] = useState(null);
  const [message, setMessage] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Load wallet details from localStorage on component mount
  useEffect(() => {
    const savedWalletDetails = localStorage.getItem("walletDetails");
    if (savedWalletDetails) {
      setWalletDetails(JSON.parse(savedWalletDetails));
      setEmail(JSON.parse(savedWalletDetails).email || "");
    }
  }, []);

  // POST: Save or Update Wallet Details
  const handleSaveWallet = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://mekite-crypto.onrender.com/api/users/api/wallets",
        {
          email,
          bitcoinAddress,
          ethereumAddress,
          usdtAddress,
        }
      );

      setMessage(response.data.message);
      setWalletDetails(response.data.data);

      // Save data to localStorage
      localStorage.setItem("walletDetails", JSON.stringify(response.data.data));
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Error saving wallet details."
      );
    }
  };

  // GET: Fetch Wallet Details by Email
  const handleGetWallet = async () => {
    try {
      const response = await axios.get(
        `https://mekite-crypto.onrender.com/api/users/api/wallets/${email}`
      );

      setWalletDetails(response.data.data);
      setMessage(response.data.message);

      // Save data to localStorage
      localStorage.setItem("walletDetails", JSON.stringify(response.data.data));
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Error fetching wallet details."
      );
      setWalletDetails(null);
    }
  };

  return (
   <>
           <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
     <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg mt-10">
      <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
        Wallet Manager
      </h2>

      {/* Form to POST Wallet Details */}
      <form
        onSubmit={handleSaveWallet}
        className="bg-white p-6 rounded-md shadow-md"
      >
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Email:</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">
            Bitcoin Address:
          </label>
          <input
            type="text"
            placeholder="Enter Bitcoin Address"
            value={bitcoinAddress}
            onChange={(e) => setBitcoinAddress(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">
            Ethereum Address:
          </label>
          <input
            type="text"
            placeholder="Enter Ethereum Address"
            value={ethereumAddress}
            onChange={(e) => setEthereumAddress(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">
            USDT Address:
          </label>
          <input
            type="text"
            placeholder="Enter USDT Address"
            value={usdtAddress}
            onChange={(e) => setUsdtAddress(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Save/Update Wallet
        </button>
      </form>

      <br />

      {/* Button to GET Wallet Details */}
      <div className="text-center">
        <button
          onClick={handleGetWallet}
          className="bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
        >
          Get Wallet Details
        </button>
      </div>

      {/* Display Messages */}
      {message && (
        <p className="text-center mt-4 text-lg font-semibold text-blue-700">
          {message}
        </p>
      )}

      {/* Display Wallet Details */}
      {walletDetails && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Wallet Details:
          </h3>
          <p className="text-gray-600">
            <strong>Email:</strong> {walletDetails.email}
          </p>
          <p className="text-gray-600">
            <strong>Bitcoin Address:</strong>{" "}
            {walletDetails.bitcoinAddress || "N/A"}
          </p>
          <p className="text-gray-600">
            <strong>Ethereum Address:</strong>{" "}
            {walletDetails.ethereumAddress || "N/A"}
          </p>
          <p className="text-gray-600">
            <strong>USDT Address:</strong> {walletDetails.usdtAddress || "N/A"}
          </p>
        </div>
      )}
    </div>
   </>
  );
};

export default Profile;
