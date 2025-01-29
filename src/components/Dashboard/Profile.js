import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getUserDetails } from '../Dashboard/localStorageUtils';
import { IoPersonOutline } from "react-icons/io5";
import { FaBitcoin, FaEthereum } from 'react-icons/fa';
import { SiTether } from "react-icons/si";
import Sidebar from './Sidebar';
import LoadingSpinner from "../common/LoadingSpinner"

function Profile() {
  const [userActivity, setUserActivity] = useState(null);
  const [formData, setFormData] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem('userWallets')) || {};
    return {
      bitcoinWallet: storedData.bitcoinWallet || '',
      ethereumWallet: storedData.ethereumWallet || '',
      usdtWallet: storedData.usdtWallet || '',
      username: storedData.username || '',
    };
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchUserActivity = async () => {
      const userDetails = getUserDetails();
      if (!userDetails) {
        setError('User is not logged in');
        return;
      }

      try {
        const response = await axios.get(
          'https://mekite-btc.onrender.com/api/profile/activity',
          {
            headers: {
              Authorization: `Bearer ${userDetails.token}`,
              'user-id': userDetails.userId,
            },
          }
        );

        const activity = response.data.activity;
        setUserActivity(activity);
        setFormData((prevData) => ({
          ...prevData,
          bitcoinWallet: activity.bitcoinWallet || '',
          ethereumWallet: activity.ethereumWallet || '',
          usdtWallet: activity.usdtWallet || '',
          username: activity.username || '',
        }));
      } catch (err) {
        console.error('Error fetching user activity:', err);
        setError('Unable to fetch user activity. Please try again later.');
      }
    };

    fetchUserActivity();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const userDetails = getUserDetails();

    if (!userDetails) {
      setError('User is not logged in');
      return;
    }

    try {
      const response = await axios.put(
        'https://mekite-btc.onrender.com/api/profile/update',
        formData,
        {
          headers: {
            Authorization: `Bearer ${userDetails.token}`,
            'user-id': userDetails.userId,
          },
        }
      );

      localStorage.setItem('userWallets', JSON.stringify(formData));
      setUserActivity((prevActivity) => ({
        ...prevActivity,
        ...response.data.userDetails,
      }));

      setSuccess('Profile updated successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Unable to update profile. Please try again later.');
      setTimeout(() => setError(''), 3000);
    }
  };

  if (!userActivity) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#111827]">
      <Sidebar />
      
      <div className="flex-1 overflow-x-hidden">
        <div className="mt-10 p-8">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-500/10 rounded-xl">
                <IoPersonOutline className="text-2xl text-indigo-500" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Account</p>
                <h1 className="text-white text-xl font-medium">Profile Settings</h1>
              </div>
            </div>
          </div>

          <div className="relative max-w-2xl mx-auto">
            <div className="p-[1px] relative rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500">
              <div className="relative bg-[#1a2234] rounded-2xl p-8">
                {success && (
                  <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400">
                    {success}
                  </div>
                )}

                {error && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
                    {error}
                  </div>
                )}

                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-400 mb-2">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="relative">
                    <label className="block text-gray-400 mb-2 flex items-center gap-2">
                      <FaBitcoin className="text-[#F7931A]" />
                      Bitcoin Wallet
                    </label>
                    <input
                      type="text"
                      name="bitcoinWallet"
                      value={formData.bitcoinWallet}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="relative">
                    <label className="block text-gray-400 mb-2 flex items-center gap-2">
                      <FaEthereum className="text-[#627EEA]" />
                      Ethereum Wallet
                    </label>
                    <input
                      type="text"
                      name="ethereumWallet"
                      value={formData.ethereumWallet}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="relative">
                    <label className="block text-gray-400 mb-2 flex items-center gap-2">
                      <SiTether className="text-[#26A17B]" />
                      USDT Wallet
                    </label>
                    <input
                      type="text"
                      name="usdtWallet"
                      value={formData.usdtWallet}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-xl hover:opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Update Profile
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
