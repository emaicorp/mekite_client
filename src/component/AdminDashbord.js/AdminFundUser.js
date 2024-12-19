import React, { useState } from 'react';
import axios from 'axios';

const AdminFundUser = () => {
  const [formData, setFormData] = useState({
    walletAddress: '',
    amount: '',
    currency: 'usdt',
  });
  const [responseMessage, setResponseMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMessage('');
    setErrorMessage('');

    try {
      const res = await axios.post('https://mekite-crypto.onrender.com/api/users/admin/fund-user', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.data && res.data.message) {
        setResponseMessage(res.data.message);
      } else {
        setErrorMessage('Something went wrong. Please try again.');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error occurred while sending the request.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md p-6">
        <h1 className="text-xl font-bold text-center text-gray-800 mb-4">
          Fund a User's Account
        </h1>
        <p className="text-sm text-center text-gray-600 mb-6">
          Use this form to fund a user's account. Provide the wallet address,
          specify the amount, and choose the currency to complete the transaction.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Wallet Address:
            </label>
            <input
              type="text"
              name="walletAddress"
              value={formData.walletAddress}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount:
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Currency:
            </label>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="usdt">USDT</option>
              <option value="ethereum">Ethereum</option>
              <option value="bitcoin">Bitcoin</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-200"
          >
            Fund User
          </button>
        </form>

        {responseMessage && (
          <p className="text-green-600 text-center mt-4">{responseMessage}</p>
        )}
        {errorMessage && (
          <p className="text-red-600 text-center mt-4">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default AdminFundUser;
