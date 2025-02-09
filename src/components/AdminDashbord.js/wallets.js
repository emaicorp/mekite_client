import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { 
  RiWallet3Line,
  RiDeleteBinLine,
  RiEditLine,
  RiAddLine,
  RiCloseLine
} from 'react-icons/ri';
import useUserData from '../../hooks/useUserData';
import Sidebar from './SideBard';
import LoadingSpinner from '../common/LoadingSpinner';
import api from '../../utils/axios';

const Wallets = () => {
  const { userData } = useUserData();
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editWallet, setEditWallet] = useState(null);
  const [formData, setFormData] = useState({
    currency: '',
    address: '',
    label: '',
    isActive: true
  });

  const fetchWallets = async () => {
    try {
      const response = await api.get('wallet');
      console.log(response)
      setWallets(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching wallets:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWallets();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editWallet 
        ? `wallet/${editWallet._id}`
        : 'wallets';
        
      const apiMethod = editWallet ? 'patch' : 'post';
      
      const response = await api[apiMethod](url, formData);

      if (response.data.success) {
        fetchWallets();
        setShowForm(false);
        setEditWallet(null);
        setFormData({ currency: '', address: '', label: '', isActive: true });
      }
    } catch (error) {
      console.error('Error saving wallet:', error);
    }
  };

  const handleDelete = async (walletId) => {
    try {
      await api.delete(`wallet/${walletId}`);
      fetchWallets();
    } catch (error) {
      console.error('Error deleting wallet:', error);
    }
  };

  const handleEdit = (wallet) => {
    setEditWallet(wallet);
    setFormData({
      currency: wallet.currency,
      address: wallet.address,
      label: wallet.label,
      isActive: wallet.isActive
    });
    setShowForm(true);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="flex min-h-screen bg-[#111827]">
      <Sidebar />
      
      <div className="w-full md:pl-72 pt-16 md:pt-0">
                <div className="mt-10 p-8">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-500/10 rounded-xl">
                <RiWallet3Line className="text-2xl text-indigo-500" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Wallet Management</p>
                <h1 className="text-white text-xl font-medium">Your Crypto Wallets</h1>
              </div>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 text-indigo-400 rounded-xl hover:bg-indigo-500/20 transition-all"
            >
              <RiAddLine /> Add New Wallet
            </button>
          </div>

          {/* Wallet List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wallets.map((wallet) => (
              <motion.div
                key={wallet._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative p-[1px] rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500"
              >
                <div className="bg-[#1a2234] rounded-2xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-white font-medium capitalize">
                        {wallet.currency}
                      </h3>
                      <p className="text-gray-400 text-sm">{wallet.label}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(wallet)}
                        className="p-2 text-indigo-400 hover:text-indigo-300"
                      >
                        <RiEditLine />
                      </button>
                      <button
                        onClick={() => handleDelete(wallet._id)}
                        className="p-2 text-red-400 hover:text-red-300"
                      >
                        <RiDeleteBinLine />
                      </button>
                    </div>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <p className="text-sm font-mono text-gray-300 break-all">
                      {wallet.address}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className={`text-sm ${wallet.isActive ? 'text-green-400' : 'text-red-400'}`}>
                      {wallet.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(wallet.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Add/Edit Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative w-full max-w-md"
              >
                <div className="p-[1px] relative rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500">
                  <div className="bg-[#1a2234] rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold text-white">
                        {editWallet ? 'Edit Wallet' : 'Add New Wallet'}
                      </h2>
                      <button
                        onClick={() => {
                          setShowForm(false);
                          setEditWallet(null);
                        }}
                        className="text-gray-400 hover:text-white"
                      >
                        <RiCloseLine size={24} />
                      </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-gray-400 mb-2">Currency</label>
                        <select
                          name="currency"
                          value={formData.currency}
                          onChange={handleInputChange}
                          className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500"
                          required
                        >
                          <option value="">Select Currency</option>
                          <option value="bitcoin">Bitcoin</option>
                          <option value="ethereum">Ethereum</option>
                          <option value="usdt">USDT</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-400 mb-2">Address</label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-gray-400 mb-2">Label</label>
                        <input
                          type="text"
                          name="label"
                          value={formData.label}
                          onChange={handleInputChange}
                          className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          name="isActive"
                          checked={formData.isActive}
                          onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                          className="w-4 h-4 text-indigo-500 bg-gray-900/50 border-gray-800 rounded focus:ring-indigo-500"
                        />
                        <label className="text-gray-400">Active Wallet</label>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:opacity-90 transition-all"
                      >
                        {editWallet ? 'Update Wallet' : 'Create Wallet'}
                      </button>
                    </form>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wallets;