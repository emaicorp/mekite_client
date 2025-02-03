import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './SideBard';
import WithdrawalCard from './WithdrawalCard';
import InvestmentCard from './InvestmentCard';
import EmptyState from './EmptyState';

const AdminDepositApproval = () => {
  const [pendingWithdrawals, setPendingWithdrawals] = useState([]);
  const [allInvestments, setAllInvestments] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    } catch (error) {
      console.error('Error fetching pending withdrawals:', error);
      setMessage('Error fetching pending withdrawals. Please try again later.');
      setLoading(false);
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
                  Deposit Approval
                </h1>
                <p className="text-gray-400">
                  Manage and approve pending withdrawals
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
                  className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400"
                >
                  {message}
                </motion.div>
              )}
            </AnimatePresence>
  
            {/* Pending Withdrawals */}
            <div className="bg-[#1a2234] rounded-2xl overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-white mb-6">
                  Pending Withdrawals
                </h2>
                
                {pendingWithdrawals.length === 0 ? (
                  <EmptyState message="No pending withdrawals at the moment." />
                ) : (
                  <div className="space-y-6">
                    {pendingWithdrawals.map(user => (
                      user.investments.map(investment => (
                        <WithdrawalCard
                          key={investment._id}
                          user={user}
                          investment={investment}
                          onApprove={(id, userId) => handleApproval(id, userId, 'approve')}
                          onReject={(id, userId) => handleApproval(id, userId, 'reject')}
                          getTimeRemaining={getTimeRemaining}
                        />
                      ))
                    ))}
                  </div>
                )}
              </div>
            </div>
  
            {/* All Investments */}
            <div className="bg-[#1a2234] rounded-2xl overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-white mb-6">
                  All Investments
                </h2>
                
                {allInvestments.length === 0 ? (
                  <EmptyState message="No investments found." />
                ) : (
                  <div className="space-y-6">
                    {allInvestments.map(investment => (
                      <InvestmentCard
                        key={investment._id}
                        investment={investment}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  };
  
  export default AdminDepositApproval;
