import React, { useState } from 'react';
import axios from 'axios';
import { FaCopy } from 'react-icons/fa'; // Import a copy icon from react-icons
import FundTotalEarning from './FundTotalEarning';
import DeductActive from './DeductActive';

function Bonuses() {
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
        <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Test API Endpoints</h1>

      {/* Fetch All Users */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Fetch All Users</h2>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={fetchAllUsers}
        >
          Get All Users
        </button>
        {users.length > 0 && (
          <ul className="mt-4">
            {users.map((user, index) => (
              <li key={index} className="border p-2 rounded mb-2 flex items-center justify-between">
                <div>
                  <p><strong>Username:</strong> {user.username}</p>
                  <p><strong>Wallet:</strong> {user.walletAddress}</p>
                </div>
                <button
                  className="ml-4 text-blue-500 hover:text-blue-700"
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
        <h2 className="text-lg font-semibold mb-2">Fund Active Deposit</h2>
        <input
          type="text"
          placeholder="Wallet Address"
          className="border p-2 rounded mb-2 w-full"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          className="border p-2 rounded mb-2 w-full"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={fundActiveDeposit}
        >
          Fund Active Deposit
        </button>
      </div>

      {/* Messages */}
      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}
    </div>

    <FundTotalEarning />
    <DeductActive />
    </>
  );
}

export default Bonuses;
