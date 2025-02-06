import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  RiMoneyDollarCircleLine, 
  RiTimeLine, 
  RiUserLine,
  RiMailLine,
  RiCheckLine,
  RiLoader4Line,
  RiDeleteBinLine,
} from 'react-icons/ri';
import toast from 'react-hot-toast';
import api from '../../utils/axios';
import Sidebar from './SideBard';
import { format } from 'date-fns';

const AdminDepositApproval = () => {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalInvestments, setTotalInvestments] = useState(0);

  useEffect(() => {
    fetchInvestments();
  }, []);

  const fetchInvestments = async () => {
    try {
      const response = await api.get('investments/all');
      if (response.data.success) {
        setInvestments(response.data.data.investments);
        setTotalInvestments(response.data.data.total);
      }
      setLoading(false);
    } catch (error) {
      toast.error('Error fetching investments');
      console.error('Fetch Error:', error);
      setLoading(false);
    }
  };

  const handleApproval = async (investmentId, action) => {
    try {
      const response = await api.put(
        `investments/${investmentId}/status`,
        { status: action }
      );
      
      if (response.data.success) {
        toast.success(`Investment ${action} successfully`);
        // Update the local state to reflect the change
        setInvestments(prevInvestments => 
          prevInvestments.map(inv => 
            inv._id === investmentId 
              ? { ...inv, status: action === 'approved' ? 'active' : 'Cancelled' }
              : inv
          )
        );
      }
    } catch (error) {
      toast.error(`Error ${action}ing investment`);
      console.error('Approval Error:', error);
    }
  };

  const handleDelete = async (investmentId) => {
    // Add confirmation dialog
    if (!window.confirm('Are you sure you want to delete this investment?')) {
      return;
    }

    try {
      const response = await api.delete(`investments/${investmentId}`);
      
      if (response.data.success) {
        toast.success('Investment deleted successfully');
        // Remove the deleted investment from state
        setInvestments(prevInvestments => 
          prevInvestments.filter(inv => inv._id !== investmentId)
        );
        // Update total count
        setTotalInvestments(prev => prev - 1);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error deleting investment');
      console.error('Delete Error:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'text-green-400 bg-green-400/10';
      case 'pending':
        return 'text-yellow-400 bg-yellow-400/10';
      case 'completed':
        return 'text-blue-400 bg-blue-400/10';
      case 'rejected':
        return 'text-red-400 bg-red-400/10';
      default:
        return 'text-gray-400 bg-gray-400/10';
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
              <h1 className="text-3xl font-bold text-white mb-2">Deposit Approvals</h1>
              <p className="text-gray-400">Total Investments: {totalInvestments}</p>
            </div>
          </div>

          {/* Investments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {investments.map((investment) => (
              <motion.div
                key={investment._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative p-[1px] rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500"
              >
                <div className="bg-[#1a2234] rounded-2xl p-6">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-xl font-semibold text-white">
                      {investment.selectedPackage}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(investment.status)}`}>
                        {investment.status}
                      </span>
                      <button
                        onClick={() => handleDelete(investment._id)}
                        className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-all"
                        title="Delete Investment"
                      >
                        <RiDeleteBinLine className="text-lg" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {investment.userId ? (
                      <>
                        <div className="flex items-center space-x-3">
                          <RiUserLine className="text-indigo-400" />
                          <div>
                            <p className="text-gray-400 text-sm">Investor</p>
                            <p className="text-white">{investment.userId.fullName}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <RiMailLine className="text-indigo-400" />
                          <div>
                            <p className="text-gray-400 text-sm">Email</p>
                            <p className="text-white">{investment.userId.email}</p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-yellow-400 text-sm">User data not available</div>
                    )}

                    <div className="flex items-center space-x-3">
                      <RiMoneyDollarCircleLine className="text-indigo-400" />
                      <div>
                        <p className="text-gray-400 text-sm">Amount</p>
                        <p className="text-white">${investment.amount}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <RiMoneyDollarCircleLine className="text-indigo-400" />
                      <div>
                        <p className="text-gray-400 text-sm">Profit</p>
                        <p className="text-white">${investment.profit}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <RiTimeLine className="text-indigo-400" />
                      <div>
                        <p className="text-gray-400 text-sm">Created At</p>
                        <p className="text-white">
                          {format(new Date(investment.createdAt), 'MMM dd, yyyy')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <RiTimeLine className="text-indigo-400" />
                      <div>
                        <p className="text-gray-400 text-sm">Expires At</p>
                        <p className="text-white">
                          {format(new Date(investment.expiresAt), 'MMM dd, yyyy')}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-800">
                      <div className="flex items-center space-x-3 mb-4">
                        {investment.isProfitAdded ? (
                          <RiCheckLine className="text-green-400" />
                        ) : (
                          <RiLoader4Line className="text-yellow-400 animate-spin" />
                        )}
                        <p className="text-gray-400">
                          Profit Status: {investment.isProfitAdded ? 'Added' : 'Pending'}
                        </p>
                      </div>

                      {investment.status === 'pending' && (
                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleApproval(investment._id, 'approved')}
                            className="flex-1 py-2 px-4 bg-green-500/10 text-green-400 rounded-xl hover:bg-green-500/20 transition-all"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleApproval(investment._id, 'cancelled')}
                            className="flex-1 py-2 px-4 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-all"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDepositApproval;
