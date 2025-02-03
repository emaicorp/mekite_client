import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './SideBard';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RiUserLine, 
  RiClipboardLine, 
  RiMoreLine,
  RiSearchLine,
  RiMailCheckLine,
  RiUserUnfollowLine,
  RiUserSettingsLine,
  RiCloseLine
} from 'react-icons/ri';

function AdminLogin() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://mekite-btc.onrender.com/api/all-users');
        if (response.data.users) {
          setUsers(response.data.users);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setMessage('Error fetching users');
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleAction = async (userId, action) => {
    try {
      const response = await axios.post('https://mekite-btc.onrender.com/api/admin/manage-user', {
        action,
        userId
      });

      if (response.data.message) {
        setMessage(response.data.message);
      }
      setActiveDropdown(null); // Close dropdown after action
    } catch (error) {
      console.error('Error managing user:', error);
      setMessage('Error managing user');
    }
  };

  const handleCopyUserId = (id) => {
    navigator.clipboard.writeText(id).then(() => {
      setMessage('User ID copied to clipboard!');
    }).catch((error) => {
      console.error('Error copying user ID:', error);
      setMessage('Failed to copy user ID');
    });
  };

  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const clearMessage = () => {
    setMessage('');
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
              <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
              <p className="text-gray-400">Manage and control user accounts</p>
            </div>
          </div>

          {/* Message Alert with Close Button */}
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
                  onClick={clearMessage}
                  className="absolute top-4 right-4 p-1 hover:bg-indigo-500/20 rounded-lg transition-all"
                >
                  <RiCloseLine className="text-xl" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Search Box */}
          <div className="relative p-[1px] rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500">
            <div className="bg-[#1a2234] rounded-2xl p-6">
              <div className="relative">
                <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#111827] text-white pl-10 pr-4 py-3 rounded-xl border border-gray-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Users List with Scrollable Container */}
          <div className="bg-[#1a2234] rounded-2xl overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-white mb-6">All Users</h2>
              
              <div className="space-y-4 max-h-[calc(100vh-24rem)] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-indigo-500">
                {filteredUsers.map((user) => (
                  <motion.div
                    key={user._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#111827] rounded-xl p-6 relative"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                          <RiUserLine className="text-2xl text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-medium">{user.name}</h3>
                          <p className="text-gray-400 text-sm">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button 
                          onClick={() => handleCopyUserId(user._id)}
                          className="px-4 py-2 bg-indigo-500/10 text-indigo-400 rounded-lg hover:bg-indigo-500/20 transition-all flex items-center space-x-2"
                        >
                          <RiClipboardLine />
                          <span>Copy ID</span>
                        </button>
                        
                        {/* Actions Dropdown with Better Positioning */}
                        <div className="relative">
                          <button
                            onClick={() => setActiveDropdown(activeDropdown === user._id ? null : user._id)}
                            className="p-2 hover:bg-indigo-500/10 rounded-lg transition-all text-gray-400 hover:text-indigo-400"
                          >
                            <RiMoreLine className="text-xl" />
                          </button>
                          
                          {activeDropdown === user._id && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute right-0 top-0 mt-10 w-48 bg-[#1a2234] rounded-xl shadow-lg border border-gray-800 overflow-hidden z-50"
                            >
                              <button
                                onClick={() => handleAction(user._id, 'verify-email')}
                                className="w-full px-4 py-3 flex items-center space-x-2 text-left hover:bg-indigo-500/10 text-gray-400 hover:text-indigo-400 transition-all"
                              >
                                <RiMailCheckLine />
                                <span>Verify Email</span>
                              </button>
                              <button
                                onClick={() => handleAction(user._id, 'disable-account')}
                                className="w-full px-4 py-3 flex items-center space-x-2 text-left hover:bg-indigo-500/10 text-gray-400 hover:text-indigo-400 transition-all"
                              >
                                <RiUserUnfollowLine />
                                <span>Disable Account</span>
                              </button>
                              <button
                                onClick={() => handleAction(user._id, 'suspend-account')}
                                className="w-full px-4 py-3 flex items-center space-x-2 text-left hover:bg-indigo-500/10 text-gray-400 hover:text-indigo-400 transition-all"
                              >
                                <RiUserSettingsLine />
                                <span>Suspend Account</span>
                              </button>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AdminLogin;
