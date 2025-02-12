import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  RiMailLine, 
  RiAddLine,
  RiDeleteBinLine,
  RiToggleLine,
  RiToggleFill
} from 'react-icons/ri';
import toast from 'react-hot-toast';
import api from '../../utils/axios';
import Sidebar from './SideBard';

const AdminEmails = () => {
  const [emails, setEmails] = useState([]);
  const [newEmail, setNewEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    try {
      const response = await api.get('/admin-emails');
      if (response.data.success) {
        setEmails(response.data.data || []);
      }
      setLoading(false);
    } catch (error) {
      toast.error('Error fetching admin emails');
      console.error('Fetch Error:', error);
      setLoading(false);
    }
  };

  const handleAddEmail = async (e) => {
    e.preventDefault();
    
    if (!newEmail) {
      toast.error('Please enter an email address');
      return;
    }

    try {
      const response = await api.post('/admin-emails/add', { email: newEmail });
      
      if (response.data.success) {
        toast.success('Admin email added successfully');
        setEmails(prev => [...prev, response.data.data]);
        setNewEmail(''); // Reset input
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error adding admin email');
      console.error('Add Error:', error);
    }
  };

  const handleDelete = async (emailId) => {
    if (!window.confirm('Are you sure you want to delete this admin email?')) {
      return;
    }

    try {
      const response = await api.delete(`/admin-emails/${emailId}`);
      
      if (response.data.success) {
        toast.success('Admin email deleted successfully');
        setEmails(prev => prev.filter(email => email._id !== emailId));
      }
    } catch (error) {
      toast.error('Error deleting admin email');
      console.error('Delete Error:', error);
    }
  };

  const handleToggle = async (emailId, currentStatus) => {
    try {
      const response = await api.patch(`/admin-emails/${emailId}/toggle`);
      
      if (response.data.success) {
        toast.success(`Admin email ${currentStatus ? 'disabled' : 'enabled'} successfully`);
        setEmails(prev =>
          prev.map(email =>
            email._id === emailId
              ? { ...email, isActive: !email.isActive }
              : email
          )
        );
      }
    } catch (error) {
      toast.error('Error toggling admin email status');
      console.error('Toggle Error:', error);
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
              <h1 className="text-3xl font-bold text-white mb-2">Admin Emails</h1>
              <p className="text-gray-400">Manage administrator email addresses</p>
            </div>
          </div>

          {/* Add Email Form */}
          <div className="relative p-[1px] rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500">
            <div className="bg-[#1a2234] rounded-2xl p-6">
              <form onSubmit={handleAddEmail} className="flex gap-4">
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Enter admin email address"
                  className="flex-1 px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-xl hover:opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center gap-2"
                >
                  <RiAddLine />
                  Add Email
                </button>
              </form>
            </div>
          </div>

          {/* Email List */}
          <div className="grid grid-cols-1 gap-4">
            {emails.map((email) => (
              <motion.div
                key={email._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative p-[1px] rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500"
              >
                <div className="bg-[#1a2234] rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <RiMailLine className="text-indigo-400 text-xl" />
                      <div>
                        <p className="text-white">{email.email}</p>
                        <p className="text-sm text-gray-400">
                          Status: {email.isActive ? 'Active' : 'Inactive'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleToggle(email._id, email.isActive)}
                        className={`p-2 rounded-lg transition-all ${
                          email.isActive
                            ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                            : 'bg-gray-500/10 text-gray-400 hover:bg-gray-500/20'
                        }`}
                        title={email.isActive ? 'Disable' : 'Enable'}
                      >
                        {email.isActive ? <RiToggleFill className="text-xl" /> : <RiToggleLine className="text-xl" />}
                      </button>
                      <button
                        onClick={() => handleDelete(email._id)}
                        className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-all"
                        title="Delete"
                      >
                        <RiDeleteBinLine />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {emails.length === 0 && (
              <div className="text-center py-12">
                <RiMailLine className="text-4xl text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No admin emails found</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminEmails; 