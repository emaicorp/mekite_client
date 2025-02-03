import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RiAddLine, 
  RiCloseLine, 
  RiMoneyDollarCircleLine,
  RiPercentLine,
  RiTimeLine,
  RiEditLine,
  RiDeleteBinLine
} from 'react-icons/ri';
import Sidebar from './SideBard';

const ManageInvestmentPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    minimumAmount: '',
    maximumAmount: '',
    returnPercentage: '',
    duration: '',
    description: ''
  });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await axios.get('https://mekite-btc.onrender.com/api/investment-plans');
      setPlans(response.data.plans || []);
      setLoading(false);
    } catch (error) {
      setMessage('Error fetching investment plans');
      console.error('Fetch Error:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        'https://mekite-btc.onrender.com/api/admin/add-investment-plan',
        formData
      );
      
      setMessage('Investment plan added successfully!');
      setPlans([...plans, response.data.plan]);
      setShowForm(false);
      setFormData({
        name: '',
        minimumAmount: '',
        maximumAmount: '',
        returnPercentage: '',
        duration: '',
        description: ''
      });
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error adding investment plan');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (planId) => {
    if (!window.confirm('Are you sure you want to delete this plan?')) return;

    try {
      await axios.delete(`https://mekite-btc.onrender.com/api/admin/investment-plan/${planId}`);
      setPlans(plans.filter(plan => plan._id !== planId));
      setMessage('Plan deleted successfully');
    } catch (error) {
      setMessage('Error deleting plan');
    }
  };

  if (loading && !showForm) {
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
            <div className="relative flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Investment Plans</h1>
                <p className="text-gray-400">Manage your investment packages</p>
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="px-4 py-2 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-all flex items-center space-x-2"
              >
                <RiAddLine />
                <span>Add New Plan</span>
              </button>
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

          {/* Add Plan Form */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="relative p-[1px] rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500"
              >
                <div className="bg-[#1a2234] rounded-2xl p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-400 mb-2">Plan Name</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-[#111827] text-white px-4 py-3 rounded-xl border border-gray-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-2">Minimum Amount</label>
                        <input
                          type="number"
                          value={formData.minimumAmount}
                          onChange={(e) => setFormData({...formData, minimumAmount: e.target.value})}
                          className="w-full bg-[#111827] text-white px-4 py-3 rounded-xl border border-gray-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-2">Maximum Amount</label>
                        <input
                          type="number"
                          value={formData.maximumAmount}
                          onChange={(e) => setFormData({...formData, maximumAmount: e.target.value})}
                          className="w-full bg-[#111827] text-white px-4 py-3 rounded-xl border border-gray-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-2">Return Percentage</label>
                        <input
                          type="number"
                          value={formData.returnPercentage}
                          onChange={(e) => setFormData({...formData, returnPercentage: e.target.value})}
                          className="w-full bg-[#111827] text-white px-4 py-3 rounded-xl border border-gray-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-2">Duration (in days)</label>
                        <input
                          type="number"
                          value={formData.duration}
                          onChange={(e) => setFormData({...formData, duration: e.target.value})}
                          className="w-full bg-[#111827] text-white px-4 py-3 rounded-xl border border-gray-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-2">Description</label>
                        <textarea
                          value={formData.description}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                          className="w-full bg-[#111827] text-white px-4 py-3 rounded-xl border border-gray-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                          rows="3"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="px-6 py-3 bg-gray-500/10 text-gray-400 rounded-xl hover:bg-gray-500/20 transition-all"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all disabled:opacity-50"
                      >
                        {loading ? 'Adding...' : 'Add Plan'}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <motion.div
                key={plan._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative p-[1px] rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500"
              >
                <div className="bg-[#1a2234] rounded-2xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDelete(plan._id)}
                        className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-all"
                      >
                        <RiDeleteBinLine />
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <RiMoneyDollarCircleLine />
                      <span>Min: ${plan.minimumAmount}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <RiMoneyDollarCircleLine />
                      <span>Max: ${plan.maximumAmount}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <RiPercentLine />
                      <span>Return: {plan.returnPercentage}%</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <RiTimeLine />
                      <span>Duration: {plan.duration} days</span>
                    </div>
                    <p className="text-gray-400 text-sm">{plan.description}</p>
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

export default ManageInvestmentPlans; 