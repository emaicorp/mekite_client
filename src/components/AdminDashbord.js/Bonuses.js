import React, { useState } from 'react';
import axios from 'axios';
import { FaCopy } from 'react-icons/fa'; // Copy icon
import FundTotalEarning from './FundTotalEarning';
import DeductActive from './DeductActive';
import SideBard from "./SideBard";


function Bonuses() {
  const [users, setUsers] = useState([]);
  const [walletAddress, setWalletAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const baseURL = 'https://mekite-btc.onrender.com/api'; // Replace with your API's base URL

  // Fetch all users
  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(`${baseURL}/all-users`);
      setUsers(response.data.users);
      setMessage(response.data.message);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching users.');
      setMessage('');
    }
  };

  // Fund active deposit
  const fundActiveDeposit = async () => {
    try {
      const response = await axios.put(`${baseURL}/fund-active-deposit`, {
        walletAddress,
        amount,
      });
      setMessage(response.data.message);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error funding active deposit.');
      setMessage('');
    }
  };

  // Copy wallet address to clipboard
  const copyToClipboard = (wallet) => {
    navigator.clipboard.writeText(wallet);
    setMessage(`Copied: ${wallet}`);
    setTimeout(() => setMessage(''), 2000); // Clear message after 2 seconds
  };

  return (
    <>
          <SideBard />

        <div className="container mx-auto p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Bonuses Management</h1>

      {/* Fetch All Users */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Fetch All Users</h2>
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          onClick={fetchAllUsers}
        >
          Get All Users
        </button>

        {users.length > 0 && (
          <ul className="mt-4 space-y-4">
            {users.map((user, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm"
              >
                <div>
                  <p className="font-medium">Username: {user.username}</p>
                  <p className="text-gray-600">Wallet: {user.walletAddress}</p>
                </div>
                <button
                  className="ml-4 text-blue-500 hover:text-blue-700 transition duration-150"
                  onClick={() => copyToClipboard(user.walletAddress)}
                >
                  <FaCopy />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Fund Active Deposit */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Fund Active Deposit</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Wallet Address"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button
            className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
            onClick={fundActiveDeposit}
          >
            Fund Active Deposit
          </button>
        </div>
      </div>

      {/* Messages */}
      {message && <p className="text-green-500">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Additional Components */}
      <FundTotalEarning />
      <DeductActive />
    </div>
    </>
  );
}

export default Bonuses;
