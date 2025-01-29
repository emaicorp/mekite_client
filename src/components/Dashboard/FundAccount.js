import React, { useState } from "react";
import axios from "axios";
import { IoWalletOutline } from "react-icons/io5";
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { SiTether } from "react-icons/si";

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
      setError(err.response?.data?.message || "An unexpected error occurred.");

      // Clear the error after 3 seconds
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 mt-10">
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-500/10 rounded-xl">
            <IoWalletOutline className="text-2xl text-indigo-500" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Wallet</p>
            <h1 className="text-white text-xl font-medium">Fund Account</h1>
          </div>
        </div>
      </div>

      <div className="relative max-w-2xl mx-auto">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-25"></div>
        <div className="relative bg-[#1a2234] border border-gray-800 rounded-2xl p-8">
          {message && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400">
              {message}
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="walletAddress" className="block text-gray-400 mb-2">
                Wallet Address
              </label>
              <input
                type="text"
                id="walletAddress"
                name="walletAddress"
                value={formData.walletAddress}
                onChange={handleChange}
                placeholder="Enter your wallet address"
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label htmlFor="amount" className="block text-gray-400 mb-2">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter the amount"
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label htmlFor="currency" className="block text-gray-400 mb-2">
                Currency
              </label>
              <div className="relative">
                <select
                  id="currency"
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-white appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="usdt">USDT</option>
                  <option value="ethereum">Ethereum</option>
                  <option value="bitcoin">Bitcoin</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  {formData.currency === "usdt" && <SiTether className="text-xl text-indigo-400" />}
                  {formData.currency === "ethereum" && <FaEthereum className="text-xl text-indigo-400" />}
                  {formData.currency === "bitcoin" && <FaBitcoin className="text-xl text-indigo-400" />}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-xl hover:opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : "Fund Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FundAccount;
