import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboardd = () => {
  const [formData, setFormData] = useState({
    currency: "usdt",   // Default currency
    amount: 0,
  });
  const [balance, setBalance] = useState({
    usdt: 0,
    ethereum: 0,
    bitcoin: 0,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // For success message
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch user balance after login
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setBalance(user.balance);  // Assuming the user object has a balance field
    } else {
      navigate("/login"); // Redirect to login if no user found
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleWithdrawal = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const token = localStorage.getItem("token");

    try {
      // Send withdrawal request to the server
      const response = await axios.post(
        "https://mekite-crypto.onrender.com/api/user/withdraw", 
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Handle successful withdrawal request
      setSuccess(response.data.message);
    } catch (err) {
      console.error("Error during withdrawal:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold text-center mb-4">User Dashboard</h2>

        {/* Error message */}
        {error && <div className="text-red-500 mb-3">{error}</div>}

        {/* Success message */}
        {success && <div className="text-green-500 mb-3">{success}</div>}

        {/* Balance Display */}
        <div className="mb-4">
          <p><strong>USDT Balance:</strong> {balance.usdt}</p>
          <p><strong>Ethereum Balance:</strong> {balance.ethereum}</p>
          <p><strong>Bitcoin Balance:</strong> {balance.bitcoin}</p>
        </div>

        {/* Withdrawal Form */}
        <form onSubmit={handleWithdrawal} className="space-y-4">
          <select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="usdt">USDT</option>
            <option value="ethereum">Ethereum</option>
            <option value="bitcoin">Bitcoin</option>
          </select>
          <input
            type="number"
            name="amount"
            placeholder="Amount to withdraw"
            value={formData.amount}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className={`w-full p-2 rounded text-white ${
              loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Processing Withdrawal..." : "Request Withdrawal"}
          </button>
        </form>

        {/* Logout Option */}
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/login");
          }}
          className="w-full mt-4 p-2 bg-red-500 hover:bg-red-600 text-white rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboardd;
