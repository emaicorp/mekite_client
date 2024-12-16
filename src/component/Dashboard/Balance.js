import React from 'react';
import { useLocation } from "react-router-dom";
import { FaDollarSign } from "react-icons/fa";

function Balance() {
  const location = useLocation();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const user = location.state?.user || storedUser;

  // Destructure the balance information
  const { balance, activeDeposit, totalWithdrawals, earningTotal } = user || {};

  // Utility function to ensure the value is a valid number
  const formatAmount = (amount) => {
    return typeof amount === 'number' && !isNaN(amount) ? amount.toFixed(2) : "0.00";
  };

  return (
    <section className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">Account Overview</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Balance Section */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <div className="flex items-center mb-2">
            <FaDollarSign className="text-2xl text-green-600 mr-2" />
            <span className="text-xl font-medium text-gray-700">Balance</span>
          </div>
          <div className="text-2xl font-semibold text-gray-900">
            ${formatAmount(balance)}
          </div>
        </div>

        {/* Active Deposit Section */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <div className="flex items-center mb-2">
            <FaDollarSign className="text-2xl text-blue-600 mr-2" />
            <span className="text-xl font-medium text-gray-700">Active Deposit</span>
          </div>
          <div className="text-2xl font-semibold text-gray-900">
            ${formatAmount(activeDeposit)}
          </div>
        </div>

        {/* Total Withdrawals Section */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <div className="flex items-center mb-2">
            <FaDollarSign className="text-2xl text-red-600 mr-2" />
            <span className="text-xl font-medium text-gray-700">Total Withdrawals</span>
          </div>
          <div className="text-2xl font-semibold text-gray-900">
            ${formatAmount(totalWithdrawals)}
          </div>
        </div>

        {/* Earnings Total Section */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <div className="flex items-center mb-2">
            <FaDollarSign className="text-2xl text-yellow-600 mr-2" />
            <span className="text-xl font-medium text-gray-700">Earnings Total</span>
          </div>
          <div className="text-2xl font-semibold text-gray-900">
            ${formatAmount(earningTotal)}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Balance;
