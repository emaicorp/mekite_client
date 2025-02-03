import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./SideBard";
import { motion, AnimatePresence } from "framer-motion";
import { 
  RiUserLine, 
  RiExchangeDollarLine, 
  RiArrowUpLine, 
  RiArrowDownLine,
  RiWalletLine 
} from "react-icons/ri";

const AdminFundUser = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [currency, setCurrency] = useState("bitcoin");
  const [balanceChange, setBalanceChange] = useState(0);
  const [isWithdrawal, setIsWithdrawal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://mekite-btc.onrender.com/api/all-users"
        );
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser) {
      alert("Please select a user.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(
        "https://mekite-btc.onrender.com/api/update-balance",
        {
          walletAddress: selectedUser,
          currency,
          balanceChange: parseFloat(balanceChange),
          isWithdrawal,
        }
      );
      setSuccessMessage(response.data.message);
      setLoading(false);
      
      // Reset form
      setSelectedUser("");
      setBalanceChange(0);
      setIsWithdrawal(false);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error updating balance:", error);
      alert(error.response?.data?.message || "An error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111827]">
      <Sidebar />
      
      <div className="w-full md:pl-72 pt-16 md:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-4 md:p-8 space-y-6"
        >
          {/* Header */}
          <div className="relative p-6 rounded-2xl overflow-hidden bg-[#1a2234]">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-10"></div>
            <div className="relative">
              <h1 className="text-3xl font-bold text-white mb-2">
                Fund User Account
              </h1>
              <p className="text-gray-400">
                Manage user balances and transactions
              </p>
            </div>
          </div>

          {/* Success Message */}
          <AnimatePresence>
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400"
              >
                {successMessage}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <div className="relative p-[1px] rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500">
            <form 
              onSubmit={handleFormSubmit}
              className="relative bg-[#1a2234] rounded-2xl p-6 md:p-8 space-y-6"
            >
              {/* User Selection */}
              <div>
                <label className="block text-gray-400 mb-2">Select User</label>
                <div className="relative">
                  <RiUserLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    className="w-full bg-[#111827] text-white pl-10 pr-4 py-3 rounded-xl border border-gray-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                  >
                    <option value="">-- Select User --</option>
                    {users.map((user) => (
                      <option key={user.walletAddress} value={user.walletAddress}>
                        {user.fullName} ({user.walletAddress})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Currency Selection */}
              <div>
                <label className="block text-gray-400 mb-2">Select Currency</label>
                <div className="relative">
                  <RiWalletLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full bg-[#111827] text-white pl-10 pr-4 py-3 rounded-xl border border-gray-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                  >
                    <option value="bitcoin">Bitcoin</option>
                    <option value="ethereum">Ethereum</option>
                    <option value="usdt">USDT</option>
                  </select>
                </div>
              </div>

              {/* Amount Input */}
              <div>
                <label className="block text-gray-400 mb-2">Amount</label>
                <div className="relative">
                  <RiExchangeDollarLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    value={balanceChange}
                    onChange={(e) => setBalanceChange(e.target.value)}
                    className="w-full bg-[#111827] text-white pl-10 pr-4 py-3 rounded-xl border border-gray-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="Enter amount"
                  />
                </div>
              </div>

              {/* Transaction Type */}
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => setIsWithdrawal(false)}
                  className={`flex-1 p-4 rounded-xl border ${
                    !isWithdrawal 
                      ? 'border-green-500 bg-green-500/10 text-green-400' 
                      : 'border-gray-800 text-gray-400'
                  } flex items-center justify-center space-x-2 transition-all`}
                >
                  <RiArrowUpLine />
                  <span>Deposit</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsWithdrawal(true)}
                  className={`flex-1 p-4 rounded-xl border ${
                    isWithdrawal 
                      ? 'border-red-500 bg-red-500/10 text-red-400' 
                      : 'border-gray-800 text-gray-400'
                  } flex items-center justify-center space-x-2 transition-all`}
                >
                  <RiArrowDownLine />
                  <span>Withdrawal</span>
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-xl hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#1a2234] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Processing..." : "Submit Transaction"}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminFundUser;
