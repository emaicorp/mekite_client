import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDepositApproval = () => {
  const [deposits, setDeposits] = useState([]);
  const [selectedDeposits, setSelectedDeposits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  // Fetch pending deposits
  const fetchPendingDeposits = async () => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await axios.get(
        "https://mekite-crypto.onrender.com/api/users/admin/deposits/pending" // Replace with your backend URL
      );
      setDeposits(response.data.pendingDeposits);
    } catch (err) {
      setError("Failed to fetch pending deposits.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingDeposits();
  }, []);

  // Handle checkbox selection
  const handleCheckboxChange = (depositId) => {
    setSelectedDeposits((prev) =>
      prev.includes(depositId)
        ? prev.filter((id) => id !== depositId)
        : [...prev, depositId]
    );
  };

  // Approve or reject selected deposits
  const handleAction = async (status) => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      for (const depositId of selectedDeposits) {
        await axios.post(
          `https://mekite-crypto.onrender.com/api/users/admin/deposits/${depositId}/approve`,
          { status }
        );
      }
      setMessage(`Deposits ${status} successfully.`);
      setSelectedDeposits([]);
      fetchPendingDeposits(); // Refresh the list
    } catch (err) {
      setError("Failed to update deposits. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-5 shadow-lg rounded-lg bg-white">
      <h1 className="text-2xl font-bold mb-4">Pending Deposits</h1>

      {/* Success Message */}
      {message && (
        <div className="mb-4 p-3 text-green-700 bg-green-100 border border-green-400 rounded">
          {message}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 text-red-700 bg-red-100 border border-red-400 rounded">
          {error}
        </div>
      )}

      {loading && <p>Loading...</p>}

      {/* Deposit List */}
      {!loading && deposits.length > 0 ? (
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">Select</th>
              <th className="border px-4 py-2">Username</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Wallet Address</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Currency</th>
              <th className="border px-4 py-2">Created At</th>
            </tr>
          </thead>
          <tbody>
            {deposits.map((deposit) => (
              <tr key={deposit.depositId}>
                <td className="border px-4 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={selectedDeposits.includes(deposit.depositId)}
                    onChange={() => handleCheckboxChange(deposit.depositId)}
                  />
                </td>
                <td className="border px-4 py-2">{deposit.username}</td>
                <td className="border px-4 py-2">{deposit.email}</td>
                <td className="border px-4 py-2">{deposit.walletAddress}</td>
                <td className="border px-4 py-2">{deposit.amount}</td>
                <td className="border px-4 py-2">{deposit.currency}</td>
                <td className="border px-4 py-2">
                  {new Date(deposit.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p>No pending deposits found.</p>
      )}

      {/* Action Buttons */}
      {deposits.length > 0 && (
        <div className="mt-4 flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={() => handleAction("completed")}
            disabled={selectedDeposits.length === 0 || loading}
          >
            Approve Selected
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={() => handleAction("cancelled")}
            disabled={selectedDeposits.length === 0 || loading}
          >
            Reject Selected
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminDepositApproval;
