import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import WithdrawalReasons from './WithdrawalReasons';

const WithdrawalForm = () => {
  const [currency, setCurrency] = useState('usdt');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);


  const handleWithdrawal = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const token = localStorage.getItem('authToken'); // Get the token from localStorage (or context)
      if (!token) {
        setError('You must be logged in to perform this action.');
        return;
      }

      const response = await axios.post(
        'https://mekite-crypto.onrender.com/api/users/withdraw',
        { currency, amount: parseFloat(amount) },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );

      if (response.data.success) {
        setMessage(response.data.message);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while processing the request.');
    }
  };

  return (
   <>
           <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

           <WithdrawalReasons />

     <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Withdraw Funds</h2>
      <form onSubmit={handleWithdrawal}>
        {/* Currency Selection */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="currency">
            Currency
          </label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="usdt">USDT</option>
            <option value="ethereum">Ethereum</option>
            <option value="bitcoin">Bitcoin</option>
          </select>
        </div>

        {/* Amount Input */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="amount">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            min="0"
            step="0.01"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Submit Withdrawal
        </button>
      </form>

      {/* Success or Error Messages */}
      {message && <p className="mt-4 text-green-600">{message}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
   </>
  );
};

export default WithdrawalForm;
