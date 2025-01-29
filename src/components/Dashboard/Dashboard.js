import React, { useState, useEffect } from 'react';
import { FaWallet, FaArrowDown, FaCoins, FaUserCog } from 'react-icons/fa';
import { PiHandDepositFill } from "react-icons/pi";
import { IoGridOutline } from "react-icons/io5";
import { RiUserLine } from "react-icons/ri";
import Sidebar from './Sidebar';
// import CryptoDash from './CryptoDash';
import MarketOverview from '../Home/MarketOverview';

function Dashboard() {
  const [userDetails, setUserDetails] = useState(null);
  const [showUserInfo, setShowUserInfo] = useState(false);

  useEffect(() => {
    const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (storedUserDetails) {
      setUserDetails(storedUserDetails);
    }
  }, []);

  if (!userDetails) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#111827]">
        <div className="w-16 h-16 relative">
          <div className="w-16 h-16 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
          <div className="w-12 h-12 absolute top-2 left-2 rounded-full border-4 border-purple-500 border-t-transparent animate-spin-slow"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#111827]">
      <Sidebar />
      
      <div className="flex-1 overflow-x-hidden">
        <div className="mt-10 p-8">
          {/* Top Bar */}
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-500/10 rounded-xl">
                <IoGridOutline className="text-2xl text-indigo-500" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Dashboard</p>
                <h1 className="text-white text-xl font-medium">Overview</h1>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <button 
                onClick={() => setShowUserInfo(!showUserInfo)}
                className="flex items-center gap-3 px-4 py-2 bg-indigo-500/10 rounded-xl hover:bg-indigo-500/20 transition-all duration-300"
              >
                <RiUserLine className="text-xl text-indigo-500" />
                <span className="text-white">{userDetails.username}</span>
              </button>
            </div>
          </div>

          {/* User Info Modal */}
          {showUserInfo && (
            <div className="mb-8 bg-[#1a2234] rounded-2xl p-6 border border-indigo-500/20 backdrop-blur-xl">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-indigo-500/10 rounded-xl">
                  <FaUserCog className="text-2xl text-indigo-500" />
                </div>
                <div className="space-y-3">
                  <h2 className="text-xl font-medium text-white">Account Details</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400">Full Name</p>
                      <p className="text-white">{userDetails.fullName}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Email</p>
                      <p className="text-white">{userDetails.email}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-400">Referral Link</p>
                      <p className="text-indigo-400 text-sm">{userDetails.referralLink}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                title: "Available Balance",
                value: userDetails.availableBalance,
                icon: FaWallet,
                color: "from-blue-500 to-indigo-500",
                bgLight: "from-blue-500/5 to-indigo-500/5"
              },
              {
                title: "Total Withdrawals",
                value: userDetails.totalWithdrawals,
                icon: FaArrowDown,
                color: "from-purple-500 to-pink-500",
                bgLight: "from-purple-500/5 to-pink-500/5"
              },
              {
                title: "Total Earnings",
                value: userDetails.totalEarnings,
                icon: FaCoins,
                color: "from-amber-500 to-orange-500",
                bgLight: "from-amber-500/5 to-orange-500/5"
              },
              {
                title: "Active Deposit",
                value: userDetails.activeDeposit,
                icon: PiHandDepositFill,
                color: "from-emerald-500 to-teal-500",
                bgLight: "from-emerald-500/5 to-teal-500/5"
              }
            ].map((stat, index) => (
              <div 
                key={index}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                <div className={`bg-[#1a2234] rounded-2xl p-6 border border-gray-800`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-400 mb-1">{stat.title}</p>
                      <h3 className="text-2xl font-semibold text-white">
                        ${stat.value}
                      </h3>
                    </div>
                    <div className={`p-3 bg-gradient-to-r ${stat.bgLight} rounded-xl`}>
                      <stat.icon className="text-xl text-indigo-500" />
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-800">
                    <div className={`h-1 rounded-full bg-gradient-to-r ${stat.color} w-2/3`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Crypto Dashboard */}
          <div className="bg-[#1a2234] rounded-2xl p-6 border border-gray-800 mb-8">
            <div className="mb-6">
              <h2 className="text-xl font-medium text-white">Market Overview</h2>
              <p className="text-gray-400">Live cryptocurrency prices and trends</p>
            </div>
            <MarketOverview />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
