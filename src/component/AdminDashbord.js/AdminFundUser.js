import React, { useState } from "react";
import axios from "axios";
import Sidebar from "./SideBard";

function AdminFundUser() {
  const [formData, setFormData] = useState({
    walletAddress: "",
    amount: "",
    currency: "usdt",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);


  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMessage("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://mekite-crypto.onrender.com/api/users/admin/fund-user", // Replace with your backend URL
        {
          walletAddress: formData.walletAddress,
          amount: parseFloat(formData.amount), // Convert to number
          currency: formData.currency,
        }
      );

      setResponseMessage(response.data.message);
    } catch (error) {
      console.error("Error funding user:", error.message);
      setResponseMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
          <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-bold text-center mb-6">Admin Fund User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Wallet Address */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Wallet Address</label>
          <input
            type="text"
            name="walletAddress"
            value={formData.walletAddress}
            onChange={handleChange}
            placeholder="Enter wallet address"
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="0.01"
            step="0.01"
            required
          />
        </div>

        {/* Currency */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Currency</label>
          <select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="usdt">USDT</option>
            <option value="ethereum">Ethereum</option>
            <option value="bitcoin">Bitcoin</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Processing..." : "Fund User"}
        </button>
      </form>

      {/* Response Message */}
      {responseMessage && (
        <div className="mt-4 p-2 bg-green-100 border border-green-300 text-green-700 rounded-md">
          {responseMessage}
        </div>
      )}
    </div>
    </>
  );
}

export default AdminFundUser;
