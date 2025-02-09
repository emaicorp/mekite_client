import React, { useEffect, useState } from "react";
// import axios from "axios";
import Sidebar from "./SideBard";
import { motion } from "framer-motion";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { RiUserLine, RiMoneyDollarCircleLine, RiExchangeDollarLine, RiShieldUserLine, RiWallet3Line, RiDeleteBinLine, RiEditLine, RiCloseLine } from 'react-icons/ri';
import UserTable from "./UserTable";
import RecentActivities from "./RecentActivities";
import './AdminDashboard.css';
import useAdminUsers from '../../hooks/useAdminUsers';
import LoadingSpinner from '../common/LoadingSpinner';
import StatsCard from '../common/StatsCard';
import api from '../../utils/axios';
import toast from 'react-hot-toast';



function AdminDashboard() {
  const { users, loading, error, setUsers } = useAdminUsers('/admin/users');
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: 'user',
    status: 'active',
    password: ''
  });

   // Mock data for the chart - replace with real data
   const chartData = React.useMemo(() => {
    const monthlyData = users.reduce((acc, user) => {
      const month = new Date(user.lastSeen).toLocaleString('default', { month: 'short' });
      if (!acc[month]) {
        acc[month] = { deposits: 0, withdrawals: 0 };
      }
      acc[month].deposits += user.activeDeposit;
      acc[month].withdrawals += user.totalWithdrawals;
      return acc;
    }, {});

    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map(month => ({
      name: month,
      deposits: monthlyData[month]?.deposits || 0,
      withdrawals: monthlyData[month]?.withdrawals || 0
    }));
  }, [users]);
  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.isOnline).length,
    totalDeposits: users.reduce((acc, user) => acc + user.activeDeposit, 0),
    admins: users.filter(u => u.role === 'admin').length
  };


  const handleDeleteUser = async (userId) => {
    try {
      await api.delete(`/admin/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
      toast.success('User Successfully Deleted')
    } catch (error) {
      toast.error('Error Deleting user')
      console.error('Delete error:', error);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      role: user.role,
      status: user.status,
      password:user.password
    });
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      console.log(formData)
      const response = await api.patch(`/admin/users/${editingUser._id}`, formData);
      
      if (response.data.success) {
        setUsers(users.map(user => 
          user._id === editingUser._id ? { ...user, ...formData } : user
        ));
        setEditingUser(null);
        toast.success('User updated successfully');
      }
    } catch (error) {
      toast.error('Error updating user');
      console.error('Update error:', error);
    }
  };

  // const activeUsersPercentage = (stats.activeUsers / stats.totalUsers) * 100;

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
          {/* Top Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatsCard
              icon={RiUserLine}
              title="Total Users"
              value={stats.totalUsers}
              color="indigo"
            />
            <StatsCard
              icon={RiUserLine}
              title="Active Users"
              value={stats.activeUsers}
              color="green"
            />
            <StatsCard
              icon={RiWallet3Line}
              title="Total Deposits"
              value={`$${stats.totalDeposits.toLocaleString()}`}
              color="purple"
            />
            <StatsCard
              icon={RiShieldUserLine}
              title="Administrators"
              value={stats.admins}
              color="blue"
            />
          </div>

          {/* Chart Section */}
          <div className="bg-[#1a2234] p-6 rounded-2xl">
            <h2 className="text-xl font-semibold text-white mb-6">Transaction Overview</h2>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="deposits" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="withdrawals" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EC4899" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#EC4899" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2943" />
                  <XAxis dataKey="name" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a2234',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="deposits"
                    stroke="#8B5CF6"
                    fillOpacity={1}
                    fill="url(#deposits)"
                  />
                  <Area
                    type="monotone"
                    dataKey="withdrawals"
                    stroke="#EC4899"
                    fillOpacity={1}
                    fill="url(#withdrawals)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-[#1a2234] rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">User Management</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-gray-400">Username</th>
                    <th className="px-6 py-3 text-left text-gray-400">Email</th>
                    <th className="px-6 py-3 text-left text-gray-400">Password</th>
                    <th className="px-6 py-3 text-left text-gray-400">Role</th>
                    <th className="px-6 py-3 text-left text-gray-400">Status</th>
                    <th className="px-6 py-3 text-left text-gray-400">Balance</th>
                    <th className="px-6 py-3 text-left text-gray-400">Deposits</th>
                    <th className="px-6 py-3 text-left text-gray-400">Last Seen</th>
                    <th className="px-6 py-3 text-left text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {users.map(user => (
                    <tr key={user._id} className="hover:bg-gray-900/20">
                      <td className="px-6 py-4 text-white">{user.username}</td>
                      <td className="px-6 py-4 text-gray-300">{user.email}</td>
                      <td className="px-6 py-4 text-gray-300">{user.password}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.role === 'admin' 
                            ? 'bg-indigo-500/20 text-indigo-400' 
                            : 'bg-gray-500/20 text-gray-400'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.status === 'active'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        ${user.availableBalance.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        ${user.activeDeposit.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-sm">
                        {new Date(user.lastSeen).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-3">
                          <button 
                            onClick={() => handleEditUser(user)}
                            className="p-2 text-indigo-400 hover:bg-indigo-500/20 rounded-lg"
                          >
                            <RiEditLine className="text-lg" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg"
                          >
                            <RiDeleteBinLine className="text-lg" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2">
              <UserTable users={users} />
            </div>
            <div className="xl:col-span-1">
              <RecentActivities users={users} />
            </div>
          </div>
        </motion.div>
      </div>

      {editingUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="bg-[#1a2234] rounded-2xl p-6 w-full max-w-md relative"
          >
            <button
              onClick={() => setEditingUser(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <RiCloseLine className="text-2xl" />
            </button>

            <h2 className="text-xl font-semibold text-white mb-6">Edit User</h2>
            
            <form onSubmit={handleUpdateUser} className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-2">Username</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Password</label>
                <input
                  type="text"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 text-white"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 text-white"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 bg-indigo-500 text-white rounded-xl hover:opacity-90"
                >
                  Update User
                </button>
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="flex-1 py-3 px-4 bg-gray-700 text-white rounded-xl hover:opacity-90"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;