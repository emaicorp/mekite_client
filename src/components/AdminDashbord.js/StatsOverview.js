import React from 'react';
import { motion } from 'framer-motion';
import { RiUserLine, RiUserFollowLine, RiMoneyDollarCircleLine, RiExchangeDollarLine } from 'react-icons/ri';

function StatsOverview({ stats }) {
  const statItems = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: RiUserLine,
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "Active Users",
      value: stats.activeUsers,
      icon: RiUserFollowLine,
      color: "from-indigo-500 to-purple-500"
    },
    {
      title: "Total Deposits",
      value: `$${stats.totalDeposits.toLocaleString()}`,
      icon: RiMoneyDollarCircleLine,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Total Withdrawals",
      value: `$${stats.totalWithdrawals.toLocaleString()}`,
      icon: RiExchangeDollarLine,
      color: "from-pink-500 to-red-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statItems.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative group"
        >
          <div className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-300`}></div>
          <div className={`relative p-[1px] rounded-2xl bg-gradient-to-r ${item.color}`}>
            <div className="bg-[#1a2234] rounded-2xl p-6 h-full group-hover:bg-[#1f2943] transition-colors duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${item.color} bg-opacity-10`}>
                  <item.icon className="text-2xl text-white" />
                </div>
              </div>
              <h3 className="text-gray-400 text-sm mb-2">{item.title}</h3>
              <p className="text-2xl font-bold text-white">{item.value}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default StatsOverview;