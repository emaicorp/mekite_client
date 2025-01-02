import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DeductActive() {
  const [username, setUsername] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const [copySuccess, setCopySuccess] = useState('');

  // Base URL for your API
  const baseURL = 'https://mekite-btc.onrender.com/api'; // Replace with your API's base URL

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${baseURL}/all-users`);
      setUsers(response.data.users);
    } catch (err) {
      setError('Failed to fetch users.');
    }
  };

  // Deduct deposit
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

  // Copy username to clipboard
  const copyUsername = (username) => {
    navigator.clipboard.writeText(username)
      .then(() => setCopySuccess('Username copied to clipboard!'))
      .catch(() => setCopySuccess('Failed to copy username.'));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Test API Endpoints</h1>

      {/* Deduct from Active Deposit */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Deduct from Active Deposit</h2>
        <input
          type="text"
          placeholder="Username"
          className="border p-2 rounded mb-2 w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          className="border p-2 rounded mb-2 w-full"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={deductDeposit}
        >
          Deduct from Deposit
        </button>
      </div>

      {/* Display Success/Errors */}
      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}
      {copySuccess && <p className="text-green-600">{copySuccess}</p>}

      {/* Display List of Users */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Users List</h2>
        <div className="space-y-2">
          {users.map((user, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span>{user.username}</span>
              <button
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => copyUsername(user.username)}
              >
                Copy
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DeductActive;
