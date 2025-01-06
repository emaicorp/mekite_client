import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheck, FaTimes } from 'react-icons/fa';
import SideBard from './SideBard';

const AdminDepositApproval = () => {
  const [pendingWithdrawals, setPendingWithdrawals] = useState([]);
  const [allInvestments, setAllInvestments] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchPendingWithdrawals();
    fetchAllInvestments();
  }, []);

  const fetchPendingWithdrawals = async () => {
    try {
      const response = await axios.get(
        'https://mekite-btc.onrender.com/api/admin/withdrawals/pending'
      );
      setPendingWithdrawals(response.data.pendingWithdrawals || []);
    } catch (error) {
      console.error('Error fetching pending withdrawals:', error);
      setMessage('Error fetching pending withdrawals. Please try again later.');
    }
  };

  const fetchAllInvestments = async () => {
    try {
      const response = await axios.get(
        'https://mekite-btc.onrender.com/api/user/investments'
      );
      setAllInvestments(response.data || []);
    } catch (error) {
      console.error('Error fetching all investments:', error);
      setMessage('Error fetching all investments. Please try again later.');
    }
  };

  const handleApproval = async (investmentId, userId, action) => {
    try {
      const response = await axios.patch(
        `https://mekite-btc.onrender.com/api/admin/withdrawals/${action}`,
        { investmentId, userId }
      );
      setMessage(response.data.message);

      // Remove processed investment from pending withdrawals list
      setPendingWithdrawals(prev =>
        prev
          .map(user => ({
            ...user,
            investments: user.investments.filter(
              investment => investment._id !== investmentId
            ),
          }))
          .filter(user => user.investments.length > 0)
      );
    } catch (error) {
      console.error('Error processing withdrawal:', error);
      setMessage(
        `Error processing withdrawal: ${error.response?.data?.message || 'Unknown error'}`
      );
    }
  };

  const getTimeRemaining = expiresAt => {
    const now = new Date();
    const expirationTime = new Date(expiresAt);
    const timeRemaining = expirationTime - now;

    if (timeRemaining <= 0) return 'Complete';

    const seconds = Math.floor((timeRemaining / 1000) % 60);
    const minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
    const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <>
      <SideBard />
      <div className="p-8 bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto bg-white p-6 shadow-xl rounded-lg">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">Admin Deposit Approval</h1>
          {message && <p className="text-red-500 mb-4">{message}</p>}

          {/* Pending Withdrawals Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Pending Withdrawals</h2>
            {pendingWithdrawals.length === 0 ? (
              <p className="text-gray-600">No pending withdrawals at the moment.</p>
            ) : (
              pendingWithdrawals.map(user => (
                <div key={user.userId} className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">{user.username}</h3>
                  {user.investments.map(investment => (
                    <div
                      key={investment._id}
                      className="border-t pt-4 mt-4"
                    >
                      <p className="text-gray-600">
                        <span className="font-semibold">Package:</span> {investment.selectedPackage}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Amount:</span> ${investment.amount}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Payment Method:</span> {investment.paymentMethod}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Status:</span> {investment.status}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Expires At:</span> {getTimeRemaining(investment.expiresAt)}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Created At:</span> {new Date(investment.createdAt).toLocaleString()}
                      </p>
                      <div className="flex mt-4 space-x-4">
                        <button
                          onClick={() => handleApproval(investment._id, user.userId, 'approve')}
                          className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
                        >
                          <FaCheck className="mr-2" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleApproval(investment._id, user.userId, 'reject')}
                          className="flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
                        >
                          <FaTimes className="mr-2" />
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            )}
          </section>

          {/* All Investments Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">All Investments</h2>
            {allInvestments.length === 0 ? (
              <p className="text-gray-600">No investments found.</p>
            ) : (
              allInvestments.map(investment => (
                <div
                  key={investment._id}
                  className="bg-gray-50 p-6 rounded-lg shadow-md mb-6"
                >
                  <p className="text-gray-600">
                    <span className="font-semibold">Package:</span> {investment.selectedPackage}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Amount:</span> ${investment.amount}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Status:</span> {investment.status}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Created At:</span> {new Date(investment.createdAt).toLocaleString()}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Payment Method:</span> {investment.paymentMethod}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Expires At:</span> {new Date(investment.expiresAt).toLocaleString()}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Profit Added:</span> {investment.isProfitAdded ? 'Yes' : 'No'}
                  </p>
                </div>
              ))
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default AdminDepositApproval;
