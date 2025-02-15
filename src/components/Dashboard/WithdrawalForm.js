import React, { useState, useEffect } from "react";
import { FaBitcoin } from "react-icons/fa6";
import { FaEthereum } from "react-icons/fa";
import { IoWalletOutline } from "react-icons/io5";
import { SiTether } from "react-icons/si";
import Sidebar from "./Sidebar";
import WithdrawalReasons from "./WithdrawalReasons";
import  useUserData  from '../../hooks/useUserData';
import api from "../../utils/axios";
import toast from 'react-hot-toast';
import { 
  RiMoneyDollarCircleLine, 
  RiDeleteBinLine,
  RiFileCopyLine,
} from 'react-icons/ri';

function WithdrawalForm() {
  const { userDetails } = useUserData();
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [withdrawals, setWithdrawals] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency);
    setWithdrawalAmount("");
    setMessage("");
  };

  const getWalletAddress = (currency) => {
    switch(currency) {
      case 'bitcoin':
        return userDetails.bitcoinWallet;
      case 'ethereum':
        return userDetails.ethereumWallet;
      case 'usdt':
        return userDetails.usdtWallet;
      default:
        return '';
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");
    
    try {
      const amount = parseFloat(withdrawalAmount);
      const availableBalance = userDetails.availableBalance;

      if (!amount || isNaN(amount) || amount <= 0) {
        throw new Error("Please enter a valid amount.");
      }

      if (amount > availableBalance) {
        throw new Error(`Insufficient balance. Available: $${availableBalance}`);
      }

      const walletAddress = getWalletAddress(selectedCurrency);
      if (!walletAddress) {
        throw new Error(`Please add your ${selectedCurrency} wallet address in profile settings.`);
      }

      const response = await api.post('withdrawals/create', {
        currency: selectedCurrency,
        amount: amount,
        walletAddress: walletAddress
      });

      setMessage(response.data.message);
      setMessageType("success");
      toast.success(response.data.message);
      
      // Reset form
      setWithdrawalAmount("");
      setSelectedCurrency("");
      fetchWithdrawals();

    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      setMessage(errorMessage);
      setMessageType("error");
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const fetchWithdrawals = async () => {
    try {
      setLoadingHistory(true);
      const response = await api.get('withdrawals/user');
      
      if (response.data.success) {
        setWithdrawals(response.data.data);
      }
    } catch (error) {
      toast.error('Error fetching withdrawals');
      console.error('Fetch Error:', error);
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleDeleteWithdrawal = async (withdrawalId) => {
    if (!window.confirm('Are you sure you want to delete this withdrawal request?')) {
      return;
    }

    try {
      const response = await api.delete(`withdrawals/user/${withdrawalId}`);
      
      if (response.data.success) {
        toast.success('Withdrawal request deleted successfully');
        setWithdrawals(prev => prev.filter(w => w._id !== withdrawalId));
      }
    } catch (error) {
      toast.error('Error deleting withdrawal request');
      console.error('Delete Error:', error);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => toast.success('Copied to clipboard!'))
      .catch(() => toast.error('Failed to copy'));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'text-green-400 bg-green-400/10';
      case 'pending':
        return 'text-yellow-400 bg-yellow-400/10';
      case 'rejected':
        return 'text-red-400 bg-red-400/10';
      default:
        return 'text-gray-400 bg-gray-400/10';
    }
  };

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

          {/* Balance Card */}
          <div className="mb-8">
            <div className="relative">
              <div className="p-[1px] relative rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500">
                <div className="relative bg-[#1a2234] rounded-2xl p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Available Balance</p>
                      <p className="text-xl sm:text-2xl font-bold text-white">
                        ${userDetails.availableBalance}
                      </p>
                    </div>
                    <div className="p-3 bg-green-500/10 rounded-xl">
                      <IoWalletOutline className="text-xl sm:text-2xl text-green-500" />
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
                        <p className="text-gray-400 text-xs sm:text-sm">
                          Wallet: {userDetails.bitcoinWallet || 'Not set'}
                        </p>
                      </div>
                    </div>
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
                        <p className="text-gray-400 text-xs sm:text-sm">
                          Wallet: {userDetails.ethereumWallet || 'Not set'}
                        </p>
                      </div>
                    </div>
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
                        <p className="text-gray-400 text-xs sm:text-sm">
                          Wallet: {userDetails.usdtWallet || 'Not set'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Withdrawal Form */}
                {selectedCurrency && (
                  <form onSubmit={handleSubmit} className="mt-6 space-y-4 sm:space-y-6">
                    <div>
                      <label className="block text-gray-400 mb-2 text-sm sm:text-base">
                        Withdrawal Amount (USD)
                      </label>
                      <input
                        type="number"
                        value={withdrawalAmount}
                        onChange={(e) => setWithdrawalAmount(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter amount in USD"
                        min="0"
                        step="any"
                        required
                      />
                      <p className="text-gray-400 text-xs mt-2">
                        Available Balance: ${userDetails.availableBalance}
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading || !getWalletAddress(selectedCurrency)}
                      className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-xl hover:opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Processing...' : 'Submit Withdrawal'}
                    </button>

                    {!getWalletAddress(selectedCurrency) && (
                      <p className="text-red-400 text-sm text-center">
                        Please add your {selectedCurrency} wallet address in profile settings before withdrawing.
                      </p>
                    )}
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


          {/* Add this after WithdrawalReasons */}
          <div className="relative mb-8">
            <div className="p-[1px] relative rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500">
              <div className="relative bg-[#1a2234] rounded-2xl p-4 sm:p-6">
                <h2 className="text-xl font-bold text-white mb-4">Withdrawal History</h2>
                
                {loadingHistory ? (
                  <div className="flex justify-center py-8">
                    <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-400">
                      <thead className="text-xs uppercase bg-gray-900/50">
                        <tr>
                          <th className="px-6 py-3 rounded-l-lg">Date</th>
                          <th className="px-6 py-3">Amount</th>
                          <th className="px-6 py-3">Currency</th>
                          <th className="px-6 py-3">Wallet Address</th>
                          <th className="px-6 py-3">Status</th>
                          <th className="px-6 py-3 rounded-r-lg">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {withdrawals.map((withdrawal) => (
                          <tr key={withdrawal._id} className="border-b border-gray-800">
                            <td className="px-6 py-4 whitespace-nowrap">
                              {formatDate(withdrawal.createdAt)}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                ${withdrawal.amount.toFixed(2)}
                                <button
                                  onClick={() => handleCopy(withdrawal.amount.toString())}
                                  className="p-1 bg-indigo-500/10 text-indigo-400 rounded-lg hover:bg-indigo-500/20 transition-all"
                                  title="Copy amount"
                                >
                                  <RiFileCopyLine className="text-sm" />
                                </button>
                              </div>
                            </td>
                            <td className="px-6 py-4 capitalize">
                              {withdrawal.currency}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <span className="truncate max-w-[200px]">
                                  {withdrawal.walletAddress}
                                </span>
                                <button
                                  onClick={() => handleCopy(withdrawal.walletAddress)}
                                  className="p-1 bg-indigo-500/10 text-indigo-400 rounded-lg hover:bg-indigo-500/20 transition-all"
                                  title="Copy wallet address"
                                >
                                  <RiFileCopyLine className="text-sm" />
                                </button>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${getStatusColor(withdrawal.status)}`}>
                                {withdrawal.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              {withdrawal.status === 'pending' && (
                                <button
                                  onClick={() => handleDeleteWithdrawal(withdrawal._id)}
                                  className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-all"
                                  title="Delete withdrawal request"
                                >
                                  <RiDeleteBinLine />
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {withdrawals.length === 0 && (
                      <div className="text-center py-12">
                        <RiMoneyDollarCircleLine className="text-4xl text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400">No withdrawal requests found</p>
                      </div>
                    )}
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
