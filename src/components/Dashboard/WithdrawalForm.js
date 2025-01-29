import React, { useState, useEffect } from "react";
import { FaBitcoin } from "react-icons/fa6";
import { FaEthereum } from "react-icons/fa";
import { IoWalletOutline } from "react-icons/io5";
import { SiTether } from "react-icons/si";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import WithdrawalReasons from "./WithdrawalReasons";
import { getUserDetails } from './localStorageUtils';
import axios from "axios";

function WithdrawalForm() {
  const [userDetails, setUserDetails] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  useEffect(() => {
    const storedUserDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (storedUserDetails) {
      setUserDetails(storedUserDetails);
    }
  }, []);

  if (!userDetails) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#111827]">
        <div className="w-16 h-16 relative">
          <div className="w-16 h-16 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
          <div className="w-12 h-12 absolute top-2 left-2 rounded-full border-4 border-purple-500 border-t-transparent animate-spin-slow"></div>
        </div>
      </div>
    );
  }

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency);
    setWithdrawalAmount("");
    setMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userDetails = getUserDetails();
    
    if (!userDetails) {
      setMessage("User not logged in. Please log in again.");
      setMessageType("error");
      return;
    }

    if (!withdrawalAmount || isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
      setMessage("Please enter a valid amount.");
      setMessageType("error");
      return;
    }

    try {
      const response = await axios.post(
        "https://mekite-btc.onrender.com/api/withdraw",
        {
          userId: userDetails.userId,
          currency: selectedCurrency,
          amount: withdrawalAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${userDetails.token}`,
          },
        }
      );

      setMessage(response.data.message);
      setMessageType("success");
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
      setMessageType("error");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#111827]">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden">
        <div className="mt-6 sm:mt-10 p-4 sm:p-8">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8 sm:mb-12">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-500/10 rounded-xl">
                <IoWalletOutline className="text-xl sm:text-2xl text-indigo-500" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Withdrawal</p>
                <h1 className="text-white text-lg sm:text-xl font-medium">Withdraw Funds</h1>
              </div>
            </div>
          </div>

          {/* Balance Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
            {/* Available Balance Card */}
            <div className="relative">
              <div className="p-[1px] relative rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500">
                <div className="relative bg-[#1a2234] rounded-2xl p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Available Balance</p>
                      <p className="text-xl sm:text-2xl font-bold text-white">${userDetails.availableBalance}</p>
                    </div>
                    <div className="p-3 bg-green-500/10 rounded-xl">
                      <IoWalletOutline className="text-xl sm:text-2xl text-green-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pending Balance Card */}
            <div className="relative">
              <div className="p-[1px] relative rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500">
                <div className="relative bg-[#1a2234] rounded-2xl p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Pending Balance</p>
                      <p className="text-xl sm:text-2xl font-bold text-white">${userDetails.pendingBalance}</p>
                    </div>
                    <div className="p-3 bg-yellow-500/10 rounded-xl">
                      <IoWalletOutline className="text-xl sm:text-2xl text-yellow-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Withdrawal Options */}
          <div className="relative mb-8">
            <div className="p-[1px] relative rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500">
              <div className="relative bg-[#1a2234] rounded-2xl p-4 sm:p-6">
                <div className="space-y-4">
                  {/* Bitcoin Option */}
                  <div 
                    onClick={() => handleCurrencySelect("bitcoin")}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                      selectedCurrency === "bitcoin" 
                        ? "bg-indigo-500/20 border border-indigo-500/40" 
                        : "bg-gray-900/50 border border-gray-800 hover:bg-gray-800/50"
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-2 sm:mb-0">
                      <FaBitcoin className="text-[#F7931A] text-xl sm:text-2xl" />
                      <div>
                        <p className="text-white text-sm sm:text-base">Bitcoin</p>
                        <p className="text-gray-400 text-xs sm:text-sm">Available: {userDetails.bitcoinAvailable}</p>
                      </div>
                    </div>
                    <p className="text-red-400 text-xs sm:text-sm">Pending: {userDetails.bitcoinPending}</p>
                  </div>

                  {/* Ethereum Option */}
                  <div 
                    onClick={() => handleCurrencySelect("ethereum")}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                      selectedCurrency === "ethereum" 
                        ? "bg-indigo-500/20 border border-indigo-500/40" 
                        : "bg-gray-900/50 border border-gray-800 hover:bg-gray-800/50"
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-2 sm:mb-0">
                      <FaEthereum className="text-[#627EEA] text-xl sm:text-2xl" />
                      <div>
                        <p className="text-white text-sm sm:text-base">Ethereum</p>
                        <p className="text-gray-400 text-xs sm:text-sm">Available: {userDetails.ethereumAvailable}</p>
                      </div>
                    </div>
                    <p className="text-red-400 text-xs sm:text-sm">Pending: {userDetails.ethereumPending}</p>
                  </div>

                  {/* USDT Option */}
                  <div 
                    onClick={() => handleCurrencySelect("usdt")}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                      selectedCurrency === "usdt" 
                        ? "bg-indigo-500/20 border border-indigo-500/40" 
                        : "bg-gray-900/50 border border-gray-800 hover:bg-gray-800/50"
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-2 sm:mb-0">
                      <SiTether className="text-[#26A17B] text-xl sm:text-2xl" />
                      <div>
                        <p className="text-white text-sm sm:text-base">USDT</p>
                        <p className="text-gray-400 text-xs sm:text-sm">Available: {userDetails.usdtAvailable}</p>
                      </div>
                    </div>
                    <p className="text-red-400 text-xs sm:text-sm">Pending: {userDetails.usdtPending}</p>
                  </div>
                </div>

                {/* Withdrawal Form */}
                {selectedCurrency && (
                  <form onSubmit={handleSubmit} className="mt-6 space-y-4 sm:space-y-6">
                    <div>
                      <label className="block text-gray-400 mb-2 text-sm sm:text-base">
                        Withdrawal Amount ({selectedCurrency})
                      </label>
                      <input
                        type="number"
                        value={withdrawalAmount}
                        onChange={(e) => setWithdrawalAmount(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder={`Enter amount in ${selectedCurrency}`}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-xl hover:opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
                    >
                      Submit Withdrawal
                    </button>
                  </form>
                )}

                {message && (
                  <div className={`mt-6 p-4 rounded-xl text-sm sm:text-base ${
                    messageType === "success" 
                      ? "bg-green-500/10 border border-green-500/20 text-green-400"
                      : "bg-red-500/10 border border-red-500/20 text-red-400"
                  }`}>
                    {message}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Withdrawal Reasons */}
          <WithdrawalReasons />
        </div>
      </div>
    </div>
  );
}

export default WithdrawalForm;
