import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { RiGiftLine, RiUserLine, RiMoneyDollarCircleLine } from 'react-icons/ri';
import Sidebar from './SideBard';

const Bonuses = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [bonusAmount, setBonusAmount] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://mekite-btc.onrender.com/api/all-users');
      setUsers(response.data.users);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setMessage('Failed to fetch users. Please try again.');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser || !bonusAmount) {
      setMessage('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('https://mekite-btc.onrender.com/api/add-bonus', {
        userId: selectedUser,
        amount: parseFloat(bonusAmount)
      });

      setMessage(response.data.message);
      setBonusAmount('');
      setSelectedUser('');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error adding bonus');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111827]">
        <Sidebar />
        <div className="w-full md:pl-72 pt-16 md:pt-0">
          <div className="flex items-center justify-center min-h-screen">
            <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111827]">
      <Sidebar />
      <div className="w-full md:pl-72 pt-16 md:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-4 md:p-8 space-y-6"
        >
          {/* Header */}
          <div className="relative p-6 rounded-2xl overflow-hidden bg-[#1a2234]">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-10"></div>
            <div className="relative">
              <h1 className="text-3xl font-bold text-white mb-2">
                User Bonuses
              </h1>
              <p className="text-gray-400">
                Add bonus amounts to user accounts
              </p>
            </div>
          </div>

          {/* Message Alert */}
          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400"
              >
                {message}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bonus Form */}
          <div className="relative p-[1px] rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500">
            <form 
              onSubmit={handleSubmit}
              className="relative bg-[#1a2234] rounded-2xl p-6 md:p-8 space-y-6"
            >
              {/* User Selection */}
              <div>
                <label className="block text-gray-400 mb-2">Select User</label>
                <div className="relative">
                  <RiUserLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    className="w-full bg-[#111827] text-white pl-10 pr-4 py-3 rounded-xl border border-gray-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                  >
                    <option value="">-- Select User --</option>
                    {users.map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.fullName} ({user.email})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Bonus Amount */}
              <div>
                <label className="block text-gray-400 mb-2">Bonus Amount</label>
                <div className="relative">
                  <RiMoneyDollarCircleLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    value={bonusAmount}
                    onChange={(e) => setBonusAmount(e.target.value)}
                    placeholder="Enter bonus amount"
                    className="w-full bg-[#111827] text-white pl-10 pr-4 py-3 rounded-xl border border-gray-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-xl hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#1a2234] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <RiGiftLine className="text-xl" />
                    <span>Add Bonus</span>
                  </div>
                )}
              </button>
            </form>
          </div>

          {/* Recent Bonuses */}
          <div className="bg-[#1a2234] rounded-2xl overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-white mb-6">
                Recent Bonuses
              </h2>
              
              <div className="space-y-4">
                {users.filter(user => user.bonus > 0).length === 0 ? (
                  <div className="text-center py-8">
                    <RiGiftLine className="text-4xl text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No bonuses have been added yet.</p>
                  </div>
                ) : (
                  users
                    .filter(user => user.bonus > 0)
                    .map((user) => (
                      <motion.div
                        key={user._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#111827] rounded-xl p-6"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                              <span className="text-xl font-bold text-white">
                                {user.fullName[0]}
                              </span>
                            </div>
                            <div>
                              <h3 className="text-white font-medium">{user.fullName}</h3>
                              <p className="text-gray-400 text-sm">{user.email}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-gray-400 text-sm">Bonus Amount</p>
                            <p className="text-white font-medium">${user.bonus}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Bonuses;
