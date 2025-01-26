import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBard from "./SideBard";

const AdminFundUser = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [currency, setCurrency] = useState("bitcoin");
  const [balanceChange, setBalanceChange] = useState(0);
  const [isWithdrawal, setIsWithdrawal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://mekite-btc.onrender.com/api/all-users"
        );
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser) {
      alert("Please select a user.");
      return;
    }

    try {
      const response = await axios.put(
        "https://mekite-btc.onrender.com/api/update-balance",
        {
          walletAddress: selectedUser,
          currency,
          balanceChange: parseFloat(balanceChange),
          isWithdrawal,
        }
      );
      setSuccessMessage(response.data.message);
    } catch (error) {
      console.error("Error updating balance:", error);
      alert(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <>
      <SideBard />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Admin Fund User
        </h1>
        <div className="border-b-2 border-gray-300 mb-4"></div>

        {successMessage && (
          <div className="p-4 mb-6 text-white bg-green-500 rounded-md shadow-md">
            {successMessage}
          </div>
        )}

        <form
          onSubmit={handleFormSubmit}
          className="bg-white p-6 rounded-md shadow-lg max-w-md mx-auto"
        >
          <div className="mb-4">
            <label
              htmlFor="user"
              className="block text-sm font-medium text-gray-700"
            >
              Select User
            </label>
            <select
              id="user"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full mt-2 p-2 border rounded-md text-gray-800"
            >
              <option value="">-- Select User --</option>
              {users.map((user) => (
                <option key={user.walletAddress} value={user.walletAddress}>
                  {user.fullName} ({user.walletAddress})
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="currency"
              className="block text-sm font-medium text-gray-700"
            >
              Select Currency
            </label>
            <select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full mt-2 p-2 border rounded-md text-gray-800"
            >
              <option value="bitcoin">Bitcoin</option>
              <option value="ethereum">Ethereum</option>
              <option value="usdt">USDT</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="balanceChange"
              className="block text-sm font-medium text-gray-700"
            >
              Amount
            </label>
            <input
              type="number"
              id="balanceChange"
              value={balanceChange}
              onChange={(e) => setBalanceChange(e.target.value)}
              className="w-full mt-2 p-2 border rounded-md text-gray-800"
            />
          </div>

          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="isWithdrawal"
              checked={isWithdrawal}
              onChange={(e) => setIsWithdrawal(e.target.checked)}
              className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="isWithdrawal"
              className="ml-2 text-sm text-gray-800"
            >
              Withdrawal (Check for withdrawal, uncheck for deposit)
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AdminFundUser;
