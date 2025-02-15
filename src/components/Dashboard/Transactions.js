import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  RiHistoryLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from 'react-icons/ri';
import toast from 'react-hot-toast';
import api from '../../utils/axios';
import Sidebar from './Sidebar';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  useEffect(() => {
    fetchTransactions(1);
  }, []);

  const fetchTransactions = async (page) => {
    try {
      setLoading(true);
      const response = await api.get(`/transactions/my-transactions?page=${page}`);
      
      if (response.data.success) {
        setTransactions(response.data.data.transactions);
        setPagination(response.data.data.pagination);
      }
    } catch (error) {
      toast.error('Error fetching transactions');
      console.error('Fetch Error:', error);
    } finally {
      setLoading(false);
    }
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

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'text-green-400 bg-green-400/10';
      case 'pending':
        return 'text-yellow-400 bg-yellow-400/10';
      case 'failed':
        return 'text-red-400 bg-red-400/10';
      default:
        return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'profit':
        return 'text-green-400';
      case 'withdrawal':
        return 'text-red-400';
      case 'deposit':
        return 'text-blue-400';
      default:
        return 'text-gray-400';
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
              <h1 className="text-3xl font-bold text-white mb-2">Transaction History</h1>
              <p className="text-gray-400">View all your transactions</p>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="relative overflow-x-auto rounded-2xl">
            <div className="p-[1px] relative rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500">
              <div className="bg-[#1a2234] rounded-2xl p-4">
                <table className="w-full text-sm text-left text-gray-400">
                  <thead className="text-xs uppercase bg-gray-900/50">
                    <tr>
                      <th className="px-6 py-3 rounded-l-lg">Date</th>
                      <th className="px-6 py-3">Type</th>
                      <th className="px-6 py-3">Amount</th>
                      <th className="px-6 py-3">Currency</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3 rounded-r-lg">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr key={transaction._id} className="border-b border-gray-800">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {formatDate(transaction.createdAt)}
                        </td>
                        <td className={`px-6 py-4 font-medium ${getTypeColor(transaction.type)}`}>
                          {transaction.type}
                        </td>
                        <td className="px-6 py-4">
                          ${transaction.amount.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 capitalize">
                          {transaction.currency}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${getStatusColor(transaction.status)}`}>
                            {transaction.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {transaction.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {transactions.length === 0 && (
                  <div className="text-center py-12">
                    <RiHistoryLine className="text-4xl text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No transactions found</p>
                  </div>
                )}

                {/* Pagination */}
                {transactions.length > 0 && (
                  <div className="flex items-center justify-between mt-6">
                    <div className="text-sm text-gray-400">
                      Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} entries
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => fetchTransactions(pagination.page - 1)}
                        disabled={!pagination.hasPrevPage}
                        className="p-2 bg-gray-900/50 text-gray-400 rounded-lg hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <RiArrowLeftSLine className="text-xl" />
                      </button>
                      <span className="text-gray-400">
                        Page {pagination.page} of {pagination.totalPages}
                      </span>
                      <button
                        onClick={() => fetchTransactions(pagination.page + 1)}
                        disabled={!pagination.hasNextPage}
                        className="p-2 bg-gray-900/50 text-gray-400 rounded-lg hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <RiArrowRightSLine className="text-xl" />
                      </button>
                    </div>
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

export default Transactions; 