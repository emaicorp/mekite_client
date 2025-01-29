import React from 'react';
import { motion } from 'framer-motion';
import { RiExchangeDollarLine, RiUserAddLine } from 'react-icons/ri';

function RecentActivities({ users }) {
  // Generate activities from user data
  const activities = users.slice(0, 5).flatMap(user => [
    {
      type: 'join',
      user: user.fullName,
      time: new Date(user.lastSeen).getTime(),
      icon: RiUserAddLine,
    },
    ...user.investments.map(inv => ({
      type: 'investment',
      user: user.fullName,
      amount: inv.amount,
      time: new Date().getTime() - Math.random() * 86400000, // Random time within last 24h
      icon: RiExchangeDollarLine,
    }))
  ]).sort((a, b) => b.time - a.time).slice(0, 10);

  return (
    <div className="bg-[#1a2234] rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Recent Activities</h2>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-center space-x-4"
          >
            <div className="p-3 rounded-xl bg-indigo-500/10">
              <activity.icon className="text-xl text-indigo-400" />
            </div>
            <div>
              <p className="text-white font-medium">
                {activity.type === 'join' 
                  ? `${activity.user} joined the platform`
                  : `${activity.user} invested $${activity.amount}`}
              </p>
              <p className="text-gray-400 text-sm">
                {new Date(activity.time).toLocaleTimeString()}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default RecentActivities; 