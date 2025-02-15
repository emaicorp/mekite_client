import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  RiMoneyDollarCircleLine, 
  RiUserLine,
  RiMailLine,
  RiCheckLine,
  RiCloseLine,
  RiDeleteBinLine,
  RiCalendarLine,
  RiWalletLine,
  RiFileCopyLine
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
      const response = await api.get('/withdrawals/admin/all');
      if (response.data.success) {
        console.log(response)
        setWithdrawals(response.data.data || []);
      }
      setLoading(false);
    } catch (error) {
      toast.error('Error fetching withdrawals');
      console.error('Fetch Error:', error);
      setLoading(false);
    }
  };

  const handleAction = async (withdrawalId, action) => {
    try {
      const endpoint = `withdrawals/admin/${withdrawalId}`;
      
      const response = await api.patch(endpoint,{status:action});
      
      if (response.data.success) {
        toast.success(`Withdrawal ${action}ed successfully`);
        // Update local state
        setWithdrawals(prev =>
          prev.map(withdrawal =>
            withdrawal._id === withdrawalId
              ? { ...withdrawal, status: action === 'approve' ? 'approved' : 'rejected' }
              : withdrawal
          )
        );
      }
    } catch (error) {
      toast.error(error.response?.data?.message || `Error ${action}ing withdrawal`);
      console.error('Action Error:', error);
    }
  };

  const handleDelete = async (withdrawalId) => {
    if (!window.confirm('Are you sure you want to delete this withdrawal request?')) {
      return;
    }

    try {
      const response = await api.delete(`/withdrawals/admin/${withdrawalId}`);
      
      if (response.data.success) {
        toast.success('Withdrawal request deleted successfully');
        // Update local state
        setWithdrawals(prev => prev.filter(withdrawal => withdrawal._id !== withdrawalId));
      }
    } catch (error) {
      toast.error('Error deleting withdrawal request');
      console.error('Delete Error:', error);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => toast.success('Copied to clipboard!'))
      .catch(() => toast.error('Failed to copy'));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
            {withdrawals.map((withdrawal) => (
              <motion.div
                key={withdrawal._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative p-[1px] rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500"
              >
                <div className="bg-[#1a2234] rounded-2xl p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center space-x-2">
                      <RiMoneyDollarCircleLine className="text-indigo-400" />
                      <h3 className="text-xl font-semibold text-white capitalize">
                        {withdrawal.currency}
                      </h3>
                    </div>
                    <button
                      onClick={() => handleDelete(withdrawal._id)}
                      className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-all"
                    >
                      <RiDeleteBinLine />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <RiUserLine className="text-indigo-400" />
                      <div>
                        <p className="text-gray-400 text-sm">Username</p>
                        <p className="text-white">{withdrawal.userId?.username || 'N/A'}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <RiMailLine className="text-indigo-400" />
                      <div>
                        <p className="text-gray-400 text-sm">Email</p>
                        <p className="text-white">{withdrawal.userId?.email || 'N/A'}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <RiMoneyDollarCircleLine className="text-indigo-400" />
                      <div className="flex-1">
                        <p className="text-gray-400 text-sm">Amount</p>
                        <div className="flex items-center justify-between">
                          <p className="text-white">${withdrawal.amount}</p>
                          <button
                            onClick={() => handleCopy(withdrawal.amount.toString())}
                            className="p-1.5 bg-indigo-500/10 text-indigo-400 rounded-lg hover:bg-indigo-500/20 transition-all"
                            title="Copy amount"
                          >
                            <RiFileCopyLine className="text-sm" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <RiWalletLine className="text-indigo-400" />
                      <div className="flex-1">
                        <p className="text-gray-400 text-sm">Wallet</p>
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-white break-all">{withdrawal.walletAddress}</p>
                          <button
                            onClick={() => handleCopy(withdrawal.walletAddress)}
                            className="p-1.5 bg-indigo-500/10 text-indigo-400 rounded-lg hover:bg-indigo-500/20 transition-all flex-shrink-0"
                            title="Copy wallet address"
                          >
                            <RiFileCopyLine className="text-sm" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <RiCalendarLine className="text-indigo-400" />
                      <div>
                        <p className="text-gray-400 text-sm">Date</p>
                        <p className="text-white">{formatDate(withdrawal.createdAt)}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-800">
                      <div className="flex space-x-3">
                        {withdrawal.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleAction(withdrawal._id, 'approved')}
                              className="flex-1 py-2 px-4 bg-green-500/10 text-green-400 rounded-xl hover:bg-green-500/20 transition-all flex items-center justify-center space-x-2"
                            >
                              <RiCheckLine />
                              <span>Approve</span>
                            </button>
                            <button
                              onClick={() => handleAction(withdrawal._id, 'rejected')}
                              className="flex-1 py-2 px-4 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-all flex items-center justify-center space-x-2"
                            >
                              <RiCloseLine />
                              <span>Reject</span>
                            </button>
                          </>
                        )}
                        {withdrawal.status !== 'pending' && (
                          <div className={`flex-1 py-2 px-4 rounded-xl text-center ${
                            withdrawal.status === 'approved' 
                              ? 'bg-green-500/10 text-green-400' 
                              : 'bg-red-500/10 text-red-400'
                          }`}>
                            Status: {withdrawal.status}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
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
