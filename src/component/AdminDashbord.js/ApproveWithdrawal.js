import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBard from './SideBard';

const ApproveWithdrawal = () => {
  const [pendingWithdrawals, setPendingWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch pending withdrawals when the component is mounted
  useEffect(() => {
    const fetchPendingWithdrawals = async () => {
      try {
        const response = await axios.get(
          'https://mekite-btc.onrender.com/api/admin/currency-pendings'
        );
        setPendingWithdrawals(response.data.users || []);
      } catch (error) {
        setError('Error fetching pending withdrawals');
        console.error('Fetch Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingWithdrawals();
  }, []);

  const handleAction = async (userId, currency, action) => {
    try {
      const endpoint =
        action === 'approve'
          ? `https://mekite-btc.onrender.com/api/admin/approve-currency/${userId}`
          : `https://mekite-btc.onrender.com/api/admin/reject-currency/${userId}`;
      const payload = { currency }; // You can include more details if necessary
      const response = await axios.post(endpoint, payload);

      alert(response.data.message);
      // Refresh the pending withdrawals list
      setPendingWithdrawals((prev) =>
        prev.map((user) =>
          user.userId === userId
            ? {
                ...user,
                [`${currency}Pending`]: action === 'approve' ? 0 : user[`${currency}Pending`],
              }
            : user
        )
      );
    } catch (error) {
      console.error('Action Error:', error);
      alert(error.response?.data?.message || 'Error performing action');
    }
  };

  return (
    <>
      <SideBard />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Pending Withdrawals</h1>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : pendingWithdrawals.length === 0 ? (
          <p className="text-center">No pending withdrawals found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingWithdrawals.map((user) => (
              <div
                key={user.userId}
                className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
              >
                <h2 className="text-xl font-semibold mb-2">{user.fullName}</h2>
                <p className="text-gray-600 mb-2">User ID: {user.userId}</p>

                <div className="mb-4">
                  {user.bitcoinPending > 0 && (
                    <p className="text-gray-700">
                      Bitcoin Pending: <span className="font-bold">{user.bitcoinPending}</span>
                    </p>
                  )}
                  {user.ethereumPending > 0 && (
                    <p className="text-gray-700">
                      Ethereum Pending: <span className="font-bold">{user.ethereumPending}</span>
                    </p>
                  )}
                  {user.usdtPending > 0 && (
                    <p className="text-gray-700">
                      USDT Pending: <span className="font-bold">{user.usdtPending}</span>
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  {user.bitcoinPending > 0 && (
                    <div className="flex justify-between">
                      <button
                        className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600"
                        onClick={() => handleAction(user.userId, 'bitcoin', 'approve')}
                      >
                        Approve Bitcoin
                      </button>
                      <button
                        className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
                        onClick={() => handleAction(user.userId, 'bitcoin', 'reject')}
                      >
                        Reject Bitcoin
                      </button>
                    </div>
                  )}
                  {user.ethereumPending > 0 && (
                    <div className="flex justify-between">
                      <button
                        className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600"
                        onClick={() => handleAction(user.userId, 'ethereum', 'approve')}
                      >
                        Approve Ethereum
                      </button>
                      <button
                        className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
                        onClick={() => handleAction(user.userId, 'ethereum', 'reject')}
                      >
                        Reject Ethereum
                      </button>
                    </div>
                  )}
                  {user.usdtPending > 0 && (
                    <div className="flex justify-between">
                      <button
                        className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600"
                        onClick={() => handleAction(user.userId, 'usdt', 'approve')}
                      >
                        Approve USDT
                      </button>
                      <button
                        className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
                        onClick={() => handleAction(user.userId, 'usdt', 'reject')}
                      >
                        Reject USDT
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ApproveWithdrawal;
