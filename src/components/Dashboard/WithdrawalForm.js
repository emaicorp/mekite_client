import React, { useState, useEffect } from "react";
import { FaBitcoin } from "react-icons/fa6";
import { FaEthereum } from "react-icons/fa";
import { FaDollarSign, FaCheckCircle, FaHourglassHalf, FaExclamationCircle } from 'react-icons/fa';
import { FaOctopusDeploy } from "react-icons/fa";
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

  useEffect(() => {
    const storedUserDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (storedUserDetails) {
      setUserDetails(storedUserDetails);
    }
  }, []);

  if (!userDetails) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-500">
        <span className="text-white text-2xl font-semibold">Loading...</span>
      </div>
    );
  }

  const bitcoinAvailable = userDetails?.bitcoinAvailable || 0;
  const bitcoinPending = userDetails?.bitcoinPending || 0;
  const ethereumAvailable = userDetails?.ethereumAvailable || 0;
  const ethereumPending = userDetails?.ethereumPending || 0;
  const usdtAvailable = userDetails?.usdtAvailable || 0;
  const usdtPending = userDetails?.usdtPending || 0;

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency);
    setWithdrawalAmount(""); // Reset the amount when a new currency is selected
    setMessage(""); // Reset any message
  };

  const handleAmountChange = (event) => {
    setWithdrawalAmount(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Get user details and auth token
    const userDetails = getUserDetails();
    if (!userDetails) {
        setMessage("User not logged in. Please log in again.");
        return;
    }

    const { token, userId } = userDetails;

    // Validate the amount
    if (!withdrawalAmount || isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
        setMessage("Please enter a valid amount.");
        return;
    }

    try {
        const response = await axios.post(
            "https://mekite-btc.onrender.com/api/withdraw",
            {
                userId,
                currency: selectedCurrency,
                amount: withdrawalAmount,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        setMessage(response.data.message);
    } catch (error) {
        setMessage(`Error: ${error.response ? error.response.data.message : "An error occurred"}`);
    }
};


  return (
    <>
      <Sidebar />
      <section className="p-6">
      <div className="flex flex-col space-y-4 bg-white p-6 rounded-lg shadow-lg">
  {/* Available Balance */}
  <div className="flex items-center justify-between">
    <div className="flex items-center space-x-4">
      <FaDollarSign className="text-4xl text-green-500" />
      <div className="flex flex-col">
        <p className="text-sm text-gray-600">Available Balance</p>
        <p className="text-2xl font-bold text-gray-800">{`$${userDetails.availableBalance}`}</p>
      </div>
    </div>
    <FaCheckCircle className="text-3xl text-green-500" />
  </div>

  {/* Pending Balance */}
  <div className="flex items-center justify-between">
    <div className="flex items-center space-x-4">
      <FaHourglassHalf className="text-4xl text-yellow-500" />
      <div className="flex flex-col">
        <p className="text-sm text-gray-600">Pending Balance</p>
        <p className="text-2xl font-bold text-red-600">{`$${userDetails.pendingBalance}`}</p>
      </div>
    </div>
    <FaExclamationCircle className="text-3xl text-yellow-500" />
  </div>
</div>


        <table className="table-auto w-full border-collapse border border-gray-200 shadow-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="border border-gray-300 px-4 py-2">Processing</th>
              <th className="border border-gray-300 px-4 py-2">Available in $</th>
              <th className="border border-gray-300 px-4 py-2">Pending in $</th>
              <th className="border border-gray-300 px-4 py-2">Account</th>
            </tr>
          </thead>
          <tbody>
            <tr onClick={() => handleCurrencySelect("bitcoin")}>
              <td className="border border-gray-300 px-4 py-2 flex items-center gap-2">
                <FaBitcoin className="text-yellow-500" />
                Bitcoin
              </td>
              <td className="border border-gray-300 px-4 py-2">{bitcoinAvailable}</td>
              <td className="border border-gray-300 italic text-red-600 px-4 py-2">{bitcoinPending}</td>
              <td className="border border-gray-300 px-4 py-2 text-gray-500 italic">
                <Link to="/profile">not set</Link>
              </td>
            </tr>
            <tr onClick={() => handleCurrencySelect("ethereum")}>
              <td className="border border-gray-300 px-4 py-2 flex items-center gap-2">
                <FaEthereum className="text-blue-500" />
                Ethereum
              </td>
              <td className="border border-gray-300 px-4 py-2">{ethereumAvailable}</td>
              <td className="border border-gray-300 italic text-red-600 px-4 py-2">{ethereumPending}</td>
              <td className="border border-gray-300 px-4 py-2 text-gray-500 italic">
                <Link to="/profile">not set</Link>
              </td>
            </tr>
            <tr onClick={() => handleCurrencySelect("usdt")}>
              <td className="border border-gray-300 px-4 py-2 flex items-center gap-2">
                <FaOctopusDeploy className="text-green-500" />
                USDT
              </td>
              <td className="border border-gray-300 px-4 py-2">{usdtAvailable}</td>
              <td className="border border-gray-300 text-red-600 italic px-4 py-2">{usdtPending}</td>
              <td className="border border-gray-300 px-4 py-2 text-gray-500 italic">
                <Link to="/profile">not set</Link>
              </td>
            </tr>
          </tbody>
        </table>

        {selectedCurrency && (
          <form onSubmit={handleSubmit} className="mt-6">
            <div>
              <label htmlFor="amount" className="block text-sm font-semibold">
                Withdrawal Amount ({selectedCurrency})
              </label>
              <input
                id="amount"
                type="number"
                value={withdrawalAmount}
                onChange={handleAmountChange}
                className="mt-2 p-2 border border-gray-300 rounded"
                placeholder={`Enter amount in ${selectedCurrency}`}
              />
            </div>
            <button
              type="submit"
              className="mt-4 p-2 bg-blue-500 text-white rounded"
            >
              Submit Withdrawal
            </button>
          </form>
        )}

        {message && <div className="mt-4 text-lg">{message}</div>}
      </section>

      <WithdrawalReasons />
    </>
  );
}

export default WithdrawalForm;
