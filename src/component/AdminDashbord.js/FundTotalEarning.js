import React, { useState } from 'react';
import axios from 'axios';

function FundTotalEarning() {
  const [users, setUsers] = useState([]);
  const [walletAddress, setWalletAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Base URL for your API
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

  // Fund total earnings
  const fundTotalEarnings = async () => {
    try {
      const response = await axios.put(`${baseURL}/fund-total-earnings`, {
        walletAddress,
        amount,
      });
      setMessage(response.data.message);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error funding total earnings.');
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
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold text-center mb-6">Test API Endpoints</h1>

      {/* Fetch All Users */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Fetch All Users</h2>
        <button
          className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
          onClick={fetchAllUsers}
        >
          Get All Users
        </button>
        {users.length > 0 && (
          <ul className="mt-4 space-y-4">
            {users.map((user, index) => (
              <li key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition duration-200">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-800"><strong>Username:</strong> {user.username}</p>
                  <p className="text-sm text-gray-600"><strong>Wallet:</strong> {user.walletAddress}</p>
                </div>
                <button
                  className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                  onClick={() => copyToClipboard(user.walletAddress)}
                >
                  Copy
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Fund Total Earnings */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Fund Total Earnings</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Wallet Address"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button
            className="w-full px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
            onClick={fundTotalEarnings}
          >
            Fund Total Earnings
          </button>
        </div>
      </div>

      {/* Messages */}
      {message && <p className="text-green-600 text-center mt-4">{message}</p>}
      {error && <p className="text-red-600 text-center mt-4">{error}</p>}
    </div>
  );
}

export default FundTotalEarning;
