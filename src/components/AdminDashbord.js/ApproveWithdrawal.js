import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  RiMoneyDollarCircleLine, 
  RiUserLine,
  RiMailLine,
  RiCheckLine,
  RiCloseLine,
  RiDeleteBinLine,
  RiCoinFill,
  RiCoinLine,
  RiExchangeDollarLine
} from 'react-icons/ri';
import toast from 'react-hot-toast';
import api from '../../utils/axios';
import Sidebar from './SideBard';

const AdminWithdrawals = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const fetchWithdrawals = async () => {
    try {
      const response = await api.get('admin/currency-pendings');
      if (response.data.success) {
        setWithdrawals(response.data.users || []);
      }
      setLoading(false);
    } catch (error) {
      toast.error('Error fetching withdrawals');
      console.error('Fetch Error:', error);
      setLoading(false);
    }
  };

  const handleAction = async (userId, currency, action) => {
    try {
      const endpoint = action === 'approve'
        ? `/api/admin/approve-currency/${userId}`
        : `/api/admin/reject-currency/${userId}`;
      
      const response = await api.post(endpoint, { currency });
      
      if (response.data.success) {
        toast.success(`Withdrawal ${action}ed successfully`);
        // Update local state
        setWithdrawals(prev =>
          prev.map((user) =>
            user.userId === userId
              ? {
                  ...user,
                  [`${currency}Pending`]: action === 'approve' ? 0 : user[`${currency}Pending`],
                }
              : user
          ).filter(user => 
            user.bitcoinPending > 0 || 
            user.ethereumPending > 0 || 
            user.usdtPending > 0
          )
        );
      }
    } catch (error) {
      toast.error(error.response?.data?.message || `Error ${action}ing withdrawal`);
      console.error('Action Error:', error);
    }
  };

  const handleDelete = async (userId, currency) => {
    if (!window.confirm('Are you sure you want to delete this withdrawal request?')) {
      return;
    }

    try {
      const response = await api.delete(`/api/admin/currency/${userId}`, {
        data: { currency }
      });
      
      if (response.data.success) {
        toast.success('Withdrawal request deleted successfully');
        // Update local state
        setWithdrawals(prev =>
          prev.map((user) =>
            user.userId === userId
              ? {
                  ...user,
                  [`${currency}Pending`]: 0,
                }
              : user
          ).filter(user => 
            user.bitcoinPending > 0 || 
            user.ethereumPending > 0 || 
            user.usdtPending > 0
          )
        );
      }
    } catch (error) {
      toast.error('Error deleting withdrawal request');
      console.error('Delete Error:', error);
    }
  };

  const getCurrencyIcon = (currency) => {
    switch(currency) {
      case 'bitcoin':
        return <RiCoinFill className="text-yellow-500" />;
      case 'ethereum':
        return <RiCoinLine className="text-blue-500" />;
      case 'usdt':
        return <RiExchangeDollarLine className="text-green-500" />;
      default:
        return <RiMoneyDollarCircleLine className="text-gray-500" />;
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
              <h1 className="text-3xl font-bold text-white mb-2">Withdrawal Requests</h1>
              <p className="text-gray-400">Manage user withdrawal requests</p>
            </div>
          </div>

          {/* Withdrawals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {withdrawals.map((user) => (
              <React.Fragment key={user.userId}>
                {['bitcoin', 'ethereum', 'usdt'].map(currency => {
                  const pendingAmount = user[`${currency}Pending`];
                  if (pendingAmount <= 0) return null;

                  return (
                    <motion.div
                      key={`${user.userId}-${currency}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="relative p-[1px] rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500"
                    >
                      <div className="bg-[#1a2234] rounded-2xl p-6">
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex items-center space-x-2">
                            {getCurrencyIcon(currency)}
                            <h3 className="text-xl font-semibold text-white capitalize">
                              {currency}
                            </h3>
                          </div>
                          <button
                            onClick={() => handleDelete(user.userId, currency)}
                            className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-all"
                          >
                            <RiDeleteBinLine />
                          </button>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <RiUserLine className="text-indigo-400" />
                            <div>
                              <p className="text-gray-400 text-sm">User</p>
                              <p className="text-white">{user.fullName}</p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            <RiMailLine className="text-indigo-400" />
                            <div>
                              <p className="text-gray-400 text-sm">Email</p>
                              <p className="text-white">{user.email}</p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            <RiMoneyDollarCircleLine className="text-indigo-400" />
                            <div>
                              <p className="text-gray-400 text-sm">Amount</p>
                              <p className="text-white">{pendingAmount}</p>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-gray-800">
                            <div className="flex space-x-3">
                              <button
                                onClick={() => handleAction(user.userId, currency, 'approve')}
                                className="flex-1 py-2 px-4 bg-green-500/10 text-green-400 rounded-xl hover:bg-green-500/20 transition-all flex items-center justify-center space-x-2"
                              >
                                <RiCheckLine />
                                <span>Approve</span>
                              </button>
                              <button
                                onClick={() => handleAction(user.userId, currency, 'reject')}
                                className="flex-1 py-2 px-4 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-all flex items-center justify-center space-x-2"
                              >
                                <RiCloseLine />
                                <span>Reject</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </React.Fragment>
            ))}

            {withdrawals.length === 0 && (
              <div className="col-span-full text-center py-12">
                <RiMoneyDollarCircleLine className="text-4xl text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No pending withdrawals found</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminWithdrawals;
