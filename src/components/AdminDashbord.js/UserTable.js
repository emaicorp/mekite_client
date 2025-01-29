import React from 'react';
import { motion } from 'framer-motion';

function UserTable({ users }) {
  return (
    <div className="bg-[#1a2234] rounded-2xl overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-white mb-6">User Overview</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-gray-400 text-left">
                <th className="pb-4 px-4">User</th>
                <th className="pb-4 px-4">Status</th>
                <th className="pb-4 px-4">Balance</th>
                <th className="pb-4 px-4">Last Seen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {users.slice(0, 5).map((user, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="hover:bg-[#1f2943] transition-colors duration-300"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                        <span className="text-white font-medium">
                          {user.fullName[0]}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{user.fullName}</p>
                        <p className="text-gray-400 text-sm">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      user.isOnline 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {user.isOnline ? 'Online' : 'Offline'}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-white">
                    ${user.totalEarnings.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-gray-400">
                    {new Date(user.lastSeen).toLocaleDateString()}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserTable; 