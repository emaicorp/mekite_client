import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApproveWithdrawal = () => {
  const [users, setUsers] = useState([]);
  const [pendingWithdrawals, setPendingWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  // Fetch all users and pending withdrawals when the component mounts
  useEffect(() => {
    // Fetch all users
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get('https://mekite-crypto.onrender.com/api/admin/pending-withdrawals');
        setPendingWithdrawals(response.data.pendingWithdrawals);
      } catch (err) {
        setError('Failed to fetch pending withdrawals.');
      }
    };

    // Fetch all users
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://mekite-crypto.onrender.com/api/all-users');
        setUsers(response.data.users);
      } catch (err) {
        setError('Failed to fetch users.');
      }
    };

    fetchUsers();
    fetchAllUsers();
    setLoading(false);
  }, []);

  const handleAction = async (userId, currency, action) => {
    try {
      // Send PATCH request to the server to approve or reject the withdrawal
      const response = await axios.patch(`https://mekite-crypto.onrender.com/api/admin/withdrawals/${userId}`, {
        currency,
        action
      });
  
      // Handle success
      setMessage(response.data.message);
  
      // Remove the processed withdrawal from the list
      setPendingWithdrawals(prevState =>
        prevState.filter(user => user.userId !== userId)
      );
    } catch (err) {
      // Handle error response
      setError(err.response ? err.response.data.message : 'An error occurred.');
    }
  };
  

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard - Financial Management</h1>

      {error && <div className="bg-red-500 text-white p-4 mb-4 rounded">{error}</div>}
      {message && <div className="bg-green-500 text-white p-4 mb-4 rounded">{message}</div>}

      {loading ? (
        <div className="text-center">
          <span className="loader"></span> {/* Implement a loader icon */}
        </div>
      ) : (
        <div>
          {/* Users List */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">All Users</h2>
            <table className="w-full text-left table-auto border-collapse">
              <thead>
                <tr className="border-b bg-gray-100">
                  <th className="px-4 py-2">Full Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Total Withdrawals</th>
                  <th className="px-4 py-2">Last Seen</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{user.fullName}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.totalWithdrawals}</td>
                    <td className="px-4 py-2">{new Date(user.lastSeen).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Pending Withdrawals List */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Pending Withdrawals</h2>
            <table className="w-full text-left table-auto border-collapse">
              <thead>
                <tr className="border-b bg-gray-100">
                  <th className="px-4 py-2">User</th>
                  <th className="px-4 py-2">Currency</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingWithdrawals.map(user => (
                  <tr key={user.userId} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{user.fullName}</td>
                    <td className="px-4 py-2">Bitcoin: {user.bitcoinPending} ETH: {user.ethereumPending} USDT: {user.usdtPending}</td>
                    <td className="px-4 py-2">
                      {user.bitcoinPending > 0 && <span>Bitcoin: {user.bitcoinPending}</span>}
                      {user.ethereumPending > 0 && <span> Ethereum: {user.ethereumPending}</span>}
                      {user.usdtPending > 0 && <span> USDT: {user.usdtPending}</span>}
                    </td>
                    <td className="px-4 py-2">
                      <button 
                        className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                        onClick={() => handleAction(user.userId, 'bitcoin', 'approve')}
                      >
                        Approve Bitcoin
                      </button>
                      <button 
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={() => handleAction(user.userId, 'bitcoin', 'reject')}
                      >
                        Reject Bitcoin
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      )}
    </div>
  );
};

export default ApproveWithdrawal;
