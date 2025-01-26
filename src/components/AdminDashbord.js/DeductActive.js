import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCopy } from 'react-icons/fa';

function DeductActive() {
  const [username, setUsername] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const [copySuccess, setCopySuccess] = useState('');

  const baseURL = 'https://mekite-btc.onrender.com/api'; // Replace with your API's base URL

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${baseURL}/all-users`);
      setUsers(response.data.users);
    } catch (err) {
      setError('Failed to fetch users.');
    }
  };

  const deductDeposit = async () => {
    try {
      const response = await axios.post(`${baseURL}/deduct-deposit`, {
        username,
        amount,
      });
      setMessage(response.data.message);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error deducting from deposit.');
      setMessage('');
    }
  };

  const copyUsername = (username) => {
    navigator.clipboard.writeText(username)
      .then(() => setCopySuccess('Username copied to clipboard!'))
      .catch(() => setCopySuccess('Failed to copy username.'));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-6 bg-white rounded shadow-md mt-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Deduct from Active Deposit</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Deduct from Active Deposit</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button
            className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
            onClick={deductDeposit}
          >
            Deduct from Deposit
          </button>
        </div>
      </div>

      {/* Messages */}
      {message && <p className="text-green-500">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}
      {copySuccess && <p className="text-green-500">{copySuccess}</p>}

      {/* Users List */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Users List</h2>
        <div className="space-y-4">
          {users.map((user, index) => (
            <div key={index} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm">
              <div>
                <p className="font-medium">Username: {user.username}</p>
              </div>
              <button
                className="ml-4 text-blue-500 hover:text-blue-700 transition duration-150"
                onClick={() => copyUsername(user.username)}
              >
                <FaCopy />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DeductActive;
