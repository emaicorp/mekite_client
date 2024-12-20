import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../AdminDashbord.js/SideBard";

const AdminDepositApproval = () => {
  const [deposits, setDeposits] = useState([]);
  const [selectedDeposits, setSelectedDeposits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);


  useEffect(() => {
    fetchPendingDeposits();
  }, []);

  const fetchPendingDeposits = async () => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await axios.get(
        "https://mekite-crypto.onrender.com/api/users/admin/deposits/pending"
      );
      setDeposits(response.data.pendingDeposits);
    } catch (err) {
      setError("Failed to fetch pending deposits.");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (depositId) => {
    setSelectedDeposits((prev) =>
      prev.includes(depositId)
        ? prev.filter((id) => id !== depositId)
        : [...prev, depositId]
    );
  };

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
      fetchPendingDeposits();
    } catch (err) {
      setError("Failed to update deposits. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
   <>
         <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

     <div className="max-w-6xl mx-auto mt-8 p-6 bg-gray-50 rounded shadow-lg">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Deposit Approval</h1>
        <p className="text-gray-600">Manage pending deposit approvals efficiently.</p>
      </header>

      {message && (
        <div className="mb-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-gray-600 text-center">Loading...</p>
      ) : deposits.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 border">Select</th>
                <th className="px-4 py-2 border">Username</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Wallet Address</th>
                <th className="px-4 py-2 border">Amount</th>
                <th className="px-4 py-2 border">Currency</th>
                <th className="px-4 py-2 border">Created At</th>
              </tr>
            </thead>
            <tbody>
              {deposits.map((deposit) => (
                <tr key={deposit.depositId} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border text-center">
                    <input
                      type="checkbox"
                      checked={selectedDeposits.includes(deposit.depositId)}
                      onChange={() => handleCheckboxChange(deposit.depositId)}
                    />
                  </td>
                  <td className="px-4 py-2 border">{deposit.username}</td>
                  <td className="px-4 py-2 border">{deposit.email}</td>
                  <td className="px-4 py-2 border">{deposit.walletAddress}</td>
                  <td className="px-4 py-2 border">{deposit.amount}</td>
                  <td className="px-4 py-2 border">{deposit.currency}</td>
                  <td className="px-4 py-2 border">
                    {new Date(deposit.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600">No pending deposits found.</p>
      )}

      {deposits.length > 0 && (
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={() => handleAction("completed")}
            className="px-6 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700"
            disabled={selectedDeposits.length === 0 || loading}
          >
            Approve Selected
          </button>
          <button
            onClick={() => handleAction("cancelled")}
            className="px-6 py-2 bg-red-600 text-white rounded shadow hover:bg-red-700"
            disabled={selectedDeposits.length === 0 || loading}
          >
            Reject Selected
          </button>
        </div>
      )}
    </div>
   </>
  );
};

export default AdminDepositApproval;
