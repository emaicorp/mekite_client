import React, { useEffect, useState } from "react";
import axios from "axios";
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
import { RiUserLine, RiMoneyDollarCircleLine, RiExchangeDollarLine } from 'react-icons/ri';
import UserTable from "./UserTable";
import RecentActivities from "./RecentActivities";
import './AdminDashboard.css';


function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalDeposits: 0,
    totalWithdrawals: 0,
  });

  // Mock data for the chart - replace with real data
  const [chartData] = useState([
    { name: 'Jan', deposits: 4000, withdrawals: 2400 },
    { name: 'Feb', deposits: 3000, withdrawals: 1398 },
    { name: 'Mar', deposits: 2000, withdrawals: 9800 },
    { name: 'Apr', deposits: 2780, withdrawals: 3908 },
    { name: 'May', deposits: 1890, withdrawals: 4800 },
    { name: 'Jun', deposits: 2390, withdrawals: 3800 },
  ]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://mekite-btc.onrender.com/api/all-users"
        );
        setUsers(response.data.users);
        
        const activeUsers = response.data.users.filter(user => user.isOnline).length;
        const totalDeposits = response.data.users.reduce((acc, user) => 
          acc + user.investments.reduce((sum, inv) => sum + inv.amount, 0), 0
        );
        const totalWithdrawals = response.data.users.reduce((acc, user) => 
          acc + user.totalWithdrawals, 0
        );

        setStats({
          totalUsers: response.data.users.length,
          activeUsers,
          totalDeposits,
          totalWithdrawals,
        });

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen bg-[#111827]">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen bg-[#111827]">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center p-5 text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  const activeUsersPercentage = (stats.activeUsers / stats.totalUsers) * 100;

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
            {/* Active Users Progress */}
            <div className="bg-[#1a2234] p-6 rounded-2xl">
              <div className="w-32 h-32 mx-auto mb-4">
                <CircularProgressbar
                  value={activeUsersPercentage}
                  text={`${Math.round(activeUsersPercentage)}%`}
                  styles={buildStyles({
                    pathColor: `rgba(129, 140, 248)`,
                    textColor: '#fff',
                    trailColor: '#1f2943',
                  })}
                />
              </div>
              <p className="text-center text-gray-400">Active Users</p>
              <p className="text-center text-white font-bold">{stats.activeUsers} / {stats.totalUsers}</p>
            </div>

            {/* Other Stats */}
            {[
              { title: "Total Users", value: stats.totalUsers, icon: RiUserLine },
              { title: "Total Deposits", value: `$${stats.totalDeposits.toLocaleString()}`, icon: RiMoneyDollarCircleLine },
              { title: "Total Withdrawals", value: `$${stats.totalWithdrawals.toLocaleString()}`, icon: RiExchangeDollarLine }
            ].map((stat, index) => (
              <div key={index} className="bg-[#1a2234] p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className="text-2xl text-indigo-400" />
                </div>
                <p className="text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
            ))}
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
    </div>
  );
}

export default AdminDashboard;