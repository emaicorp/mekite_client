import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideBard from './SideBard';

function AdminDepositApproval() {
  const [pendingWithdrawals, setPendingWithdrawals] = useState([]);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch all pending withdrawals when component mounts
  useEffect(() => {
    const fetchPendingWithdrawals = async () => {
      try {
        const response = await axios.get('https://mekite-crypto.onrender.com/api/admin/withdrawals/pending');
        if (response.data.pendingWithdrawals) {
          setPendingWithdrawals(response.data.pendingWithdrawals);
        }
      } catch (error) {
        console.error('Error fetching pending withdrawals:', error);
        setMessage('Error fetching pending withdrawals');
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://mekite-crypto.onrender.com/api/all-users');
        if (response.data.users) {
          setUsers(response.data.users);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        setMessage('Error fetching users');
      }
    };

    fetchPendingWithdrawals();
    fetchUsers();
  }, []);

  // Handle approving or rejecting a withdrawal
  const handleApproval = async (userId, investmentIndex, action) => {
    try {
      const response = await axios.post(
        `https://mekite-crypto.onrender.com/api/admin/withdrawals/${action}`,
        { userId, investmentIndex }
      );
      if (response.data.message) {
        setMessage(response.data.message);
        // Update pendingWithdrawals state to reflect the action
        setPendingWithdrawals((prev) =>
          prev.map((user) =>
            user.userId === userId
              ? {
                  ...user,
                  investments: user.investments.map((inv, index) =>
                    index === investmentIndex ? { ...inv, status: action === 'approve' ? 'approved' : 'rejected' } : inv
                  ),
                }
              : user
          )
        );
      }
    } catch (error) {
      console.error('Error processing withdrawal:', error);
      setMessage('Error processing withdrawal');
    }
  };

  return (
    <div className="container mx-auto p-8">
      <SideBard />
      <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Admin Deposit Approval</h2>

      {/* Show pending withdrawals */}
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Pending Withdrawals</h3>
      {pendingWithdrawals.length === 0 ? (
        <p>No pending withdrawals.</p>
      ) : (
        pendingWithdrawals.map((user) => (
          <div key={user.userId} className="bg-gray-50 p-4 rounded-lg shadow-sm mb-4">
            <h4 className="text-lg font-semibold text-gray-700">{user.username}</h4>
            {user.investments.map((investment, index) => (
              <div key={index} className="flex justify-between items-center py-2">
                <p>{`Investment Amount: ${investment.amount} - Payment Method: ${investment.paymentMethod}`}</p>
                <div>
                  <button
                    className="bg-green-500 text-white py-1 px-4 rounded-lg mr-2 hover:bg-green-600"
                    onClick={() => handleApproval(user.userId, index, 'approve')}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600"
                    onClick={() => handleApproval(user.userId, index, 'reject')}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))
      )}

      {/* Show all users */}
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">All Users</h3>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user._id} className="text-gray-700">
              {user.username} ({user.email})
            </li>
          ))}
        </ul>
      )}

      {/* Display success or error messages */}
      {message && <p className="mt-4 text-center text-lg text-green-500">{message}</p>}
    </div>
  );
}

export default AdminDepositApproval;
