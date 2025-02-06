import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RiAddLine, 
  RiCloseLine, 
  RiMoneyDollarCircleLine,
  RiPercentLine,
  RiTimeLine,
  RiDeleteBinLine,
  RiCheckLine,
  RiEditLine
} from 'react-icons/ri';
import toast from 'react-hot-toast';
import api from '../../utils/axios';
import Sidebar from './SideBard';

const ManageInvestmentPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    minAmount: '',
    maxAmount: '',
    dailyProfit: '',
    duration: '',
    description: '',
    features: [''],
    status: 'active'
  });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await api.get('investment-plans');
      if (response.data.success) {
        setPlans(response.data.data || []);
      }
      setLoading(false);
    } catch (error) {
      toast.error('Error fetching investment plans');
      console.error('Fetch Error:', error);
      setLoading(false);
    }
  };

  const handleEdit = (plan) => {
    setFormData({
      name: plan.name,
      minAmount: plan.minAmount,
      maxAmount: plan.maxAmount,
      dailyProfit: plan.dailyProfit,
      duration: plan.duration,
      description: plan.description,
      features: [...plan.features, ''], // Add empty feature for potential new ones
      status: plan.status
    });
    setEditingId(plan._id);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleAddFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, '']
    });
  };

  const handleRemoveFeature = (index) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index)
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      minAmount: '',
      maxAmount: '',
      dailyProfit: '',
      duration: '',
      description: '',
      features: [''],
      status: 'active'
    });
    setIsEditing(false);
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const cleanedFeatures = formData.features.filter(feature => feature.trim() !== '');
      
      const payload = {
        name: formData.name,
        minAmount: Number(formData.minAmount),
        maxAmount: Number(formData.maxAmount),
        dailyProfit: Number(formData.dailyProfit),
        duration: Number(formData.duration),
        description: formData.description,
        features: cleanedFeatures,
        status: formData.status
      };

      let response;
      if (isEditing) {
        response = await api.put(`investment-plans/${editingId}`, payload);
        if (response.data.success) {
          setPlans(plans.map(plan => 
            plan._id === editingId ? response.data.data : plan
          ));
          toast.success('Investment plan updated successfully!');
        }
      } else {
        response = await api.post('investment-plans', payload);
        if (response.data.success) {
          setPlans([...plans, response.data.data]);
          toast.success('Investment plan added successfully!');
        }
      }
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || `Error ${isEditing ? 'updating' : 'adding'} investment plan`);
      console.error('Plan Operation Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (planId) => {
    if (!window.confirm('Are you sure you want to delete this plan?')) return;

    try {
      await api.delete(`investment-plans/${planId}`);
      setPlans(plans.filter(plan => plan._id !== planId));
      toast.success('Plan deleted successfully');
    } catch (error) {
      toast.error('Error deleting plan');
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

          {/* Form Modal */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="relative p-[1px] rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500"
              >
                <div className="bg-[#1a2234] rounded-2xl p-6">
                  <h2 className="text-xl font-semibold text-white mb-6">
                    {isEditing ? 'Edit Investment Plan' : 'Add New Investment Plan'}
                  </h2>
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
                          value={formData.minAmount}
                          onChange={(e) => setFormData({...formData, minAmount: e.target.value})}
                          className="w-full bg-[#111827] text-white px-4 py-3 rounded-xl border border-gray-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-2">Maximum Amount</label>
                        <input
                          type="number"
                          value={formData.maxAmount}
                          onChange={(e) => setFormData({...formData, maxAmount: e.target.value})}
                          className="w-full bg-[#111827] text-white px-4 py-3 rounded-xl border border-gray-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-2">Daily Profit (%)</label>
                        <input
                          type="number"
                          value={formData.dailyProfit}
                          onChange={(e) => setFormData({...formData, dailyProfit: e.target.value})}
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
                      <div>
                        <label className="block text-gray-400 mb-2">Status</label>
                        <select
                          value={formData.status}
                          onChange={(e) => setFormData({...formData, status: e.target.value})}
                          className="w-full bg-[#111827] text-white px-4 py-3 rounded-xl border border-gray-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-gray-400 mb-2">Features</label>
                        <div className="space-y-3">
                          {formData.features.map((feature, index) => (
                            <div key={index} className="flex gap-2">
                              <input
                                type="text"
                                value={feature}
                                onChange={(e) => {
                                  const newFeatures = [...formData.features];
                                  newFeatures[index] = e.target.value;
                                  setFormData({...formData, features: newFeatures});
                                }}
                                placeholder={`Feature ${index + 1}`}
                                className="flex-1 bg-[#111827] text-white px-4 py-3 rounded-xl border border-gray-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveFeature(index)}
                                className="p-3 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-all"
                              >
                                <RiCloseLine />
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={handleAddFeature}
                            className="w-full py-2 px-4 border border-dashed border-gray-700 rounded-xl text-gray-400 hover:border-indigo-500 hover:text-indigo-500 transition-all flex items-center justify-center gap-2"
                          >
                            <RiAddLine />
                            <span>Add Feature</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        onClick={resetForm}
                        className="px-6 py-3 bg-gray-500/10 text-gray-400 rounded-xl hover:bg-gray-500/20 transition-all"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all disabled:opacity-50"
                      >
                        {loading ? (isEditing ? 'Updating...' : 'Adding...') : (isEditing ? 'Update Plan' : 'Add Plan')}
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
                        onClick={() => handleEdit(plan)}
                        className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg hover:bg-indigo-500/20 transition-all"
                      >
                        <RiEditLine />
                      </button>
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
                      <span>Min: ${plan.minAmount}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <RiMoneyDollarCircleLine />
                      <span>Max: ${plan.maxAmount}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <RiPercentLine />
                      <span>Daily Profit: {plan.dailyProfit}%</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <RiTimeLine />
                      <span>Duration: {plan.duration} days</span>
                    </div>
                    
                    {plan.features && plan.features.length > 0 && (
                      <div className="pt-4 border-t border-gray-800">
                        <p className="text-gray-400 mb-2">Features:</p>
                        <ul className="space-y-2">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-center space-x-2 text-gray-400">
                              <RiCheckLine className="text-green-400" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="pt-4 border-t border-gray-800">
                      <p className="text-gray-400 text-sm">{plan.description}</p>
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

export default ManageInvestmentPlans; 