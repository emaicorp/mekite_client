import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { FaDollarSign, FaBitcoin, FaEthereum, FaRegMoneyBillAlt } from "react-icons/fa";
import axios from "axios";

function Balance() {
  const location = useLocation();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [userData, setUserData] = useState({
    balance: { usdt: 0, ethereum: 0, bitcoin: 0 },
    activeDeposit: 0,
    totalWithdrawals: 0,
    earningTotal: 0,
  });

  const user = location.state?.user || storedUser;

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get(
          `https://mekite-btc.onrender.com/api/users/user/balance/${user._id}`
        ); // Replace with your backend API URL
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching balance:", error.message);
      }
    };

    if (user?._id) {
      fetchBalance();
    }
  }, [user]);

  // Utility function to format amounts
  const formatAmount = (amount) => {
    return typeof amount === 'number' && !isNaN(amount) ? amount.toFixed(2) : "0.00";
  };

  return (
    <section className="p-6 max-w-6xl mx-auto bg-white shadow-xl rounded-xl">
      <h2 className="text-4xl font-semibold text-center mb-10 text-gray-800">Account Overview</h2>

      {/* Grid Layout for Displaying Balances */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        
        {/* USDT Balance */}
        <div className="bg-gradient-to-r from-green-500 to-teal-400 p-6 rounded-xl shadow-lg text-white">
          <div className="flex items-center mb-3">
            <FaDollarSign className="text-3xl mr-4" />
            <span className="text-xl font-medium">USDT Balance</span>
          </div>
          <div className="text-3xl font-semibold">${formatAmount(userData.balance.usdt)}</div>
        </div>

        {/* Ethereum Balance */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-400 p-6 rounded-xl shadow-lg text-white">
          <div className="flex items-center mb-3">
            <FaEthereum className="text-3xl mr-4" />
            <span className="text-xl font-medium">Ethereum Balance</span>
          </div>
          <div className="text-3xl font-semibold">${formatAmount(userData.balance.ethereum)}</div>
        </div>

        {/* Bitcoin Balance */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-400 p-6 rounded-xl shadow-lg text-white">
          <div className="flex items-center mb-3">
            <FaBitcoin className="text-3xl mr-4" />
            <span className="text-xl font-medium">Bitcoin Balance</span>
          </div>
          <div className="text-3xl font-semibold">${formatAmount(userData.balance.bitcoin)}</div>
        </div>

        {/* Earnings Total */}
        <div className="bg-gradient-to-r from-yellow-500 to-red-400 p-6 rounded-xl shadow-lg text-white">
          <div className="flex items-center mb-3">
            <FaRegMoneyBillAlt className="text-3xl mr-4" />
            <span className="text-xl font-medium">Earnings Total</span>
          </div>
          <div className="text-3xl font-semibold">${formatAmount(userData.earningTotal)}</div>
        </div>

        {/* Active Deposit */}
        <div className="bg-gradient-to-r from-teal-500 to-green-400 p-6 rounded-xl shadow-lg text-white">
          <div className="flex items-center mb-3">
            <FaDollarSign className="text-3xl mr-4" />
            <span className="text-xl font-medium">Active Deposit</span>
          </div>
          <div className="text-3xl font-semibold">${formatAmount(userData.activeDeposit)}</div>
        </div>

        {/* Total Withdrawals */}
        <div className="bg-gradient-to-r from-red-500 to-pink-400 p-6 rounded-xl shadow-lg text-white">
          <div className="flex items-center mb-3">
            <FaDollarSign className="text-3xl mr-4" />
            <span className="text-xl font-medium">Total Withdrawals</span>
          </div>
          <div className="text-3xl font-semibold">${formatAmount(userData.totalWithdrawals)}</div>
        </div>

      </div>
    </section>
  );
}

export default Balance;
