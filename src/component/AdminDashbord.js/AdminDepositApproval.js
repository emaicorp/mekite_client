import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import SideBard from './SideBard';

function AdminDepositApproval() {
  const [pendingWithdrawals, setPendingWithdrawals] = useState([]);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

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

  const handleApproval = async (userId, investmentIndex, action) => {
    try {
      const response = await axios.post(
        `https://mekite-crypto.onrender.com/api/admin/withdrawals/${action}`,
        { userId, investmentIndex }
      );
      if (response.data.message) {
        setMessage(response.data.message);
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
    <div className="flex bg-gray-100 min-h-screen">
      <SideBard />
      <div className="flex-1 p-8">
        <header className="flex justify-between items-center bg-white shadow px-6 py-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Admin Deposit Approval</h2>
        </header>

        <div className="space-y-8">
          {/* Pending Withdrawals */}
          <section>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Pending Withdrawals</h3>
            {pendingWithdrawals.length === 0 ? (
              <p className="text-gray-600">No pending withdrawals.</p>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {pendingWithdrawals.map((user) => (
                  <div key={user.userId} className="bg-white p-4 rounded-lg shadow-md">
                    <h4 className="text-lg font-bold text-gray-700">{user.username}</h4>
                    <div className="mt-2">
                      {user.investments.map((investment, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                          <div>
                            <p className="text-sm text-gray-600">
                              Amount: <span className="font-medium">{investment.amount}</span>
                            </p>
                            <p className="text-sm text-gray-600">
                              Payment Method: <span className="font-medium">{investment.paymentMethod}</span>
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600"
                              onClick={() => handleApproval(user.userId, index, 'approve')}
                            >
                              <FaCheckCircle />
                            </button>
                            <button
                              className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                              onClick={() => handleApproval(user.userId, index, 'reject')}
                            >
                              <FaTimesCircle />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* All Users */}
          <section>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">All Users</h3>
            {users.length === 0 ? (
              <p className="text-gray-600">No users found.</p>
            ) : (
              <div className="bg-white p-4 rounded-lg shadow-md">
                <ul className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <li key={user._id} className="py-2">
                      <p className="text-sm font-medium text-gray-800">{user.username}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* Success/Error Message */}
          {message && (
            <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-lg text-green-700">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDepositApproval;
