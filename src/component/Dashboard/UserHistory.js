import React, { useState } from "react";
import { FaUser, FaDollarSign, FaHistory, FaBalanceScale } from "react-icons/fa";
import Sidebar from "./Sidebar";

const UserHistory = () => {
  const [username, setUsername] = useState(""); // Username input
  const [userHistory, setUserHistory] = useState(
    JSON.parse(localStorage.getItem("userHistory")) || null
  ); // History data loaded from localStorage
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error message
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
    // Sidebar toggle
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Function to fetch user history
  const fetchUserHistory = async () => {
    if (!username) {
      setError("Please enter a username");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://mekite-btc.onrender.com/api/users/user/history/${username}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch user history");
      }

      // Save fetched data to state and localStorage
      setUserHistory(data.history);
      localStorage.setItem("userHistory", JSON.stringify(data.history));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
  <>      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="container mx-auto p-5 max-w-4xl">
      <h1 className="text-4xl font-bold mb-5 text-center text-blue-600">
        <FaHistory className="inline mr-2" />
        User History
      </h1>

      {/* Input for username */}
      <div className="flex items-center justify-center mb-5">
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={fetchUserHistory}
          disabled={loading}
          className="p-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-500 transition"
        >
          {loading ? "Loading..." : "Fetch History"}
        </button>
      </div>

      {/* Error message */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Display user history */}
      {userHistory && (
        <div className="bg-gray-50 shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-2 text-gray-700">
            <FaUser className="inline mr-2 text-blue-500" />
            History for {userHistory.username}
          </h2>
          <p className="text-lg mb-4">
            <strong>Fullname:</strong> {userHistory.fullname}
          </p>
          <p className="text-lg mb-4">
            <strong>Total Earnings:</strong>{" "}
            <span className="text-green-500">
              <FaDollarSign className="inline mr-1" />
              {userHistory.totalEarnings}
            </span>
          </p>

          {/* Balances */}
          <h3 className="text-xl font-semibold mb-2">
            <FaBalanceScale className="inline mr-2 text-blue-500" />
            Balances:
          </h3>
          <ul className="list-disc pl-5 mb-4">
            <li>USDT: {userHistory.balance.usdt}</li>
            <li>Ethereum: {userHistory.balance.ethereum}</li>
            <li>Bitcoin: {userHistory.balance.bitcoin}</li>
          </ul>

          {/* Deposits */}
          <h3 className="text-xl font-semibold mb-2">Deposits:</h3>
          <ul className="list-disc pl-5 mb-4">
            {userHistory.deposits.map((deposit, index) => (
              <li key={index}>
                {deposit.amount} {deposit.currency} - {deposit.status} (Created
                at: {new Date(deposit.createdAt).toLocaleString()})
              </li>
            ))}
          </ul>

          {/* Withdrawals */}
          <h3 className="text-xl font-semibold mb-2">Withdrawals:</h3>
          <ul className="list-disc pl-5 mb-4">
            {userHistory.withdrawals.map((withdrawal, index) => (
              <li key={index}>
                {withdrawal.amount} {withdrawal.currency} - {withdrawal.status}{" "}
                (Created at: {new Date(withdrawal.createdAt).toLocaleString()})
              </li>
            ))}
          </ul>

          {/* Activities */}
          <h3 className="text-xl font-semibold mb-2">Activities:</h3>
          <ul className="list-disc pl-5">
            {userHistory.activities.map((activity, index) => (
              <li key={index}>
                {activity.action} -{" "}
                {new Date(activity.timestamp).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </>
  );
};

export default UserHistory;
