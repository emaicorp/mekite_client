import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RiCheckLine, 
  RiCloseLine, 
  RiMoneyDollarCircleLine,
  RiCoinFill,
  RiCoinLine,
  RiExchangeDollarLine
} from 'react-icons/ri';
import Sidebar from './SideBard';

const ApproveWithdrawal = () => {
  const [pendingWithdrawals, setPendingWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchPendingWithdrawals();
  }, []);

  const fetchPendingWithdrawals = async () => {
    try {
      const response = await axios.get(
        'https://mekite-btc.onrender.com/api/admin/currency-pendings'
      );
      setPendingWithdrawals(response.data.users || []);
      setLoading(false);
    } catch (error) {
      setError('Error fetching pending withdrawals');
      console.error('Fetch Error:', error);
      setLoading(false);
    }
  };

  const handleAction = async (userId, currency, action) => {
    try {
      const endpoint = action === 'approve'
        ? `https://mekite-btc.onrender.com/api/admin/approve-currency/${userId}`
        : `https://mekite-btc.onrender.com/api/admin/reject-currency/${userId}`;
      
      const response = await axios.post(endpoint, { currency });
      setMessage(response.data.message);

      setPendingWithdrawals((prev) =>
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
    } catch (error) {
      console.error('Action Error:', error);
      setMessage(error.response?.data?.message || 'Error performing action');
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
              <h1 className="text-3xl font-bold text-white mb-2">Pending Withdrawals</h1>
              <p className="text-gray-400">Manage and approve user withdrawal requests</p>
            </div>
          </div>

          {/* Message Alert */}
          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="relative p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400"
              >
                {message}
                <button
                  onClick={() => setMessage('')}
                  className="absolute top-4 right-4 p-1 hover:bg-indigo-500/20 rounded-lg transition-all"
                >
                  <RiCloseLine className="text-xl" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Withdrawals Table */}
          <div className="bg-[#1a2234] rounded-2xl overflow-hidden">
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left py-4 px-4 text-gray-400 font-medium">User</th>
                      <th className="text-left py-4 px-4 text-gray-400 font-medium">Currency</th>
                      <th className="text-left py-4 px-4 text-gray-400 font-medium">Amount</th>
                      <th className="text-right py-4 px-4 text-gray-400 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {pendingWithdrawals.map((user) => (
                      <React.Fragment key={user.userId}>
                        {user.bitcoinPending > 0 && (
                          <TableRow
                            user={user}
                            currency="bitcoin"
                            amount={user.bitcoinPending}
                            onAction={handleAction}
                            getCurrencyIcon={getCurrencyIcon}
                          />
                        )}
                        {user.ethereumPending > 0 && (
                          <TableRow
                            user={user}
                            currency="ethereum"
                            amount={user.ethereumPending}
                            onAction={handleAction}
                            getCurrencyIcon={getCurrencyIcon}
                          />
                        )}
                        {user.usdtPending > 0 && (
                          <TableRow
                            user={user}
                            currency="usdt"
                            amount={user.usdtPending}
                            onAction={handleAction}
                            getCurrencyIcon={getCurrencyIcon}
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>

                {pendingWithdrawals.length === 0 && (
                  <div className="text-center py-8">
                    <RiMoneyDollarCircleLine className="text-4xl text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No pending withdrawals found.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const TableRow = ({ user, currency, amount, onAction, getCurrencyIcon }) => (
  <tr className="hover:bg-[#111827] transition-colors">
    <td className="py-4 px-4">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
          <span className="text-white font-medium">{user.fullName[0]}</span>
        </div>
        <div>
          <p className="text-white font-medium">{user.fullName}</p>
          <p className="text-sm text-gray-400">ID: {user.userId}</p>
        </div>
      </div>
    </td>
    <td className="py-4 px-4">
      <div className="flex items-center space-x-2">
        {getCurrencyIcon(currency)}
        <span className="text-white capitalize">{currency}</span>
      </div>
    </td>
    <td className="py-4 px-4">
      <span className="text-white font-medium">{amount}</span>
    </td>
    <td className="py-4 px-4">
      <div className="flex items-center justify-end space-x-2">
        <button
          onClick={() => onAction(user.userId, currency, 'approve')}
          className="px-4 py-2 bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500/20 transition-all flex items-center space-x-2"
        >
          <RiCheckLine />
          <span>Approve</span>
        </button>
        <button
          onClick={() => onAction(user.userId, currency, 'reject')}
          className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-all flex items-center space-x-2"
        >
          <RiCloseLine />
          <span>Reject</span>
        </button>
      </div>
    </td>
  </tr>
);

export default ApproveWithdrawal;
