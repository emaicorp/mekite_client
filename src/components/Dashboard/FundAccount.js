import React, { useState } from "react";
import axios from "axios";

const FundAccount = () => {
  const [formData, setFormData] = useState({
    walletAddress: "",
    amount: "",
    currency: "usdt",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit the funding request
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const response = await axios.post(
        "https://mekite-btc.onrender.com/api/users/fund",
        formData
      ); // Replace with your backend URL
      setMessage(response.data.message);
      setFormData({ walletAddress: "", amount: "", currency: "usdt" });

      // Clear the message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("An unexpected error occurred.");
      }

      // Clear the error after 3 seconds
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 shadow-lg rounded-lg bg-white">
      <h1 className="text-xl font-bold mb-4">Fund Your Account</h1>

      {/* Success Message */}
      {message && (
        <div
          className="mb-4 p-3 text-green-700 bg-green-100 border border-green-400 rounded transition-opacity duration-300 ease-in-out"
        >
          {message}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div
          className="mb-4 p-3 text-red-700 bg-red-100 border border-red-400 rounded transition-opacity duration-300 ease-in-out"
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Wallet Address */}
        <div>
          <label htmlFor="walletAddress" className="block font-medium">
            Wallet Address
          </label>
          <input
            type="text"
            id="walletAddress"
            name="walletAddress"
            value={formData.walletAddress}
            onChange={handleChange}
            placeholder="Enter your wallet address"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        {/* Amount */}
        <div>
          <label htmlFor="amount" className="block font-medium">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter the amount"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        {/* Currency */}
        <div>
          <label htmlFor="currency" className="block font-medium">
            Currency
          </label>
          <select
            id="currency"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            required
          >
            <option value="usdt">USDT</option>
            <option value="ethereum">Ethereum</option>
            <option value="bitcoin">Bitcoin</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full px-4 py-2 text-white font-semibold rounded ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Fund Account"}
        </button>
      </form>
    </div>
  );
};

export default FundAccount;
