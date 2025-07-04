import React, { useState, useEffect } from 'react';
import api from '../../utils/axios';
import toast from 'react-hot-toast';
import Sidebar from './SideBard';

function DeductActive() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDeduct, setIsDeduct] = useState(true); // true: deduct, false: fund

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/admin/users');
      if (response.data.success) {
        setUsers(response.data.users);
      }
    } catch (error) {
      toast.error('Error fetching users');
      console.error('Error fetching users:', error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser) {
      toast.error('Please select a user.');
      return;
    }
    if (!amount || isNaN(parseFloat(amount))) {
      toast.error('Please enter a valid amount.');
      return;
    }
    if (isDeduct && !reason) {
      toast.error('Please provide a reason for deduction.');
      return;
    }
    setLoading(true);
    try {
      if (isDeduct) {
        // Deduct from active deposit
        const payload = {
          userId: selectedUser,
          amount: parseFloat(amount),
          reason,
        };
        const response = await api.post('/admin/deduct-deposit', payload);
        if (response.data.success) {
          toast.success('Deposit deducted successfully');
        }
      } else {
        // Fund active deposit
        const payload = {
          userId: selectedUser,
          amount: parseFloat(amount),
        };
        const response = await api.put('/admin/fund-active-deposit', payload);
        if (response.data.success) {
          toast.success('Deposit funded successfully');
        }
      }
      // Reset form
      setSelectedUser('');
      setAmount('');
      setReason('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
      console.error('Error updating deposit:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111827]">
      <Sidebar />

      <div className="w-full md:pl-72 pt-16 md:pt-0">
        <div className="p-4 md:p-8 space-y-6">
          {/* Header */}
          <div className="relative p-6 rounded-2xl overflow-hidden bg-[#1a2234] w-full flex items-center justify-between">
            {/* <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-10 "></div> */}
            <div className="relative">
              <h1 className="text-3xl font-bold text-white mb-2">
                {isDeduct ? 'Deduct from Active Deposit' : 'Fund Active Deposit'}
              </h1>
              <p className="text-gray-400">Manage user active deposits</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsDeduct(false)}
                className={`px-4 py-2 rounded-xl font-medium transition-all ${!isDeduct ? 'bg-green-500 text-white' : 'bg-gray-800 text-gray-400'}`}
              >
                Fund
              </button>
              <button
                onClick={() => setIsDeduct(true)}
                className={`px-4 py-2 rounded-xl font-medium transition-all ${isDeduct ? 'bg-red-500 text-white' : 'bg-gray-800 text-gray-400'}`}
              >
                Deduct
              </button>
            </div>
          </div>
          {/* Form */}
          <div className="relative p-[1px] rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500">
            <form
              onSubmit={handleFormSubmit}
              className="relative bg-[#1a2234] rounded-2xl p-6 md:p-8 space-y-6"
            >
              {/* User Selection */}
              <div>
                <label className="block text-gray-400 mb-2">Select User</label>
                <div className="relative">
                  <select
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    className="w-full bg-[#111827] text-white pl-4 pr-4 py-3 rounded-xl border border-gray-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                  >
                    <option value="">-- Select User --</option>
                    {users.map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.username} ({user.email})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/* Amount Input */}
              <div>
                <label className="block text-gray-400 mb-2">Amount</label>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-[#111827] text-white pl-4 pr-4 py-3 rounded-xl border border-gray-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="Enter amount"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>
              {/* Reason Input (only for deduction) */}
              {isDeduct && (
                <div>
                  <label className="block text-gray-400 mb-2">Reason</label>
                  <input
                    type="text"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full bg-[#111827] text-white pl-4 pr-4 py-3 rounded-xl border border-gray-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="Enter reason for deduction"
                    required={isDeduct}
                  />
                </div>
              )}
              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-xl hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#1a2234] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : isDeduct ? 'Deduct from Deposit' : 'Fund Active Deposit'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeductActive;
